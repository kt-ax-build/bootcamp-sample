import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle, Users, FileText, Calendar } from 'lucide-react';

const ParticipationContainer = styled(Box)(() => ({
  backgroundColor: '#f9fafb',
  padding: '70px 400px',
  width: '100%',
}));

const ContentContainer = styled(Box)(() => ({
  maxWidth: '1120px',
  padding: '0 21px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '56px',
}));

const HeaderSection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '21px',
  textAlign: 'center',
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

const InfoGrid = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '42px',
  width: '100%',
}));

const InfoRow = styled(Box)(() => ({
  display: 'flex',
  gap: '42px',
  width: '100%',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
}));

const InfoCard = styled(Paper)(() => ({
  flex: 1,
  backgroundColor: '#ffffff',
  borderRadius: '14px',
  padding: '29px',
  boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb',
  display: 'flex',
  flexDirection: 'column',
  gap: '21px',
  position: 'relative',
}));

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10.5px',
}));

const IconCircle = styled(Box)(() => ({
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#9810fa',
  fontSize: '14px',
  fontWeight: 700,
}));

const CardTitle = styled(Typography)(() => ({
  fontSize: '21px',
  fontWeight: 700,
  color: '#101828',
  lineHeight: '28px',
}));

const CardContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
}));

const InfoItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10.5px',
}));

const CheckIcon = styled(Box)(() => ({
  width: '7px',
  height: '7px',
  backgroundColor: '#9810fa',
  borderRadius: '50%',
  marginTop: '7px',
  flexShrink: 0,
}));

const InfoText = styled(Typography)(() => ({
  fontSize: '14px',
  color: '#364153',
  lineHeight: '21px',
}));

const NumberedItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '14px',
}));

const NumberCircle = styled(Box)(() => ({
  width: '24px',
  height: '24px',
  backgroundColor: '#9810fa',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  color: '#ffffff',
  fontWeight: 700,
  flexShrink: 0,
  fontFamily: '"SF Pro Text", sans-serif',
  marginTop: '2px',
}));

const ColorDot = styled(Box)<{ color: string }>(({ color }) => ({
  width: '7px',
  height: '7px',
  backgroundColor: color,
  borderRadius: '50%',
  marginTop: '7px',
  flexShrink: 0,
}));

const StepContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '3.5px',
}));

const StepTitle = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 700,
  color: '#101828',
  lineHeight: '21px',
}));

const StepDescription = styled(Typography)(() => ({
  fontSize: '12.3px',
  color: '#4a5565',
  lineHeight: '17.5px',
}));

const ParticipationSection: React.FC = () => {
  return (
    <ParticipationContainer>
      <ContentContainer>
        <HeaderSection>
          <SectionTitle>참가 안내</SectionTitle>
          <SectionSubtitle>
            AI 해커톤 참가를 위한 자세한 안내사항을 확인하세요
          </SectionSubtitle>
        </HeaderSection>

        <InfoGrid>
          <InfoRow>
            <InfoCard>
              <CardHeader>
                <IconCircle>
                  <CheckCircle size={24} />
                </IconCircle>
                <CardTitle>참가 자격</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoItem>
                  <CheckIcon />
                  <InfoText>사내 임직원 누구나 (정규직, 계약직, 인턴 포함)</InfoText>
                </InfoItem>
                <InfoItem>
                  <CheckIcon />
                  <InfoText>AI Coding에 관심이 있는 모든 직군</InfoText>
                </InfoItem>
                <InfoItem>
                  <CheckIcon />
                  <InfoText>프로그래밍 경험이 있거나 학습 의지가 있는 자</InfoText>
                </InfoItem>
                <InfoItem>
                  <CheckIcon />
                  <InfoText>전체 일정에 성실히 참여 가능한 자</InfoText>
                </InfoItem>
              </CardContent>
            </InfoCard>

            <InfoCard>
              <CardHeader>
                <IconCircle>
                  <Users size={24} />
                </IconCircle>
                <CardTitle>팀 구성</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoItem>
                  <CheckIcon />
                  <InfoText>
                    <strong>팀 규모:</strong> 1~4명 (개인 참가 가능)
                  </InfoText>
                </InfoItem>
                <InfoItem>
                  <CheckIcon />
                  <InfoText>
                    <strong>팀 구성:</strong> 자유롭게 팀 구성 또는 개인 참가
                  </InfoText>
                </InfoItem>
                <InfoItem>
                  <CheckIcon />
                  <InfoText>
                    <strong>팀 리더:</strong> 팀당 1명 지정 (대표 연락처)
                  </InfoText>
                </InfoItem>
                <InfoItem>
                  <CheckIcon />
                  <InfoText>
                    <strong>권장 구성:</strong> 개발자 + 기획자 + 디자이너
                  </InfoText>
                </InfoItem>
              </CardContent>
            </InfoCard>
          </InfoRow>

          <InfoRow>
            <InfoCard>
              <CardHeader>
                <IconCircle>
                  <FileText size={24} />
                </IconCircle>
                <CardTitle>신청 방법</CardTitle>
              </CardHeader>
              <CardContent>
                <NumberedItem>
                  <NumberCircle>1</NumberCircle>
                  <StepContent>
                    <StepTitle>온라인 신청서 작성</StepTitle>
                    <StepDescription>팀 정보 및 참가자 정보 입력</StepDescription>
                  </StepContent>
                </NumberedItem>
                <NumberedItem>
                  <NumberCircle>2</NumberCircle>
                  <StepContent>
                    <StepTitle>아이디어 개요 제출</StepTitle>
                    <StepDescription>해결하고 싶은 문제와 접근 방법 간략히 기술</StepDescription>
                  </StepContent>
                </NumberedItem>
                <NumberedItem>
                  <NumberCircle>3</NumberCircle>
                  <StepContent>
                    <StepTitle>서약서 제출</StepTitle>
                    <StepDescription>개인정보 활용 동의 및 참가 규정 동의</StepDescription>
                  </StepContent>
                </NumberedItem>
              </CardContent>
            </InfoCard>

            <InfoCard>
              <CardHeader>
                <IconCircle>
                  <Calendar size={24} />
                </IconCircle>
                <CardTitle>주요 안내사항</CardTitle>
              </CardHeader>
              <CardContent>
                <InfoItem>
                  <ColorDot color="#fb2c36" />
                  <InfoText>
                    <strong>신청 마감:</strong> 2025년 3월 15일 (금) 18:00
                  </InfoText>
                </InfoItem>
                <InfoItem>
                  <ColorDot color="#ff6900" />
                  <InfoText>
                    <strong>선발 인원:</strong> 총 100팀 (선착순 아님, 서류 심사)
                  </InfoText>
                </InfoItem>
                <InfoItem>
                  <ColorDot color="#00c950" />
                  <InfoText>
                    <strong>제공 사항:</strong> 개발 환경, 멘토링, 식사, 기념품
                  </InfoText>
                </InfoItem>
                <InfoItem>
                  <ColorDot color="#2b7fff" />
                  <InfoText>
                    <strong>시상:</strong> 대상 1팀 (500만원), 우수상 2팀 (각 200만원)
                  </InfoText>
                </InfoItem>
                <InfoItem>
                  <ColorDot color="#ad46ff" />
                  <InfoText>
                    <strong>문의:</strong> ai-hackathon@company.com
                  </InfoText>
                </InfoItem>
              </CardContent>
            </InfoCard>
          </InfoRow>
        </InfoGrid>
      </ContentContainer>
    </ParticipationContainer>
  );
};

export default ParticipationSection; 