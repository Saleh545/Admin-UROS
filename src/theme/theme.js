import { createTheme } from '@mui/material/styles';

// Keçid effekti
const transitionStyle = 'all 0.3s ease-in-out';

// Dizayn tokenləri (Rənglər birebir şəkildəki kimi)
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // LIGHT MODE (Əgər gələcəkdə lazım olsa)
          background: { default: '#F4F5FA', paper: '#FFFFFF' },
          text: { primary: 'rgba(58, 53, 65, 0.87)', secondary: 'rgba(58, 53, 65, 0.68)' },
        }
      : {
          // DARK MODE (Birebir şəkildəki rənglər)
          background: {
            default: '#28243d', // Əsas arxa fon (Tünd)
            paper: '#312d4b',   // Sidebar və Kartların rəngi (Bir az açıq tünd)
          },
          text: {
            primary: 'rgba(231, 227, 252, 0.87)', // Ağ yazılar
            secondary: 'rgba(231, 227, 252, 0.68)', // Boz yazılar
          },
        }),
    primary: {
      main: '#666CFF', // Şəkildəki parlaq bənövşəyi/mavi düymə rəngi
      contrastText: '#fff',
    },
    success: { main: '#72E128' },
    warning: { main: '#FDB528' },
    info: { main: '#26C6F9' },
    error: { main: '#FF4C51' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    // Şrift qalınlıqları
    h1: { fontWeight: 700 }, h2: { fontWeight: 700 }, h3: { fontWeight: 700 },
    h4: { fontWeight: 700 }, h5: { fontWeight: 600 }, h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 }, subtitle2: { fontWeight: 600 },
    body1: { fontWeight: 500 }, body2: { fontWeight: 500 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 8, // Ümumi yumruluq
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { transition: transitionStyle },
      },
    },
    // Sidebar və Header üçün sərhədləri ləğv edirik
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none', // SAĞ XƏTTİ LƏĞV EDİRİK (Şəkildəki kimi)
          backgroundColor: mode === 'dark' ? '#312d4b' : '#FFFFFF',
          transition: transitionStyle,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: 'none', // Headerin alt xəttini də ləğv edirik
          backgroundColor: mode === 'dark' ? '#28243d' : '#FFFFFF', // Header arxa fonla eyni rəngdə
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
    // Menyu düymələrinin ümumi stili
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: 8, // Düymələr yumru olsun
                transition: transitionStyle,
            }
        }
    }
  },
});