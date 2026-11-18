'use client';

import { useEffect, useRef } from 'react';

let turnstileScriptPromise;

function loadTurnstile() {
  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  if (!turnstileScriptPromise) {
    turnstileScriptPromise = new Promise((resolve, reject) => {
      let script = document.getElementById('cloudflare-turnstile-script');

      if (!script) {
        script = document.createElement('script');
        script.id = 'cloudflare-turnstile-script';
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }

      script.addEventListener('load', () => resolve(window.turnstile), { once: true });
      script.addEventListener(
        'error',
        () => reject(new Error('Could not load Cloudflare Turnstile.')),
        { once: true }
      );
    });
  }

  return turnstileScriptPromise;
}

export default function TurnstileWidget({ action, onVerify }) {
  const containerRef = useRef(null);
  const callbackRef = useRef(onVerify);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    callbackRef.current = onVerify;
  }, [onVerify]);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return undefined;

    let active = true;
    let widgetId;

    loadTurnstile()
      .then((turnstile) => {
        if (!active || !turnstile || !containerRef.current) return;
        widgetId = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          callback: (token) => callbackRef.current(token),
          'expired-callback': () => callbackRef.current(''),
          'error-callback': () => callbackRef.current(''),
        });
      })
      .catch((error) => {
        console.error('Turnstile could not be initialized:', error);
        callbackRef.current('');
      });

    return () => {
      active = false;
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [action, siteKey]);

  if (!siteKey) {
    return (
      <p className="text-xs text-amber-400" role="status">
        Security verification is not configured. Please try again later.
      </p>
    );
  }

  return <div ref={containerRef} className="min-h-[65px]" />;
}
