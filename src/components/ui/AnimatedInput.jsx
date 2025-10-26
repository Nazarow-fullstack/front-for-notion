'use client';

import { motion } from 'framer-motion';

export default function AnimatedInput({ id, type, placeholder, value, onChange, icon: Icon }) {
  return (
    <div className="relative w-full">
      {Icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"><Icon size={20} /></span>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        autoComplete={type === 'password' ? 'current-password' : id}
        className={`w-full bg-neutral-900/50 text-white placeholder-neutral-500 border-b-2 border-neutral-700 focus:border-white transition-colors duration-300 outline-none py-3 ${Icon ? 'pl-10 pr-3' : 'px-3'}`}
      />
    </div>
  );
}