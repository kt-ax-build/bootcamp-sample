import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search as SearchIcon,
  Group as TeamIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { HackathonService } from '../services/HackathonService';
import type { HackathonApplication } from '../model/types';

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f9fafb',
  padding: '70px 0 200px 0',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center'
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '784px',
  width: '100%',
  padding: '0 21px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '42px',
  fontWeight: 700,
  color: '#101828',
  textAlign: 'center',
  marginBottom: '21px',
  lineHeight: '42px'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '17.5px',
  color: '#4a5565',
  textAlign: 'center',
  marginBottom: '50px',
  lineHeight: '24.5px'
}));

const SearchCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12.75px',
  border: '1px solid rgba(0,0,0,0.01)',
  marginBottom: '20px',
  boxShadow: 'none'
}));

const SearchCardHeader = styled(Box)(({ theme }) => ({
  padding: '21px 21px 5.25px 21px',
  display: 'flex',
  alignItems: 'center',
  gap: '7px'
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  width: '21px',
  height: '21px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const SearchIconStyled = styled(SearchIcon)(({ theme }) => ({
  color: '#9810fa',
  fontSize: '21px'
}));

const SearchCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '21px',
  fontWeight: 400,
  color: '#101828',
  lineHeight: '28px'
}));

const SearchForm = styled(Box)(({ theme }) => ({
  padding: '0 21px 21px 21px'
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f3f3f5',
    borderRadius: '6.75px',
    height: '31.5px',
    '& fieldset': {
      border: 'none'
    },
    '& input': {
      fontSize: '12.3px',
      color: '#717182',
      padding: '8.5px 11.5px',
      '&::placeholder': {
        color: '#717182',
        opacity: 1
      }
    }
  }
}));

const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#9810fa',
  color: '#ffffff',
  fontSize: '12.3px',
  fontWeight: 500,
  padding: '7px 21px',
  borderRadius: '6.75px',
  height: '31.5px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#7a0dc7'
  }
}));

const InfoCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#eff6ff',
  borderRadius: '12.75px',
  border: '1px solid #bedbff',
  boxShadow: 'none'
}));

const InfoCardContent = styled(CardContent)(({ theme }) => ({
  padding: '21px'
}));

const InfoTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: '#1c398e',
  marginBottom: '7px',
  lineHeight: '21px'
}));

const InfoList = styled(List)(({ theme }) => ({
  padding: 0,
  '& .MuiListItem-root': {
    padding: '3.5px 0',
    '& .MuiListItemText-primary': {
      fontSize: '12.3px',
      color: '#193cb8',
      lineHeight: '17.5px'
    }
  }
}));

const InfoListItem = styled(ListItem)(({ theme }) => ({
  padding: '3.5px 0',
  minHeight: 'auto'
}));

const InfoListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '12.3px',
    color: '#193cb8',
    lineHeight: '17.5px'
  }
}));

const ApplicationCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12.75px',
  border: '1px solid rgba(0,0,0,0.01)',
  marginBottom: '20px',
  boxShadow: 'none'
}));

const ApplicationCardHeader = styled(Box)(({ theme }) => ({
  padding: '21px 21px 0 21px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const ApplicationCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '21px',
  fontWeight: 600,
  color: '#101828',
  lineHeight: '28px'
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontSize: '12.3px',
  fontWeight: 500,
  height: '24px'
}));

const ApplicationCardContent = styled(CardContent)(({ theme }) => ({
  padding: '0 21px 21px 21px'
}));



const InfoItem = styled(Box)(({ theme }) => ({
  marginBottom: '14px'
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  fontSize: '12.3px',
  fontWeight: 500,
  color: '#4a5565',
  marginBottom: '3.5px',
  lineHeight: '12.25px'
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: '#101828',
  lineHeight: '21px'
}));

const TeamMemberItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  marginBottom: '7px'
}));

const MemberInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '7px'
}));

const ProgressItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '14px'
}));

const ProgressDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status'
})<{ status: 'completed' | 'current' | 'pending' }>(({ status }) => ({
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  marginRight: '14px',
  backgroundColor: status === 'completed' ? '#10b981' : 
                  status === 'current' ? '#f59e0b' : '#d1d5dc'
}));

const ProgressText = styled(Box)(({ theme }) => ({
  flex: 1
}));



// Mock data for demonstration
const mockApplication: HackathonApplication = {
  id: 1,
  team: {
    id: 1,
    teamName: '혁신 AI 팀',
    teamSize: '3',
    teamDescription: 'AI 기술을 활용한 혁신적인 솔루션 개발',
    members: [
      { id: 1, name: '김개발', department: '개발본부', email: 'kim@company.com', isLeader: true },
      { id: 2, name: '이기획', department: '상품기획팀', email: 'lee@company.com', isLeader: false },
      { id: 3, name: '박디자인', department: 'UX팀', email: 'park@company.com', isLeader: false }
    ]
  },
  ideaTitle: '일상 대화 AI 어시스턴트',
  problemStatement: '업무 중 발생하는 반복적인 질문들을 AI가 자동으로 답변해주는 시스템이 필요합니다.',
  techStack: 'Python, OpenAI GPT, React, Node.js',
  status: 'PENDING',
  firstCreateDatetime: '2024-03-12T00:00:00'
};

const ConfirmationSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationData, setApplicationData] = useState<HackathonApplication | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('팀명 또는 이메일을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 팀명으로 검색 시도
      let applications = await HackathonService.searchApplications(searchQuery, undefined);
      
      // 팀명으로 검색 결과가 없으면 이메일로 검색 시도
      if (applications.length === 0) {
        applications = await HackathonService.searchApplications(undefined, searchQuery);
      }
      
      if (applications.length > 0) {
        setApplicationData(applications[0]);
      } else {
        setApplicationData(null);
        setError('입력하신 정보와 일치하는 신청 내역을 찾을 수 없습니다.');
      }
    } catch (err: any) {
      setError(err.message || '조회 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      case 'COMPLETED':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <section id="confirmation">
      <SectionContainer>
        <ContentWrapper>
          <SectionTitle>신청 확인</SectionTitle>
          <SectionSubtitle>
            신청하신 정보를 확인하고 진행 상황을 조회하세요
          </SectionSubtitle>

          {/* 검색 섹션 */}
          <SearchCard>
            <SearchCardHeader>
              <SearchIconWrapper>
                <SearchIconStyled />
              </SearchIconWrapper>
              <SearchCardTitle>신청 조회</SearchCardTitle>
            </SearchCardHeader>
            <SearchForm>
              <Box sx={{ display: 'flex', gap: '14px', alignItems: 'flex-end' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '12.3px',
                      fontWeight: 500,
                      color: '#0a0a0a',
                      marginBottom: '7px',
                      lineHeight: '12.25px'
                    }}
                  >
                    팀명 또는 신청자 이메일
                  </Typography>
                  <SearchInput
                    fullWidth
                    placeholder="팀명 또는 이메일을 입력하세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                </Box>
                <SearchButton
                  onClick={handleSearch}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
                >
                  {isLoading ? '조회 중...' : '조회하기'}
                </SearchButton>
              </Box>
            </SearchForm>
          </SearchCard>

          {/* 에러 메시지 */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: '20px' }}>
              {error}
            </Alert>
          )}

          {/* 신청 정보 표시 */}
          {applicationData && (
            <div>
              {/* 기본 정보 */}
              <ApplicationCard>
                <ApplicationCardHeader>
                  <ApplicationCardTitle>신청 정보</ApplicationCardTitle>
                  <StatusChip
                    label={applicationData.status === 'PENDING' ? '서류 심사 중' : 
                           applicationData.status === 'APPROVED' ? '승인됨' :
                           applicationData.status === 'REJECTED' ? '거절됨' : '대기중'}
                    color={getStatusColor(applicationData.status) as any}
                    size="small"
                  />
                </ApplicationCardHeader>
                <ApplicationCardContent>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, marginTop: '14px' }}>
                    <InfoItem>
                      <InfoLabel>신청 번호</InfoLabel>
                      <InfoValue>{applicationData.id || 'N/A'}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>신청일</InfoLabel>
                      <InfoValue>
                        {applicationData.firstCreateDatetime 
                          ? new Date(applicationData.firstCreateDatetime).toLocaleDateString()
                          : 'N/A'
                        }
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>팀명</InfoLabel>
                      <InfoValue>{applicationData.team?.teamName || 'N/A'}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>팀 리더</InfoLabel>
                      <InfoValue>
                        {applicationData.team?.members?.find(m => m.isLeader)?.name || 'N/A'}
                      </InfoValue>
                    </InfoItem>
                  </Box>
                </ApplicationCardContent>
              </ApplicationCard>

              {/* 팀원 정보 */}
              <ApplicationCard>
                <ApplicationCardHeader>
                  <ApplicationCardTitle>팀원 정보</ApplicationCardTitle>
                </ApplicationCardHeader>
                <ApplicationCardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {applicationData.team?.members?.map((member: any, index: number) => (
                      <TeamMemberItem key={member.id || index}>
                        <MemberInfo>
                          <TeamIcon sx={{ color: '#9810fa', fontSize: '16px' }} />
                          <Box>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#101828',
                                lineHeight: '21px'
                              }}
                            >
                              {member.name}
                              {member.isLeader && (
                                <Chip
                                  label="팀 리더"
                                  size="small"
                                  sx={{
                                    marginLeft: '7px',
                                    backgroundColor: '#9810fa',
                                    color: '#ffffff',
                                    fontSize: '10px',
                                    height: '18px'
                                  }}
                                />
                              )}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '12.3px',
                                color: '#6b7280',
                                lineHeight: '17.5px'
                              }}
                            >
                              {member.department || 'N/A'}
                            </Typography>
                          </Box>
                        </MemberInfo>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '3.5px' }}>
                          <EmailIcon sx={{ color: '#6b7280', fontSize: '14px' }} />
                          <Typography
                            sx={{
                              fontSize: '12.3px',
                              color: '#6b7280',
                              lineHeight: '17.5px'
                            }}
                          >
                            {member.email}
                          </Typography>
                        </Box>
                      </TeamMemberItem>
                    )) || <Typography>팀원 정보가 없습니다.</Typography>}
                  </Box>
                </ApplicationCardContent>
              </ApplicationCard>

              {/* 아이디어 정보 */}
              <ApplicationCard>
                <ApplicationCardHeader>
                  <ApplicationCardTitle>아이디어 정보</ApplicationCardTitle>
                </ApplicationCardHeader>
                <ApplicationCardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <InfoItem>
                      <InfoLabel>아이디어 제목</InfoLabel>
                      <InfoValue>{applicationData.ideaTitle}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>해결하고자 하는 문제</InfoLabel>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: '#374151',
                          lineHeight: '21px'
                        }}
                      >
                        {applicationData.problemStatement}
                      </Typography>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>기술 스택</InfoLabel>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: '#374151',
                          lineHeight: '21px'
                        }}
                      >
                        {applicationData.techStack}
                      </Typography>
                    </InfoItem>
                  </Box>
                </ApplicationCardContent>
              </ApplicationCard>

              {/* 진행 상황 */}
              <ApplicationCard>
                <ApplicationCardHeader>
                  <ApplicationCardTitle>진행 상황</ApplicationCardTitle>
                </ApplicationCardHeader>
                <ApplicationCardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                         <ProgressItem>
                       <ProgressDot status="completed" />
                       <ProgressText>
                         <Typography
                           sx={{
                             fontSize: '14px',
                             fontWeight: 600,
                             color: '#10b981',
                             lineHeight: '21px'
                           }}
                         >
                           신청 접수 완료
                         </Typography>
                         <Typography
                           sx={{
                             fontSize: '12.3px',
                             color: '#6b7280',
                             lineHeight: '17.5px'
                           }}
                         >
                           {applicationData.firstCreateDatetime 
                             ? new Date(applicationData.firstCreateDatetime).toLocaleDateString()
                             : 'N/A'
                           }
                         </Typography>
                       </ProgressText>
                     </ProgressItem>
                    
                    <ProgressItem>
                      <ProgressDot status="current" />
                      <ProgressText>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#f59e0b',
                            lineHeight: '21px'
                          }}
                        >
                          서류 심사 중
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '12.3px',
                            color: '#6b7280',
                            lineHeight: '17.5px'
                          }}
                        >
                          3월 20일 결과 발표 예정
                        </Typography>
                      </ProgressText>
                    </ProgressItem>
                    
                    <ProgressItem>
                      <ProgressDot status="pending" />
                      <ProgressText>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#6b7280',
                            lineHeight: '21px'
                          }}
                        >
                          예선 진행
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '12.3px',
                            color: '#9ca3af',
                            lineHeight: '17.5px'
                          }}
                        >
                          3월 25일 ~ 4월 5일
                        </Typography>
                      </ProgressText>
                    </ProgressItem>
                    
                    <ProgressItem>
                      <ProgressDot status="pending" />
                      <ProgressText>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#6b7280',
                            lineHeight: '21px'
                          }}
                        >
                          결선 진행
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '12.3px',
                            color: '#9ca3af',
                            lineHeight: '17.5px'
                          }}
                        >
                          4월 26일 ~ 4월 27일
                        </Typography>
                      </ProgressText>
                    </ProgressItem>
                  </Box>
                </ApplicationCardContent>
              </ApplicationCard>

              {/* 액션 버튼 */}
              <Box sx={{ textAlign: 'center', marginTop: '28px' }}>
                <Button
                  variant="outlined"
                  sx={{
                    marginRight: '14px',
                    padding: '12px 32px',
                    borderRadius: '8px',
                    borderColor: '#9810fa',
                    color: '#9810fa',
                    '&:hover': {
                      borderColor: '#7a0dc7',
                      backgroundColor: 'rgba(152, 16, 250, 0.04)'
                    }
                  }}
                >
                  정보 수정하기
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    padding: '12px 32px',
                    borderRadius: '8px',
                    backgroundColor: '#9810fa',
                    '&:hover': {
                      backgroundColor: '#7a0dc7'
                    }
                  }}
                >
                  추가 자료 제출
                </Button>
              </Box>
            </div>
          )}

          {/* 신청 조회 안내 */}
          {!searchQuery && (
            <InfoCard>
              <InfoCardContent>
                <InfoTitle>신청 조회 안내</InfoTitle>
                <InfoList>
                  <InfoListItem>
                    <InfoListItemText primary="• 신청 시 등록하신 팀명 또는 이메일로 조회 가능합니다" />
                  </InfoListItem>
                  <InfoListItem>
                    <InfoListItemText primary="• 서류 심사 결과는 3월 20일(수)에 개별 통보됩니다" />
                  </InfoListItem>
                  <InfoListItem>
                    <InfoListItemText primary="• 문의사항은 ai-hackathon@company.com으로 연락해주세요" />
                  </InfoListItem>
                </InfoList>
              </InfoCardContent>
            </InfoCard>
          )}
        </ContentWrapper>
      </SectionContainer>
    </section>
  );
};

export default ConfirmationSection;
