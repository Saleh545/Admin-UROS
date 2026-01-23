import { createTheme } from '@mui/material/styles';

// Keçid effekti
const transitionStyle = 'all 0.3s ease-in-out';

// Dizayn tokenləri
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // LIGHT MODE
          background: { default: '#F4F5FA', paper: '#FFFFFF' },
          text: { primary: 'rgba(58, 53, 65, 0.87)', secondary: 'rgba(58, 53, 65, 0.68)' },
        }
      : {
          // DARK MODE
          background: {
            default: '#28243d',
            paper: '#312d4b',
          },
          text: {
            primary: 'rgba(231, 227, 252, 0.87)',
            secondary: 'rgba(231, 227, 252, 0.68)',
          },
        }),
    primary: {
      main: '#666CFF',
      contrastText: '#fff',
    },
    success: { main: '#72E128' },
    warning: { main: '#FDB528' },
    info: { main: '#26C6F9' },
    error: { main: '#FF4C51' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: { fontWeight: 700 }, h2: { fontWeight: 700 }, h3: { fontWeight: 700 },
    h4: { fontWeight: 700 }, h5: { fontWeight: 600 }, h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 }, subtitle2: { fontWeight: 600 },
    body1: { fontWeight: 500 }, body2: { fontWeight: 500 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { transition: transitionStyle },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          backgroundColor: mode === 'dark' ? '#312d4b' : '#FFFFFF',
          transition: transitionStyle,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: 'none',
          backgroundColor: mode === 'dark' ? '#28243d' : '#FFFFFF',
          transition: transitionStyle,
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: mode === 'dark' ? '0px 4px 18px rgba(0, 0, 0, 0.2)' : 'none',
          transition: transitionStyle,
        },
      },
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                transition: transitionStyle,
            }
        }
    },
    MuiGrid: {
      styleOverrides: {
        item: {
          minWidth: 'auto', 
        },
      },
    },
  },
});