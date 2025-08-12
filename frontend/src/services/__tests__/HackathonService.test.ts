import { HackathonService } from '../HackathonService';
import type { CreateApplicationRequest, GetApplicationRequest, HackathonApplication } from '../../model/types';

// axios 모듈을 모킹하여 import.meta.env 문제를 우회하고 HTTP 호출을 제어
jest.mock('../../api/axios', () => {
  const post = jest.fn();
  const get = jest.fn();
  const put = jest.fn();
  const _delete = jest.fn();
  return {
    axiosInstance: {
      defaults: {
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' },
        baseURL: 'http://localhost:8080',
      },
      interceptors: {
        request: { handlers: [{}] },
        response: { handlers: [{}] },
      },
      post,
      get,
      put,
      delete: _delete,
    },
  };
});

import { axiosInstance } from '../../api/axios';

// 목업 데이터 빌더
export const buildApplication = (overrides: Record<string, any> = {}): HackathonApplication => ({
  id: 1,
  team: {
    id: 10,
    teamName: '테스트팀',
    members: [
      { id: 100, name: '홍길동', email: 'hong@test.com', role: '팀장', isLeader: true },
    ],
  },
  ideaTitle: '아이디어 제목',
  ideaDescription: '아이디어 설명',
  status: 'PENDING',
  firstCreateDatetime: '2024-01-01T00:00:00Z',
  lastUpdateDatetime: '2024-01-01T00:00:00Z',
  ...overrides,
});

describe('HackathonService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createApplication', () => {
    const mockRequest: CreateApplicationRequest = {
      teamName: '테스트팀',
      members: [
        { name: '홍길동', email: 'hong@test.com', role: '팀장', isLeader: true },
      ],
    };

    it('U1: createApplication 성공 - POST 호출 파라미터/URL 검증, 응답 데이터 반환 확인', async () => {
      // Given
      const mockResponse = buildApplication();
      (axiosInstance.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

      // When
      const result = await HackathonService.createApplication(mockRequest);

      // Then
      expect(axiosInstance.post).toHaveBeenCalledWith('/api/hackathon/v1/applications', mockRequest);
      expect(result).toEqual(mockResponse);
      expect(result.id).toBe(1);
      expect(result.team.teamName).toBe('테스트팀');
    });

    it('U2: createApplication 실패 - 예외 전파 확인', async () => {
      // Given
      const mockError = new Error('Network error');
      (axiosInstance.post as jest.Mock).mockRejectedValueOnce(mockError);

      // When & Then
      await expect(HackathonService.createApplication(mockRequest)).rejects.toThrow('Network error');
      expect(axiosInstance.post).toHaveBeenCalledWith('/api/hackathon/v1/applications', mockRequest);
    });
  });

  describe('getApplications', () => {
    it('U3: getApplications 성공(무파라미터) - GET 호출 옵션 중 timeout:10000 포함 및 데이터 반환 확인', async () => {
      // Given
      const mockResponse = [buildApplication()];
      (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

      // When
      const result = await HackathonService.getApplications();

      // Then
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/hackathon/v1/applications', {
        params: undefined,
        timeout: 10000,
      });
      expect(result).toEqual(mockResponse);
      expect(result).toHaveLength(1);
    });

    it('U4: getApplications 성공(검색 파라미터) - params 포함 호출 및 데이터 반환 확인', async () => {
      // Given
      const mockResponse = [buildApplication()];
      const params: GetApplicationRequest = { teamName: 'T' };
      (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

      // When
      const result = await HackathonService.getApplications(params);

      // Then
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/hackathon/v1/applications', {
        params,
        timeout: 10000,
      });
      expect(result).toEqual(mockResponse);
    });

    it('U5: getApplications 실패(400) - 에러 메시지 "검색 조건이 올바르지 않습니다." 매핑 확인', async () => {
      // Given
      const params: GetApplicationRequest = { teamName: '' };
      (axiosInstance.get as jest.Mock).mockRejectedValueOnce({ response: { status: 400 } });

      // When & Then
      await expect(HackathonService.getApplications(params)).rejects.toThrow('검색 조건이 올바르지 않습니다.');
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/hackathon/v1/applications', {
        params,
        timeout: 10000,
      });
    });

    it('U6: getApplications 실패(404) - 에러 메시지 "해당 정보를 찾을 수 없습니다." 매핑 확인', async () => {
      // Given
      const params: GetApplicationRequest = { teamName: '존재하지않는팀' };
      (axiosInstance.get as jest.Mock).mockRejectedValueOnce({ response: { status: 404 } });

      // When & Then
      await expect(HackathonService.getApplications(params)).rejects.toThrow('해당 정보를 찾을 수 없습니다.');
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/hackathon/v1/applications', {
        params,
        timeout: 10000,
      });
    });

    it('U7: getApplications 실패(기타/네트워크) - 에러 메시지 "조회 중 오류가 발생했습니다." 매핑 확인', async () => {
      // Given
      const params: GetApplicationRequest = { teamName: '테스트팀' };
      (axiosInstance.get as jest.Mock).mockRejectedValueOnce({ response: { status: 500 } });

      // When & Then
      await expect(HackathonService.getApplications(params)).rejects.toThrow('조회 중 오류가 발생했습니다.');
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/hackathon/v1/applications', {
        params,
        timeout: 10000,
      });
    });

    it('U7-2: getApplications 실패(네트워크 에러) - 에러 메시지 "조회 중 오류가 발생했습니다." 매핑 확인', async () => {
      // Given
      const params: GetApplicationRequest = { teamName: '테스트팀' };
      (axiosInstance.get as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      // When & Then
      await expect(HackathonService.getApplications(params)).rejects.toThrow('조회 중 오류가 발생했습니다.');
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/hackathon/v1/applications', {
        params,
        timeout: 10000,
      });
    });
  });

  describe('getApplication', () => {
    it('U8: getApplication 성공 - URL /applications/:id로 GET 호출 및 데이터 반환 확인', async () => {
      // Given
      const mockResponse = buildApplication({ id: 1 });
      (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

      // When
      const result = await HackathonService.getApplication(1);

      // Then
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/hackathon/v1/applications/1');
      expect(result).toEqual(mockResponse);
      expect(result.id).toBe(1);
    });

    it('U9: getApplication 실패 - 예외 전파 확인', async () => {
      // Given
      const mockError = new Error('Application not found');
      (axiosInstance.get as jest.Mock).mockRejectedValueOnce(mockError);

      // When & Then
      await expect(HackathonService.getApplication(999)).rejects.toThrow('Application not found');
      expect(axiosInstance.get).toHaveBeenCalledWith('/api/hackathon/v1/applications/999');
    });
  });

  describe('updateApplication', () => {
    const mockRequest: CreateApplicationRequest = {
      teamName: '수정된팀',
      members: [
        { name: '김수정', email: 'kim@test.com', role: '팀원', isLeader: false },
      ],
    };

    it('U10: updateApplication 성공 - URL/바디 확인, 응답 데이터 반환', async () => {
      // Given
      const mockResponse = buildApplication({ id: 1, team: { teamName: '수정된팀' } });
      (axiosInstance.put as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

      // When
      const result = await HackathonService.updateApplication(1, mockRequest);

      // Then
      expect(axiosInstance.put).toHaveBeenCalledWith('/api/hackathon/v1/applications/1', mockRequest);
      expect(result).toEqual(mockResponse);
      expect(result.team.teamName).toBe('수정된팀');
    });

    it('U11: updateApplication 실패 - 예외 전파 확인', async () => {
      // Given
      const mockError = new Error('Update failed');
      (axiosInstance.put as jest.Mock).mockRejectedValueOnce(mockError);

      // When & Then
      await expect(HackathonService.updateApplication(1, mockRequest)).rejects.toThrow('Update failed');
      expect(axiosInstance.put).toHaveBeenCalledWith('/api/hackathon/v1/applications/1', mockRequest);
    });
  });

  describe('deleteApplication', () => {
    it('U12: deleteApplication 성공 - URL /applications/:id로 DELETE 호출, void 반환', async () => {
      // Given
      (axiosInstance.delete as jest.Mock).mockResolvedValueOnce({});

      // When
      const result = await HackathonService.deleteApplication(1);

      // Then
      expect(axiosInstance.delete).toHaveBeenCalledWith('/api/hackathon/v1/applications/1');
      expect(result).toBeUndefined();
    });

    it('U13: deleteApplication 실패 - 예외 전파 확인', async () => {
      // Given
      const mockError = new Error('Delete failed');
      (axiosInstance.delete as jest.Mock).mockRejectedValueOnce(mockError);

      // When & Then
      await expect(HackathonService.deleteApplication(1)).rejects.toThrow('Delete failed');
      expect(axiosInstance.delete).toHaveBeenCalledWith('/api/hackathon/v1/applications/1');
    });
  });
});
