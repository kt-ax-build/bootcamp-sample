import { axiosInstance } from '../api/axios';
import type {
  CreateApplicationRequest,
  GetApplicationRequest,
  HackathonApplication,
} from '../model/types';

export class HackathonService {
  static async createApplication(data: CreateApplicationRequest): Promise<HackathonApplication> {
    const response = await axiosInstance.post('/api/hackathon/v1/applications', data);
    return response.data;
  }

  static async getApplications(params?: GetApplicationRequest): Promise<HackathonApplication[]> {
    try {
      const response = await axiosInstance.get('/api/hackathon/v1/applications', { 
        params,
        timeout: 10000,
      });
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error);
      if (error.response?.status === 400) {
        throw new Error('검색 조건이 올바르지 않습니다.');
      } else if (error.response?.status === 404) {
        throw new Error('해당 정보를 찾을 수 없습니다.');
      } else {
        throw new Error('조회 중 오류가 발생했습니다.');
      }
    }
  }

  static async getApplication(id: number): Promise<HackathonApplication> {
    const response = await axiosInstance.get(`/api/hackathon/v1/applications/${id}`);
    return response.data;
  }

  static async updateApplication(id: number, data: CreateApplicationRequest): Promise<HackathonApplication> {
    const response = await axiosInstance.put(`/api/hackathon/v1/applications/${id}`, data);
    return response.data;
  }

  static async deleteApplication(id: number): Promise<void> {
    await axiosInstance.delete(`/api/hackathon/v1/applications/${id}`);
  }
} 