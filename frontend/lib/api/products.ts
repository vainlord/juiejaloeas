import { apiClient } from '../api-client';
import type { Product, Category } from './types';

export const productsApi = {
  getAll: async (params?: {
    category_id?: number;
    search?: string;
    is_featured?: boolean;
  }): Promise<Product[]> => {
    const queryParams = new URLSearchParams();
    if (params?.category_id) queryParams.set('category_id', params.category_id.toString());
    if (params?.search) queryParams.set('search', params.search);
    if (params?.is_featured !== undefined) queryParams.set('is_featured', params.is_featured.toString());
    
    const query = queryParams.toString();
    return apiClient.get<Product[]>(`/products${query ? `?${query}` : ''}`);
  },

  getById: async (id: number): Promise<Product> => {
    return apiClient.get<Product>(`/products/${id}`);
  },

  create: async (data: Partial<Product>): Promise<Product> => {
    return apiClient.post<Product>('/products', data);
  },

  update: async (id: number, data: Partial<Product>): Promise<Product> => {
    return apiClient.put<Product>(`/products/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete(`/products/${id}`);
  },
};

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    return apiClient.get<Category[]>('/categories');
  },

  getById: async (id: number): Promise<Category> => {
    return apiClient.get<Category>(`/categories/${id}`);
  },
};
