'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, Folder, MessageSquare } from 'lucide-react';
import useCommentStore from '@/store/commentStore';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';

export default function TaskDetailModal({ isOpen, onClose, task }) {
  const { fetchComments } = useCommentStore();
  
  useEffect(() => {
    if (isOpen && task) { fetchComments(task.id) }
  }, [isOpen, task, fetchComments]);

  return (
    <AnimatePresence>
      {isOpen && task && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-2xl h-[80vh] bg-neutral-950 border border-neutral-800 rounded-lg p-8 relative flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white"><X /></button>
            <h2 className="text-2xl font-bold text-white mb-2">{task.title}</h2>
            <div className="flex items-center gap-6 text-sm text-neutral-400 mb-4 border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2"><Folder size={14}/><span>{task.command?.name_comand}</span></div>
              <div className="flex items-center gap-2"><User size={14}/><span>{task.assigned_to || 'Не назначен'}</span></div>
              <div className="flex items-center gap-2"><Clock size={14}/><span>{new Date(task.deadline).toLocaleString()}</span></div>
            </div>
            <p className="text-neutral-300 mb-6 flex-shrink-0">{task.description}</p>
            <div className="flex-grow overflow-y-auto pr-2">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><MessageSquare size={18}/>Комментарии</h3>
              <CommentList />
            </div>
            <div className="mt-4 flex-shrink-0"><CommentForm taskId={task.id} /></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}