'use client';
import { motion } from 'framer-motion';
import useCommandStore from '@/store/commandStore';
import CommandItem from './CommandItem';
import { Users } from 'lucide-react';
export default function CommandList({ onAddMember }) {
const commands = useCommandStore((state) => state.commands);
if (commands.length === 0) {
return (
<div className="text-center text-neutral-500 mt-20 flex flex-col items-center gap-4">
<Users size={64} />
<h2 className="text-2xl font-bold">Команд пока нет</h2>
<p>Создай свою первую команду, чтобы начать.</p>
</div>
);
}
return (
<motion.div
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
initial="hidden" animate="visible"
variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
>
{commands.map((command) => (
<CommandItem key={command.id} command={command} onAddMember={onAddMember} />
))}
</motion.div>
);
}