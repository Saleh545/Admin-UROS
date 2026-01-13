import React, { useState } from 'react';
import { 
  Box, CssBaseline, AppBar, Toolbar, IconButton, 
  Typography, Avatar, Menu, MenuItem, ListItemIcon, 
  Divider, Button, Badge, Backdrop, CircularProgress 
} from '@mui/material';
import { 
  Menu as MenuIcon, PersonOutline, Settings, Logout, 
  Brightness4, Brightness7 
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import { useColorMode } from '../context/ColorModeContext';
import { useTranslation } from 'react-i18next'; 
import logo from "../assets/logo.png"; // Logonu import edirik (loading üçün)

const drawerWidth = 260;

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  
  // DİL DƏYİŞMƏ ANIMASİYASI ÜÇÜN STATE
  const [isLangSwitching, setIsLangSwitching] = useState(false);

  const { toggleColorMode, mode } = useColorMode(); 
  const { t, i18n } = useTranslation(); 

  const openProfile = Boolean(anchorElProfile);
  const handleProfileClick = (event) => setAnchorElProfile(event.currentTarget);
  const handleProfileClose = () => setAnchorElProfile(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // --- DİL DƏYİŞMƏ MƏNTİQİ (ANIMASİYA İLƏ) ---
  const handleLanguageToggle = () => {
    // 1. Ekranı qaraltmağa başla
    setIsLangSwitching(true);

    // 2. 500ms gözlə (ekran tam qaralsın), sonra dili dəyiş
    setTimeout(() => {
        const currentLang = i18n.language;
        let nextLang = 'az';

        if (currentLang === 'az') nextLang = 'en';
        else if (currentLang === 'en') nextLang = 'ru';
        else nextLang = 'az';

        i18n.changeLanguage(nextLang);

        // 3. Daha 500ms gözlə (ümumi 1 saniyə), sonra ekranı aç
        setTimeout(() => {
            setIsLangSwitching(false);
        }, 500);

    }, 500);
  };

  const getCurrentLangText = () => {
    switch (i18n.language) {
        case 'en': return 'EN'; 
        case 'ru': return 'RU'; 
        default: return 'AZ';   
    }
  };

  const StyledBadge = {
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${mode === 'dark' ? '#28243d' : '#fff'}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': { transform: 'scale(.8)', opacity: 1 },
      '100%': { transform: 'scale(2.4)', opacity: 0 },
    },
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* LOADING EKRANI (Dil dəyişəndə çıxır) */}
      <Backdrop
        sx={{ 
            color: '#fff', 
            zIndex: (theme) => theme.zIndex.drawer + 9999, // Ən üstdə olsun
            bgcolor: mode === 'dark' ? '#0f111a' : '#ffffff', // Temaya uyğun fon
            display: 'flex',
            flexDirection: 'column',
            gap: 2
        }}
        open={isLangSwitching}
      >
         <img src={logo} alt="Loading" style={{ height: '50px', objectFit: 'contain' }} />
         <CircularProgress color="primary" />
         <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
            {t('')}
         </Typography>
      </Backdrop>

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'background.paper', 
          color: 'text.primary',       
          boxShadow: 'none',
          backdropFilter: 'blur(6px)',
          borderBottom: 'none'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            
            <IconButton 
                onClick={handleLanguageToggle} 
                color="inherit" 
                disabled={isLangSwitching} // Dəyişən vaxtı düyməni blokla
                sx={{ 
                    mr: 1,
                    width: 40,
                    height: 40,
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    transition: 'transform 0.2s',
                    '&:active': { transform: 'scale(0.9)' } 
                }}
            >
                {getCurrentLangText()}
            </IconButton>

            <IconButton onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

          </Box>

          <Box sx={{ flexGrow: 1 }} /> 

          <IconButton onClick={handleProfileClick} size="small" sx={{ ml: 1 }}>
             <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot" sx={StyledBadge}>
                <Avatar sx={{ width: 40, height: 40 }} src="/broken-image.jpg" />
              </Badge>
          </IconButton>

          <Menu
              anchorEl={anchorElProfile}
              open={openProfile}
              onClose={handleProfileClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt: 1.5, minWidth: 230, bgcolor: 'background.paper', borderRadius: '10px',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot" sx={StyledBadge}>
                    <Avatar src="/broken-image.jpg" sx={{ width: 40, height: 40 }} />
                  </Badge>
                  <Box>
                      <Typography variant="subtitle2" fontWeight="bold">John Doe</Typography>
                      <Typography variant="caption" color="text.secondary">Admin</Typography>
                  </Box>
              </Box>
              <Divider sx={{ my: 1 }} />
              <MenuItem onClick={handleProfileClose} sx={{ py: 1 }}>
                <ListItemIcon><PersonOutline fontSize="small" /></ListItemIcon>
                {t('profile.profile')}
              </MenuItem>
              <MenuItem onClick={handleProfileClose} sx={{ py: 1 }}>
                <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                {t('profile.settings')}
              </MenuItem>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ p: 2, pt: 1 }}>
                  <Button fullWidth variant="contained" color="error" startIcon={<Logout />} onClick={handleProfileClose} sx={{ textTransform: 'none', fontWeight: 600 }}>
                      {t('profile.logout')}
                  </Button>
              </Box>
            </Menu>

        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;