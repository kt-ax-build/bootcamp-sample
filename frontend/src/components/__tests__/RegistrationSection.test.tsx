import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationSection from '../RegistrationSection';
import { HackathonService } from '../../services/HackathonService';

// HackathonService 모킹
jest.mock('../../services/HackathonService', () => ({
  HackathonService: {
    createApplication: jest.fn(),
  },
}));

const mockedHackathonService = HackathonService as jest.Mocked<typeof HackathonService>;

describe('RegistrationSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('TC-UNIT-009: RegistrationSection 컴포넌트 렌더링 테스트', () => {
    it('컴포넌트 정상 렌더링', () => {
      // Given & When
      render(<RegistrationSection />);

      // Then
      expect(screen.getByText('신청 및 접수')).toBeInTheDocument();
      expect(screen.getByText('팀 정보')).toBeInTheDocument();
      expect(screen.getByText('팀원 정보')).toBeInTheDocument();
      expect(screen.getByText('아이디어 정보')).toBeInTheDocument();
    });

    it('폼 필드 존재 확인', () => {
      // Given & When
      render(<RegistrationSection />);

      // Then
      expect(screen.getByPlaceholderText(/팀명을 입력하세요/)).toBeInTheDocument();
      expect(screen.getByText('팀 구성')).toBeInTheDocument();
      expect(screen.getByText('팀 소개')).toBeInTheDocument();
      expect(screen.getByText('아이디어 제목 *')).toBeInTheDocument();
      expect(screen.getByText('해결하고자 하는 문제 *')).toBeInTheDocument();
      expect(screen.getByText('솔루션 접근 방법 *')).toBeInTheDocument();
      expect(screen.getByText('사용 예정 기술스택')).toBeInTheDocument();
    });

    it('버튼 존재 확인', () => {
      // Given & When
      render(<RegistrationSection />);

      // Then
      expect(screen.getByText('팀원 추가')).toBeInTheDocument();
      expect(screen.getByText('참가 신청하기')).toBeInTheDocument();
    });

    it('초기 상태 검증', () => {
      // Given & When
      render(<RegistrationSection />);

      // Then
      expect(screen.getByPlaceholderText(/팀명을 입력하세요/)).toHaveValue('');
    });
  });

  describe('TC-UNIT-010: RegistrationSection 폼 입력 테스트', () => {
    it('팀명 입력 처리', async () => {
      // Given
      render(<RegistrationSection />);
      const user = userEvent.setup();
      const teamNameInput = screen.getByPlaceholderText(/팀명을 입력하세요/);

      // When
      await user.type(teamNameInput, '테스트팀');

      // Then
      expect(teamNameInput).toHaveValue('테스트팀');
    });

    it('팀 구성 선택 처리', async () => {
      // Given
      render(<RegistrationSection />);
      const user = userEvent.setup();
      const teamSizeSelect = screen.getByText('팀 구성').closest('div')?.querySelector('input');

      // When
      if (teamSizeSelect) {
        await user.click(teamSizeSelect);
        const option = screen.getByText('2명');
        await user.click(option);
      }

      // Then
      expect(screen.getByText('2명')).toBeInTheDocument();
    });

    it('아이디어 제목 입력 처리', async () => {
      // Given
      render(<RegistrationSection />);
      const user = userEvent.setup();
      const ideaTitleInput = screen.getByPlaceholderText(/아이디어의 제목을 입력하세요/);

      // When
      await user.type(ideaTitleInput, 'AI 기반 해커톤 관리 시스템');

      // Then
      expect(ideaTitleInput).toHaveValue('AI 기반 해커톤 관리 시스템');
    });

    it('폼 유효성 검증 - 필수 필드 누락', async () => {
      // Given
      render(<RegistrationSection />);
      const user = userEvent.setup();
      const submitButton = screen.getByText('참가 신청하기');

      // When
      await user.click(submitButton);

      // Then
      await waitFor(() => {
        expect(screen.getByText(/팀명을 입력해주세요/)).toBeInTheDocument();
        expect(screen.getByText(/팀 리더 이름을 입력해주세요/)).toBeInTheDocument();
        expect(screen.getByText(/팀 리더 이메일을 입력해주세요/)).toBeInTheDocument();
        expect(screen.getByText(/팀 리더 소속 부서를 입력해주세요/)).toBeInTheDocument();
        expect(screen.getByText(/아이디어 제목을 입력해주세요/)).toBeInTheDocument();
        expect(screen.getByText(/해결하고자 하는 문제를 입력해주세요/)).toBeInTheDocument();
        expect(screen.getByText(/솔루션 접근 방법을 입력해주세요/)).toBeInTheDocument();
      });
    });
  });

  describe('TC-UNIT-011: RegistrationSection 팀 멤버 관리 테스트', () => {
    it('팀 멤버 추가 버튼 동작', async () => {
      // Given
      render(<RegistrationSection />);
      const user = userEvent.setup();
      const addMemberButton = screen.getByText('팀원 추가');

      // When
      await user.click(addMemberButton);

      // Then
      // 팀원 추가 버튼은 여전히 1개만 있어야 함
      expect(screen.getAllByText('팀원 추가')).toHaveLength(1);
      // 추가된 팀원 카드가 나타나야 함
      expect(screen.getByText('팀원 1')).toBeInTheDocument();
    });

    it('팀 멤버 삭제 버튼 동작', async () => {
      // Given
      render(<RegistrationSection />);
      const user = userEvent.setup();
      const addMemberButton = screen.getByText('팀원 추가');
      await user.click(addMemberButton);

      // When
      const deleteButtons = screen.getAllByTestId('DeleteIcon');
      await user.click(deleteButtons[0]); // 첫 번째 추가된 멤버 삭제

      // Then
      // 팀원 1이 사라져야 함
      expect(screen.queryByText('팀원 1')).not.toBeInTheDocument();
    });

    it('팀 리더 정보 입력 처리', async () => {
      // Given
      render(<RegistrationSection />);
      const user = userEvent.setup();
      const leaderNameInput = screen.getByPlaceholderText(/이름을 입력하세요/);
      const leaderEmailInput = screen.getByPlaceholderText(/이메일을 입력하세요/);
      const leaderDepartmentInput = screen.getByPlaceholderText(/부서명을 입력하세요/);

      // When
      await user.type(leaderNameInput, '홍길동');
      await user.type(leaderEmailInput, 'hong@test.com');
      await user.type(leaderDepartmentInput, '개발팀');

      // Then
      expect(leaderNameInput).toHaveValue('홍길동');
      expect(leaderEmailInput).toHaveValue('hong@test.com');
      expect(leaderDepartmentInput).toHaveValue('개발팀');
    });
  });

  describe('TC-UNIT-012: RegistrationSection 폼 제출 테스트', () => {
    it('폼 유효성 검증 실패 시 에러 표시', async () => {
      // Given
      render(<RegistrationSection />);
      const user = userEvent.setup();

      // When
      const submitButton = screen.getByText('참가 신청하기');
      await user.click(submitButton);

      // Then
      await waitFor(() => {
        expect(screen.getByText(/팀명을 입력해주세요/)).toBeInTheDocument();
      });
    });

    it('성공적인 폼 제출 처리', async () => {
      // Given
      const mockResponse = {
        id: 1,
        team: {
          id: 1,
          teamName: '테스트팀',
          members: [
            {
              id: 1,
              name: '홍길동',
              email: 'hong@test.com',
              department: '개발팀',
              isLeader: true,
            },
          ],
        },
        ideaTitle: 'AI 기반 해커톤 관리 시스템',
        status: 'PENDING' as const,
      };

      mockedHackathonService.createApplication.mockResolvedValueOnce(mockResponse);

      render(<RegistrationSection />);
      const user = userEvent.setup();

      // 필수 필드 입력
      await user.type(screen.getByPlaceholderText(/팀명을 입력하세요/), '테스트팀');
      await user.type(screen.getByPlaceholderText(/이름을 입력하세요/), '홍길동');
      await user.type(screen.getByPlaceholderText(/이메일을 입력하세요/), 'hong@test.com');
      await user.type(screen.getByPlaceholderText(/부서명을 입력하세요/), '개발팀');
      await user.type(screen.getByPlaceholderText(/아이디어의 제목을 입력하세요/), 'AI 기반 해커톤 관리 시스템');
      await user.type(screen.getByPlaceholderText(/어떤 문제를 해결하고 싶으신가요/), '기존 해커톤 관리의 비효율성');
      await user.type(screen.getByPlaceholderText(/어떤 방식으로 해결하실 계획인가요/), 'AI 기술을 활용한 자동화');

      // When
      const submitButton = screen.getByText('참가 신청하기');
      await user.click(submitButton);

      // Then
      await waitFor(() => {
        expect(mockedHackathonService.createApplication).toHaveBeenCalledWith(
          expect.objectContaining({
            teamName: '테스트팀',
            members: expect.arrayContaining([
              expect.objectContaining({
                name: '홍길동',
                email: 'hong@test.com',
                department: '개발팀',
                isLeader: true,
              }),
            ]),
            ideaTitle: 'AI 기반 해커톤 관리 시스템',
            problemStatement: '기존 해커톤 관리의 비효율성',
            solutionApproach: 'AI 기술을 활용한 자동화',
          })
        );
      });
    });

    it('API 호출 실패 시 에러 처리', async () => {
      // Given
      const errorMessage = '신청서 생성 중 오류가 발생했습니다.';
      mockedHackathonService.createApplication.mockRejectedValueOnce(new Error(errorMessage));

      render(<RegistrationSection />);
      const user = userEvent.setup();

      // 필수 필드 입력
      await user.type(screen.getByPlaceholderText(/팀명을 입력하세요/), '테스트팀');
      await user.type(screen.getByPlaceholderText(/이름을 입력하세요/), '홍길동');
      await user.type(screen.getByPlaceholderText(/이메일을 입력하세요/), 'hong@test.com');
      await user.type(screen.getByPlaceholderText(/부서명을 입력하세요/), '개발팀');
      await user.type(screen.getByPlaceholderText(/아이디어의 제목을 입력하세요/), 'AI 기반 해커톤 관리 시스템');
      await user.type(screen.getByPlaceholderText(/어떤 문제를 해결하고 싶으신가요/), '기존 해커톤 관리의 비효율성');
      await user.type(screen.getByPlaceholderText(/어떤 방식으로 해결하실 계획인가요/), 'AI 기술을 활용한 자동화');

      // When
      const submitButton = screen.getByText('참가 신청하기');
      await user.click(submitButton);

      // Then
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });
}); 