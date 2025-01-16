import apiClient from './apiClient';

export const login = async ({ email, password }: { email: string; password: string }) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data; // Retourne le token
};

export const register = async ({ email, username, password }: { email: string; username: string; password: string }) => {
  const response = await apiClient.post('/auth/register', {
    email,
    username,
    password,
  });
  return response.data;
};
