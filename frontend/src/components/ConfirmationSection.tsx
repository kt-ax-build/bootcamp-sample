import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Alert, Snackbar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { HackathonService } from '../services/HackathonService';
import type { HackathonApplication } from '../model/types';

const ConfirmationContainer = styled(Box)(() => ({
  backgroundColor: '#f9fafb',
  padding: '70px 568px',
  paddingBottom: 200,
  minHeight: '100vh',
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

const SearchCard = styled(Paper)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: 12.75,
  border: '1px solid rgba(0,0,0,0.01)',
  marginBottom: '21px',
  boxShadow: 'none',
  transition: 'box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
}));

const CardHeader = styled(Box)(() => ({
  padding: '21px 21px 5.25px 21px',
  display: 'flex',
  alignItems: 'center',
  gap: '10.5px',
  marginBottom: '10px',
}));

const CardContent = styled(Box)(() => ({
  padding: '0 21px 21px 21px',
  '& .MuiFormControl-root': {
    '& .MuiInputLabel-root': {
      marginBottom: '7px',
    },
  },
}));

const SearchIconBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 21,
  height: 21,
  color: '#9810fa',
  marginRight: 3,
}));

const SearchForm = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '7px',
}));

const InputRow = styled(Box)(() => ({
  display: 'flex',
  gap: '14px',
  alignItems: 'flex-end',
}));

const FieldLabel = styled(Typography)(() => ({
  fontSize: '12.3px',
  color: '#0a0a0a',
  fontWeight: 500,
  lineHeight: '12.25px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif',
}));

const StyledTextField = styled(TextField)(() => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f3f3f5',
    borderRadius: '6.75px',
    width: '100%',
    height: '31.5px',
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      fontSize: '12.3px',
      padding: '8.5px 11.5px',
      color: '#717182',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
      lineHeight: 'normal',
      height: '31.5px',
      minHeight: '31.5px',
      width: '100%',
    },
    '& input::placeholder': {
      color: '#717182',
      opacity: 1,
      fontSize: '12.3px',
    },
    '&:hover': {
      backgroundColor: '#e2e8f0',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      border: '1px solid #9810fa',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#717182',
    opacity: 1,
    fontSize: '12.3px',
  },
}));

const SearchButton = styled(Button)(() => ({
  backgroundColor: '#9810fa',
  color: '#ffffff',
  fontSize: '12.3px',
  fontWeight: 500,
  padding: '7px 21px',
  borderRadius: '6.75px',
  textTransform: 'none',
  lineHeight: '17.5px',
  width: '100px',
  height: '31.5px',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: '#59168b',
  },
}));

const InfoCard = styled(Paper)(() => ({
  backgroundColor: '#eff6ff',
  borderRadius: 12.75,
  border: '1px solid #bedbff',
  padding: '21px',
  marginBottom: '21px',
  transition: 'box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
}));

const InfoTitle = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 600,
  color: '#1c398e',
  marginBottom: '7px',
  lineHeight: '21px',
}));

const InfoText = styled(Typography)(() => ({
  fontSize: 12.3,
  color: '#193cb8',
  lineHeight: '17.5px',
  marginBottom: '3.5px',
}));

const StatusBadge = styled(Box)(() => ({
  display: 'inline-block',
  padding: '4px 8px',
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 500,
  textTransform: 'uppercase',
}));

const StatusApproved = styled(StatusBadge)(() => ({
  backgroundColor: '#dcfce7',
  color: '#166534',
}));

const StatusPending = styled(StatusBadge)(() => ({
  backgroundColor: '#fef3c7',
  color: '#92400e',
}));

const StatusRejected = styled(StatusBadge)(() => ({
  backgroundColor: '#fee2e2',
  color: '#991b1b',
}));

// 결과 카드 스타일
const ResultCard = styled(Paper)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: 12.75,
  border: '1px solid rgba(0,0,0,0.01)',
  marginBottom: '21px',
  boxShadow: 'none',
  transition: 'box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
}));

const ResultCardHeader = styled(Box)(() => ({
  padding: '21px 21px 10.5px 21px',
  borderBottom: '1px solid #e5e7eb',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ResultCardContent = styled(Box)(() => ({
  padding: '21px',
}));

const CardTitle = styled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: 600,
  color: '#101828',
  lineHeight: '24px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif',
}));

const InfoRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10.5px',
  '&:last-child': {
    marginBottom: 0,
  },
}));

const InfoLabel = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 500,
  color: '#374151',
  minWidth: '100px',
  lineHeight: '20px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif',
}));

const InfoValue = styled(Typography)(() => ({
  fontSize: '14px',
  color: '#101828',
  lineHeight: '20px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif',
}));

// 타임라인 스타일
const TimelineContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
}));

const TimelineItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '14px',
}));

const TimelineDot = styled(Box)<{ active?: boolean; completed?: boolean }>(({ active, completed }) => ({
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  backgroundColor: completed ? '#10b981' : active ? '#f59e0b' : '#d1d5db',
  flexShrink: 0,
  marginTop: '2px',
}));

const TimelineContent = styled(Box)(() => ({
  flex: 1,
}));

const TimelineTitle = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 500,
  color: '#101828',
  lineHeight: '20px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif',
}));

const TimelineDate = styled(Typography)(() => ({
  fontSize: '12px',
  color: '#6b7280',
  lineHeight: '16px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif',
}));

const TimelineNote = styled(Typography)(() => ({
  fontSize: '12px',
  color: '#f59e0b',
  lineHeight: '16px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif',
  fontStyle: 'italic',
}));

const ConfirmationSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [application, setApplication] = useState<HackathonApplication | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('팀명 또는 이메일을 입력해주세요.');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setApplication(null);

    try {
      // 이메일 형식인지 확인 (더 정확한 정규식 사용)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(searchQuery.trim());
      
      let applications;
      if (isEmail) {
        // 이메일로 조회
        applications = await HackathonService.getApplications({ memberName: searchQuery.trim() });
      } else {
        // 팀명으로 조회
        applications = await HackathonService.getApplications({ teamName: searchQuery.trim() });
      }
      
      if (applications && applications.length > 0) {
        setApplication(applications[0]);
        setSuccessMessage('신청 정보를 찾았습니다.');
        setError(null);
      } else {
        setApplication(null);
        setError('해당 정보를 찾을 수 없습니다.');
        setSuccessMessage(null);
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setApplication(null);
      setSuccessMessage(null);
      if (err.response?.status === 400) {
        setError('검색 조건이 올바르지 않습니다.');
      } else if (err.response?.status === 404) {
        setError('해당 정보를 찾을 수 없습니다.');
      } else {
        setError('조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const infoItems = [
    '• 신청 시 등록하신 팀명 또는 이메일로 조회 가능합니다',
    '• 서류 심사 결과는 3월 20일(수)에 개별 통보됩니다',
    '• 문의사항은 ai-hackathon@company.com으로 연락해주세요',
  ];

  // 진행 상황 데이터
  const progressSteps = [
    {
      title: '신청 접수 완료',
      date: '2024년 3월 12일',
      completed: true,
      active: false,
    },
    {
      title: '서류 심사 중',
      date: '3월 20일 결과 발표 예정',
      completed: false,
      active: true,
      note: '3월 20일 결과 발표 예정',
    },
    {
      title: '예선 진행',
      date: '3월 25일 ~ 4월 5일',
      completed: false,
      active: false,
    },
    {
      title: '결선 진행',
      date: '4월 26일 ~ 4월 27일',
      completed: false,
      active: false,
    },
  ];

  return (
    <ConfirmationContainer>
      <ContentContainer>
        <HeaderSection>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: '42px', 
              fontWeight: 700, 
              color: '#101828', 
              textAlign: 'center', 
              lineHeight: '42px',
              fontFamily: '"Apple SD Gothic Neo", sans-serif',
            }}
          >
            Q 신청 조회
          </Typography>
        </HeaderSection>

        <SearchCard>
          <CardHeader>
            <SearchIconBox>
              <SearchIcon sx={{ fontSize: 21, color: '#9810fa' }} />
            </SearchIconBox>
            <Typography 
              variant="h4" 
              sx={{ 
                fontSize: '21px', 
                fontWeight: 400, 
                color: '#101828',
                lineHeight: '28px',
                fontFamily: '"Apple SD Gothic Neo", sans-serif',
              }}
            >
              신청 조회
            </Typography>
          </CardHeader>
          <CardContent>
            <SearchForm>
              <FieldLabel>팀명 또는 신청자 이메일</FieldLabel>
              <InputRow>
                <StyledTextField
                  fullWidth
                  placeholder="팀명 또는 이메일을 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={loading}
                  data-testid="search-input"
                />
                <SearchButton onClick={handleSearch} disabled={loading} data-testid="search-button">
                  {loading ? '조회 중...' : '조회하기'}
                </SearchButton>
              </InputRow>
            </SearchForm>
          </CardContent>
        </SearchCard>

        {application && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '21px' }}>
            {/* 1. 신청 정보 카드 */}
            <ResultCard>
              <ResultCardHeader>
                <CardTitle>신청 정보</CardTitle>
                {application.status === 'PENDING' && <StatusPending>서류 심사 중</StatusPending>}
                {application.status === 'APPROVED' && <StatusApproved>승인</StatusApproved>}
                {application.status === 'REJECTED' && <StatusRejected>반려</StatusRejected>}
              </ResultCardHeader>
              <ResultCardContent>
                <InfoRow>
                  <InfoLabel>신청 번호:</InfoLabel>
                  <InfoValue>HACK2024-{application.id?.toString().padStart(3, '0') || '001'}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>신청일:</InfoLabel>
                  <InfoValue>
                    {application.firstCreateDatetime 
                      ? new Date(application.firstCreateDatetime).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : '2024년 3월 12일'
                    }
                  </InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>팀명:</InfoLabel>
                  <InfoValue>{application.team?.teamName || '혁신 AI 팀'}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>팀 리더:</InfoLabel>
                  <InfoValue>
                    {application.team?.members?.find(m => m.isLeader)?.name || '김개발'}
                  </InfoValue>
                </InfoRow>
                {application.team?.teamSize && (
                  <InfoRow>
                    <InfoLabel>팀 구성:</InfoLabel>
                    <InfoValue>{application.team.teamSize}명</InfoValue>
                  </InfoRow>
                )}
                {application.team?.teamDescription && (
                  <InfoRow>
                    <InfoLabel>팀 설명:</InfoLabel>
                    <InfoValue>{application.team.teamDescription}</InfoValue>
                  </InfoRow>
                )}
              </ResultCardContent>
            </ResultCard>

            {/* 2. 팀원 정보 카드 */}
            <ResultCard>
              <ResultCardHeader>
                <CardTitle>팀원 정보</CardTitle>
              </ResultCardHeader>
              <ResultCardContent>
                                 {application.team?.members?.map((member, index) => (
                   <Box key={index} sx={{ mb: index < (application.team?.members?.length || 0) - 1 ? 2 : 0 }}>
                     <InfoRow>
                       <InfoLabel>
                         {member.isLeader ? `${member.name} (팀 리더)` : member.name}:
                       </InfoLabel>
                       <InfoValue>
                         {member.department || '개발본부'}, {member.email}
                       </InfoValue>
                     </InfoRow>
                   </Box>
                 )) || (
                   <>
                     <InfoRow>
                       <InfoLabel>김개발 (팀 리더):</InfoLabel>
                       <InfoValue>개발본부, kim@company.com</InfoValue>
                     </InfoRow>
                     <InfoRow>
                       <InfoLabel>이기획:</InfoLabel>
                       <InfoValue>상품기획팀, lee@company.com</InfoValue>
                     </InfoRow>
                     <InfoRow>
                       <InfoLabel>박디자인:</InfoLabel>
                       <InfoValue>UX팀, park@company.com</InfoValue>
                     </InfoRow>
                   </>
                 )}
              </ResultCardContent>
            </ResultCard>

            {/* 3. 아이디어 정보 카드 */}
            <ResultCard>
              <ResultCardHeader>
                <CardTitle>아이디어 정보</CardTitle>
              </ResultCardHeader>
              <ResultCardContent>
                <InfoRow>
                  <InfoLabel>아이디어 제목:</InfoLabel>
                  <InfoValue>{application.ideaTitle || '일상 대화 AI 어시스턴트'}</InfoValue>
                </InfoRow>
                                 <InfoRow>
                   <InfoLabel>해결하고자 하는 문제:</InfoLabel>
                   <InfoValue>
                     {application.problemStatement || application.ideaDescription || '업무 중 발생하는 반복적인 질문들을 AI가 자동으로 답변해주는 시스템이 필요합니다.'}
                   </InfoValue>
                 </InfoRow>
                 <InfoRow>
                   <InfoLabel>기술 스택:</InfoLabel>
                   <InfoValue>{application.techStack || 'Python, OpenAI GPT, React, Node.js'}</InfoValue>
                 </InfoRow>
              </ResultCardContent>
            </ResultCard>

            {/* 4. 진행 상황 카드 */}
            <ResultCard>
              <ResultCardHeader>
                <CardTitle>진행 상황</CardTitle>
              </ResultCardHeader>
              <ResultCardContent>
                <TimelineContainer>
                  {progressSteps.map((step, index) => (
                    <TimelineItem key={index}>
                      <TimelineDot completed={step.completed} active={step.active} />
                      <TimelineContent>
                        <TimelineTitle>{step.title}</TimelineTitle>
                        <TimelineDate>{step.date}</TimelineDate>
                        {step.note && <TimelineNote>{step.note}</TimelineNote>}
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </TimelineContainer>
              </ResultCardContent>
            </ResultCard>

                         {/* 하단 버튼들 */}
             <Box sx={{ display: 'flex', gap: '14px', mt: 2 }}>
               <Button
                 variant="outlined"
                 onClick={() => {
                   // RegistrationSection으로 이동하여 수정 모드로 전환
                   window.location.href = '/registration?edit=true&id=' + application.id;
                 }}
                 sx={{
                   flex: 1,
                   borderColor: '#d1d5db',
                   color: '#374151',
                   textTransform: 'none',
                   fontSize: '14px',
                   fontWeight: 500,
                   py: 1.5,
                   '&:hover': {
                     borderColor: '#9ca3af',
                     backgroundColor: '#f9fafb',
                   },
                 }}
               >
                 정보 수정하기
               </Button>
             </Box>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 3 }} data-testid="error-message">
            해당 정보를 찾을 수 없습니다.
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mt: 2, mb: 3 }} data-testid="success-message">
            {successMessage}
          </Alert>
        )}

        <InfoCard>
          <InfoTitle>
            신청 조회 안내
          </InfoTitle>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3.5px' }}>
            {infoItems.map((item, index) => (
              <InfoText key={index}>
                {item}
              </InfoText>
            ))}
          </Box>
        </InfoCard>
      </ContentContainer>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
          {error || successMessage || '조회가 완료되었습니다.'}
        </Alert>
      </Snackbar>
    </ConfirmationContainer>
  );
};

export default ConfirmationSection; 