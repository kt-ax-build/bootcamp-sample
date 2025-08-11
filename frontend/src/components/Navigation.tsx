import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#0f172b',
  borderBottom: '1px solid #314158',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  padding: '0 80px',
  paddingBottom: '1px',
  paddingTop: '0px',
  borderRadius: 0,
}));

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0',
  maxWidth: '1920px',
  margin: '0 auto',
  width: '100%',
  height: '70px',
  gap: '120px',
}));

const LogoContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
}));

const LogoBox = styled(Box)(() => ({
  width: '28px',
  height: '28px',
  backgroundColor: '#9810fa',
  borderRadius: '8.75px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',
}));

const BrandText = styled(Typography)(() => ({
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '17.5px',
  lineHeight: '24.5px',
}));

const NavLinks = styled(Box)(() => ({
  display: 'flex',
  gap: '28px',
  alignItems: 'center',
}));

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ active }) => ({
  backgroundColor: active ? '#9810fa' : 'transparent',
  color: active ? '#ffffff' : '#d1d5dc',
  fontSize: '14px',
  fontWeight: 400,
  padding: '7px 14px',
  borderRadius: '8.75px',
  textTransform: 'none',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: active ? '#9810fa' : 'rgba(255, 255, 255, 0.1)',
  },
}));

const ParticipateText = styled(Typography)(() => ({
  color: '#ffffff',
  fontSize: '12.3px',
  fontWeight: 400,
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  padding: '1.75px 0 1.25px 0',
  lineHeight: '1.2',
  '&:hover': {
    color: '#ffffff',
  },
}));

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const handleLogoClick = () => {
    scrollToSection('intro');
  };

  // 스크롤 위치에 따라 활성 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'participation', 'registration', 'confirmation'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledAppBar elevation={0}>
      <StyledToolbar>
        <LogoContainer>
          <LogoBox onClick={handleLogoClick}>AI</LogoBox>
          <BrandText>
            AI Hackathon
          </BrandText>
        </LogoContainer>

        <NavLinks>
          <NavButton 
            active={activeSection === 'intro'}
            onClick={() => scrollToSection('intro')}
          >
            대회 소개
          </NavButton>
        </NavLinks>

        <ParticipateText>
          지금 참여하세요 →
        </ParticipateText>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navigation; 