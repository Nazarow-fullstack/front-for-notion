'use client';

import { motion } from 'framer-motion';
import { UserPlus, Trash2 } from 'lucide-react';
import useCommandStore from '@/store/commandStore';

export default function CommandItem({ command, onAddMember }) {
  const deleteCommand = useCommandStore((state) => state.deleteCommand);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm(`Удалить команду "${command.name_comand}"?`)) {
      deleteCommand(command.id);
    }
  };

  const cardVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <motion.div variants={cardVariants} className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-6 group transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white">{command.name_comand}</h3>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onAddMember(command)} className="p-2 text-neutral-400 hover:text-white"><UserPlus size={16} /></button>
          <button onClick={handleDelete} className="p-2 text-neutral-400 hover:text-red-500"><Trash2 size={16} /></button>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-neutral-400 mb-2">Участники ({command.members.length})</p>
        <div className="flex items-center space-x-2">
          {command.members.slice(0, 5).map(member => (
            <div key={member.username} className="h-8 w-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-bold border-2 border-neutral-800" title={member.username}>
              {member.username.substring(0, 2).toUpperCase()}
            </div>
          ))}
          {command.members.length > 5 && <div className="text-xs text-neutral-500">+{command.members.length - 5}</div>}
        </div>
      </div>
    </motion.div>
  );
}