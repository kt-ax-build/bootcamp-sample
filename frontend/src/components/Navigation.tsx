import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#0f172b',
  borderBottom: '1px solid #314158',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
}));

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 80px',
  maxWidth: '1920px',
  margin: '0 auto',
  width: '100%',
  height: '80px',
}));

const LogoBox = styled(Box)(() => ({
  width: '40px',
  height: '40px',
  backgroundColor: '#9810fa',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 700,
  cursor: 'pointer',
}));

const NavLinks = styled(Box)(() => ({
  display: 'flex',
  gap: '48px',
  alignItems: 'center',
}));

const NavLink = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ active }) => ({
  color: active ? '#9810fa' : '#ffffff',
  fontSize: '16px',
  fontWeight: active ? 600 : 500,
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: '#9810fa',
  },
}));

const ParticipateButton = styled(Box)(() => ({
  backgroundColor: '#9810fa',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#7c0fd8',
  },
}));

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleLogoClick = () => {
    scrollToSection('intro');
  };

  const handleParticipateClick = () => {
    scrollToSection('registration');
  };

  // 스크롤 위치에 따라 활성 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'participation', 'registration', 'confirmation'];
      const scrollPosition = window.scrollY + 100; // 네비게이션 높이만큼 오프셋

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LogoBox onClick={handleLogoClick}>KT</LogoBox>
          <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
            AI Hackathon
          </Typography>
        </Box>

        <NavLinks>
          <NavLink 
            active={activeSection === 'intro'}
            onClick={() => scrollToSection('intro')}
          >
            대회 소개
          </NavLink>
          <NavLink 
            active={activeSection === 'participation'}
            onClick={() => scrollToSection('participation')}
          >
            참가 안내
          </NavLink>
          <NavLink 
            active={activeSection === 'registration'}
            onClick={() => scrollToSection('registration')}
          >
            신청 및 접수
          </NavLink>
          <NavLink 
            active={activeSection === 'confirmation'}
            onClick={() => scrollToSection('confirmation')}
          >
            신청 확인
          </NavLink>
        </NavLinks>

        <ParticipateButton onClick={handleParticipateClick}>
          지금 참여하세요 →
        </ParticipateButton>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navigation; 