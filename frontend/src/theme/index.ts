import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#9810fa',
      light: '#c27aff',
      dark: '#59168b',
    },
    secondary: {
      main: '#fb64b6',
    },
    background: {
      default: '#ffffff',
      paper: '#f9fafb',
    },
    text: {
      primary: '#101828',
      secondary: '#4a5565',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f3f5',
      200: '#e5e7eb',
      300: '#d1d5dc',
      400: '#717182',
      500: '#6a7282',
      600: '#4a5565',
      700: '#364153',
      800: '#314158',
      900: '#0f172b',
    },
  },
  typography: {
    fontFamily: '"Apple SD Gothic Neo", "SF Pro Text", sans-serif',
    h1: {
      fontSize: '63px',
      fontWeight: 700,
      lineHeight: '78.75px',
    },
    h2: {
      fontSize: '42px',
      fontWeight: 700,
      lineHeight: '42px',
    },
    h3: {
      fontSize: '21px',
      fontWeight: 600,
      lineHeight: '28px',
    },
    h4: {
      fontSize: '21px',
      fontWeight: 400,
      lineHeight: '28px',
    },
    body1: {
      fontSize: '17.5px',
      fontWeight: 400,
      lineHeight: '24.5px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '21px',
    },
    caption: {
      fontSize: '12.3px',
      fontWeight: 400,
      lineHeight: '17.5px',
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
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '6.75px',
            backgroundColor: '#f3f3f5',
            '& fieldset': {
              border: 'none',
            },
          },
        },
      },
    },
  },
}); 