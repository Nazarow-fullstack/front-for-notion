import { create } from 'zustand';
import api from '@/lib/api';

const useCommandStore = create((set, get) => ({
  commands: [],
  users: [],
  isLoading: true,
  error: null,

  fetchCommands: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api('/commands/');
      set({ commands: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchUsers: async () => {
    try {
      const data = await api('/users/');
      set({ users: data });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  },

  createCommand: async (commandData) => {
    try {
      await api('/commands/', {
        method: 'POST',
        body: JSON.stringify(commandData),
      });
      get().fetchCommands();
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  addMember: async (commandId, userId) => {
    try {
      await api('/commands/add-member/', {
        method: 'POST',
        body: JSON.stringify({ command_id: commandId, user_id: userId }),
      });
      get().fetchCommands();
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  
  deleteCommand: async (id) => {
    try {
      await api(`/commands/${id}/`, { method: 'DELETE' });
      set((state) => ({
        commands: state.commands.filter((c) => c.id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

export default useCommandStore;