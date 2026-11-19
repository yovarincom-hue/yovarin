import { getCloudflareContext } from '@opennextjs/cloudflare';

const SESSION_COOKIE = 'yovarin_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;
const OTP_DURATION_MINUTES = 10;
const MAX_OTP_ATTEMPTS = 5;

async function getDatabase() {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error('The Cloudflare D1 binding "DB" is not configured.');
  }
  return env.DB;
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function randomHex(byteLength) {
  return bytesToHex(crypto.getRandomValues(new Uint8Array(byteLength)));
}

function constantTimeEqual(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

async function digestHex(value) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return bytesToHex(new Uint8Array(digest));
}

async function hashOtp(email, purpose, code) {
  const { env } = await getCloudflareContext({ async: true });
  if (typeof env.AUTH_SECRET !== 'string' || env.AUTH_SECRET.length < 32) {
    throw new Error('AUTH_SECRET must be configured with at least 32 characters.');
  }
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(env.AUTH_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${email}:${purpose}:${code}`)
  );
  return bytesToHex(new Uint8Array(signature));
}

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 },
    key,
    256
  );
  return `pbkdf2$100000$${bytesToHex(salt)}$${bytesToHex(new Uint8Array(bits))}`;
}

export async function verifyPassword(password, storedHash) {
  const [algorithm, iterations, saltHex, expectedHash] = storedHash.split('$');
  if (algorithm !== 'pbkdf2' || iterations !== '100000' || !saltHex || !expectedHash) {
    return false;
  }
  const salt = new Uint8Array(saltHex.match(/.{2}/g).map((byte) => parseInt(byte, 16)));
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 },
    key,
    256
  );
  return constantTimeEqual(bytesToHex(new Uint8Array(bits)), expectedHash);
}

export async function rateLimitAuthRequest(request, route) {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.API_LIMITER) {
    throw new Error('The Cloudflare API_LIMITER binding is not configured.');
  }
  const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';
  const result = await env.API_LIMITER.limit({ key: `${route}:${clientIp}` });
  return result.success
    ? null
    : { status: 429, error: 'Too many requests. Please try again later.' };
}

export async function issueOtp({ email, purpose, name, passwordHash }) {
  const database = await getDatabase();
  const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, '0');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + OTP_DURATION_MINUTES * 60 * 1000).toISOString();
  await database
    .prepare(
      `INSERT INTO auth_challenges (email, purpose, code_hash, expires_at, attempts, created_at, name, password_hash)
       VALUES (?, ?, ?, ?, 0, ?, ?, ?)
       ON CONFLICT(email, purpose) DO UPDATE SET
         code_hash = excluded.code_hash,
         expires_at = excluded.expires_at,
         attempts = 0,
         created_at = excluded.created_at,
         name = excluded.name,
         password_hash = excluded.password_hash`
    )
    .bind(email, purpose, await hashOtp(email, purpose, code), expiresAt, now.toISOString(), name || null, passwordHash || null)
    .run();
  return code;
}

export async function removeOtp(email, purpose) {
  const database = await getDatabase();
  await database
    .prepare('DELETE FROM auth_challenges WHERE email = ? AND purpose = ?')
    .bind(email, purpose)
    .run();
}

export async function inspectOtp(email, purpose, code) {
  const database = await getDatabase();
  const codeHash = await hashOtp(email, purpose, code);
  const now = new Date().toISOString();
  const challenge = await database
    .prepare(
      `SELECT code_hash, expires_at, attempts, name, password_hash
       FROM auth_challenges WHERE email = ? AND purpose = ?`
    )
    .bind(email, purpose)
    .first();

  if (!challenge || challenge.expires_at <= now || challenge.attempts >= MAX_OTP_ATTEMPTS) {
    return null;
  }
  if (!constantTimeEqual(challenge.code_hash, codeHash)) {
    await database
      .prepare('UPDATE auth_challenges SET attempts = attempts + 1 WHERE email = ? AND purpose = ? AND attempts < ?')
      .bind(email, purpose, MAX_OTP_ATTEMPTS)
      .run();
    return null;
  }

  return { ...challenge, code_hash: codeHash };
}

export async function findUserByEmail(email) {
  const database = await getDatabase();
  return database
    .prepare('SELECT id, name, email, password_hash, email_verified_at FROM auth_users WHERE email = ?')
    .bind(email)
    .first();
}

export async function completeRegistration(email, codeHash) {
  const database = await getDatabase();
  const now = new Date().toISOString();
  const results = await database.batch([
    database
      .prepare(
        `INSERT INTO auth_users (id, name, email, password_hash, email_verified_at, created_at)
         SELECT ?, name, email, password_hash, ?, ?
         FROM auth_challenges
         WHERE email = ? AND purpose = 'verify' AND code_hash = ? AND expires_at > ? AND attempts < ?
         ON CONFLICT(email) DO NOTHING`
      )
      .bind(crypto.randomUUID(), now, now, email, codeHash, now, MAX_OTP_ATTEMPTS),
    database
      .prepare(
        `DELETE FROM auth_challenges
         WHERE email = ? AND purpose = 'verify' AND code_hash = ? AND expires_at > ? AND attempts < ?`
      )
      .bind(email, codeHash, now, MAX_OTP_ATTEMPTS),
  ]);
  return results[0].meta.changes === 1;
}

export async function completePasswordReset(email, codeHash, passwordHash) {
  const database = await getDatabase();
  const now = new Date().toISOString();
  const results = await database.batch([
    database
      .prepare(
        `UPDATE auth_users SET password_hash = ?
         WHERE email = ? AND EXISTS (
           SELECT 1 FROM auth_challenges
           WHERE email = ? AND purpose = 'reset' AND code_hash = ? AND expires_at > ? AND attempts < ?
         )`
      )
      .bind(passwordHash, email, email, codeHash, now, MAX_OTP_ATTEMPTS),
    database
      .prepare('DELETE FROM auth_sessions WHERE user_id = (SELECT id FROM auth_users WHERE email = ?)')
      .bind(email),
    database
      .prepare(
        `DELETE FROM auth_challenges
         WHERE email = ? AND purpose = 'reset' AND code_hash = ? AND expires_at > ? AND attempts < ?`
      )
      .bind(email, codeHash, now, MAX_OTP_ATTEMPTS),
  ]);
  return results[0].meta.changes === 1;
}

export async function createSession(userId) {
  const database = await getDatabase();
  const token = randomHex(32);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_SECONDS * 1000).toISOString();
  await database
    .prepare('INSERT INTO auth_sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)')
    .bind(await digestHex(token), userId, expiresAt, new Date().toISOString())
    .run();
  return token;
}

function readSessionCookie(request) {
  const cookie = request.headers.get('cookie') || '';
  const value = cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  return value ? value.slice(SESSION_COOKIE.length + 1) : '';
}

export async function getSessionUser(request) {
  const token = readSessionCookie(request);
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  const database = await getDatabase();
  return database
    .prepare(
      `SELECT u.id, u.name, u.email FROM auth_sessions s
       JOIN auth_users u ON u.id = s.user_id
       WHERE s.id = ? AND s.expires_at > ?`
    )
    .bind(await digestHex(token), new Date().toISOString())
    .first();
}

export async function deleteSession(request) {
  const token = readSessionCookie(request);
  if (!/^[a-f0-9]{64}$/.test(token)) return;
  const database = await getDatabase();
  await database
    .prepare('DELETE FROM auth_sessions WHERE id = ?')
    .bind(await digestHex(token))
    .run();
}

export function sessionCookie(token, maxAge = SESSION_DURATION_SECONDS) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}
