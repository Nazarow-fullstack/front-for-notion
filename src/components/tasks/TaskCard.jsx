'use client';

import { motion } from 'framer-motion';
import { Pencil, Trash2, Clock, User, Folder, Briefcase } from 'lucide-react';
import useTaskStore from '@/store/taskStore';

const statusColors = { new: 'border-blue-500', in_progress: 'border-yellow-500', done: 'border-green-500', overdue: 'border-red-500' };

export default function TaskCard({ task, onEdit, onViewDetails }) {
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm(`Удалить задачу "${task.title}"?`)) { deleteTask(task.id) }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  const cardVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <motion.div variants={cardVariants} onClick={() => onViewDetails(task)} className={`bg-neutral-950/50 border border-neutral-800 rounded-lg p-4 group transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900 cursor-pointer border-l-4 ${statusColors[task.status]}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-md font-bold text-white pr-4">{task.title}</h3>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button onClick={handleEdit} className="p-1 text-neutral-400 hover:text-white"><Pencil size={14} /></button>
          <button onClick={handleDelete} className="p-1 text-neutral-400 hover:text-red-500"><Trash2 size={14} /></button>
        </div>
      </div>
      <div className="mt-4 text-xs text-neutral-500 space-y-2">
        <div className="flex items-center gap-2"><Clock size={12}/> <span>{new Date(task.deadline).toLocaleDateString()}</span></div>
        <div className="flex items-center gap-2"><Briefcase size={12}/> <span>{task.project?.name}</span></div>
        <div className="flex items-center gap-2"><Folder size={12}/> <span>{task.command?.name_comand}</span></div>
        <div className="flex items-center gap-2"><User size={12}/> <span>{task.assigned_to || 'Не назначен'}</span></div>
      </div>
    </motion.div>
  );
}