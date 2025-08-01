import { renderHook, act } from '@testing-library/react';
import { useHackathonStore } from '../HackathonStore';
import { HackathonService } from '../../services/HackathonService';
import type { HackathonApplication, TeamMember, Team } from '../../model/types';

// HackathonService 모킹
jest.mock('../../services/HackathonService', () => ({
  HackathonService: {
    createApplication: jest.fn(),
    getApplications: jest.fn(),
    getApplication: jest.fn(),
    updateApplication: jest.fn(),
    deleteApplication: jest.fn(),
  },
}));

const mockedHackathonService = HackathonService as jest.Mocked<typeof HackathonService>;

describe('HackathonStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // 스토어 초기화
    const { result } = renderHook(() => useHackathonStore());
    act(() => {
      result.current.reset();
    });
  });

  describe('TC-UNIT-006: 상태 관리 테스트', () => {
    it('초기 상태 설정', () => {
      // Given & When
      const { result } = renderHook(() => useHackathonStore());

      // Then
      expect(result.current.applications).toEqual([]);
      expect(result.current.currentApplication).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('로딩 상태 변경', () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());

      // When
      act(() => {
        result.current.setLoading(true);
      });

      // Then
      expect(result.current.isLoading).toBe(true);

      // When
      act(() => {
        result.current.setLoading(false);
      });

      // Then
      expect(result.current.isLoading).toBe(false);
    });

    it('에러 상태 설정', () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const errorMessage = '테스트 에러 메시지';

      // When
      act(() => {
        result.current.setError(errorMessage);
      });

      // Then
      expect(result.current.error).toBe(errorMessage);

      // When
      act(() => {
        result.current.setError(null);
      });

      // Then
      expect(result.current.error).toBeNull();
    });

    it('애플리케이션 목록 설정', () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockApplications: HackathonApplication[] = [
        {
          id: 1,
          team: {
            id: 1,
            teamName: '테스트팀1',
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
          status: 'PENDING',
        },
        {
          id: 2,
          team: {
            id: 2,
            teamName: '테스트팀2',
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
          status: 'APPROVED',
        },
      ];

      // When
      act(() => {
        result.current.setApplications(mockApplications);
      });

      // Then
      expect(result.current.applications).toEqual(mockApplications);
    });

    it('현재 애플리케이션 설정', () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockApplication: HackathonApplication = {
        id: 1,
        team: {
          id: 1,
          teamName: '테스트팀',
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
        status: 'PENDING',
      };

      // When
      act(() => {
        result.current.setCurrentApplication(mockApplication);
      });

      // Then
      expect(result.current.currentApplication).toEqual(mockApplication);

      // When
      act(() => {
        result.current.setCurrentApplication(null);
      });

      // Then
      expect(result.current.currentApplication).toBeNull();
    });
  });

  describe('TC-UNIT-007: API 액션 테스트', () => {
    it('createApplication 액션 성공', async () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockApplication: HackathonApplication = {
        id: 1,
        team: {
          id: 1,
          teamName: '테스트팀',
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
        status: 'PENDING',
      };
      const createData = {
        teamName: '테스트팀',
        memberName: '홍길동',
        email: 'hong@test.com',
        ideaTitle: 'AI 기반 해커톤 관리 시스템',
      };

      mockedHackathonService.createApplication.mockResolvedValueOnce(mockApplication);

      // When
      await act(async () => {
        await result.current.createApplication(createData);
      });

      // Then
      expect(mockedHackathonService.createApplication).toHaveBeenCalledWith(createData);
      expect(result.current.currentApplication).toEqual(mockApplication);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('createApplication 액션 실패', async () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const errorMessage = '신청서 생성 실패';
      const createData = {
        teamName: '테스트팀',
        memberName: '홍길동',
        email: 'hong@test.com',
      };

      mockedHackathonService.createApplication.mockRejectedValueOnce(new Error(errorMessage));

      // When
      await act(async () => {
        await result.current.createApplication(createData);
      });

      // Then
      expect(mockedHackathonService.createApplication).toHaveBeenCalledWith(createData);
      expect(result.current.currentApplication).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(errorMessage);
    });

    it('getApplications 액션 성공', async () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockApplications: HackathonApplication[] = [
        {
          id: 1,
          team: {
            id: 1,
            teamName: '테스트팀1',
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
          status: 'PENDING',
        },
      ];
      const searchParams = { teamName: '테스트팀1' };

      mockedHackathonService.getApplications.mockResolvedValueOnce(mockApplications);

      // When
      await act(async () => {
        await result.current.getApplications(searchParams);
      });

      // Then
      expect(mockedHackathonService.getApplications).toHaveBeenCalledWith(searchParams);
      expect(result.current.applications).toEqual(mockApplications);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('getApplications 액션 실패', async () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const errorMessage = '신청서 조회 실패';

      mockedHackathonService.getApplications.mockRejectedValueOnce(new Error(errorMessage));

      // When
      await act(async () => {
        await result.current.getApplications();
      });

      // Then
      expect(mockedHackathonService.getApplications).toHaveBeenCalledWith(undefined);
      expect(result.current.applications).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(errorMessage);
    });

    it('getApplication 액션 성공', async () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockApplication: HackathonApplication = {
        id: 1,
        team: {
          id: 1,
          teamName: '테스트팀',
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
        status: 'PENDING',
      };

      mockedHackathonService.getApplication.mockResolvedValueOnce(mockApplication);

      // When
      await act(async () => {
        await result.current.getApplication(1);
      });

      // Then
      expect(mockedHackathonService.getApplication).toHaveBeenCalledWith(1);
      expect(result.current.currentApplication).toEqual(mockApplication);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('updateApplication 액션 성공', async () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockUpdatedApplication: HackathonApplication = {
        id: 1,
        team: {
          id: 1,
          teamName: '수정된팀',
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
        status: 'PENDING',
      };
      const updateData = {
        teamName: '수정된팀',
        memberName: '홍길동',
        email: 'hong@test.com',
        ideaTitle: '수정된 아이디어',
      };

      mockedHackathonService.updateApplication.mockResolvedValueOnce(mockUpdatedApplication);

      // When
      await act(async () => {
        await result.current.updateApplication(1, updateData);
      });

      // Then
      expect(mockedHackathonService.updateApplication).toHaveBeenCalledWith(1, updateData);
      expect(result.current.currentApplication).toEqual(mockUpdatedApplication);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('deleteApplication 액션 성공', async () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockApplication: HackathonApplication = {
        id: 1,
        team: {
          id: 1,
          teamName: '테스트팀',
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
        status: 'PENDING',
      };

      // 현재 애플리케이션 설정
      act(() => {
        result.current.setCurrentApplication(mockApplication);
      });

      mockedHackathonService.deleteApplication.mockResolvedValueOnce();

      // When
      await act(async () => {
        await result.current.deleteApplication(1);
      });

      // Then
      expect(mockedHackathonService.deleteApplication).toHaveBeenCalledWith(1);
      expect(result.current.currentApplication).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('TC-UNIT-008: 팀 관리 테스트', () => {
    it('팀 멤버 추가', () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockApplication: HackathonApplication = {
        id: 1,
        team: {
          id: 1,
          teamName: '테스트팀',
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
        status: 'PENDING',
      };

      act(() => {
        result.current.setCurrentApplication(mockApplication);
      });

      const newMember: TeamMember = {
        name: '김철수',
        email: 'kim@test.com',
        phone: '010-2345-6789',
        role: '개발자',
        department: '개발팀',
        position: '개발자',
        isLeader: false,
      };

      // When
      act(() => {
        result.current.addTeamMember(newMember);
      });

      // Then
      expect(result.current.currentApplication?.team.members).toHaveLength(2);
      expect(result.current.currentApplication?.team.members?.[1]).toEqual(newMember);
    });

    it('팀 멤버 삭제', () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockApplication: HackathonApplication = {
        id: 1,
        team: {
          id: 1,
          teamName: '테스트팀',
          members: [
            {
              id: 1,
              name: '홍길동',
              email: 'hong@test.com',
              role: '팀장',
              isLeader: true,
            },
            {
              id: 2,
              name: '김철수',
              email: 'kim@test.com',
              role: '개발자',
              isLeader: false,
            },
          ],
        },
        ideaTitle: 'AI 기반 해커톤 관리 시스템',
        status: 'PENDING',
      };

      act(() => {
        result.current.setCurrentApplication(mockApplication);
      });

      // When
      act(() => {
        result.current.removeTeamMember(1); // 두 번째 멤버 삭제
      });

      // Then
      expect(result.current.currentApplication?.team.members).toHaveLength(1);
      expect(result.current.currentApplication?.team.members?.[0].name).toBe('홍길동');
    });

    it('팀 멤버 수정', () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockApplication: HackathonApplication = {
        id: 1,
        team: {
          id: 1,
          teamName: '테스트팀',
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
        status: 'PENDING',
      };

      act(() => {
        result.current.setCurrentApplication(mockApplication);
      });

      const updatedMember: TeamMember = {
        name: '홍길동',
        email: 'hong.updated@test.com',
        phone: '010-9999-9999',
        role: '수석개발자',
        department: '개발팀',
        position: '수석개발자',
        isLeader: true,
      };

      // When
      act(() => {
        result.current.updateTeamMember(0, updatedMember);
      });

      // Then
      expect(result.current.currentApplication?.team.members?.[0]).toEqual(updatedMember);
    });

    it('팀 정보 업데이트', () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockApplication: HackathonApplication = {
        id: 1,
        team: {
          id: 1,
          teamName: '테스트팀',
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
        status: 'PENDING',
      };

      act(() => {
        result.current.setCurrentApplication(mockApplication);
      });

      const updatedTeamInfo: Partial<Team> = {
        teamName: '수정된팀명',
      };

      // When
      act(() => {
        result.current.updateTeamInfo(updatedTeamInfo);
      });

      // Then
      expect(result.current.currentApplication?.team.teamName).toBe('수정된팀명');
    });

    it('아이디어 정보 업데이트', () => {
      // Given
      const { result } = renderHook(() => useHackathonStore());
      const mockApplication: HackathonApplication = {
        id: 1,
        team: {
          id: 1,
          teamName: '테스트팀',
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
        ideaDescription: '기존 아이디어 설명',
        status: 'PENDING',
      };

      act(() => {
        result.current.setCurrentApplication(mockApplication);
      });

      const updatedIdeaInfo = {
        ideaTitle: '수정된 아이디어 제목',
        ideaDescription: '수정된 아이디어 설명',
      };

      // When
      act(() => {
        result.current.updateIdeaInfo(updatedIdeaInfo);
      });

      // Then
      expect(result.current.currentApplication?.ideaTitle).toBe('수정된 아이디어 제목');
      expect(result.current.currentApplication?.ideaDescription).toBe('수정된 아이디어 설명');
    });
  });
}); 