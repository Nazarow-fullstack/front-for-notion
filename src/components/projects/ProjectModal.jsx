'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, X } from 'lucide-react';
import Select from 'react-select';
import useProjectStore from '@/store/projectStore';
import useCommandStore from '@/store/commandStore';
import AnimatedInput from '../ui/AnimatedInput';
import ShimmerButton from '../ui/ShimmerButton';

const selectStyles = {
  control: (styles) => ({ ...styles, backgroundColor: '#171717', borderColor: '#404040', '&:hover': { borderColor: '#525252' }, boxShadow: 'none' }),
  menu: (styles) => ({ ...styles, backgroundColor: '#171717' }),
  option: (styles, { isFocused, isSelected }) => ({ ...styles, backgroundColor: isSelected ? '#262626' : isFocused ? '#2d2d2d' : '#171717', color: '#a3a3a3', '&:active': { backgroundColor: '#404040' } }),
  multiValue: (styles) => ({ ...styles, backgroundColor: '#262626' }),
  multiValueLabel: (styles) => ({ ...styles, color: '#e5e5e5' }),
  multiValueRemove: (styles) => ({ ...styles, color: '#a3a3a3', '&:hover': { backgroundColor: '#dc2626', color: 'white' } }),
  input: (styles) => ({ ...styles, color: '#e5e5e5' }),
  placeholder: (styles) => ({...styles, color: '#737373'})
};

export default function ProjectModal({ isOpen, onClose, project }) {
  const [name, setName] = useState('');
  const [selectedCommands, setSelectedCommands] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { createProject, updateProject } = useProjectStore();
  const { commands, fetchCommands } = useCommandStore();
  
  const commandOptions = useMemo(() => 
    commands.map(cmd => ({ value: cmd.id, label: cmd.name_comand })),
    [commands]
  );

  // --- FIX START ---
  // HOOK 1: Resets the form state ONLY when the modal opens or the project changes.
  useEffect(() => {
    if (isOpen) {
      fetchCommands();
      if (project) { // Edit mode
        setName(project.name);
        // We clear selectedCommands here to prevent showing old data while new data loads
        setSelectedCommands([]); 
      } else { // Create mode
        setName('');
        setSelectedCommands([]);
        setError('');
      }
    }
  }, [isOpen, project, fetchCommands]); // Note: commandOptions is NOT here.

  // HOOK 2: Populates the multi-select ONLY when the necessary data is ready.
  useEffect(() => {
    if (isOpen && project && commandOptions.length > 0) {
      const projectCommandNames = project.commands || [];
      const initialSelected = commandOptions.filter(option =>
        projectCommandNames.includes(option.label)
      );
      setSelectedCommands(initialSelected);
    }
  }, [commandOptions, isOpen, project]); // This runs separately after commands are loaded.
  // --- FIX END ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCommands.length === 0) {
        setError("Пожалуйста, выберите хотя бы одну команду.");
        return;
    }
    setError('');
    setIsLoading(true);

    const projectData = {
        name,
        commands: selectedCommands.map(cmd => cmd.value)
    };

    try {
      if (project) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-lg p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white"><X /></button>
            <h2 className="text-2xl font-bold text-white mb-6">{project ? 'Редактировать проект' : 'Новый проект'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedInput id="name" type="text" placeholder="Название проекта" value={name} onChange={(e) => setName(e.target.value)} />
              <Select
                isMulti
                instanceId="command-select"
                placeholder="Выберите команды..."
                options={commandOptions}
                value={selectedCommands}
                onChange={setSelectedCommands}
                styles={selectStyles}
                isLoading={commands.length === 0 && commandOptions.length === 0}
              />
              {error && <p className="text-red-500 text-sm animate-pulse text-center">{error}</p>}
              <div className="pt-4">
                <ShimmerButton type="submit" disabled={isLoading}>{isLoading ? <Loader className="animate-spin-slow h-5 w-5" /> : (project ? 'Сохранить' : 'Создать')}</ShimmerButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}