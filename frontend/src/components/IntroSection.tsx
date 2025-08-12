import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Bot } from 'lucide-react';

const IntroContainer = styled(Box)(() => ({
  background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '70px 400px 60.25px 400px',
}));

const ContentContainer = styled(Box)(() => ({
  width: '100%',
  maxWidth: '1120px',
  padding: '70px 21px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '70px',
}));

const HeroSection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '28px',
  width: '100%',
}));

const LogoContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginBottom: '28px',
}));

const LogoCircle = styled(Box)(() => ({
  width: '56px',
  height: '56px',
  backgroundColor: '#ffffff',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '26.3px',
  fontWeight: 400,
  color: '#0f172a',
}));

const PurpleDot = styled(Box)(() => ({
  width: '28px',
  height: '28px',
  backgroundColor: '#c27aff',
  borderRadius: '50%',
}));

const TitleSection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: '28px',
}));

const MainTitle = styled(Typography)(() => ({
  fontSize: '63px',
  fontWeight: 700,
  color: '#ffffff',
  lineHeight: '78.75px',
  textAlign: 'center',
  marginBottom: '28px',
  '@media (max-width: 768px)': {
    fontSize: '48px',
  },
}));

const SubTitle = styled(Typography)(() => ({
  fontSize: '17.5px',
  color: '#d1d5dc',
  textAlign: 'center',
  maxWidth: '588px',
  lineHeight: '24.5px',
  marginBottom: '28px',
}));

const ParticipateButton = styled(Button)(() => ({
  backgroundColor: '#9810fa',
  color: '#ffffff',
  fontSize: '15.8px',
  fontWeight: 500,
  padding: '14px 28px',
  borderRadius: '50px',
  textTransform: 'none',
  lineHeight: '24.5px',
}));

const InfoCardsContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '28px',
  width: '100%',
  maxWidth: '1120px',
  marginBottom: '70px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
}));

const InfoCard = styled(Box)(() => ({
  flex: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '14px',
  padding: '29px',
  border: '1px solid rgba(255, 255, 255, 0.04)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
  gap: '14px',
  position: 'relative',
}));

const CardTitle = styled(Typography)(() => ({
  fontSize: '21px',
  fontWeight: 700,
  color: '#ffffff',
  lineHeight: '28px',
}));

const CardDescription = styled(Typography)(() => ({
  fontSize: '14px',
  color: '#d1d5dc',
  lineHeight: '22.75px',
}));

const ScheduleSection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '28px',
  width: '100%',
  maxWidth: '1120px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '14px',
  padding: '15px 29px 29px 29px',
  border: '1px solid rgba(255, 255, 255, 0.01)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: '1px solid rgba(255, 255, 255, 0.01)',
    borderRadius: '14px',
    pointerEvents: 'none',
  },
}));

const ScheduleTitle = styled(Typography)(() => ({
  fontSize: '26.3px',
  fontWeight: 700,
  color: '#ffffff',
  textAlign: 'center',
  lineHeight: '31.5px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif',
}));

const ScheduleGrid = styled(Box)(() => ({
  display: 'flex',
  gap: '21px',
  width: '100%',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
}));

const ScheduleCard = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '10.5px',
}));

const ScheduleButton = styled(Box)(() => ({
  backgroundColor: '#9810fa',
  borderRadius: '8.75px',
  padding: '10.5px 14px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10.5px',
  width: '100%',
  '&.inactive': {
    backgroundColor: '#314158',
  },
}));

const ScheduleText = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 700,
  color: '#ffffff',
  textAlign: 'center',
  lineHeight: '21px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif',
}));

const ScheduleDate = styled(Typography)(() => ({
  fontSize: '12.3px',
  color: '#ffffff',
  textAlign: 'center',
  lineHeight: '17.5px',
  fontFamily: '"SF Pro Text", sans-serif',
}));

const ScheduleDescription = styled(Typography)(() => ({
  fontSize: '12.3px',
  color: '#d1d5dc',
  textAlign: 'center',
  lineHeight: '17.5px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif',
}));

const IntroSection: React.FC = () => {
  const handleParticipateClick = () => {
    const element = document.getElementById('application');
    if (element) {
      const navHeight = 70;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <IntroContainer>
      <ContentContainer>
        <HeroSection>
          <LogoContainer>
            <LogoCircle>
              <Bot size={32} />
            </LogoCircle>
            <PurpleDot />
          </LogoContainer>
          
          <TitleSection>
            <MainTitle>
              Ready for your next
              <br />
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
              AI Coding 으로 혁신적인 솔루션을 만들어보세요.
              <br />
              창의적인 아이디어와 기술력을 겨루는 특별한 기회입니다.
            </SubTitle>
            <ParticipateButton variant="contained" onClick={handleParticipateClick}>
              참가 신청하기
            </ParticipateButton>
          </TitleSection>

          <InfoCardsContainer>
            <InfoCard>
              <CardTitle>대회 목적</CardTitle>
              <CardDescription>
                사내 개발자들의 AI Coding 역량강화를 통해 
                차세대 개발방법론의 기반을 마련합니다.
              </CardDescription>
            </InfoCard>
            
            <InfoCard>
              <CardTitle>대회 주제</CardTitle>
              <CardDescription>
                "일상을 바꾸는 AI" - 생활 속에서 실제로 활용할 수 있는 
                AI 기반 솔루션을 개발하여 사용자 경험을 혁신해보세요.
              </CardDescription>
            </InfoCard>
            
            <InfoCard>
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
              <ScheduleCard>
                <ScheduleButton>
                  <ScheduleText>참가 신청</ScheduleText>
                  <ScheduleDate>~ 3/15(금)</ScheduleDate>
                </ScheduleButton>
                <ScheduleDescription>
                  AI Coding에 관심이 있는 누구나
                </ScheduleDescription>
              </ScheduleCard>
              
              <ScheduleCard>
                <ScheduleButton className="inactive">
                  <ScheduleText>서류 발표</ScheduleText>
                  <ScheduleDate>3/18(월) ~ 3/20(수)</ScheduleDate>
                </ScheduleButton>
                <ScheduleDescription>
                  100팀 선발
                </ScheduleDescription>
              </ScheduleCard>
              
              <ScheduleCard>
                <ScheduleButton className="inactive">
                  <ScheduleText>예선</ScheduleText>
                  <ScheduleDate>3/25(월) ~ 4/5(금)</ScheduleDate>
                </ScheduleButton>
                <ScheduleDescription>
                  100팀 진행<br />
                  AI Coding을 통한 온라인 예선
                </ScheduleDescription>
              </ScheduleCard>
              
              <ScheduleCard>
                <ScheduleButton className="inactive">
                  <ScheduleText>결선(온라인)</ScheduleText>
                  <ScheduleDate>4/8(월) ~ 4/12(금)</ScheduleDate>
                </ScheduleButton>
                <ScheduleDescription>
                  상위 30팀 진출<br />
                  AI Coding을 통한 온라인 결선
                </ScheduleDescription>
              </ScheduleCard>
              
              <ScheduleCard>
                <ScheduleButton>
                  <ScheduleText>결선(오프라인)</ScheduleText>
                  <ScheduleDate>4/26(금) ~ 4/27(토)</ScheduleDate>
                </ScheduleButton>
                <ScheduleDescription>
                  KT 판교빌딩에서<br />
                  1박 2일 오프라인 결선
                </ScheduleDescription>
              </ScheduleCard>
            </ScheduleGrid>
          </ScheduleSection>
        </HeroSection>
      </ContentContainer>
    </IntroContainer>
  );
};

export default IntroSection; 