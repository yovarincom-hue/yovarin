import { getCloudflareContext } from '@opennextjs/cloudflare';

function decodeBase64Url(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function decodeJsonSegment(value) {
  return JSON.parse(new TextDecoder().decode(decodeBase64Url(value)));
}

export async function isAuthorizedAdmin(request) {
  const { env } = await getCloudflareContext({ async: true });
  const adminEmail = env.ADMIN_EMAIL?.trim().toLowerCase();
  const audience = env.CF_ACCESS_AUD;
  const teamDomain = env.CF_ACCESS_TEAM_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const token = request.headers.get('Cf-Access-Jwt-Assertion');

  if (!adminEmail || !audience || !teamDomain || !token) {
    return false;
  }

  const segments = token.split('.');
  if (segments.length !== 3) return false;

  let header;
  let claims;
  let signature;
  try {
    header = decodeJsonSegment(segments[0]);
    claims = decodeJsonSegment(segments[1]);
    signature = decodeBase64Url(segments[2]);
  } catch {
    return false;
  }

  if (header.alg !== 'RS256' || typeof header.kid !== 'string') return false;

  const issuer = `https://${teamDomain}`;
  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  const now = Math.floor(Date.now() / 1000);
  if (
    claims.iss !== issuer ||
    !audiences.includes(audience) ||
    typeof claims.exp !== 'number' ||
    claims.exp <= now ||
    (typeof claims.nbf === 'number' && claims.nbf > now) ||
    typeof claims.email !== 'string' ||
    claims.email.trim().toLowerCase() !== adminEmail
  ) {
    return false;
  }

  const keyResponse = await fetch(`${issuer}/cdn-cgi/access/certs`);
  if (!keyResponse.ok) {
    throw new Error(`Could not load Cloudflare Access signing keys (${keyResponse.status}).`);
  }

  const keySet = await keyResponse.json();
  const signingKey = keySet.keys?.find((key) => key.kid === header.kid);
  if (!signingKey) return false;

  const publicKey = await crypto.subtle.importKey(
    'jwk',
    signingKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );

  try {
    return await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      publicKey,
      signature,
      new TextEncoder().encode(`${segments[0]}.${segments[1]}`)
    );
  } catch {
    return false;
  }
}
