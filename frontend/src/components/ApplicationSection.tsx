import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useApplicationStore } from '../stores/applicationStore';
import { useTeamNameCheck } from '../hooks/useTeamNameCheck';
import { ApplicationService } from '../services/applicationService';

const TEAM_COMPOSITIONS = [
  '1명 (개인 참가)',
  '2명',
  '3명',
  '4명',
];

export const ApplicationSection: React.FC = () => {
  const {
    form,
    isLoading,
    error,
    teamNameCheckResult,
    updateTeamInfo,
    updateIdeaInfo,
    addTeamMember,
    removeTeamMember,
    updateTeamMember,
    setLoading,
    setError,
    validateForm,
  } = useApplicationStore();

  const { isChecking, checkTeamName } = useTeamNameCheck();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleTeamNameChange = (value: string) => {
    updateTeamInfo('name', value);
    if (value.trim()) {
      checkTeamName(value);
    }
  };

  const handleSubmit = async () => {
    const validation = validateForm();
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setLoading(true);
    setError(null);
    setValidationErrors([]);

    try {
      await ApplicationService.createApplication({
        teamInfo: form.teamInfo,
        teamMembers: form.teamMembers,
        ideaInfo: form.ideaInfo,
      });

      // 성공 메시지 표시
      alert('참가 신청이 완료되었습니다!');
      
      // 폼 초기화는 나중에 구현
    } catch (error) {
      setError('신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="application-section"
      sx={{
        py: 8,
        px: { xs: 2, md: 4 },
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* 제목 */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.625rem' },
              fontWeight: 700,
              color: '#101828',
              mb: 2,
            }}
          >
            신청 및 접수
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.09375rem',
              color: '#4a5565',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            AI 해커톤에 참가하시려면 아래 정보를 입력해주세요
          </Typography>
        </Box>

        {/* 에러 메시지 */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* 검증 에러 메시지 */}
        {validationErrors.length > 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                다음 항목을 확인해주세요:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                {validationErrors.map((error, index) => (
                  <li key={index}>
                    <Typography variant="body2">{error}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Alert>
        )}

        {/* 팀 정보 */}
        <Card sx={{ borderRadius: '12.75px', border: '1px solid rgba(0,0,0,0.01)' }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 2.625, pb: 0.65625 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: '1.3125rem',
                  fontWeight: 400,
                  color: '#101828',
                }}
              >
                팀 정보
              </Typography>
            </Box>
            <Box sx={{ p: 2.625, pt: 0 }}>
              <Box sx={{ display: 'flex', gap: 2.625, mb: 2.53125, flexWrap: 'wrap' }}>
                {/* 팀명 */}
                <Box sx={{ flex: 1, minWidth: 250 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.76875rem',
                      fontWeight: 500,
                      color: 'neutral.950',
                      mb: 0.875,
                    }}
                  >
                    팀명 *
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="팀명을 입력하세요"
                    value={form.teamInfo.name}
                    onChange={(e) => handleTeamNameChange(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f3f3f5',
                        borderRadius: '6.75px',
                        height: '31.5px',
                        '& fieldset': { border: 'none' },
                      },
                    }}
                  />
                  {isChecking && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <CircularProgress size={16} />
                      <Typography variant="caption">팀명 확인 중...</Typography>
                    </Box>
                  )}
                  {teamNameCheckResult && (
                    <Chip
                      label={teamNameCheckResult.message}
                      color={teamNameCheckResult.isAvailable ? 'success' : 'error'}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>

                {/* 팀 구성 */}
                <Box sx={{ flex: 1, minWidth: 250 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.76875rem',
                      fontWeight: 500,
                      color: 'neutral.950',
                      mb: 0.875,
                    }}
                  >
                    팀 구성
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={form.teamInfo.composition}
                      onChange={(e) => updateTeamInfo('composition', e.target.value)}
                      displayEmpty
                      sx={{
                        backgroundColor: '#f3f3f5',
                        borderRadius: '6.75px',
                        height: '31.5px',
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      }}
                    >
                      <MenuItem value="">
                        <em>팀 구성을 선택하세요</em>
                      </MenuItem>
                      {TEAM_COMPOSITIONS.map((composition) => (
                        <MenuItem key={composition} value={composition}>
                          {composition}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* 팀 소개 */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.76875rem',
                    fontWeight: 500,
                    color: 'neutral.950',
                    mb: 0.875,
                  }}
                >
                  팀 소개
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="팀을 간단히 소개해주세요"
                  value={form.teamInfo.description}
                  onChange={(e) => updateTeamInfo('description', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f3f5',
                      borderRadius: '6.75px',
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* 팀원 정보 */}
        <Card sx={{ borderRadius: '12.75px', border: '1px solid rgba(0,0,0,0.01)' }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 2.625, pb: 0.65625 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '1.3125rem',
                    fontWeight: 400,
                    color: '#101828',
                  }}
                >
                  팀원 정보
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={addTeamMember}
                  disabled={form.teamMembers.length >= 4}
                  sx={{
                    borderRadius: '6.75px',
                    height: '28px',
                    px: 1.21875,
                    py: 0.125,
                    fontSize: '0.76875rem',
                    fontWeight: 500,
                  }}
                >
                  팀원 추가
                </Button>
              </Box>
            </Box>
            <Box sx={{ p: 2.625, pt: 0 }}>
              {form.teamMembers.map((member, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2.75,
                    border: '1px solid #e5e7eb',
                    borderRadius: '8.75px',
                    mb: index < form.teamMembers.length - 1 ? 2 : 0,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.75 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#101828',
                      }}
                    >
                      {member.isLeader ? '팀 리더' : `${index + 1}번째 팀원`}
                    </Typography>
                    {!member.isLeader && form.teamMembers.length > 1 && (
                      <IconButton
                        size="small"
                        onClick={() => removeTeamMember(index)}
                        sx={{ color: 'error.main' }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    )}
                  </Box>

                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.625 }}>
                    {/* 이름 */}
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.76875rem',
                          fontWeight: 500,
                          color: 'neutral.950',
                          mb: 0.875,
                        }}
                      >
                        이름 *
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="이름을 입력하세요"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f3f3f5',
                            borderRadius: '6.75px',
                            height: '31.5px',
                            '& fieldset': { border: 'none' },
                          },
                        }}
                      />
                    </Box>

                    {/* 소속 부서 */}
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.76875rem',
                          fontWeight: 500,
                          color: 'neutral.950',
                          mb: 0.875,
                        }}
                      >
                        소속 부서 *
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="부서명을 입력하세요"
                        value={member.department}
                        onChange={(e) => updateTeamMember(index, 'department', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f3f3f5',
                            borderRadius: '6.75px',
                            height: '31.5px',
                            '& fieldset': { border: 'none' },
                          },
                        }}
                      />
                    </Box>

                    {/* 직급/직책 */}
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.76875rem',
                          fontWeight: 500,
                          color: 'neutral.950',
                          mb: 0.875,
                        }}
                      >
                        직급/직책
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="직급 또는 직책을 입력하세요"
                        value={member.position}
                        onChange={(e) => updateTeamMember(index, 'position', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f3f3f5',
                            borderRadius: '6.75px',
                            height: '31.5px',
                            '& fieldset': { border: 'none' },
                          },
                        }}
                      />
                    </Box>

                    {/* 이메일 */}
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.76875rem',
                          fontWeight: 500,
                          color: 'neutral.950',
                          mb: 0.875,
                        }}
                      >
                        이메일 *
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="이메일을 입력하세요"
                        value={member.email}
                        onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f3f3f5',
                            borderRadius: '6.75px',
                            height: '31.5px',
                            '& fieldset': { border: 'none' },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* 아이디어 정보 */}
        <Card sx={{ borderRadius: '12.75px', border: '1px solid rgba(0,0,0,0.01)' }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 2.625, pb: 0.65625 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: '1.3125rem',
                  fontWeight: 400,
                  color: '#101828',
                }}
              >
                아이디어 정보
              </Typography>
            </Box>
            <Box sx={{ p: 2.625, pt: 0 }}>
              {/* 아이디어 제목 */}
              <Box sx={{ mb: 2.53125 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.76875rem',
                    fontWeight: 500,
                    color: 'neutral.950',
                    mb: 0.875,
                  }}
                >
                  아이디어 제목 *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="아이디어의 제목을 입력하세요"
                  value={form.ideaInfo.title}
                  onChange={(e) => updateIdeaInfo('title', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f3f5',
                      borderRadius: '6.75px',
                      height: '31.5px',
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Box>

              {/* 해결하고자 하는 문제 */}
              <Box sx={{ mb: 2.53125 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.76875rem',
                    fontWeight: 500,
                    color: 'neutral.950',
                    mb: 0.875,
                  }}
                >
                  해결하고자 하는 문제 *
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="어떤 문제를 해결하고 싶으신가요? (300자 이내)"
                  value={form.ideaInfo.problem}
                  onChange={(e) => updateIdeaInfo('problem', e.target.value)}
                  inputProps={{ maxLength: 300 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f3f5',
                      borderRadius: '6.75px',
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Box>

              {/* 솔루션 접근 방법 */}
              <Box sx={{ mb: 2.53125 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.76875rem',
                    fontWeight: 500,
                    color: 'neutral.950',
                    mb: 0.875,
                  }}
                >
                  솔루션 접근 방법 *
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="어떤 방식으로 해결하실 계획인가요? (500자 이내)"
                  value={form.ideaInfo.solution}
                  onChange={(e) => updateIdeaInfo('solution', e.target.value)}
                  inputProps={{ maxLength: 500 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f3f5',
                      borderRadius: '6.75px',
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Box>

              {/* 사용 예정 기술스택 */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.76875rem',
                    fontWeight: 500,
                    color: 'neutral.950',
                    mb: 0.875,
                  }}
                >
                  사용 예정 기술스택
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="예: Python, TensorFlow, React, etc."
                  value={form.ideaInfo.techStack}
                  onChange={(e) => updateIdeaInfo('techStack', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f3f3f5',
                      borderRadius: '6.75px',
                      height: '31.5px',
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* 제출 버튼 */}
        <Box sx={{ textAlign: 'center', pt: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={isLoading}
            sx={{
              backgroundColor: '#9810fa',
              borderRadius: '1.67772e+07px',
              height: '31.5px',
              px: 5.25,
              py: 0.4375,
              fontSize: '0.9875rem',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#7a0dd8',
              },
            }}
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : '참가 신청하기'}
          </Button>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.76875rem',
              color: '#6a7282',
              mt: 1,
            }}
          >
            * 제출 후에도 마감일 전까지 수정이 가능합니다
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
