'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertTriangle, ListTodo } from 'lucide-react';
import PrivateRoute from '@/components/shared/PrivateRoute';
import useTaskStore from '@/store/taskStore';
import ShimmerButton from '@/components/ui/ShimmerButton';
import TaskBoard from '@/components/tasks/TaskBoard';
import TaskModal from '@/components/tasks/TaskModal';
import TaskDetailModal from '@/components/tasks/TaskDetailModal';
import TasksSkeleton from '@/components/tasks/TasksSkeleton';

export default function TasksPage() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { isLoading, error, fetchTasks } = useTaskStore();

  useEffect(() => { fetchTasks() }, [fetchTasks]);

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };
  
  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const openDetailModal = (task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const closeModals = () => {
    setIsTaskModalOpen(false);
    setIsDetailModalOpen(false);
  }

  const renderContent = () => {
    if (isLoading) return <TasksSkeleton />;
    if (error) return <div className="text-center text-red-500 flex flex-col items-center gap-4 mt-20"><AlertTriangle size={48} /><p>Ошибка: {error}</p></div>;
    return <TaskBoard onEdit={openEditModal} onViewDetails={openDetailModal} />;
  }

  return (
    <PrivateRoute>
      <div className="h-full">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold tracking-tighter text-white flex items-center gap-3"><ListTodo/>Задачи</h1>
            <div className="w-48">
               <ShimmerButton onClick={openCreateModal} type="button"><Plus size={18} />Создать задачу</ShimmerButton>
            </div>
          </div>
          {renderContent()}
        </motion.div>
        <TaskModal isOpen={isTaskModalOpen} onClose={closeModals} task={selectedTask} />
        <TaskDetailModal isOpen={isDetailModalOpen} onClose={closeModals} task={selectedTask} />
      </div>
    </PrivateRoute>
  );
}