'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, X } from 'lucide-react';
import useCommandStore from '@/store/commandStore';
import AnimatedInput from '../ui/AnimatedInput';
import ShimmerButton from '../ui/ShimmerButton';

export default function CommandModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const createCommand = useCommandStore((state) => state.createCommand);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setIsLoading(true);
    try {
      await createCommand({ name_comand: name });
      onClose();
      setName('');
    } catch (err) {
      setError(err.message || "Ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-lg p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white"><X /></button>
            <h2 className="text-2xl font-bold text-white mb-6">Новая команда</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedInput id="name" type="text" placeholder="Название команды" value={name} onChange={(e) => setName(e.target.value)} />
              {error && <p className="text-red-500 text-sm animate-pulse text-center">{error}</p>}
              <div className="pt-4"><ShimmerButton type="submit" disabled={isLoading}>{isLoading ? <Loader className="animate-spin-slow h-5 w-5" /> : 'Создать'}</ShimmerButton></div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}