import { create } from 'zustand';
import api from '@/lib/api';

const useProjectStore = create((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api('/prijects/');
      set({ projects: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createProject: async (projectData) => {
    try {
      await api('/prijects/', {
        method: 'POST',
        body: JSON.stringify(projectData),
      });
      get().fetchProjects();
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateProject: async (id, projectData) => {
    try {
      await api(`/prijects/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
      });
      get().fetchProjects();
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      await api(`/prijects/${id}/`, {
        method: 'DELETE',
      });
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

export default useProjectStore;