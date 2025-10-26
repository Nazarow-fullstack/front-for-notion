'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, X } from 'lucide-react';
import useProjectStore from '@/store/projectStore';
import useCommandStore from '@/store/commandStore';
import AnimatedInput from '../ui/AnimatedInput';
import ShimmerButton from '../ui/ShimmerButton';
import CustomSelect from '../ui/CustomSelect';

export default function ProjectModal({ isOpen, onClose, project }) {
  const [name, setName] = useState('');
  const [selectedCommand, setSelectedCommand] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { createProject, updateProject } = useProjectStore();
  const { commands, fetchCommands } = useCommandStore();
  const isEditing = !!project;

  useEffect(() => {
    if (isOpen) {
      fetchCommands();
      if (isEditing) {
        setName(project.name);
        setSelectedCommand(project.command.id); 
      } else {
        setName('');
        setSelectedCommand('');
        setError('');
      }
    }
  }, [isOpen, project, isEditing, fetchCommands]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCommand) {
        setError("Пожалуйста, выберите команду.");
        return;
    }
    setError('');
    setIsLoading(true);

    const projectData = { name, command: parseInt(selectedCommand) };

    try {
      if (isEditing) {
        await updateProject(project.id, projectData);
      } else {
        await createProject(projectData);
      }
      onClose();
    } catch (err) {
      setError(err.message || "Не удалось сохранить проект");
    } finally {
      setIsLoading(false);
    }
  };
  
  const commandOptions = commands.map(cmd => ({ value: cmd.id, label: cmd.name_comand }));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-lg p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white"><X /></button>
            <h2 className="text-2xl font-bold text-white mb-6">{isEditing ? 'Редактировать проект' : 'Новый проект'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedInput id="name" type="text" placeholder="Название проекта" value={name} onChange={(e) => setName(e.target.value)} />
              <CustomSelect
                placeholder="Выберите команду"
                options={commandOptions}
                value={selectedCommand}
                onChange={setSelectedCommand}
              />
              {error && <p className="text-red-500 text-sm animate-pulse text-center">{error}</p>}
              <div className="pt-4">
                <ShimmerButton type="submit" disabled={isLoading}>{isLoading ? <Loader className="animate-spin-slow h-5 w-5" /> : (isEditing ? 'Сохранить' : 'Создать')}</ShimmerButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}