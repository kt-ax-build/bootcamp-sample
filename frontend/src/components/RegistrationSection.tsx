import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, IconButton, Alert, Snackbar, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import type { TeamMember } from '../model/types';
import { HackathonService } from '../services/HackathonService';

const RegistrationContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 14),
  minHeight: 1200,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: 784,
  margin: '0 auto',
  padding: theme.spacing(0, 3),
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(6),
}));

const FormCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 12.75,
  border: '1px solid rgba(0,0,0,0.01)',
  marginBottom: theme.spacing(3),
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 3, 1.5),
  borderBottom: '1px solid rgba(0,0,0,0.01)',
}));

const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 3, 3),
}));

const FormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: 12.3,
  fontWeight: 500,
  color: '#101828',
  marginBottom: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f3f3f5',
    borderRadius: 6.75,
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      fontSize: 12.3,
      padding: theme.spacing(1.5, 2),
    },
    '& textarea': {
      fontSize: 12.3,
      padding: theme.spacing(1.5, 2),
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: 12.3,
    color: '#717182',
  },
}));

const TeamMemberCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
}));

const MemberHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: '1px solid #f3f4f6',
}));

const FormRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(2.5),
  '& > *': {
    flex: 1,
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#9810fa',
  color: '#ffffff',
  fontSize: 15.8,
  fontWeight: 500,
  padding: theme.spacing(1, 7),
  borderRadius: '50px',
  marginTop: theme.spacing(3),
  '&:hover': {
    backgroundColor: '#7a0dc7',
  },
}));

const RegistrationSection: React.FC = () => {
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

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
    }
    if (!ideaInfo.problemStatement.trim()) {
      newErrors.problemStatement = '해결하고자 하는 문제를 입력해주세요.';
    }
    if (!ideaInfo.solutionApproach.trim()) {
      newErrors.solutionApproach = '솔루션 접근 방법을 입력해주세요.';
    }

    // 추가 팀원 검증
    teamInfo.members.slice(1).forEach((member, index) => {
      if (!member?.name?.trim()) {
        newErrors[`name${index + 1}`] = `팀원 ${index + 1} 이름을 입력해주세요.`;
      }
      if (!member?.email?.trim()) {
        newErrors[`email${index + 1}`] = `팀원 ${index + 1} 이메일을 입력해주세요.`;
      } else if (!/\S+@\S+\.\S+/.test(member.email)) {
        newErrors[`email${index + 1}`] = `팀원 ${index + 1} 올바른 이메일 형식을 입력해주세요.`;
      }
      if (!member?.department?.trim()) {
        newErrors[`department${index + 1}`] = `팀원 ${index + 1} 소속 부서를 입력해주세요.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTeamInfoChange = (field: string, value: string) => {
    setTeamInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleIdeaInfoChange = (field: string, value: string) => {
    setIdeaInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    setTeamInfo(prev => ({
      ...prev,
      members: prev.members.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    }));
    
    const errorKey = index === 0 ? `leader${field.charAt(0).toUpperCase() + field.slice(1)}` : `${field}${index}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addMember = () => {
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
      setSnackbarMessage('필수 항목을 모두 입력해주세요.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 팀 리더 정보로 신청서 생성
      const applicationData = {
        teamName: teamInfo.teamName,
        memberName: teamInfo.members[0]?.name || '',
        email: teamInfo.members[0]?.email || '',
        phone: teamInfo.members[0]?.phone || '',
        role: teamInfo.members[0]?.role || '',
        ideaTitle: ideaInfo.ideaTitle,
        ideaDescription: ideaInfo.ideaDescription,
      };

      await HackathonService.createApplication(applicationData);
      setSnackbarMessage('참가 신청이 완료되었습니다.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      // 폼 초기화
      setTeamInfo({
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
      setIdeaInfo({
        ideaTitle: '',
        ideaDescription: '',
        problemStatement: '',
        solutionApproach: '',
        techStack: '',
      });
      setErrors({});
    } catch (error) {
      setSnackbarMessage('참가 신청에 실패했습니다.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Registration failed:', error);
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

  return (
    <RegistrationContainer>
      <ContentContainer>
        <HeaderSection>
          <Typography variant="h2" sx={{ fontSize: '48px', fontWeight: 700, color: '#101828', textAlign: 'center', mb: 2 }}>
            신청 및 접수
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '20px', color: '#6b7280', textAlign: 'center', maxWidth: '600px' }}>
            AI 해커톤에 참가하시려면 아래 정보를 입력해주세요
          </Typography>
        </HeaderSection>

        <FormCard>
          <CardHeader>
            <Typography variant="h4" sx={{ fontSize: '21px', fontWeight: 400, color: '#101828' }}>
              팀 정보
            </Typography>
          </CardHeader>
          <CardContent>
            <FormRow>
              <FormField>
                <FieldLabel>팀명 *</FieldLabel>
                <StyledTextField
                  fullWidth
                  value={teamInfo.teamName}
                  onChange={(e) => handleTeamInfoChange('teamName', e.target.value)}
                  placeholder="팀명을 입력하세요"
                  error={!!errors.teamName}
                  helperText={errors.teamName}
                />
              </FormField>
              <FormField>
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
                rows={3}
                value={teamInfo.teamDescription || ''}
                onChange={(e) => handleTeamInfoChange('teamDescription', e.target.value)}
                placeholder="팀을 간단히 소개해주세요"
              />
            </FormField>
          </CardContent>
        </FormCard>

        <FormCard>
          <CardHeader>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Typography variant="h4" sx={{ fontSize: '21px', fontWeight: 400, color: '#101828' }}>
                팀원 정보
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addMember}
                variant="outlined"
                size="small"
                sx={{
                  border: '1px solid #d1d5db',
                  color: '#6b7280',
                  backgroundColor: '#ffffff',
                  '&:hover': {
                    borderColor: '#9810fa',
                    color: '#9810fa',
                    backgroundColor: '#f9fafb',
                  },
                  textTransform: 'none',
                  fontSize: '12.3px',
                  fontWeight: 500,
                  padding: '4px 9.75px',
                  borderRadius: '6.75px',
                  minHeight: '28px',
                }}
              >
                팀원 추가
              </Button>
            </Box>
          </CardHeader>
          <CardContent>
            <TeamMemberCard>
              <MemberHeader>
                <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600, color: '#101828' }}>
                  팀 리더
                </Typography>
              </MemberHeader>
              <FormRow>
                <FormField>
                  <FieldLabel>이름 *</FieldLabel>
                  <StyledTextField
                    fullWidth
                    value={teamInfo.members[0]?.name || ''}
                    onChange={(e) => handleMemberChange(0, 'name', e.target.value)}
                    placeholder="이름을 입력하세요"
                    error={!!errors.leaderName}
                    helperText={errors.leaderName}
                  />
                </FormField>
                <FormField>
                  <FieldLabel>소속 부서 *</FieldLabel>
                  <StyledTextField
                    fullWidth
                    value={teamInfo.members[0]?.department || ''}
                    onChange={(e) => handleMemberChange(0, 'department', e.target.value)}
                    placeholder="부서명을 입력하세요"
                    error={!!errors.leaderDepartment}
                    helperText={errors.leaderDepartment}
                  />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField>
                  <FieldLabel>직급/직책</FieldLabel>
                  <StyledTextField
                    fullWidth
                    value={teamInfo.members[0]?.position || ''}
                    onChange={(e) => handleMemberChange(0, 'position', e.target.value)}
                    placeholder="직급 또는 직책을 입력하세요"
                  />
                </FormField>
                <FormField>
                  <FieldLabel>이메일 *</FieldLabel>
                  <StyledTextField
                    fullWidth
                    value={teamInfo.members[0]?.email || ''}
                    onChange={(e) => handleMemberChange(0, 'email', e.target.value)}
                    placeholder="이메일을 입력하세요"
                    error={!!errors.leaderEmail}
                    helperText={errors.leaderEmail}
                  />
                </FormField>
              </FormRow>
            </TeamMemberCard>

            {/* Additional Team Members */}
            {teamInfo.members.slice(1).map((member, index) => (
              <TeamMemberCard key={index + 1}>
                <MemberHeader>
                  <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600, color: '#101828' }}>
                    팀원 {index + 1}
                  </Typography>
                  <IconButton
                    onClick={() => removeMember(index + 1)}
                    size="small"
                    sx={{
                      color: '#ef4444',
                      '&:hover': {
                        backgroundColor: '#fef2f2',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </MemberHeader>
                <FormRow>
                  <FormField>
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
                  <FormField>
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
                  <FormField>
                    <FieldLabel>직급/직책</FieldLabel>
                    <StyledTextField
                      fullWidth
                      value={member.position}
                      onChange={(e) => handleMemberChange(index + 1, 'position', e.target.value)}
                      placeholder="직급 또는 직책을 입력하세요"
                    />
                  </FormField>
                  <FormField>
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
              </TeamMemberCard>
            ))}
          </CardContent>
        </FormCard>

        <FormCard>
          <CardHeader>
            <Typography variant="h4" sx={{ fontSize: '21px', fontWeight: 400, color: '#101828' }}>
              아이디어 정보
            </Typography>
          </CardHeader>
          <CardContent>
            <FormField>
              <FieldLabel>아이디어 제목 *</FieldLabel>
              <StyledTextField
                fullWidth
                value={ideaInfo.ideaTitle}
                onChange={(e) => handleIdeaInfoChange('ideaTitle', e.target.value)}
                placeholder="아이디어의 제목을 입력하세요"
                error={!!errors.ideaTitle}
                helperText={errors.ideaTitle}
              />
            </FormField>
            <FormField>
              <FieldLabel>해결하고자 하는 문제 *</FieldLabel>
              <StyledTextField
                fullWidth
                multiline
                rows={3}
                value={ideaInfo.problemStatement || ''}
                onChange={(e) => handleIdeaInfoChange('problemStatement', e.target.value)}
                placeholder="어떤 문제를 해결하고 싶으신가요? (300자 이내)"
                error={!!errors.problemStatement}
                helperText={errors.problemStatement}
              />
            </FormField>
            <FormField>
              <FieldLabel>솔루션 접근 방법 *</FieldLabel>
              <StyledTextField
                fullWidth
                multiline
                rows={3}
                value={ideaInfo.solutionApproach || ''}
                onChange={(e) => handleIdeaInfoChange('solutionApproach', e.target.value)}
                placeholder="어떤 방식으로 해결하실 계획인가요? (500자 이내)"
                error={!!errors.solutionApproach}
                helperText={errors.solutionApproach}
              />
            </FormField>
            <FormField>
              <FieldLabel>사용 예정 기술스택</FieldLabel>
              <StyledTextField
                fullWidth
                value={ideaInfo.techStack || ''}
                onChange={(e) => handleIdeaInfoChange('techStack', e.target.value)}
                placeholder="예: Python, TensorFlow, React, etc."
              />
            </FormField>
          </CardContent>
        </FormCard>

        <Box display="flex" justifyContent="center">
          <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '제출 중...' : '참가 신청하기'}
          </SubmitButton>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </ContentContainer>
    </RegistrationContainer>
  );
};

export default RegistrationSection;