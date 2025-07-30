import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FlagIcon from '@mui/icons-material/Flag';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const IntroContainer = styled(Box)(() => ({
  background: 'linear-gradient(180deg, #0f172b 0%, #1a2332 100%)',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ContentContainer = styled(Box)(() => ({
  width: '100%',
  maxWidth: '1920px',
  padding: '0 80px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const HeroSection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '56px',
  marginTop: '80px',
  marginBottom: '120px',
  width: '100%',
}));

const LogoContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '24px',
}));

const LogoCircle = styled(Box)(() => ({
  width: '40px',
  height: '40px',
  backgroundColor: '#9810fa',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 700,
}));

const PurpleDot = styled(Box)(() => ({
  width: '32px',
  height: '32px',
  backgroundColor: '#c27aff',
  borderRadius: '50%',
}));

const TitleSection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  textAlign: 'center',
}));

const MainTitle = styled(Typography)(() => ({
  fontSize: '64px',
  fontWeight: 700,
  color: '#ffffff',
  lineHeight: '1.2',
  textAlign: 'center',
}));

const SubTitle = styled(Typography)(() => ({
  fontSize: '24px',
  color: '#94a3b8',
  textAlign: 'center',
  maxWidth: '600px',
}));

const InfoCardsContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '32px',
  width: '100%',
  maxWidth: '1200px',
  marginBottom: '80px',
}));

const InfoCard = styled(Box)(() => ({
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  padding: '32px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '16px',
}));

const CardIcon = styled(Box)(() => ({
  width: '48px',
  height: '48px',
  backgroundColor: '#9810fa',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  '& svg': {
    fontSize: '24px',
  },
}));

const CardTitle = styled(Typography)(() => ({
  fontSize: '20px',
  fontWeight: 600,
  color: '#ffffff',
}));

const CardDescription = styled(Typography)(() => ({
  fontSize: '16px',
  color: '#94a3b8',
  lineHeight: '1.5',
}));

const ScheduleSection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
  width: '100%',
  maxWidth: '1200px',
}));

const ScheduleTitle = styled(Typography)(() => ({
  fontSize: '32px',
  fontWeight: 600,
  color: '#ffffff',
  textAlign: 'center',
}));

const ScheduleGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '24px',
  width: '100%',
}));

const ScheduleButton = styled(Button)(() => ({
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '16px 12px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 600,
  textTransform: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  minHeight: '100px',
  '&:hover': {
    backgroundColor: 'rgba(152, 16, 250, 0.1)',
    borderColor: '#9810fa',
  },
  '&.active': {
    backgroundColor: '#9810fa',
    borderColor: '#9810fa',
  },
  '&.inactive': {
    backgroundColor: '#314158',
    borderColor: '#314158',
  },
}));

const StepNumber = styled(Box)(() => ({
  width: '32px',
  height: '32px',
  backgroundColor: '#9810fa',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: 700,
  color: '#ffffff',
}));

const ParticipateButton = styled(Button)(() => ({
  backgroundColor: '#9810fa',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 600,
  padding: '16px 48px',
  borderRadius: '12px',
  textTransform: 'none',
  marginTop: '40px',
  '&:hover': {
    backgroundColor: '#7c0fd8',
  },
}));

const IntroSection: React.FC = () => {
  const handleParticipateClick = () => {
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <IntroContainer>
      <ContentContainer>
        <HeroSection>
          <LogoContainer>
            <LogoCircle>KT</LogoCircle>
            <PurpleDot />
          </LogoContainer>
          
          <TitleSection>
            <MainTitle>
              Ready for your next<br />
              <span style={{ 
                background: 'linear-gradient(135deg, #c27aff 0%, #fb64b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                AI Hackathon?
              </span>
            </MainTitle>
            <SubTitle>
              AI Coding으로 혁신적인 솔루션을 만들어보세요.<br />
              창의적인 아이디어와 기술력을 겨루는 특별한 기회입니다.
            </SubTitle>
          </TitleSection>

          <InfoCardsContainer>
            <InfoCard>
              <CardIcon>
                <FlagIcon />
              </CardIcon>
              <CardTitle>대회 목적</CardTitle>
              <CardDescription>
                사내 개발자들의 AI Coding 역량강화를 통해 
                차세대 개발방법론의 기반을 마련합니다.
              </CardDescription>
            </InfoCard>
            
            <InfoCard>
              <CardIcon>
                <LightbulbIcon />
              </CardIcon>
              <CardTitle>대회 주제</CardTitle>
              <CardDescription>
                "일상을 바꾸는 AI" - 생활 속에서 실제로 활용할 수 있는 
                AI 기반 솔루션을 개발하여 사용자 경험을 혁신해보세요.
              </CardDescription>
            </InfoCard>
            
            <InfoCard>
              <CardIcon>
                <EmojiEventsIcon />
              </CardIcon>
              <CardTitle>주최 및 주관</CardTitle>
              <CardDescription>
                <strong>주최:</strong> KT<br />
                <strong>주관:</strong> 개발본부<br />
                <strong>후원:</strong> CTO Office
              </CardDescription>
            </InfoCard>
          </InfoCardsContainer>

          <ScheduleSection>
            <ScheduleTitle>대회 일정</ScheduleTitle>
            <ScheduleGrid>
              <ScheduleButton className="active">
                <StepNumber>1</StepNumber>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                  참가 신청
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '12px' }}>
                  ~ 3/15(금)
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '10px', textAlign: 'center' }}>
                  AI Coding에 관심이 있는 누구나
                </Typography>
              </ScheduleButton>
              <ScheduleButton className="inactive">
                <StepNumber>2</StepNumber>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                  서류 발표
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '12px' }}>
                  3/18(월) ~ 3/20(수)
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '10px', textAlign: 'center' }}>
                  100팀 선발
                </Typography>
              </ScheduleButton>
              <ScheduleButton className="inactive">
                <StepNumber>3</StepNumber>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                  예선
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '12px' }}>
                  3/25(월) ~ 4/5(금)
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '10px', textAlign: 'center' }}>
                  100팀 진행<br />
                  AI Coding을 통한 온라인 예선
                </Typography>
              </ScheduleButton>
              <ScheduleButton className="inactive">
                <StepNumber>4</StepNumber>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                  결선(온라인)
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '12px' }}>
                  4/8(월) ~ 4/12(금)
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '10px', textAlign: 'center' }}>
                  상위 30팀 진출<br />
                  AI Coding을 통한 온라인 결선
                </Typography>
              </ScheduleButton>
              <ScheduleButton className="active">
                <StepNumber>5</StepNumber>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                  결선(오프라인)
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '12px' }}>
                  4/26(금) ~ 4/27(토)
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '10px', textAlign: 'center' }}>
                  KT 판교빌딩에서<br />
                  1박 2일 오프라인 결선
                </Typography>
              </ScheduleButton>
            </ScheduleGrid>
            
            <ParticipateButton variant="contained" onClick={handleParticipateClick}>
              참가 신청하기
            </ParticipateButton>
          </ScheduleSection>
        </HeroSection>
      </ContentContainer>
    </IntroContainer>
  );
};

export default IntroSection; 