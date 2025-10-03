import { apiClient } from '../api-client';
import type { Order, CreateOrderRequest } from './types';

export const ordersApi = {
  getAll: async (params?: {
    status?: string;
    payment_status?: string;
    type?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<{ data: Order[] }> => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.set('status', params.status);
    if (params?.payment_status) queryParams.set('payment_status', params.payment_status);
    if (params?.type) queryParams.set('type', params.type);
    if (params?.start_date) queryParams.set('start_date', params.start_date);
    if (params?.end_date) queryParams.set('end_date', params.end_date);
    
    const query = queryParams.toString();
    return apiClient.get<{ data: Order[] }>(`/orders${query ? `?${query}` : ''}`);
  },

  getById: async (id: number): Promise<Order> => {
    return apiClient.get<Order>(`/orders/${id}`);
  },

  create: async (data: CreateOrderRequest): Promise<Order> => {
    return apiClient.post<Order>('/orders', data);
  },

  update: async (id: number, data: Partial<Order>): Promise<Order> => {
    return apiClient.put<Order>(`/orders/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete(`/orders/${id}`);
  },
};
