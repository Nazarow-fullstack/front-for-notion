'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserPlus, Loader, User, Lock, CheckCircle } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import Link from 'next/link';
import AnimatedInput from '../ui/AnimatedInput';
import ShimmerButton from '../ui/ShimmerButton';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (success) return;

    const result = await register(username, password);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md space-y-8 bg-black/50 backdrop-blur-xl border border-neutral-800 p-8 md:p-12 rounded-2xl shadow-2xl shadow-black/50"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-100 tracking-wider">Создать аккаунт</h1>
        <p className="text-neutral-400 mt-2">Присоединяйся к потоку.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatedInput id="username" type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} icon={User} />
        <AnimatedInput id="password" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} icon={Lock} />
        
        {error && <p className="text-red-500 text-sm text-center animate-pulse">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center flex items-center justify-center gap-2"><CheckCircle size={18}/>Успешно. Перенаправление...</p>}

        <div className="pt-4">
          <ShimmerButton type="submit" disabled={isLoading || success}>
            {isLoading ? (
              <>
                <Loader className="animate-spin-slow h-5 w-5" />
                <span>Создание...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle size={18} />
                <span>Готово</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Зарегистрироваться</span>
              </>
            )}
          </ShimmerButton>
        </div>
      </form>
      <p className="text-center text-sm text-neutral-500">
        Уже в системе?{' '}
        <Link href="/login" className="font-medium text-neutral-200 hover:text-white underline-offset-4 hover:underline">
          Войти.
        </Link>
      </p>
    </motion.div>
  );
}