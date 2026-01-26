import React, { useState } from 'react';
import { 
  Box, CssBaseline, AppBar, Toolbar, IconButton, 
  Typography, Avatar, Menu, MenuItem, ListItemIcon, 
  Divider, Button, Badge, Backdrop, CircularProgress, ListItemText 
} from '@mui/material';
import { 
  Menu as MenuIcon, PersonOutline, Settings, Logout, 
  Brightness4, Brightness7 
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import { useColorMode } from '../context/ColorModeContext';
import { useTranslation } from 'react-i18next'; 
import { useNavigate } from 'react-router-dom'; 
import logo from "../assets/logo.png";

const drawerWidth = 260;

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [isLangSwitching, setIsLangSwitching] = useState(false);

  const { toggleColorMode, mode } = useColorMode(); 
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate(); 

  const openProfile = Boolean(anchorElProfile);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // --- MENU FUNCTIONS ---
  const handleProfileMenuOpen = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorElProfile(null);
  };

  const handleGoToVenueDashboard = () => {
    handleProfileMenuClose(); 
    navigate('/venue-dashboard'); 
  };

  // YENİ: Settings səhifəsinə keçid funksiyası
  const handleGoToSettings = () => {
    handleProfileMenuClose();
    navigate('/profile-settings');
  };

  // --- LANGUAGE TOGGLE ---
  const handleLanguageToggle = () => {
    setIsLangSwitching(true);
    setTimeout(() => {
        const currentLang = i18n.language;
        let nextLang = 'az';
        if (currentLang === 'az') nextLang = 'en';
        else if (currentLang === 'en') nextLang = 'ru';
        else nextLang = 'az';

        i18n.changeLanguage(nextLang);
        setTimeout(() => setIsLangSwitching(false), 500);
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
        top: 0, left: 0, width: '100%', height: '100%',
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
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 9999, bgcolor: mode === 'dark' ? '#0f111a' : '#ffffff', display: 'flex', flexDirection: 'column', gap: 2 }}
        open={isLangSwitching}
      >
         <img src={logo} alt="Loading" style={{ height: '50px', objectFit: 'contain' }} />
         <CircularProgress color="primary" />
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
          {/* 1. HAMBURGER MENU (Yalnız mobildə görünür) */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* 2. SOL TƏRƏF: DİL VƏ TEMA DÜYMƏLƏRİ */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
                onClick={handleLanguageToggle} 
                color="inherit" 
                disabled={isLangSwitching} 
                sx={{ mr: 1, width: 40, height: 40, fontSize: '0.9rem', fontWeight: 'bold' }}
            >
                {getCurrentLangText()}
            </IconButton>

            <IconButton onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          {/* 3. ORTA BOŞLUQ (Bütün elementləri sağa itələyir) */}
          <Box sx={{ flexGrow: 1 }} /> 

          {/* 4. SAĞ TƏRƏF: PROFİL AVATARI */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleProfileMenuOpen} size="small" sx={{ ml: 0.5 }}>
             <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot" sx={StyledBadge}>
                <Avatar sx={{ width: 40, height: 40 }} src="/broken-image.jpg" />
              </Badge>
            </IconButton>

            {/* --- DROPDOWN MENU --- */}
            <Menu
              anchorEl={anchorElProfile}
              open={openProfile}
              onClose={handleProfileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt: 1.5, minWidth: 230, bgcolor: 'background.paper', borderRadius: '12px',
                  boxShadow: '0px 4px 20px rgba(0,0,0,0.15)', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  overflow: 'visible',
                  '&:before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0 },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2.5, py: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot" sx={StyledBadge}>
                    <Avatar src="/broken-image.jpg" sx={{ width: 40, height: 40 }} />
                  </Badge>
                  <Box>
                      <Typography variant="subtitle2" fontWeight="700" sx={{ lineHeight: 1.2 }}>John Doe</Typography>
                      <Typography variant="caption" color="text.secondary">Admin</Typography>
                  </Box>
              </Box>
              
              <Divider sx={{ my: 1, opacity: 0.1 }} />

              <MenuItem onClick={handleGoToVenueDashboard} sx={{ py: 1, px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}><PersonOutline fontSize="small" /></ListItemIcon>
                <ListItemText primary={t('profile.profile')} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
              </MenuItem>
              
              {/* Settings düyməsi yeniləndi */}
              <MenuItem onClick={handleGoToSettings} sx={{ py: 1, px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}><Settings fontSize="small" /></ListItemIcon>
                <ListItemText primary={t('profile.settings')} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
              </MenuItem>

              <Divider sx={{ my: 1, opacity: 0.1 }} />

              <Box sx={{ px: 2, py: 1.5 }}>
                  <Button fullWidth variant="contained" color="error" startIcon={<Logout fontSize="small" />} onClick={handleProfileMenuClose} sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px', boxShadow: '0 4px 14px 0 rgba(255, 76, 81, 0.4)' }}>
                      {t('profile.logout')}
                  </Button>
              </Box>
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8, overflowX: 'hidden', maxWidth: '100vw', minWidth: 0 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;