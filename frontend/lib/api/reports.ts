import { apiClient } from '../api-client';
import type { DashboardReport } from './types';

export const reportsApi = {
  getDashboard: async (params?: {
    start_date?: string;
    end_date?: string;
  }): Promise<DashboardReport> => {
    const queryParams = new URLSearchParams();
    if (params?.start_date) queryParams.set('start_date', params.start_date);
    if (params?.end_date) queryParams.set('end_date', params.end_date);
    
    const query = queryParams.toString();
    return apiClient.get<DashboardReport>(`/reports/dashboard${query ? `?${query}` : ''}`);
  },
};
