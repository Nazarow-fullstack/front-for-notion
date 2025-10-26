import { create } from 'zustand';
import api from '@/lib/api';

const useCommentStore = create((set, get) => ({
  comments: [],
  isLoading: false,
  error: null,

  fetchComments: async (taskId) => {
    if (!taskId) return;
    set({ isLoading: true, error: null });
    try {
      const data = await api(`/comments/?task_id=${taskId}`);
      set({ comments: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  createComment: async (commentData) => {
    try {
      await api('/comments/', {
        method: 'POST',
        body: JSON.stringify(commentData),
      });
      get().fetchComments(commentData.task);
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteComment: async (commentId, taskId) => {
    try {
      await api(`/comments/${commentId}/`, { method: 'DELETE' });
      get().fetchComments(taskId);
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

export default useCommentStore;