import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, IconButton, Alert, Snackbar, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { TeamMember, CreateApplicationRequest } from '../model/types';
import { HackathonService } from '../services/HackathonService';
import type { HackathonApplication } from '../model/types';

const RegistrationContainer = styled(Box)(() => ({
  padding: '70px 568px',
  minHeight: 1200,
  background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
}));

const ContentContainer = styled(Box)(() => ({
  maxWidth: 784,
  margin: '0 auto',
  padding: '0 21px',
}));

const HeaderSection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '21px',
  marginBottom: '42px',
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: '42px',
  fontWeight: 700,
  color: '#101828',
  textAlign: 'center',
  lineHeight: '42px',
}));

const SectionSubtitle = styled(Typography)(() => ({
  fontSize: '17.5px',
  color: '#4a5565',
  textAlign: 'center',
  maxWidth: '588px',
  lineHeight: '24.5px',
}));

const FormCard = styled(Paper)(() => ({
  marginBottom: '28px',
}));

const CardHeader = styled(Box)(() => ({
  padding: '16px 16px 8px 16px',
  borderBottom: 'none',
}));

const CardTitle = styled(Typography)(() => ({
  fontSize: '21px',
  fontWeight: 400,
  color: '#101828',
  lineHeight: '28px',
}));

const CardContent = styled(Box)(() => ({
  padding: '0 16px 16px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

const FormField = styled(Box)(() => ({
  marginBottom: '0',
  '&.half-width': {
    flex: '0 0 calc(50% - 8px)',
  },
}));

const FormRow = styled(Box)(() => ({
  display: 'flex',
  gap: '16px',
  width: '100%',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
}));

const FieldLabel = styled(Typography)(() => ({
  fontSize: '13px',
  fontWeight: 500,
  color: '#111827',
  marginBottom: '4px',
  lineHeight: '18px',
}));

const StyledTextField = styled(TextField)(() => ({
  width: '100%', // 전체 넓이 사용
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    width: '100%', // 전체 넓이 사용
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      fontSize: '14px',
      padding: '4px 6px',
      color: '#374151',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
      lineHeight: '1.4',
      height: '32px',
      minHeight: '32px',
      width: '100%', // 전체 넓이 사용
    },
    '& .MuiOutlinedInput-root:not(.MuiInputBase-multiline)': {
      height: '32px',
      minHeight: '32px',
    },
    '& .MuiOutlinedInput-root.MuiInputBase-multiline': {
      minHeight: '48px',
      maxHeight: '48px',
      alignItems: 'flex-start',
      padding: '0px',
      '& .MuiInputBase-input': {
        padding: '2px 4px',
      },
    },
    '& input::placeholder': {
      color: '#6b7280',
      opacity: 1,
      fontSize: '14px',
    },
    '& textarea': {
      fontSize: '14px',
      padding: '2px 4px',
      color: '#374151',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
      lineHeight: '1.4',
      minHeight: '48px',
      maxHeight: '48px',
      resize: 'none',
    },
    '& textarea::placeholder': {
      color: '#6b7280',
      opacity: 1,
      fontSize: '14px',
      lineHeight: '1.5',
    },
    '&:hover': {
      backgroundColor: '#e2e8f0',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      border: '1px solid #9810fa',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
    color: '#6b7280',
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#6b7280',
    opacity: 1,
    fontSize: '14px',
  },
  '& .MuiInputBase-input[data-multiline="true"]::placeholder': {
    color: '#6b7280',
    opacity: 1,
    fontSize: '14px',
    lineHeight: '1.5',
    paddingTop: '0',
    paddingBottom: '0',
  },
  '& .MuiInputBase-input': {
    padding: '4px 6px',
    boxSizing: 'border-box',
    width: '100%', // 전체 넓이 사용
  },
  '& .MuiInputBase-input:not(textarea)': {
    height: '32px',
    minHeight: '32px',
  },

  '& .MuiFormHelperText-root': {
    fontSize: '11px',
    color: '#6b7280',
    marginLeft: '0',
    marginTop: '2px',
    textAlign: 'left',
  },
  '&.multiline': {
    '& .MuiOutlinedInput-root': {
      alignItems: 'flex-start',
    },
  },
}));

const AddMemberButton = styled(Button)(() => ({
  backgroundColor: '#ffffff',
  color: '#0a0a0a',
  fontSize: '12.3px',
  fontWeight: 500,
  padding: '1px 9.75px',
  borderRadius: '6.75px',
  border: '1px solid #d1d5db',
  minHeight: '28px',
  textTransform: 'none',
  lineHeight: '17.5px',
  '&:hover': {
    backgroundColor: '#f9fafb',
    border: '1px solid #9ca3af',
  },
  '& .MuiButton-startIcon': {
    marginRight: '5.25px',
  },
}));

const TeamMemberCard = styled(Paper)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: '8.75px',
  border: '1px solid #e5e7eb',
  padding: '22px',
  marginBottom: '28px', // 팀원 정보와 팀 리더 간의 간격 증가
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
}));

const TeamMemberTitle = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 600,
  color: '#101828',
  lineHeight: '21px',
}));

const MemberHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '14px',
  paddingBottom: '7px',
  // borderBottom 제거 - 선 없음
}));

const MemberFormContainer = styled(Box)(() => ({
  width: '100%',
  marginTop: '14px', // 팀 리더 제목과 입력 필드 간의 간격
  display: 'flex',
  flexDirection: 'column',
  gap: '20.25px',
}));



const RemoveMemberButton = styled(IconButton)(({ theme }) => ({
  color: '#ef4444',
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: '#fef2f2',
  },
}));

const SubmitButton = styled(Button)(() => ({
  backgroundColor: '#9810fa',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 600,
  padding: '12px 32px',
  borderRadius: '50px',
  textTransform: 'none',
  lineHeight: '24px',
  minHeight: '48px',
  minWidth: '200px',
  boxShadow: '0px 4px 12px rgba(152, 16, 250, 0.3)',
  '&:hover': {
    backgroundColor: '#7c3aed',
    boxShadow: '0px 6px 16px rgba(152, 16, 250, 0.4)',
  },
  '&:disabled': {
    backgroundColor: '#d1d5db',
    color: '#6b7280',
    boxShadow: 'none',
  },
}));

const SubmitNote = styled(Typography)(() => ({
  fontSize: '13px',
  color: '#6b7280',
  textAlign: 'center',
  lineHeight: '18px',
  marginTop: '0px',
}));

const SuccessContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '120px 0 80px 0',
}));

const SuccessIcon = styled(CheckCircleIcon)(() => ({
  fontSize: '64px',
  color: '#10b981',
  marginBottom: '32px',
}));

const SuccessTitle = styled(Typography)(() => ({
  fontSize: '32px',
  fontWeight: 700,
  color: '#101828',
  marginBottom: '16px',
  lineHeight: '40px',
}));

const SuccessMessage = styled(Typography)(() => ({
  fontSize: '16px',
  color: '#6b7280',
  marginBottom: '40px',
  lineHeight: '24px',
  maxWidth: '400px',
}));

const RegistrationSection: React.FC = () => {
  // URL 파라미터 확인
  const urlParams = new URLSearchParams(window.location.search);
  const isEditMode = urlParams.get('edit') === 'true';
  const editId = urlParams.get('id');

  const [teamInfo, setTeamInfo] = useState({
    teamName: '',
    teamSize: '',
    teamDescription: '',
    members: [
      {
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        position: '',
        isLeader: true,
      } as TeamMember,
    ],
  });

  const [ideaInfo, setIdeaInfo] = useState({
    ideaTitle: '',
    ideaDescription: '',
    problemStatement: '',
    solutionApproach: '',
    techStack: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [existingApplication, setExistingApplication] = useState<HackathonApplication | null>(null);

  // 수정 모드일 때 기존 데이터 불러오기
  React.useEffect(() => {
    if (isEditMode && editId) {
      loadExistingApplicationById(editId);
    }
  }, [isEditMode, editId]);

  // ID로 기존 신청 정보를 불러오는 함수
  const loadExistingApplicationById = async (id: string) => {
    try {
      const application = await HackathonService.getApplication(parseInt(id));
      setExistingApplication(application);
      
      // 팀 정보 설정
      setTeamInfo({
        teamName: application.team?.teamName || '',
        teamSize: application.team?.teamSize || application.team?.members?.length?.toString() || '',
        teamDescription: application.team?.teamDescription || '',
        members: application.team?.members || [
          {
            name: '',
            email: '',
            phone: '',
            role: '',
            department: '',
            position: '',
            isLeader: true,
          } as TeamMember,
        ],
      });

      // 아이디어 정보 설정
      setIdeaInfo({
        ideaTitle: application.ideaTitle || '',
        ideaDescription: application.ideaDescription || '',
        problemStatement: application.problemStatement || '',
        solutionApproach: application.solutionApproach || '',
        techStack: application.techStack || '',
      });

      setSnackbarMessage('기존 신청 정보를 불러왔습니다.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('기존 신청 정보 불러오기 실패:', error);
      setSnackbarMessage('기존 신청 정보를 불러오는데 실패했습니다.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // 기존 신청 정보를 불러와서 폼에 채우는 함수
  const loadExistingApplication = async () => {
    try {
      let applications: HackathonApplication[] = [];
      
      // 팀 리더의 이메일로 기존 신청 정보 조회
      const leaderEmail = teamInfo.members[0]?.email;
      if (leaderEmail) {
        try {
          console.log('이메일로 기존 신청 정보 조회:', leaderEmail);
          applications = await HackathonService.getApplications({ memberName: leaderEmail });
          console.log('이메일로 조회 결과:', applications.length);
        } catch (error) {
          console.log('이메일로 조회 실패, 팀명으로 시도');
        }
      }
      
      // 이메일로 찾지 못했고, 팀명이 있으면 팀명으로 조회
      if (applications.length === 0 && teamInfo.teamName) {
        try {
          console.log('팀명으로 기존 신청 정보 조회:', teamInfo.teamName);
          applications = await HackathonService.getApplications({ teamName: teamInfo.teamName });
          console.log('팀명으로 조회 결과:', applications.length);
        } catch (error) {
          console.log('팀명으로도 조회 실패');
        }
      }
      
      if (applications && applications.length > 0) {
        const existingApp = applications[0];
        console.log('기존 신청 정보 찾음:', existingApp.id);
        setExistingApplication(existingApp);
        
        // 팀 정보 설정
        setTeamInfo({
          teamName: existingApp.team?.teamName || '',
          teamSize: existingApp.team?.teamSize || existingApp.team?.members?.length?.toString() || '',
          teamDescription: existingApp.team?.teamDescription || '',
          members: existingApp.team?.members || [
            {
              name: '',
              email: '',
              phone: '',
              role: '',
              department: '',
              position: '',
              isLeader: true,
            } as TeamMember,
          ],
        });

        // 아이디어 정보 설정
        setIdeaInfo({
          ideaTitle: existingApp.ideaTitle || '',
          ideaDescription: existingApp.ideaDescription || '',
          problemStatement: existingApp.problemStatement || '',
          solutionApproach: existingApp.solutionApproach || '',
          techStack: existingApp.techStack || '',
        });

        setSnackbarMessage('기존 신청 정보를 불러왔습니다.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        console.log('기존 신청 정보를 찾을 수 없음');
        setSnackbarMessage('기존 신청 정보를 찾을 수 없습니다. 새로운 신청으로 진행됩니다.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        // 기존 신청 정보가 없으면 새로 생성할 준비
        setExistingApplication(null);
      }
    } catch (error) {
      console.error('기존 신청 정보 불러오기 실패:', error);
      setSnackbarMessage('기존 신청 정보를 불러올 수 없습니다. 새로운 신청으로 진행됩니다.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setExistingApplication(null);
    }
  };

  const handleEditApplication = () => {
    setIsSubmitted(false);
    // 기존 신청 정보가 있으면 바로 사용, 없으면 조회 시도
    if (existingApplication && existingApplication.id) {
      console.log('기존 신청 정보가 있음, 바로 사용:', existingApplication.id);
      // 기존 신청 정보를 폼에 채우기
      setTeamInfo({
        teamName: existingApplication.team?.teamName || '',
        teamSize: existingApplication.team?.members?.length?.toString() || '',
        teamDescription: existingApplication.team?.teamDescription || '',
        members: existingApplication.team?.members || [
          {
            name: '',
            email: '',
            phone: '',
            role: '',
            department: '',
            position: '',
            isLeader: true,
          } as TeamMember,
        ],
      });

      setIdeaInfo({
        ideaTitle: existingApplication.ideaTitle || '',
        ideaDescription: existingApplication.ideaDescription || '',
        problemStatement: existingApplication.problemStatement || '',
        solutionApproach: existingApplication.solutionApproach || '',
        techStack: existingApplication.techStack || '',
      });
    } else {
      console.log('기존 신청 정보가 없음, 조회 시도');
      // 기존 신청 정보를 불러오기 시도
      loadExistingApplication();
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // 팀명 검증
    if (!teamInfo.teamName.trim()) {
      newErrors.teamName = '팀명을 입력해주세요.';
    }

    // 팀 리더 정보 검증
    if (!teamInfo.members[0]?.name?.trim()) {
      newErrors.leaderName = '팀 리더 이름을 입력해주세요.';
    }
    if (!teamInfo.members[0]?.email?.trim()) {
      newErrors.leaderEmail = '팀 리더 이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(teamInfo.members[0]?.email || '')) {
      newErrors.leaderEmail = '올바른 이메일 형식을 입력해주세요.';
    }
    if (!teamInfo.members[0]?.department?.trim()) {
      newErrors.leaderDepartment = '팀 리더 소속 부서를 입력해주세요.';
    }

    // 아이디어 정보 검증
    if (!ideaInfo.ideaTitle.trim()) {
      newErrors.ideaTitle = '아이디어 제목을 입력해주세요.';
    } else if (ideaInfo.ideaTitle.length > 300) {
      newErrors.ideaTitle = '아이디어 제목은 300자 이내로 입력해주세요.';
    }
    if (!ideaInfo.problemStatement.trim()) {
      newErrors.problemStatement = '해결하고자 하는 문제를 입력해주세요.';
    } else if (ideaInfo.problemStatement.length > 300) {
      newErrors.problemStatement = '해결하고자 하는 문제는 300자 이내로 입력해주세요.';
    }
    if (!ideaInfo.solutionApproach.trim()) {
      newErrors.solutionApproach = '솔루션 접근 방법을 입력해주세요.';
    } else if (ideaInfo.solutionApproach.length > 500) {
      newErrors.solutionApproach = '솔루션 접근 방법은 500자 이내로 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTeamInfoChange = (field: string, value: string) => {
    setTeamInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleIdeaInfoChange = (field: string, value: string) => {
    setIdeaInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    setTeamInfo(prev => ({
      ...prev,
      members: prev.members.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    }));
  };

  const addMember = () => {
    if (teamInfo.members.length < 4) {
      setTeamInfo(prev => ({
        ...prev,
        members: [
          ...prev.members,
          {
            name: '',
            email: '',
            phone: '',
            role: '',
            department: '',
            position: '',
            isLeader: false,
          } as TeamMember,
        ],
      }));
    }
  };

  const removeMember = (index: number) => {
    if (teamInfo.members.length > 1) {
      setTeamInfo(prev => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // API 요청 데이터 구성
      const requestData: CreateApplicationRequest = {
        teamName: teamInfo.teamName,
        teamSize: teamInfo.teamSize,
        teamDescription: teamInfo.teamDescription,
        ideaTitle: ideaInfo.ideaTitle,
        ideaDescription: ideaInfo.ideaDescription,
        problemStatement: ideaInfo.problemStatement,
        solutionApproach: ideaInfo.solutionApproach,
        techStack: ideaInfo.techStack,
        members: teamInfo.members,
      };

      // 기존 신청 정보가 있으면 업데이트, 없으면 새로 생성
      if (existingApplication && existingApplication.id) {
        console.log('기존 신청 정보 업데이트:', existingApplication.id);
        await HackathonService.updateApplication(existingApplication.id, requestData);
        setSnackbarMessage('신청 정보가 성공적으로 수정되었습니다!');
      } else {
        console.log('새 신청 정보 생성');
        const newApplication = await HackathonService.createApplication(requestData);
        setExistingApplication(newApplication); // 새로 생성된 신청 정보 저장
        setSnackbarMessage('신청이 성공적으로 제출되었습니다!');
      }
      
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Submit error:', error);
      setSnackbarMessage(error.message || '제출 중 오류가 발생했습니다.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // 제출 완료 화면
  if (isSubmitted) {
    return (
      <RegistrationContainer>
        <ContentContainer>
          <SuccessContainer>
            <SuccessIcon />
            <SuccessTitle>
              신청이 완료되었습니다!
            </SuccessTitle>
            <SuccessMessage>
              등록해주신 이메일로 확인 메일을 발송했습니다.<br />
              서류 심사 결과는 3월 20일(수)에 개별 안내드립니다.
            </SuccessMessage>
            <SubmitButton onClick={handleEditApplication}>
              정보 수정하기
            </SubmitButton>
          </SuccessContainer>
        </ContentContainer>
      </RegistrationContainer>
    );
  }

  return (
    <RegistrationContainer>
      <ContentContainer>
        <HeaderSection>
          <SectionTitle>
            신청 및 접수
          </SectionTitle>
          <SectionSubtitle>
            AI 해커톤에 참가하시려면 아래 정보를 입력해주세요
          </SectionSubtitle>
        </HeaderSection>

        <FormCard>
          <CardHeader>
            <CardTitle>
              팀 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormRow>
              <FormField className="half-width">
                <FieldLabel>팀명 *</FieldLabel>
                <StyledTextField
                  fullWidth
                  value={teamInfo.teamName}
                  onChange={(e) => handleTeamInfoChange('teamName', e.target.value)}
                  placeholder="팀명을 입력하세요"
                  error={!!errors.teamName}
                  helperText={errors.teamName}
                  data-testid="team-name-input"
                />
              </FormField>
              <FormField className="half-width">
                <FieldLabel>팀 구성</FieldLabel>
                <StyledTextField
                  fullWidth
                  select
                  value={teamInfo.teamSize || ''}
                  onChange={(e) => handleTeamInfoChange('teamSize', e.target.value)}
                  placeholder="팀 구성을 선택하세요"
                >
                  <MenuItem value="1">개인 (1명)</MenuItem>
                  <MenuItem value="2">2명</MenuItem>
                  <MenuItem value="3">3명</MenuItem>
                  <MenuItem value="4">4명</MenuItem>
                </StyledTextField>
              </FormField>
            </FormRow>
            <FormField>
              <FieldLabel>팀 소개</FieldLabel>
              <StyledTextField
                fullWidth
                multiline
                rows={2}
                value={teamInfo.teamDescription || ''}
                onChange={(e) => handleTeamInfoChange('teamDescription', e.target.value)}
                placeholder="팀을 간단히 소개해주세요"
                className="multiline"
              />
            </FormField>
          </CardContent>
        </FormCard>

        <FormCard>
          <CardHeader>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <CardTitle>
                팀원 정보
              </CardTitle>
              <AddMemberButton onClick={addMember} startIcon={<AddIcon />}>
                팀원 추가
              </AddMemberButton>
            </Box>
          </CardHeader>
          <CardContent>
            <TeamMemberCard>
              <MemberHeader>
                <TeamMemberTitle>
                  팀 리더
                </TeamMemberTitle>
              </MemberHeader>
              <MemberFormContainer>
                <FormRow>
                  <FormField className="half-width">
                    <FieldLabel>이름 *</FieldLabel>
                    <StyledTextField
                      fullWidth
                      value={teamInfo.members[0]?.name || ''}
                      onChange={(e) => handleMemberChange(0, 'name', e.target.value)}
                      placeholder="이름을 입력하세요"
                      error={!!errors.leaderName}
                      helperText={errors.leaderName}
                      data-testid="leader-name-input"
                    />
                  </FormField>
                  <FormField className="half-width">
                    <FieldLabel>소속 부서 *</FieldLabel>
                    <StyledTextField
                      fullWidth
                      value={teamInfo.members[0]?.department || ''}
                      onChange={(e) => handleMemberChange(0, 'department', e.target.value)}
                      placeholder="부서명을 입력하세요"
                      error={!!errors.leaderDepartment}
                      helperText={errors.leaderDepartment}
                      data-testid="leader-department-input"
                    />
                  </FormField>
                </FormRow>
                <FormRow>
                  <FormField className="half-width">
                    <FieldLabel>직급/직책</FieldLabel>
                    <StyledTextField
                      fullWidth
                      value={teamInfo.members[0]?.position || ''}
                      onChange={(e) => handleMemberChange(0, 'position', e.target.value)}
                      placeholder="직급 또는 직책을 입력하세요"
                    />
                  </FormField>
                  <FormField className="half-width">
                    <FieldLabel>이메일 *</FieldLabel>
                    <StyledTextField
                      fullWidth
                      value={teamInfo.members[0]?.email || ''}
                      onChange={(e) => handleMemberChange(0, 'email', e.target.value)}
                      placeholder="이메일을 입력하세요"
                      error={!!errors.leaderEmail}
                      helperText={errors.leaderEmail}
                      data-testid="leader-email-input"
                    />
                  </FormField>
                </FormRow>
              </MemberFormContainer>
            </TeamMemberCard>

            {/* Additional Team Members */}
            {teamInfo.members.slice(1).map((member, index) => (
              <TeamMemberCard key={index + 1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <TeamMemberTitle>
                    팀원 {index + 1}
                  </TeamMemberTitle>
                  <RemoveMemberButton
                    onClick={() => removeMember(index + 1)}
                    size="small"
                  >
                    <DeleteIcon />
                  </RemoveMemberButton>
                </Box>
                <MemberFormContainer>
                  <FormRow>
                    <FormField className="half-width">
                      <FieldLabel>이름 *</FieldLabel>
                      <StyledTextField
                        fullWidth
                        value={member.name}
                        onChange={(e) => handleMemberChange(index + 1, 'name', e.target.value)}
                        placeholder="이름을 입력하세요"
                        error={!!errors[`name${index + 1}`]}
                        helperText={errors[`name${index + 1}`]}
                      />
                    </FormField>
                    <FormField className="half-width">
                      <FieldLabel>소속 부서 *</FieldLabel>
                      <StyledTextField
                        fullWidth
                        value={member.department}
                        onChange={(e) => handleMemberChange(index + 1, 'department', e.target.value)}
                        placeholder="부서명을 입력하세요"
                        error={!!errors[`department${index + 1}`]}
                        helperText={errors[`department${index + 1}`]}
                      />
                    </FormField>
                  </FormRow>
                  <FormRow>
                    <FormField className="half-width">
                      <FieldLabel>직급/직책</FieldLabel>
                      <StyledTextField
                        fullWidth
                        value={member.position}
                        onChange={(e) => handleMemberChange(index + 1, 'position', e.target.value)}
                        placeholder="직급 또는 직책을 입력하세요"
                      />
                    </FormField>
                    <FormField className="half-width">
                      <FieldLabel>이메일 *</FieldLabel>
                      <StyledTextField
                        fullWidth
                        value={member.email}
                        onChange={(e) => handleMemberChange(index + 1, 'email', e.target.value)}
                        placeholder="이메일을 입력하세요"
                        error={!!errors[`email${index + 1}`]}
                        helperText={errors[`email${index + 1}`]}
                      />
                    </FormField>
                  </FormRow>
                </MemberFormContainer>
              </TeamMemberCard>
            ))}
          </CardContent>
        </FormCard>

        {/* 아이디어 정보 */}
        <FormCard>
          <CardHeader>
            <CardTitle>
              아이디어 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField>
              <FieldLabel>아이디어 제목 *</FieldLabel>
              <StyledTextField
                fullWidth
                value={ideaInfo.ideaTitle}
                onChange={(e) => handleIdeaInfoChange('ideaTitle', e.target.value)}
                placeholder="아이디어의 제목을 입력하세요 (300자 이내)"
                error={!!errors.ideaTitle}
                helperText={errors.ideaTitle}
                data-testid="idea-title-input"
                inputProps={{
                  maxLength: 300,
                }}
              />
            </FormField>
            <FormField>
              <FieldLabel>해결하고자 하는 문제 *</FieldLabel>
              <StyledTextField
                fullWidth
                multiline
                rows={2}
                value={ideaInfo.problemStatement}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 300) {
                    handleIdeaInfoChange('problemStatement', value);
                  }
                }}
                placeholder="어떤 문제를 해결하고 싶으신가요? (300자 이내)"
                error={!!errors.problemStatement}
                helperText={errors.problemStatement}
                data-testid="problem-statement-input"
                className="multiline"
                inputProps={{
                  maxLength: 300,
                }}
              />
            </FormField>
            <FormField>
              <FieldLabel>솔루션 접근 방법 *</FieldLabel>
              <StyledTextField
                fullWidth
                multiline
                rows={2}
                value={ideaInfo.solutionApproach}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 500) {
                    handleIdeaInfoChange('solutionApproach', value);
                  }
                }}
                placeholder="어떤 방식으로 해결하실 계획인가요? (500자 이내)"
                error={!!errors.solutionApproach}
                helperText={errors.solutionApproach}
                data-testid="solution-approach-input"
                className="multiline"
                inputProps={{
                  maxLength: 500,
                }}
              />
            </FormField>
            <FormField>
              <FieldLabel>사용 예정 기술스택</FieldLabel>
              <StyledTextField
                fullWidth
                value={ideaInfo.techStack}
                onChange={(e) => handleIdeaInfoChange('techStack', e.target.value)}
                placeholder="예: Python, TensorFlow, React, etc."
                data-testid="tech-stack-input"
                inputProps={{
                  maxLength: 200,
                }}
              />
            </FormField>
          </CardContent>
        </FormCard>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', mt: '40px' }}>
          <SubmitButton
            onClick={handleSubmit}
            disabled={isSubmitting}
            data-testid="submit-button"
          >
                          {isSubmitting ? '제출 중...' : (isEditMode ? '정보 수정하기' : '참가 신청하기')}
          </SubmitButton>
          <SubmitNote>
            * 제출 후에도 마감일 전까지 수정이 가능합니다
          </SubmitNote>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbarSeverity} 
            sx={{ width: '100%' }}
            data-testid={snackbarSeverity === 'success' ? 'success-message' : 'error-message'}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </ContentContainer>
    </RegistrationContainer>
  );
};

export default RegistrationSection;