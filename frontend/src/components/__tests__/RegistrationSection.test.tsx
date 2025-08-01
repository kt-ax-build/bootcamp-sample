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
      expect(screen.getByText('아이디어 제목 *')).toBeInTheDocument();
      expect(screen.getByText('해결하고자 하는 문제 *')).toBeInTheDocument();
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
  });
}); 