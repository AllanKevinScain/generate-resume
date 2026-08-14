import { Button, Input } from '@/components';
import { useAuth } from '@/hooks';
import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setError(await login(email.trim(), password));
    setIsSubmitting(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--color-bg) px-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-text)_10%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-text)_10%,transparent)_1px,transparent_1px)] bg-size-[28px_28px] opacity-20" />
      <div className="absolute h-125 w-125 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className={twMerge(
          'relative w-full max-w-md rounded-2xl p-8 shadow-xl backdrop-blur-md',
          'border border-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]',
          'bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-bg)_95%,transparent),color-mix(in_srgb,var(--color-bg)_85%,transparent))]',
        )}
      >
        <h1 className="text-center text-2xl font-bold text-(--color-text)">Entrar na sua conta</h1>
        <p className="mt-2 text-center text-sm text-(--color-text) opacity-70">
          Use seu e-mail e senha do Supabase para continuar.
        </p>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className="relative">
            <Input
              label="Senha"
              type={isPasswordVisible ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              classNameInput="pr-12"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 bottom-3 text-(--color-text) opacity-70 transition-opacity hover:opacity-100"
              aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
              aria-pressed={isPasswordVisible}
              onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
            >
              {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
          <Button.solid type="submit" disabled={isSubmitting} className="justify-center">
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button.solid>
        </form>
      </motion.div>
    </main>
  );
}
