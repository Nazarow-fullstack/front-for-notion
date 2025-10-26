'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, X } from 'lucide-react';
import useTaskStore from '@/store/taskStore';
import useCommandStore from '@/store/commandStore';
import AnimatedInput from '../ui/AnimatedInput';
import ShimmerButton from '../ui/ShimmerButton';
import CustomSelect from '../ui/CustomSelect';

const statusOptions = [
  { value: 'new', label: 'Новая' },
  { value: 'in_progress', label: 'В процессе' },
  { value: 'done', label: 'Готова' },
  { value: 'overdue', label: 'Просрочена' },
];

export default function TaskModal({ isOpen, onClose, task }) {
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '', status: 'new', command: '', assigned_to: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { createTask, updateTask } = useTaskStore();
  const { commands, fetchCommands } = useCommandStore();
  const { users, fetchUsers } = useCommandStore();
  const isEditing = !!task;

  useEffect(() => {
    if (isOpen) {
      fetchCommands();
      fetchUsers();
      if (isEditing) {
        setFormData({
          title: task.title,
          description: task.description || '',
          deadline: new Date(task.deadline).toISOString().slice(0, 16),
          status: task.status,
          command: task.command.id,
          assigned_to: task.assigned_to?.id || '',
        });
      } else {
        setFormData({ title: '', description: '', deadline: '', status: 'new', command: '', assigned_to: '' });
      }
      setError('');
    }
  }, [isOpen, task, isEditing, fetchCommands, fetchUsers]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleSelectChange = (id, value) => setFormData({ ...formData, [id]: value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setIsLoading(true);
    
    const dataToSend = { ...formData, deadline: new Date(formData.deadline).toISOString() };

    try {
      if (isEditing) {
        await updateTask(task.id, dataToSend);
      } else {
        await createTask(dataToSend);
      }
      onClose();
    } catch (err) {
      setError(err.message || "Ошибка");
    } finally {
      setIsLoading(false);
    }
  };
  
  const commandOptions = commands.map(cmd => ({ value: cmd.id, label: cmd.name_comand }));
  const userOptions = users.map(user => ({ value: user.id, label: user.username }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-lg p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white"><X /></button>
            <h2 className="text-2xl font-bold text-white mb-6">{isEditing ? 'Редактировать задачу' : 'Новая задача'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatedInput id="title" type="text" placeholder="Название задачи" value={formData.title} onChange={handleChange} />
              <textarea id="description" placeholder="Описание" value={formData.description} onChange={handleChange} className="w-full h-24 bg-neutral-900/50 text-white placeholder-neutral-500 border-b-2 border-neutral-700 focus:border-white transition-colors duration-300 outline-none p-3 resize-none"/>
              <input id="deadline" type="datetime-local" value={formData.deadline} onChange={handleChange} className="w-full bg-neutral-900/50 text-white border-b-2 border-neutral-700 focus:border-white transition-colors duration-300 outline-none py-3 px-3" />
              <CustomSelect placeholder="Статус" options={statusOptions} value={formData.status} onChange={(val) => handleSelectChange('status', val)} />
              <CustomSelect placeholder="Команда" options={commandOptions} value={formData.command} onChange={(val) => handleSelectChange('command', val)} />
              <CustomSelect placeholder="Назначить" options={userOptions} value={formData.assigned_to} onChange={(val) => handleSelectChange('assigned_to', val)} />
              {error && <p className="text-red-500 text-sm animate-pulse text-center">{error}</p>}
              <div className="pt-4"><ShimmerButton type="submit" disabled={isLoading}>{isLoading ? <Loader className="animate-spin-slow h-5 w-5" /> : (isEditing ? 'Сохранить' : 'Создать')}</ShimmerButton></div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}