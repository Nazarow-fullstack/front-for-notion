'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertTriangle, Users } from 'lucide-react';
import PrivateRoute from '@/components/shared/PrivateRoute';
import useCommandStore from '@/store/commandStore';
import ShimmerButton from '@/components/ui/ShimmerButton';
import CommandList from '@/components/commands/CommandList';
import CommandModal from '@/components/commands/CommandModal';
import AddMemberModal from '@/components/commands/AddMemberModal';
import CommandsSkeleton from '@/components/commands/CommandsSkeleton';

export default function CommandsPage() {
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);

  const { isLoading, error, fetchCommands } = useCommandStore();

  useEffect(() => {
    fetchCommands();
  }, [fetchCommands]);

  const openAddMemberModal = (command) => {
    setSelectedCommand(command);
    setIsAddMemberModalOpen(true);
  };
  
  const closeModals = () => {
    setIsCommandModalOpen(false);
    setIsAddMemberModalOpen(false);
    setSelectedCommand(null);
  }

  const renderContent = () => {
    if (isLoading) return <CommandsSkeleton />;
    if (error) return (
      <div className="text-center text-red-500 flex flex-col items-center gap-4 mt-20">
        <AlertTriangle size={48} /><p>Ошибка: {error}</p>
      </div>
    );
    return <CommandList onAddMember={openAddMemberModal} />;
  }

  return (
    <PrivateRoute>
      <div className="h-full">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold tracking-tighter text-white flex items-center gap-3"><Users/>Команды</h1>
            <div className="w-48">
               <ShimmerButton onClick={() => setIsCommandModalOpen(true)} type="button">
                  <Plus size={18} />Создать команду
               </ShimmerButton>
            </div>
          </div>
          {renderContent()}
        </motion.div>
        <CommandModal isOpen={isCommandModalOpen} onClose={closeModals} />
        <AddMemberModal isOpen={isAddMemberModalOpen} onClose={closeModals} command={selectedCommand} />
      </div>
    </PrivateRoute>
  );
}