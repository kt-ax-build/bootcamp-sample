import { HackathonService } from '../HackathonService';
import { axiosInstance } from '../../api/axios';
import type { CreateApplicationRequest, HackathonApplication } from '../../model/types';

// axios 모킹
jest.mock('../../api/axios', () => ({
  axiosInstance: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('HackathonService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('TC-UNIT-001: createApplication', () => {
    const mockCreateRequest: CreateApplicationRequest = {
      teamName: '테스트팀',
      teamSize: '2',
      teamDescription: 'AI 개발 전문팀',
      ideaTitle: 'AI 기반 해커톤 관리 시스템',
      ideaDescription: '해커톤 참가자들의 아이디어를 효율적으로 관리하는 시스템',
      problemStatement: '기존 해커톤 관리의 비효율성',
      solutionApproach: 'AI 기술을 활용한 자동화',
      techStack: 'React, TypeScript, Spring Boot, PostgreSQL',
      members: [
        {
          name: '홍길동',
          email: 'hong@test.com',
          phone: '010-1234-5678',
          role: '팀장',
          department: '개발팀',
          position: '개발자',
          isLeader: true,
        },
        {
          name: '김철수',
          email: 'kim@test.com',
          phone: '010-2345-6789',
          role: '개발자',
          department: '개발팀',
          position: '개발자',
          isLeader: false,
        },
      ],
    };

    const mockResponse: HackathonApplication = {
      id: 1,
      team: {
        id: 1,
        teamName: '테스트팀',
        teamSize: '2',
        teamDescription: 'AI 개발 전문팀',
        members: [
          {
            id: 1,
            name: '홍길동',
            email: 'hong@test.com',
            phone: '010-1234-5678',
            role: '팀장',
            department: '개발팀',
            position: '개발자',
            isLeader: true,
          },
          {
            id: 2,
            name: '김철수',
            email: 'kim@test.com',
            phone: '010-2345-6789',
            role: '개발자',
            department: '개발팀',
            position: '개발자',
            isLeader: false,
          },
        ],
      },
      ideaTitle: 'AI 기반 해커톤 관리 시스템',
      ideaDescription: '해커톤 참가자들의 아이디어를 효율적으로 관리하는 시스템',
      problemStatement: '기존 해커톤 관리의 비효율성',
      solutionApproach: 'AI 기술을 활용한 자동화',
      techStack: 'React, TypeScript, Spring Boot, PostgreSQL',
      status: 'PENDING',
      firstCreateDatetime: '2024-01-01T00:00:00Z',
      lastUpdateDatetime: '2024-01-01T00:00:00Z',
    };

    it('올바른 데이터로 API 호출 성공', async () => {
      // Given
      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

      // When
      const result = await HackathonService.createApplication(mockCreateRequest);

      // Then
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/hackathon/v1/applications', mockCreateRequest);
      expect(result).toEqual(mockResponse);
    });

    it('응답 데이터 형식 검증', async () => {
      // Given
      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

      // When
      const result = await HackathonService.createApplication(mockCreateRequest);

      // Then
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('team');
      expect(result).toHaveProperty('ideaTitle');
      expect(result).toHaveProperty('ideaDescription');
      expect(result).toHaveProperty('problemStatement');
      expect(result).toHaveProperty('solutionApproach');
      expect(result).toHaveProperty('techStack');
      expect(result).toHaveProperty('status');
      expect(result.team).toHaveProperty('teamName');
      expect(result.team).toHaveProperty('teamSize');
      expect(result.team).toHaveProperty('teamDescription');
      expect(result.team).toHaveProperty('members');
      expect(Array.isArray(result.team.members)).toBe(true);
    });

    it('에러 처리 검증', async () => {
      // Given
      const errorMessage = '신청서 생성 중 오류가 발생했습니다.';
      mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

      // When & Then
      await expect(HackathonService.createApplication(mockCreateRequest)).rejects.toThrow(errorMessage);
    });
  });

  describe('TC-UNIT-002: getApplications', () => {
    const mockApplications: HackathonApplication[] = [
      {
        id: 1,
        team: {
          id: 1,
          teamName: '테스트팀1',
          teamSize: '2',
          teamDescription: 'AI 개발팀',
          members: [
            {
              id: 1,
              name: '홍길동',
              email: 'hong@test.com',
              role: '팀장',
              isLeader: true,
            },
          ],
        },
        ideaTitle: 'AI 기반 해커톤 관리 시스템',
        problemStatement: '기존 해커톤 관리의 비효율성',
        solutionApproach: 'AI 기술을 활용한 자동화',
        techStack: 'React, TypeScript, Spring Boot',
        status: 'PENDING',
      },
      {
        id: 2,
        team: {
          id: 2,
          teamName: '테스트팀2',
          teamSize: '3',
          teamDescription: '블록체인 개발팀',
          members: [
            {
              id: 2,
              name: '김철수',
              email: 'kim@test.com',
              role: '팀장',
              isLeader: true,
            },
          ],
        },
        ideaTitle: '블록체인 기반 투표 시스템',
        problemStatement: '투표 시스템의 투명성 문제',
        solutionApproach: '블록체인 기술을 활용한 투명한 투표',
        techStack: 'Ethereum, Solidity, React',
        status: 'APPROVED',
      },
    ];

    it('파라미터 없이 조회 성공', async () => {
      // Given
      mockedAxios.get.mockResolvedValueOnce({ data: mockApplications });

      // When
      const result = await HackathonService.getApplications();

      // Then
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/hackathon/v1/applications', {
        params: undefined,
        timeout: 10000,
      });
      expect(result).toEqual(mockApplications);
    });

    it('검색 파라미터로 조회 성공', async () => {
      // Given
      const searchParams = { teamName: '테스트팀1' };
      mockedAxios.get.mockResolvedValueOnce({ data: [mockApplications[0]] });

      // When
      const result = await HackathonService.getApplications(searchParams);

      // Then
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/hackathon/v1/applications', {
        params: searchParams,
        timeout: 10000,
      });
      expect(result).toEqual([mockApplications[0]]);
    });

    it('400 에러 처리 (잘못된 검색 조건)', async () => {
      // Given
      const error = {
        response: { status: 400 },
        message: '잘못된 검색 조건입니다.',
      };
      mockedAxios.get.mockRejectedValueOnce(error);

      // When & Then
      await expect(HackathonService.getApplications()).rejects.toThrow('검색 조건이 올바르지 않습니다.');
    });

    it('404 에러 처리 (데이터 없음)', async () => {
      // Given
      const error = {
        response: { status: 404 },
        message: '데이터를 찾을 수 없습니다.',
      };
      mockedAxios.get.mockRejectedValueOnce(error);

      // When & Then
      await expect(HackathonService.getApplications()).rejects.toThrow('해당 정보를 찾을 수 없습니다.');
    });

    it('기타 에러 처리', async () => {
      // Given
      const error = {
        response: { status: 500 },
        message: '서버 오류가 발생했습니다.',
      };
      mockedAxios.get.mockRejectedValueOnce(error);

      // When & Then
      await expect(HackathonService.getApplications()).rejects.toThrow('조회 중 오류가 발생했습니다.');
    });
  });

  describe('TC-UNIT-003: getApplication', () => {
    const mockApplication: HackathonApplication = {
      id: 1,
      team: {
        id: 1,
        teamName: '테스트팀',
        teamSize: '2',
        teamDescription: 'AI 개발팀',
        members: [
          {
            id: 1,
            name: '홍길동',
            email: 'hong@test.com',
            role: '팀장',
            isLeader: true,
          },
        ],
      },
      ideaTitle: 'AI 기반 해커톤 관리 시스템',
      ideaDescription: '해커톤 참가자들의 아이디어를 효율적으로 관리하는 시스템',
      problemStatement: '기존 해커톤 관리의 비효율성',
      solutionApproach: 'AI 기술을 활용한 자동화',
      techStack: 'React, TypeScript, Spring Boot',
      status: 'PENDING',
    };

    it('올바른 ID로 조회 성공', async () => {
      // Given
      const applicationId = 1;
      mockedAxios.get.mockResolvedValueOnce({ data: mockApplication });

      // When
      const result = await HackathonService.getApplication(applicationId);

      // Then
      expect(mockedAxios.get).toHaveBeenCalledWith(`/api/hackathon/v1/applications/${applicationId}`);
      expect(result).toEqual(mockApplication);
    });

    it('응답 데이터 형식 검증', async () => {
      // Given
      mockedAxios.get.mockResolvedValueOnce({ data: mockApplication });

      // When
      const result = await HackathonService.getApplication(1);

      // Then
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('team');
      expect(result).toHaveProperty('ideaTitle');
      expect(result).toHaveProperty('ideaDescription');
      expect(result).toHaveProperty('problemStatement');
      expect(result).toHaveProperty('solutionApproach');
      expect(result).toHaveProperty('techStack');
      expect(result).toHaveProperty('status');
    });

    it('에러 처리 검증', async () => {
      // Given
      const errorMessage = '신청서 조회 중 오류가 발생했습니다.';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      // When & Then
      await expect(HackathonService.getApplication(1)).rejects.toThrow(errorMessage);
    });
  });

  describe('TC-UNIT-004: updateApplication', () => {
    const mockUpdateRequest: CreateApplicationRequest = {
      teamName: '수정된팀',
      teamSize: '3',
      teamDescription: '수정된 팀 설명',
      ideaTitle: '수정된 아이디어',
      ideaDescription: '수정된 아이디어 설명',
      problemStatement: '수정된 문제',
      solutionApproach: '수정된 해결방법',
      techStack: '수정된 기술스택',
      members: [
        {
          name: '홍길동',
          email: 'hong@test.com',
          role: '팀장',
          isLeader: true,
        },
      ],
    };

    const mockUpdatedApplication: HackathonApplication = {
      id: 1,
      team: {
        id: 1,
        teamName: '수정된팀',
        teamSize: '3',
        teamDescription: '수정된 팀 설명',
        members: [
          {
            id: 1,
            name: '홍길동',
            email: 'hong@test.com',
            role: '팀장',
            isLeader: true,
          },
        ],
      },
      ideaTitle: '수정된 아이디어',
      ideaDescription: '수정된 아이디어 설명',
      problemStatement: '수정된 문제',
      solutionApproach: '수정된 해결방법',
      techStack: '수정된 기술스택',
      status: 'PENDING',
    };

    it('올바른 데이터로 수정 성공', async () => {
      // Given
      const applicationId = 1;
      mockedAxios.put.mockResolvedValueOnce({ data: mockUpdatedApplication });

      // When
      const result = await HackathonService.updateApplication(applicationId, mockUpdateRequest);

      // Then
      expect(mockedAxios.put).toHaveBeenCalledWith(`/api/hackathon/v1/applications/${applicationId}`, mockUpdateRequest);
      expect(result).toEqual(mockUpdatedApplication);
    });

    it('응답 데이터 형식 검증', async () => {
      // Given
      mockedAxios.put.mockResolvedValueOnce({ data: mockUpdatedApplication });

      // When
      const result = await HackathonService.updateApplication(1, mockUpdateRequest);

      // Then
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('team');
      expect(result).toHaveProperty('ideaTitle');
      expect(result).toHaveProperty('ideaDescription');
      expect(result).toHaveProperty('problemStatement');
      expect(result).toHaveProperty('solutionApproach');
      expect(result).toHaveProperty('techStack');
      expect(result).toHaveProperty('status');
    });

    it('에러 처리 검증', async () => {
      // Given
      const errorMessage = '신청서 수정 중 오류가 발생했습니다.';
      mockedAxios.put.mockRejectedValueOnce(new Error(errorMessage));

      // When & Then
      await expect(HackathonService.updateApplication(1, mockUpdateRequest)).rejects.toThrow(errorMessage);
    });
  });

  describe('TC-UNIT-005: deleteApplication', () => {
    it('올바른 ID로 삭제 성공', async () => {
      // Given
      const applicationId = 1;
      mockedAxios.delete.mockResolvedValueOnce({});

      // When
      await HackathonService.deleteApplication(applicationId);

      // Then
      expect(mockedAxios.delete).toHaveBeenCalledWith(`/api/hackathon/v1/applications/${applicationId}`);
    });

    it('에러 처리 검증', async () => {
      // Given
      const errorMessage = '신청서 삭제 중 오류가 발생했습니다.';
      mockedAxios.delete.mockRejectedValueOnce(new Error(errorMessage));

      // When & Then
      await expect(HackathonService.deleteApplication(1)).rejects.toThrow(errorMessage);
    });
  });
}); 