'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import useTaskStore from '@/store/taskStore';
import TaskCard from './TaskCard';
import { FileWarning } from 'lucide-react';

const columns = [
  { id: 'new', title: 'Новые' },
  { id: 'in_progress', title: 'В процессе' },
  { id: 'done', title: 'Готовы' },
  { id: 'overdue', title: 'Просрочены' },
];

export default function TaskBoard({ onEdit, onViewDetails }) {
  const tasks = useTaskStore((state) => state.tasks);

  const groupedTasks = useMemo(() => {
    const groups = { new: [], in_progress: [], done: [], overdue: [] };
    tasks.forEach(task => { if (groups[task.status]) { groups[task.status].push(task) } });
    return groups;
  }, [tasks]);

  if (tasks.length === 0) {
    return (
      <div className="text-center text-neutral-500 mt-20 flex flex-col items-center gap-4">
        <FileWarning size={64} /><h2 className="text-2xl font-bold">Задач пока нет</h2><p>Создай свою первую задачу.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map(column => (
        <div key={column.id}>
          <h2 className="text-lg font-semibold text-neutral-300 mb-4 px-1">{column.title} ({groupedTasks[column.id].length})</h2>
          <motion.div className="space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
            {groupedTasks[column.id].map(task => <TaskCard key={task.id} task={task} onEdit={onEdit} onViewDetails={onViewDetails} />)}
          </motion.div>
        </div>
      ))}
    </div>
  );
}