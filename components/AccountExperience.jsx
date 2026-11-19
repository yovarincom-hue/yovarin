'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Crown, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import TurnstileWidget from './TurnstileWidget';

const initialForm = { name: '', email: '', password: '', code: '' };
const captchaActions = {
  signin: 'auth-login',
  register: 'auth-register',
  forgot: 'auth-forgot-password',
};

const titles = {
  signin: ['Welcome back', 'Your work, beautifully in order.'],
  register: ['Create your account', 'A more considered way to work.'],
  verify: ['Verify your email', 'One last detail before you step inside.'],
  forgot: ['Recover your account', 'We’ll send a secure code to your inbox.'],
  reset: ['Choose a new password', 'A fresh start, secured in moments.'],
};

export default function AccountExperience() {
  const router = useRouter();
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState(initialForm);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function changeMode(nextMode) {
    setMode(nextMode);
    setError('');
    setMessage('');
    setTurnstileToken('');
    setCaptchaKey((value) => value + 1);
  }

  function updateField(event) {
    setForm((value) => ({ ...value, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    setBusy(true);

    const endpoints = {
      signin: '/api/auth/login',
      register: '/api/auth/register',
      verify: '/api/auth/verify-email',
      forgot: '/api/auth/forgot-password',
      reset: '/api/auth/reset-password',
    };
    const payload = {
      email: form.email,
      ...(mode === 'register' && { name: form.name }),
      ...(mode === 'signin' && { password: form.password }),
      ...(mode === 'verify' && { code: form.code }),
      ...(mode === 'reset' && { code: form.code, password: form.password }),
      ...(captchaActions[mode] && { turnstileToken }),
    };

    try {
      const response = await fetch(endpoints[mode], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong. Please try again.');

      if (mode === 'signin') {
        window.dispatchEvent(new Event('yovarin-auth-changed'));
        router.push('/');
        router.refresh();
      } else if (mode === 'register') {
        changeMode('verify');
        setMessage('Your one-time verification code is on its way.');
      } else if (mode === 'verify') {
        changeMode('signin');
        setMessage('Your email is verified. Sign in to continue.');
      } else if (mode === 'forgot') {
        changeMode('reset');
        setMessage(result.message);
      } else {
        changeMode('signin');
        setMessage('Your password has been updated. Sign in with your new password.');
      }

      if (captchaActions[mode]) {
        setTurnstileToken('');
        setCaptchaKey((value) => value + 1);
      }
    } catch (submitError) {
      setError(submitError.message);
      if (captchaActions[mode]) {
        setTurnstileToken('');
        setCaptchaKey((value) => value + 1);
      }
    } finally {
      setBusy(false);
    }
  }

  const [title, subtitle] = titles[mode];
  const needsCaptcha = Boolean(captchaActions[mode]);
  const needsPassword = mode === 'signin' || mode === 'register' || mode === 'reset';

  return (
    <main className="relative min-h-screen px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto grid min-h-[min(760px,calc(100vh-5rem))] max-w-6xl overflow-hidden rounded-[2rem] border border-gold-500/25 bg-white/80 shadow-2xl shadow-amber-950/10 backdrop-blur-2xl dark:bg-obsidian-950/80 dark:shadow-black/40 lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-obsidian-950 p-10 text-white lg:flex xl:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_15%,rgba(217,182,113,0.2),transparent_45%),radial-gradient(ellipse_at_100%_90%,rgba(16,185,129,0.12),transparent_40%)]" />
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(217,182,113,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(217,182,113,.08)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-gold-200">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-300/30 bg-gold-300/10">
                <Crown className="h-5 w-5" />
              </span>
              YOVARIN
            </Link>
          </div>
          <div className="relative max-w-md">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-300/25 bg-gold-300/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-gold-200">
              <Sparkles className="h-3.5 w-3.5" /> PRIVATE CLIENT ACCESS
            </span>
            <h1 className="font-serif text-4xl leading-[1.15] xl:text-5xl">
              Where thoughtful work finds <span className="text-gold-300">its place.</span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              A quieter, more considered space for your Yovarin relationship. Secure by design, made to feel effortless.
            </p>
            <div className="mt-9 flex items-center gap-3 text-xs text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Private access · Email verified · Protected by Turnstile
            </div>
          </div>
          <div className="relative flex items-center justify-between border-t border-white/10 pt-5 text-[10px] tracking-wide text-slate-400">
            <span>YOVARIN TECHNOLOGIES</span>
            <span>DESIGNED FOR WHAT’S NEXT</span>
          </div>
        </aside>

        <section className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-14 xl:px-20">
          <Link href="/" className="mb-10 inline-flex w-fit items-center gap-2 text-xs text-slate-500 transition hover:text-gold-700 dark:text-slate-400 dark:hover:text-gold-300">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Yovarin
          </Link>
          <div className="mb-8">
            <span className="mb-3 block text-[10px] font-semibold tracking-[0.24em] text-gold-700 dark:text-gold-300">
              {mode === 'signin' ? 'PRIVATE CLIENT PORTAL' : 'SECURE ACCOUNT'}
            </span>
            <h2 className="font-serif text-3xl text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>

          {error && <p role="alert" className="mb-5 rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">{error}</p>}
          {message && <p role="status" className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200"><Check className="mt-0.5 h-4 w-4 shrink-0" />{message}</p>}

          <form onSubmit={submit} className="space-y-4">
            {mode === 'register' && (
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                Your name
                <input name="name" value={form.name} onChange={updateField} autoComplete="name" maxLength={120} required className="account-input mt-2 px-4" placeholder="How should we address you?" />
              </label>
            )}
            {mode !== 'verify' && mode !== 'reset' && (
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                Email address
                <span className="relative mt-2 block">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-600 dark:text-gold-300" />
                  <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" maxLength={320} required className="account-input pl-11 pr-4" placeholder="you@company.com" />
                </span>
              </label>
            )}
            {(mode === 'verify' || mode === 'reset') && (
              <>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                  Email address
                  <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" maxLength={320} required className="account-input mt-2 px-4" placeholder="you@company.com" />
                </label>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                  Six-digit code
                  <input name="code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={form.code} onChange={updateField} required className="account-input mt-2 px-4 text-center font-mono tracking-[0.4em]" placeholder="000000" />
                </label>
              </>
            )}
            {needsPassword && (
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                {mode === 'reset' ? 'New password' : 'Password'}
                <span className="relative mt-2 block">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-600 dark:text-gold-300" />
                  <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={updateField} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} minLength={mode === 'signin' ? undefined : 12} maxLength={128} required className="account-input pl-11 pr-11" placeholder={mode === 'signin' ? 'Enter your password' : 'At least 12 characters'} />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:text-gold-700 dark:hover:text-gold-300" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </span>
                {mode !== 'signin' && <span className="mt-1.5 block text-[11px] text-slate-400">Use at least 12 characters.</span>}
              </label>
            )}

            {needsCaptcha && (
              <div className="overflow-hidden rounded-xl border border-gold-500/15 bg-slate-900/[0.03] px-3 pt-3 dark:bg-white/[0.03]">
                <TurnstileWidget key={captchaKey} action={captchaActions[mode]} onVerify={setTurnstileToken} />
              </div>
            )}
            <button type="submit" disabled={busy || (needsCaptcha && !turnstileToken)} className="btn-luxury-gold flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-50">
              {busy ? 'Please wait…' : (
                <>
                  {mode === 'signin' ? 'Sign in securely' : mode === 'register' ? 'Create account' : mode === 'verify' ? 'Verify email' : mode === 'forgot' ? 'Send reset code' : 'Update password'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs">
            {mode === 'signin' && (
              <>
                <button type="button" onClick={() => changeMode('forgot')} className="text-gold-700 hover:underline dark:text-gold-300">Forgot password?</button>
                <button type="button" onClick={() => changeMode('register')} className="font-medium text-slate-600 hover:text-gold-700 dark:text-slate-300 dark:hover:text-gold-300">Create an account <ArrowRight className="ml-1 inline h-3 w-3" /></button>
              </>
            )}
            {mode === 'register' && <button type="button" onClick={() => changeMode('signin')} className="text-gold-700 hover:underline dark:text-gold-300">Already have an account? Sign in</button>}
            {(mode === 'verify' || mode === 'forgot' || mode === 'reset') && <button type="button" onClick={() => changeMode(mode === 'reset' ? 'forgot' : 'signin')} className="text-gold-700 hover:underline dark:text-gold-300">{mode === 'reset' ? 'Request another code' : 'Back to sign in'}</button>}
          </div>

          <p className="mt-10 flex items-center gap-2 border-t border-gold-500/15 pt-5 text-[11px] leading-5 text-slate-400">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            Your account is protected with secure email verification and encrypted credentials.
          </p>
        </section>
      </div>
    </main>
  );
}
