import { apiClient } from '../api-client';
import type { Table } from './types';

export const tablesApi = {
  getAll: async (params?: {
    status?: string;
    floor?: string;
  }): Promise<Table[]> => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.set('status', params.status);
    if (params?.floor) queryParams.set('floor', params.floor);
    
    const query = queryParams.toString();
    return apiClient.get<Table[]>(`/tables${query ? `?${query}` : ''}`);
  },

  getById: async (id: number): Promise<Table> => {
    return apiClient.get<Table>(`/tables/${id}`);
  },

  update: async (id: number, data: Partial<Table>): Promise<Table> => {
    return apiClient.put<Table>(`/tables/${id}`, data);
  },
};
