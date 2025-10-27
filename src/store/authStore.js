import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      user: null, 
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });
          if (!response.ok) { throw new Error('Неверное имя пользователя или пароль'); }
          const tokens = await response.json();
          const decodedToken = jwtDecode(tokens.access);
          set({
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
            isAuthenticated: true,
            user: { id: decodedToken.user_id, username: decodedToken.username }, 
            isLoading: false,
          });
          return { success: true };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      logout: async () => {

        const { refreshToken } = get();
        set({ isLoading: true });
        try {
          await fetch('http://127.0.0.1:8000/api/auth/logout/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          });
        } catch (error) {
          console.error("Logout API call failed, logging out on client anyway.", error);
        } finally {
            set({
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
                user: null,
            });
        }
      },
      
      register: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.username || 'Ошибка регистрации');
          }
          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;