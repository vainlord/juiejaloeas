import { apiClient } from '../api-client';
import type { User, LoginRequest, LoginResponse, RegisterRequest } from './types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/login', credentials);
    apiClient.setToken(response.token);
    return response;
  },

  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/register', data);
    apiClient.setToken(response.token);
    return response;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/logout');
    apiClient.setToken(null);
  },

  me: async (): Promise<User> => {
    return apiClient.get<User>('/me');
  },
};
