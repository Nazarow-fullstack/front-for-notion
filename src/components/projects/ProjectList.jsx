'use client';

import { motion } from 'framer-motion';
import useProjectStore from '@/store/projectStore';
import ProjectItem from './ProjectItem';
import { FolderKanban } from 'lucide-react';

export default function ProjectList({ onEdit }) {
  const projects = useProjectStore((state) => state.projects);

  if (projects.length === 0) {
    return (
      <div className="text-center text-neutral-500 mt-20 flex flex-col items-center gap-4">
        <FolderKanban size={64} />
        <h2 className="text-2xl font-bold">Проектов пока нет</h2>
        <p>Начни с создания своего первого проекта.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.07 } },
      }}
    >
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} onEdit={onEdit} />
      ))}
    </motion.div>
  );
}