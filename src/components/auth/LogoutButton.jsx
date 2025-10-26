'use client';

import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-200"
    >
      <LogOut size={18} />
      <span className="font-medium">Выйти</span>
    </button>
  );
}