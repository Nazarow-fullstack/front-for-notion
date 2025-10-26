'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { KanbanSquare, Menu, X } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import LogoutButton from '../auth/LogoutButton';

const navLinks = [
  { href: '/projects', label: 'Проекты' },
  { href: '/tasks', label: 'Задачи' },
  { href: '/commands', label: 'Команды' },
];

export default function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={isAuthenticated ? "/tasks" : "/login"} className="flex items-center space-x-2">
              <KanbanSquare className="h-7 w-7 text-white" />
              <span className="text-xl font-semibold tracking-tighter">ProjectFlow</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-2">
              {isAuthenticated && navLinks.map((link) => <NavLink key={link.href} {...link} />)}
            </nav>
            
            <div className="hidden md:flex items-center">
              {isAuthenticated ? <LogoutButton /> : <AuthButtons />}
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-neutral-300 hover:text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} isAuthenticated={isAuthenticated} />
    </>
  );
}

function NavLink({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className="relative px-3 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors">
      <span>{label}</span>
      {isActive && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
    </Link>
  );
}

function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/login" className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors">
        Войти
      </Link>
      <Link href="/register" className="relative inline-flex h-9 items-center justify-center rounded-md bg-white px-4 font-medium text-black transition-colors">
        Регистрация
      </Link>
    </div>
  );
}

function MobileMenu({ isOpen, setIsOpen, isAuthenticated }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <motion.nav 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="mt-16 bg-neutral-950 border-b border-neutral-800 p-4 space-y-2"
          >
            {isAuthenticated ? (
              <>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white">
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-neutral-800 pt-4 mt-2">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Link href="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white">Войти</Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white">Регистрация</Link>
              </div>
            )}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}