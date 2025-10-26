'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertTriangle } from 'lucide-react';
import PrivateRoute from '@/components/shared/PrivateRoute';
import useProjectStore from '@/store/projectStore';
import ShimmerButton from '@/components/ui/ShimmerButton';
import ProjectList from '@/components/projects/ProjectList';
import ProjectModal from '@/components/projects/ProjectModal';
import ProjectsSkeleton from '@/components/projects/ProjectsSkeleton';

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const { isLoading, error, fetchProjects } = useProjectStore((state) => state);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openCreateModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };
  
  const openEditModal = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const renderContent = () => {
    if (isLoading) return <ProjectsSkeleton />;
    if (error) return (
      <div className="text-center text-red-500 flex flex-col items-center gap-4 mt-20">
        <AlertTriangle size={48} />
        <p>Ошибка загрузки проектов: {error}</p>
      </div>
    );
    return <ProjectList onEdit={openEditModal} />;
  }

  return (
    <PrivateRoute>
      <div className="h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold tracking-tighter text-white">Проекты</h1>
            <div className="w-48">
               <ShimmerButton onClick={openCreateModal} type="button">
                  <Plus size={18} />
                  Создать проект
               </ShimmerButton>
            </div>
          </div>
          
          {renderContent()}

        </motion.div>
        <ProjectModal isOpen={isModalOpen} onClose={closeModal} project={editingProject} />
      </div>
    </PrivateRoute>
  );
}