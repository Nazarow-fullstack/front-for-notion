'use client';

import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import useProjectStore from '@/store/projectStore';

export default function ProjectItem({ project, onEdit }) {
  const deleteProject = useProjectStore((state) => state.deleteProject);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm(`Вы уверены, что хотите удалить проект "${project.name}"?`)) {
      deleteProject(project.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(project);
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-6 group transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white">{project.name}</h3>
          <p className="text-sm text-neutral-400 mt-1">Команда: {project.command}</p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleEdit} className="p-2 text-neutral-400 hover:text-white"><Pencil size={16} /></button>
          <button onClick={handleDelete} className="p-2 text-neutral-400 hover:text-red-500"><Trash2 size={16} /></button>
        </div>
      </div>
      <p className="text-xs text-neutral-500 mt-6">Создан: {new Date(project.created_at).toLocaleDateString()}</p>
    </motion.div>
  );
}