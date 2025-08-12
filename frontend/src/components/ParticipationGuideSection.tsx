import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle, Users, FileText, Calendar } from 'lucide-react';

// 아이콘 컴포넌트들
const IconComponent = ({ variant = "1" }: { variant?: "1" | "2" | "3" | "4" }) => {
  const iconProps = {
    width: 28,
    height: 28,
    color: '#9810fa'
  };

  switch (variant) {
    case "1":
      return <CheckCircle {...iconProps} />;
    case "2":
      return <Users {...iconProps} />;
    case "3":
      return <FileText {...iconProps} />;
    case "4":
      return <Calendar {...iconProps} />;
    default:
      return <CheckCircle {...iconProps} />;
  }
};

// 스타일드 컴포넌트들
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f9fafb',
  padding: '70px 400px',
  minHeight: 'auto',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    padding: '70px 200px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '70px 100px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '70px 50px',
  }
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1120px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '56px',
  padding: '0 21px'
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '21px',
  textAlign: 'center'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '42px',
  fontWeight: 700,
  color: '#101828',
  lineHeight: '42px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif'
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '17.5px',
  color: '#4a5565',
  lineHeight: '24.5px',
  maxWidth: '588px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif'
}));

const CardsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '42px',
  justifyContent: 'center',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '28px',
  }
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  flex: 1,
  padding: '29px',
  borderRadius: '14px',
  border: '1px solid #e5e7eb',
  boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff',
  minHeight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)',
  }
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10.5px',
  marginBottom: '21px'
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '21px',
  fontWeight: 700,
  color: '#101828',
  lineHeight: '28px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif'
}));

const CardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px'
}));

const ListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10.5px'
}));

const BulletPoint = styled(Box)(({ theme }) => ({
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  backgroundColor: '#9810fa',
  marginTop: '7px',
  flexShrink: 0
}));

const ListText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#364153',
  lineHeight: '21px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif'
}));

const BoldText = styled('span')(({ theme }) => ({
  fontWeight: 700,
  fontFamily: '"Apple SD Gothic Neo", sans-serif'
}));

const RegularText = styled('span')(({ theme }) => ({
  fontWeight: 400,
  fontFamily: '"Apple SD Gothic Neo", sans-serif'
}));

const StepContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '14px',
  marginBottom: '21px'
}));

const StepNumber = styled(Box)(({ theme }) => ({
  width: '28px',
  height: '28px',
  backgroundColor: '#9810fa',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
}));

const StepNumberText = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '12.3px',
  fontWeight: 700,
  lineHeight: '17.5px',
  fontFamily: '"SF Pro Text", sans-serif'
}));

const StepContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '3.5px',
  flex: 1
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 700,
  color: '#101828',
  lineHeight: '21px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif'
}));

const StepDescription = styled(Typography)(({ theme }) => ({
  fontSize: '12.3px',
  color: '#4a5565',
  lineHeight: '17.5px',
  fontFamily: '"Apple SD Gothic Neo", sans-serif'
}));

const ColoredBullet = styled(Box)<{ color: string }>(({ color }) => ({
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  backgroundColor: color,
  marginTop: '7px',
  flexShrink: 0
}));

const ParticipationGuideSection: React.FC = () => {
  return (
    <SectionContainer 
      id="participation"
      aria-labelledby="participation-title"
      role="region"
    >
      <ContentContainer>
        <HeaderSection>
          <SectionTitle id="participation-title">참가 안내</SectionTitle>
          <SectionSubtitle>
            AI 해커톤 참가를 위한 자세한 안내사항을 확인하세요
          </SectionSubtitle>
        </HeaderSection>

        <CardsRow>
          {/* 참가 자격 카드 */}
          <InfoCard
            aria-labelledby="eligibility-title"
          >
            <CardHeader>
              <IconComponent variant="1" />
              <CardTitle id="eligibility-title">참가 자격</CardTitle>
            </CardHeader>
            <CardContent role="list">
              <ListItem role="listitem">
                <BulletPoint />
                <ListText>사내 임직원 누구나 (정규직, 계약직, 인턴 포함)</ListText>
              </ListItem>
              <ListItem role="listitem">
                <BulletPoint />
                <ListText>AI Coding에 관심이 있는 모든 직군</ListText>
              </ListItem>
              <ListItem role="listitem">
                <BulletPoint />
                <ListText>프로그래밍 경험이 있거나 학습 의지가 있는 자</ListText>
              </ListItem>
              <ListItem role="listitem">
                <BulletPoint />
                <ListText>전체 일정에 성실히 참여 가능한 자</ListText>
              </ListItem>
            </CardContent>
          </InfoCard>

          {/* 팀 구성 카드 */}
          <InfoCard
            aria-labelledby="team-formation-title"
          >
            <CardHeader>
              <IconComponent variant="2" />
              <CardTitle id="team-formation-title">팀 구성</CardTitle>
            </CardHeader>
            <CardContent role="list">
              <ListItem role="listitem">
                <BulletPoint />
                <ListText>
                  <BoldText>팀 규모:</BoldText>
                  <RegularText> 1~4명 (개인 참가 가능)</RegularText>
                </ListText>
              </ListItem>
              <ListItem role="listitem">
                <BulletPoint />
                <ListText>
                  <BoldText>팀 구성:</BoldText>
                  <RegularText> 자유롭게 팀 구성 또는 개인 참가</RegularText>
                </ListText>
              </ListItem>
              <ListItem role="listitem">
                <BulletPoint />
                <ListText>
                  <BoldText>팀 리더:</BoldText>
                  <RegularText> 팀당 1명 지정 (대표 연락처)</RegularText>
                </ListText>
              </ListItem>
              <ListItem role="listitem">
                <BulletPoint />
                <ListText>
                  <BoldText>권장 구성:</BoldText>
                  <RegularText> 개발자 + 기획자 + 디자이너</RegularText>
                </ListText>
              </ListItem>
            </CardContent>
          </InfoCard>
        </CardsRow>

        <CardsRow>
          {/* 신청 방법 카드 */}
          <InfoCard
            aria-labelledby="application-method-title"
          >
            <CardHeader>
              <IconComponent variant="3" />
              <CardTitle id="application-method-title">신청 방법</CardTitle>
            </CardHeader>
            <CardContent role="list">
              <StepContainer role="listitem">
                <StepNumber aria-label="1단계">
                  <StepNumberText>1</StepNumberText>
                </StepNumber>
                <StepContent>
                  <StepTitle>온라인 신청서 작성</StepTitle>
                  <StepDescription>팀 정보 및 참가자 정보 입력</StepDescription>
                </StepContent>
              </StepContainer>
              <StepContainer role="listitem">
                <StepNumber aria-label="2단계">
                  <StepNumberText>2</StepNumberText>
                </StepNumber>
                <StepContent>
                  <StepTitle>아이디어 개요 제출</StepTitle>
                  <StepDescription>해결하고 싶은 문제와 접근 방법 간략히 기술</StepDescription>
                </StepContent>
              </StepContainer>
              <StepContainer role="listitem">
                <StepNumber aria-label="3단계">
                  <StepNumberText>3</StepNumberText>
                </StepNumber>
                <StepContent>
                  <StepTitle>서약서 제출</StepTitle>
                  <StepDescription>개인정보 활용 동의 및 참가 규정 동의</StepDescription>
                </StepContent>
              </StepContainer>
            </CardContent>
          </InfoCard>

          {/* 주요 안내사항 카드 */}
          <InfoCard
            aria-labelledby="important-notices-title"
          >
            <CardHeader>
              <IconComponent variant="4" />
              <CardTitle id="important-notices-title">주요 안내사항</CardTitle>
            </CardHeader>
            <CardContent role="list">
              <ListItem role="listitem">
                <ColoredBullet color="#fb2c36" />
                <ListText>
                  <BoldText>신청 마감:</BoldText>
                  <RegularText> 2025년 3월 15일 (금) 18:00</RegularText>
                </ListText>
              </ListItem>
              <ListItem role="listitem">
                <ColoredBullet color="#ff6900" />
                <ListText>
                  <BoldText>선발 인원:</BoldText>
                  <RegularText> 총 100팀 (선착순 아님, 서류 심사)</RegularText>
                </ListText>
              </ListItem>
              <ListItem role="listitem">
                <ColoredBullet color="#00c950" />
                <ListText>
                  <BoldText>제공 사항:</BoldText>
                  <RegularText> 개발 환경, 멘토링, 식사, 기념품</RegularText>
                </ListText>
              </ListItem>
              <ListItem role="listitem">
                <ColoredBullet color="#2b7fff" />
                <ListText>
                  <BoldText>시상:</BoldText>
                  <RegularText> 대상 1팀 (500만원), 우수상 2팀 (각 200만원)</RegularText>
                </ListText>
              </ListItem>
              <ListItem role="listitem">
                <ColoredBullet color="#ad46ff" />
                <ListText>
                  <BoldText>문의:</BoldText>
                  <RegularText> ai-hackathon@company.com</RegularText>
                </ListText>
              </ListItem>
            </CardContent>
          </InfoCard>
        </CardsRow>
      </ContentContainer>
    </SectionContainer>
  );
};

export default ParticipationGuideSection;
