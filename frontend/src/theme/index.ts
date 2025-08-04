import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#9810fa', // Electric Violet
      light: '#c084fc', // purple-400
      dark: '#6b21a8', // purple-800
    },
    secondary: {
      main: '#8b5cf6', // violet-500
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    text: {
      primary: '#101828', // azure/11
      secondary: '#4a5565', // azure/34
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    // 슬레이트 색상 추가
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    // 퍼플 색상 추가
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    // 커스텀 색상 추가
    custom: {
      azure: {
        11: '#101828',
        34: '#4a5565',
        46: '#6a7282',
      },
      grey: {
        4: '#0a0a0a',
        48: '#717182',
        91: '#e5e7eb',
        96: '#f3f3f5',
        97: '#eff6ff',
        98: '#f9fafb',
      },
      violet: {
        52: '#9810fa',
      },
    },
  },
  typography: {
    fontFamily: '"Apple SD Gothic Neo", "SF Pro Text", sans-serif',
    h1: {
      fontSize: '63px',
      fontWeight: 700,
      lineHeight: '78.75px',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
    },
    h2: {
      fontSize: '42px',
      fontWeight: 700,
      lineHeight: '42px',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
    },
    h3: {
      fontSize: '21px',
      fontWeight: 600,
      lineHeight: '28px',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
    },
    h4: {
      fontSize: '21px',
      fontWeight: 400,
      lineHeight: '28px',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
    },
    body1: {
      fontSize: '17.5px',
      fontWeight: 400,
      lineHeight: '24.5px',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '21px',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
    },
    caption: {
      fontSize: '12.3px',
      fontWeight: 400,
      lineHeight: '17.5px',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
    },
    label: {
      fontSize: '12.3px',
      fontWeight: 500,
      lineHeight: '12.25px',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
    },
    input: {
      fontSize: '12.3px',
      fontWeight: 400,
      lineHeight: '100%',
      fontFamily: '"SF Pro Text", sans-serif',
    },
    button: {
      fontSize: '15.8px',
      fontWeight: 500,
      lineHeight: '24.5px',
      fontFamily: '"Apple SD Gothic Neo", sans-serif',
    },
  },
  spacing: (factor: number) => `${factor * 7}px`,
  shape: {
    borderRadius: 8.75,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          textTransform: 'none',
          fontWeight: 500,
          fontFamily: '"Apple SD Gothic Neo", sans-serif',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '6.75px',
            backgroundColor: '#f3f3f5',
            height: '31.5px',
            '& fieldset': {
              border: 'none',
            },
            '& input': {
              fontSize: '12.3px',
              padding: '8.5px 11.5px',
              color: '#717182',
              fontFamily: '"SF Pro Text", sans-serif',
            },
            '& textarea': {
              fontSize: '12.3px',
              padding: '0px 0px',
              color: '#717182',
              fontFamily: '"Apple SD Gothic Neo", sans-serif',
              lineHeight: '17.5px',
            },
            '&:hover': {
              backgroundColor: '#e2e8f0',
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
              border: '1px solid #9810fa',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '12.3px',
            color: '#64748b',
          },
          '& .MuiSelect-select': {
            fontSize: '12.3px',
            padding: '8px 11.5px',
            color: '#717182',
            fontFamily: '"Apple SD Gothic Neo", sans-serif',
            lineHeight: '17.5px',
            textAlign: 'left',
          },
          '& .MuiSelect-icon': {
            color: '#717182',
            opacity: 0.5,
          },
          '&.multiline': {
            '& .MuiOutlinedInput-root': {
              height: 'auto',
              minHeight: '42px',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: '12.75px',
          border: '1px solid rgba(0,0,0,0.01)',
          boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Apple SD Gothic Neo", sans-serif',
        },
      },
    },
  },
});

// 공통 스타일 상수
export const commonStyles = {
  // 컨테이너 스타일
  container: {
    padding: '70px 568px',
    minHeight: 1200,
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
  },
  contentContainer: {
    maxWidth: 784,
    margin: '0 auto',
    padding: '0 21px',
  },
  
  // 헤더 스타일
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '21px',
    marginBottom: '42px',
  },
  
  // 카드 스타일
  cardHeader: {
    padding: '21px 21px 5.25px 21px',
    borderBottom: 'none',
  },
  cardContent: {
    padding: '0 21px 21px 21px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20.25px',
  },
  
  // 폼 스타일
  formRow: {
    display: 'flex',
    gap: '21px',
    width: '100%',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  formField: {
    marginBottom: '0',
    '&.half-width': {
      flex: '0 0 calc(50% - 10.5px)',
    },
  },
  
  // 팀원 카드 스타일
  teamMemberCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8.75px',
    border: '1px solid #e5e7eb',
    padding: '22px',
    marginBottom: '14px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s ease',
    '&:hover': {
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
  },
  
  // 버튼 스타일
  primaryButton: {
    backgroundColor: '#9810fa',
    color: '#ffffff',
    fontSize: '15.8px',
    fontWeight: 500,
    padding: '14px 42px',
    borderRadius: '50px',
    textTransform: 'none',
    lineHeight: '24.5px',
    fontFamily: '"Apple SD Gothic Neo", sans-serif',
    minHeight: '31.5px',
    '&:hover': {
      backgroundColor: '#59168b',
    },
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    color: '#0a0a0a',
    fontSize: '12.3px',
    fontWeight: 500,
    padding: '1px 9.75px',
    borderRadius: '6.75px',
    border: '1px solid rgba(0,0,0,0.01)',
    minHeight: '28px',
    textTransform: 'none',
    lineHeight: '17.5px',
    fontFamily: '"Apple SD Gothic Neo", sans-serif',
    '&:hover': {
      backgroundColor: '#f9fafb',
    },
  },
  
  // 성공 화면 스타일
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '80px 0',
  },
};

// 공통 스타일 유틸리티 함수
export const createCommonStyle = (styleName: keyof typeof commonStyles) => {
  return () => commonStyles[styleName];
};

// 자주 사용되는 스타일 조합
export const styleUtils = {
  // 섹션 제목 스타일
  sectionTitle: {
    fontSize: '42px',
    fontWeight: 700,
    color: '#101828',
    textAlign: 'center',
    lineHeight: '42px',
  },
  
  // 섹션 부제목 스타일
  sectionSubtitle: {
    fontSize: '17.5px',
    color: '#4a5565',
    textAlign: 'center',
    maxWidth: '588px',
    lineHeight: '24.5px',
  },
  
  // 카드 제목 스타일
  cardTitle: {
    fontSize: '21px',
    fontWeight: 400,
    color: '#101828',
    lineHeight: '28px',
  },
  
  // 필드 라벨 스타일
  fieldLabel: {
    fontSize: '12.3px',
    fontWeight: 500,
    color: '#0a0a0a',
    marginBottom: '7px',
    lineHeight: '12.25px',
  },
  
  // 팀원 제목 스타일
  teamMemberTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#101828',
    lineHeight: '21px',
  },
  
  // 성공 아이콘 스타일
  successIcon: {
    fontSize: '80px',
    color: '#10b981',
    marginBottom: '24px',
  },
  
  // 성공 제목 스타일
  successTitle: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#101828',
    marginBottom: '16px',
  },
  
  // 성공 메시지 스타일
  successMessage: {
    fontSize: '20px',
    color: '#6b7280',
    marginBottom: '32px',
    lineHeight: '28px',
  },
  
  // 제출 노트 스타일
  submitNote: {
    fontSize: '12.3px',
    color: '#6a7282',
    textAlign: 'center',
    lineHeight: '17.5px',
    marginTop: '28px',
  },
}; 