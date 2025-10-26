import useAuthStore from '@/store/authStore';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = async (url, options = {}) => {
  const { accessToken } = useAuthStore.getState();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Что-то пошло не так');
  }
  
  if (response.status === 204) {
      return null;
  }

  return response.json();
};

export default api;