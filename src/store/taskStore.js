import { create } from 'zustand';
import api from '@/lib/api';

const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: true,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api('/tasks/');
      set({ tasks: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createTask: async (taskData) => {
    try {
      await api('/tasks/', {
        method: 'POST',
        body: JSON.stringify(taskData),
      });
      get().fetchTasks();
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateTask: async (id, taskData) => {
    try {
      await api(`/tasks/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(taskData),
      });
      get().fetchTasks();
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await api(`/tasks/${id}/`, { method: 'DELETE' });
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

export default useTaskStore;