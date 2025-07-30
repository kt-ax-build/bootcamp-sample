import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ParticipationContainer = styled(Box)(() => ({
  backgroundColor: '#f9fafb',
  padding: '120px 0',
  width: '100%',
}));

const ContentContainer = styled(Box)(() => ({
  maxWidth: '1920px',
  padding: '0 80px',
  margin: '0 auto',
}));

const HeaderSection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  marginBottom: '120px',
  textAlign: 'center',
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: '48px',
  fontWeight: 700,
  color: '#1f2937',
  textAlign: 'center',
}));

const SectionSubtitle = styled(Typography)(() => ({
  fontSize: '20px',
  color: '#6b7280',
  textAlign: 'center',
  maxWidth: '600px',
}));

const InfoGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '48px',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
}));

const InfoCard = styled(Paper)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '48px',
  boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}));

const IconCircle = styled(Box)(() => ({
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
  fontSize: '24px',
  fontWeight: 600,
  color: '#1f2937',
}));

const CardContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

const InfoItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
}));

const CheckIcon = styled(Box)(() => ({
  width: '20px',
  height: '20px',
  backgroundColor: '#10b981',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  '& svg': {
    fontSize: '12px',
  },
}));

const InfoText = styled(Typography)(() => ({
  fontSize: '16px',
  color: '#4b5563',
  lineHeight: '1.6',
}));

const NumberedItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
}));

const NumberCircle = styled(Box)(() => ({
  width: '32px',
  height: '32px',
  backgroundColor: '#9810fa',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  color: '#ffffff',
  fontWeight: 700,
  flexShrink: 0,
}));

const ParticipationSection: React.FC = () => {
  return (
    <ParticipationContainer>
      <ContentContainer>
        <HeaderSection>
          <SectionTitle>참가 안내</SectionTitle>
          <SectionSubtitle>
            AI 해커톤에 참가하기 위한 자세한 안내사항을 확인하세요
          </SectionSubtitle>
        </HeaderSection>

        <InfoGrid>
          <InfoCard>
            <CardHeader>
              <IconCircle>
                <CheckCircleIcon />
              </IconCircle>
              <CardTitle>참가 자격</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>AI 개발에 관심이 있는 개발자</InfoText>
              </InfoItem>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>팀 단위 참가 (2-4명)</InfoText>
              </InfoItem>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>Python, JavaScript 등 프로그래밍 언어 숙련자</InfoText>
              </InfoItem>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>AI/ML 관련 프로젝트 경험자 우대</InfoText>
              </InfoItem>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardHeader>
              <IconCircle>
                <GroupIcon />
              </IconCircle>
              <CardTitle>팀 구성</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>팀장 1명, 팀원 1-3명</InfoText>
              </InfoItem>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>각 팀별 역할 분담 필수</InfoText>
              </InfoItem>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>팀명 및 팀 소개 작성</InfoText>
              </InfoItem>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>팀원별 연락처 정보 제공</InfoText>
              </InfoItem>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardHeader>
              <IconCircle>
                <AssignmentIcon />
              </IconCircle>
              <CardTitle>신청 방법</CardTitle>
            </CardHeader>
            <CardContent>
              <NumberedItem>
                <NumberCircle>1</NumberCircle>
                <InfoText>온라인 신청서 작성 및 제출</InfoText>
              </NumberedItem>
              <NumberedItem>
                <NumberCircle>2</NumberCircle>
                <InfoText>팀 구성 및 아이디어 기획</InfoText>
              </NumberedItem>
              <NumberedItem>
                <NumberCircle>3</NumberCircle>
                <InfoText>서류 심사 및 선발 결과 발표</InfoText>
              </NumberedItem>
              <NumberedItem>
                <NumberCircle>4</NumberCircle>
                <InfoText>최종 참가 확정 및 오리엔테이션</InfoText>
              </NumberedItem>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardHeader>
              <IconCircle>
                <AssignmentIcon />
              </IconCircle>
              <CardTitle>주요 안내사항</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>참가비 무료 (개발 환경 제공)</InfoText>
              </InfoItem>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>AI 개발 환경 및 클라우드 크레딧 지원</InfoText>
              </InfoItem>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>멘토링 및 기술 지원 제공</InfoText>
              </InfoItem>
              <InfoItem>
                <CheckIcon>
                  <CheckCircleIcon />
                </CheckIcon>
                <InfoText>우수 팀 시상 및 특별 혜택</InfoText>
              </InfoItem>
            </CardContent>
          </InfoCard>
        </InfoGrid>
      </ContentContainer>
    </ParticipationContainer>
  );
};

export default ParticipationSection; 