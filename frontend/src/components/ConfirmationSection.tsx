import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Alert, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { HackathonService } from '../services/HackathonService';
import type { HackathonApplication } from '../model/types';

const ConfirmationContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f9fafb',
  padding: theme.spacing(10, 14),
  paddingBottom: 200,
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

const SearchCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 12.75,
  border: '1px solid rgba(0,0,0,0.01)',
  marginBottom: theme.spacing(3),
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 3, 1.5),
  borderBottom: '1px solid rgba(0,0,0,0.01)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 3, 3),
}));

const SearchIconBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  backgroundColor: '#f3f4f6',
  borderRadius: 12,
  marginRight: 16,
}));

const SearchForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'flex-end',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
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
  },
  '& .MuiInputLabel-root': {
    fontSize: 12.3,
    color: '#717182',
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#9810fa',
  color: '#ffffff',
  fontSize: 12.3,
  fontWeight: 500,
  padding: theme.spacing(1, 3),
  borderRadius: 6.75,
  height: 31.5,
  '&:hover': {
    backgroundColor: '#7a0dc7',
  },
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#eff6ff',
  borderRadius: 12.75,
  border: '1px solid #bedbff',
  padding: theme.spacing(3),
}));

const InfoTitle = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  color: '#1c398e',
  marginBottom: theme.spacing(1),
}));

const InfoText = styled(Typography)(() => ({
  fontSize: 14,
  color: '#6b7280',
  marginTop: 8,
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

  return (
    <ConfirmationContainer>
      <ContentContainer>
        <HeaderSection>
          <Typography variant="h2" sx={{ fontSize: '48px', fontWeight: 700, color: '#101828', textAlign: 'center', mb: 2 }}>
            신청 확인
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '20px',
              color: '#6b7280',
              textAlign: 'center',
              maxWidth: '600px',
            }}
          >
            신청하신 정보를 확인하고 진행 상황을 조회하세요
          </Typography>
        </HeaderSection>

        <SearchCard>
          <CardHeader>
            <SearchIconBox>
              <SearchIcon sx={{ fontSize: 24 }} />
            </SearchIconBox>
            <Typography variant="h4" sx={{ fontSize: '24px', fontWeight: 600, color: '#101828' }}>
              신청 조회
            </Typography>
          </CardHeader>
          <CardContent>
            <SearchForm>
              <StyledTextField
                fullWidth
                label="팀명 또는 신청자 이메일"
                placeholder="팀명 또는 이메일을 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={loading}
                data-testid="search-input"
              />
              <SearchButton onClick={handleSearch} disabled={loading} data-testid="search-button">
                {loading ? '조회 중...' : '조회하기'}
              </SearchButton>
            </SearchForm>
          </CardContent>
        </SearchCard>

        {application && (
          <Paper sx={{ 
            mt: 3, 
            p: 4, 
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px'
          }} data-testid="application-result">
            <Typography variant="h5" sx={{ color: '#101828', mb: 3, fontSize: '24px', fontWeight: 600 }}>
              신청 정보
            </Typography>
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151', minWidth: '80px' }}>
                  팀명:
                </Typography>
                <Typography variant="body1" sx={{ color: '#101828' }}>
                  {application.team?.teamName}
                </Typography>
              </Box>
              
              {/* 팀원 정보 표시 */}
              {application.team?.members && application.team.members.length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151', minWidth: '80px', mt: 0.5 }}>
                    팀원:
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    {application.team.members.map((member, index) => (
                      <Box key={index} sx={{ 
                        mb: 1, 
                        p: 2, 
                        backgroundColor: '#ffffff', 
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                            {member.isLeader ? '팀 리더' : `팀원 ${index + 1}`}:
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#101828' }}>
                            {member.name}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1 }}>
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            이메일: {member.email}
                          </Typography>
                          {member.department && (
                            <Typography variant="body2" sx={{ color: '#6b7280' }}>
                              부서: {member.department}
                            </Typography>
                          )}
                          {member.position && (
                            <Typography variant="body2" sx={{ color: '#6b7280' }}>
                              직책: {member.position}
                            </Typography>
                          )}
                          {member.phone && (
                            <Typography variant="body2" sx={{ color: '#6b7280' }}>
                              연락처: {member.phone}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151', minWidth: '80px' }}>
                  아이디어:
                </Typography>
                <Typography variant="body1" sx={{ color: '#101828' }}>
                  {application.ideaTitle}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151', minWidth: '80px', mt: 0.5 }}>
                  설명:
                </Typography>
                <Typography variant="body1" sx={{ color: '#101828', flex: 1 }}>
                  {application.ideaDescription}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151', minWidth: '80px' }}>
                  상태:
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: '#059669',
                  backgroundColor: '#d1fae5',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  {application.status}
                </Typography>
              </Box>
              {application.firstCreateDatetime && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#374151', minWidth: '80px' }}>
                    신청일:
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#101828' }}>
                    {new Date(application.firstCreateDatetime).toLocaleDateString('ko-KR')}
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }} data-testid="error-message">
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }} data-testid="success-message">
            {successMessage}
          </Alert>
        )}

        <InfoCard>
          <InfoTitle sx={{ fontSize: '20px', fontWeight: 600, color: '#101828', mb: 2 }}>
            신청 조회 안내
          </InfoTitle>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {infoItems.map((item, index) => (
              <InfoText key={index} sx={{ 
                marginBottom: 0.5, 
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: 1.5
              }}>
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