'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, X } from 'lucide-react';
import useCommandStore from '@/store/commandStore';
import ShimmerButton from '../ui/ShimmerButton';
import CustomSelect from '../ui/CustomSelect';

export default function AddMemberModal({ isOpen, onClose, command }) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { users, fetchUsers, addMember } = useCommandStore();

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
      setSelectedUserId('');
      setError('');
    }
  }, [isOpen, fetchUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUserId) { setError("Выберите участника."); return; }
    setError(''); setIsLoading(true);
    try {
      await addMember(command.id, selectedUserId);
      onClose();
    } catch (err) {
      setError(err.message || "Ошибка добавления");
    } finally {
      setIsLoading(false);
    }
  };
  
  const availableUsers = command ? users.filter(user => !command.members.some(member => member.username === user.username)) : [];
  const userOptions = availableUsers.map(user => ({ value: user.id, label: user.username }));

  return (
    <AnimatePresence>
      {isOpen && command && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-lg p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white"><X /></button>
            <h2 className="text-2xl font-bold text-white mb-2">Добавить в "{command.name_comand}"</h2>
            <p className="text-neutral-400 mb-6">Выберите пользователя для добавления в команду.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <CustomSelect
                placeholder="Выберите пользователя"
                options={userOptions}
                value={selectedUserId}
                onChange={setSelectedUserId}
              />
              {error && <p className="text-red-500 text-sm animate-pulse text-center">{error}</p>}
              <div className="pt-4"><ShimmerButton type="submit" disabled={isLoading}>{isLoading ? <Loader className="animate-spin-slow h-5 w-5" /> : 'Добавить'}</ShimmerButton></div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}