import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function protectPublicSubmission(request, body, route) {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.API_LIMITER) {
    throw new Error('The Cloudflare API_LIMITER binding is not configured.');
  }

  const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';
  const rateLimit = await env.API_LIMITER.limit({
    key: `${route}:${clientIp}`,
  });

  if (!rateLimit.success) {
    return {
      status: 429,
      error: 'Too many requests. Please try again later.',
    };
  }

  if (!env.TURNSTILE_SECRET_KEY) {
    console.error('TURNSTILE_SECRET_KEY is not configured.');
    return {
      status: 503,
      error: 'Form protection is temporarily unavailable. Please try again later.',
    };
  }

  if (typeof body?.turnstileToken !== 'string' || !body.turnstileToken) {
    return {
      status: 400,
      error: 'Please complete the security verification.',
    };
  }

  const verificationResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: body.turnstileToken,
        ...(clientIp !== 'unknown' && { remoteip: clientIp }),
      }),
    }
  );

  if (!verificationResponse.ok) {
    throw new Error(`Turnstile verification failed (${verificationResponse.status}).`);
  }

  const verification = await verificationResponse.json();
  const requestHostname = new URL(request.url).hostname;
  if (
    !verification.success ||
    verification.action !== route ||
    verification.hostname !== requestHostname
  ) {
    return {
      status: 400,
      error: 'Security verification failed. Please try again.',
    };
  }

  return null;
}
