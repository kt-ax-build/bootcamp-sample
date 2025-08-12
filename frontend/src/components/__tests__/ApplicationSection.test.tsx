import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';
import { ApplicationSection } from '../ApplicationSection';
import { useApplicationStore } from '../../stores/applicationStore';

// Mock the stores and services
jest.mock('../../stores/applicationStore');
jest.mock('../../hooks/useTeamNameCheck');
jest.mock('../../services/applicationService');

const mockUseApplicationStore = useApplicationStore as jest.MockedFunction<typeof useApplicationStore>;

describe('ApplicationSection', () => {
  const mockStore = {
    form: {
      teamInfo: {
        name: '',
        composition: '',
        description: '',
      },
      teamMembers: [
        {
          name: '',
          email: '',
          department: '',
          position: '',
          isLeader: true,
        },
      ],
      ideaInfo: {
        title: '',
        problem: '',
        solution: '',
        techStack: '',
      },
    },
    isLoading: false,
    error: null,
    teamNameCheckResult: null,
    updateTeamInfo: jest.fn(),
    updateIdeaInfo: jest.fn(),
    addTeamMember: jest.fn(),
    removeTeamMember: jest.fn(),
    updateTeamMember: jest.fn(),
    setLoading: jest.fn(),
    setError: jest.fn(),
    validateForm: jest.fn(),
  };

  beforeEach(() => {
    mockUseApplicationStore.mockReturnValue(mockStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the application section title', () => {
    render(
      <ThemeProvider theme={theme}>
        <ApplicationSection />
      </ThemeProvider>
    );

    expect(screen.getByText('신청 및 접수')).toBeInTheDocument();
    expect(screen.getByText('AI 해커톤에 참가하시려면 아래 정보를 입력해주세요')).toBeInTheDocument();
  });

  it('renders team information section', () => {
    render(
      <ThemeProvider theme={theme}>
        <ApplicationSection />
      </ThemeProvider>
    );

    expect(screen.getByText('팀 정보')).toBeInTheDocument();
    expect(screen.getByText('팀명 *')).toBeInTheDocument();
    expect(screen.getByText('팀 구성')).toBeInTheDocument();
    expect(screen.getByText('팀 소개')).toBeInTheDocument();
  });

  it('renders team member information section', () => {
    render(
      <ThemeProvider theme={theme}>
        <ApplicationSection />
      </ThemeProvider>
    );

    expect(screen.getByText('팀원 정보')).toBeInTheDocument();
    expect(screen.getByText('팀원 추가')).toBeInTheDocument();
    expect(screen.getByText('팀 리더')).toBeInTheDocument();
  });

  it('renders idea information section', () => {
    render(
      <ThemeProvider theme={theme}>
        <ApplicationSection />
      </ThemeProvider>
    );

    expect(screen.getByText('아이디어 정보')).toBeInTheDocument();
    expect(screen.getByText('아이디어 제목 *')).toBeInTheDocument();
    expect(screen.getByText('해결하고자 하는 문제 *')).toBeInTheDocument();
    expect(screen.getByText('솔루션 접근 방법 *')).toBeInTheDocument();
    expect(screen.getByText('사용 예정 기술스택')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(
      <ThemeProvider theme={theme}>
        <ApplicationSection />
      </ThemeProvider>
    );

    expect(screen.getByText('참가 신청하기')).toBeInTheDocument();
  });

  it('calls updateTeamInfo when team name is changed', () => {
    render(
      <ThemeProvider theme={theme}>
        <ApplicationSection />
      </ThemeProvider>
    );

    const teamNameInput = screen.getByPlaceholderText('팀명을 입력하세요');
    fireEvent.change(teamNameInput, { target: { value: 'Test Team' } });

    expect(mockStore.updateTeamInfo).toHaveBeenCalledWith('name', 'Test Team');
  });

  it('calls addTeamMember when add member button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <ApplicationSection />
      </ThemeProvider>
    );

    const addMemberButton = screen.getByText('팀원 추가');
    fireEvent.click(addMemberButton);

    expect(mockStore.addTeamMember).toHaveBeenCalled();
  });

  it('shows validation errors when submit is clicked with invalid form', async () => {
    mockStore.validateForm.mockReturnValue({
      isValid: false,
      errors: ['팀명을 입력해주세요', '이메일 형식이 올바르지 않습니다'],
    });

    render(
      <ThemeProvider theme={theme}>
        <ApplicationSection />
      </ThemeProvider>
    );

    const submitButton = screen.getByText('참가 신청하기');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('다음 항목을 확인해주세요:')).toBeInTheDocument();
      expect(screen.getByText('팀명을 입력해주세요')).toBeInTheDocument();
      expect(screen.getByText('이메일 형식이 올바르지 않습니다')).toBeInTheDocument();
    });
  });
});
