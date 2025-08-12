import { axiosInstance } from '../api/axios';
import {
  ApplicationCreateRequest,
  ApplicationResponse,
  ApplicationUpdateRequest,
  CommonResponse,
  TeamNameCheckResponse,
} from '../types/application';

export class ApplicationService {
  /**
   * 팀명 중복 확인
   */
  static async checkTeamName(teamName: string): Promise<TeamNameCheckResponse> {
    try {
      const response = await axiosInstance.get<CommonResponse<TeamNameCheckResponse>>(
        `/api/hackathon/v1/applications/check-team-name?teamName=${encodeURIComponent(teamName)}`
      );
      return response.data.data;
    } catch (error) {
      console.error('팀명 중복 확인 실패:', error);
      throw error;
    }
  }

  /**
   * 신청 생성
   */
  static async createApplication(
    application: ApplicationCreateRequest
  ): Promise<ApplicationResponse> {
    try {
      const response = await axiosInstance.post<CommonResponse<ApplicationResponse>>(
        '/api/hackathon/v1/applications',
        application
      );
      return response.data.data;
    } catch (error) {
      console.error('신청 생성 실패:', error);
      throw error;
    }
  }

  /**
   * 신청 목록 조회
   */
  static async getApplications(): Promise<ApplicationResponse[]> {
    try {
      const response = await axiosInstance.get<CommonResponse<ApplicationResponse[]>>(
        '/api/hackathon/v1/applications'
      );
      return response.data.data;
    } catch (error) {
      console.error('신청 목록 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 신청 상세 조회
   */
  static async getApplication(id: string): Promise<ApplicationResponse> {
    try {
      const response = await axiosInstance.get<CommonResponse<ApplicationResponse>>(
        `/api/hackathon/v1/applications/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('신청 상세 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 신청 수정
   */
  static async updateApplication(
    id: string,
    application: ApplicationUpdateRequest
  ): Promise<ApplicationResponse> {
    try {
      const response = await axiosInstance.put<CommonResponse<ApplicationResponse>>(
        `/api/hackathon/v1/applications/${id}`,
        application
      );
      return response.data.data;
    } catch (error) {
      console.error('신청 수정 실패:', error);
      throw error;
    }
  }

  /**
   * 신청 삭제
   */
  static async deleteApplication(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/api/hackathon/v1/applications/${id}`);
    } catch (error) {
      console.error('신청 삭제 실패:', error);
      throw error;
    }
  }
}
