import { Button, Input } from '@/components';
import { useAuth } from '@/hooks';
import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function LoginPage() {
  const { login, loginWithGitHub } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const error = await login(email.trim(), password);
    if (error) toast.error(error);
    else toast.success('Login realizado com sucesso.');
    setIsSubmitting(false);
  }

  async function handleGitHubLogin() {
    setIsSubmitting(true);
    const error = await loginWithGitHub();
    if (error) toast.error(error);
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
          Entre com o GitHub ou use suas credenciais do Supabase.
        </p>

        <Button.outline
          type="button"
          disabled={isSubmitting}
          className="mt-8 w-full justify-center"
          onClick={() => void handleGitHubLogin()}
        >
          <FaGithub aria-hidden="true" size={20} />
          Entrar com GitHub
        </Button.outline>

        <div className="my-6 flex items-center gap-3 text-xs opacity-60">
          <span className="h-px flex-1 bg-(--color-border)" />
          <span>ou entre com e-mail</span>
          <span className="h-px flex-1 bg-(--color-border)" />
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          <Button.solid type="submit" disabled={isSubmitting} className="justify-center">
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button.solid>
        </form>
      </motion.div>
    </main>
  );
}
