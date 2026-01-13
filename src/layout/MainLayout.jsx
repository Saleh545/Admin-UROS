import React, { useState } from 'react';
import { 
  Box, CssBaseline, AppBar, Toolbar, IconButton, 
  Typography, Avatar, Menu, MenuItem, ListItemIcon, 
  Divider, Button, Badge 
} from '@mui/material';
import { 
  Menu as MenuIcon, PersonOutline, Settings, Logout, 
  Brightness4, Brightness7 
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import { useColorMode } from '../context/ColorModeContext';
import { useTranslation } from 'react-i18next'; 

const drawerWidth = 260;

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  
  const { toggleColorMode, mode } = useColorMode(); 
  const { t, i18n } = useTranslation(); 

  // Profil menyusu idarəetməsi
  const openProfile = Boolean(anchorElProfile);
  const handleProfileClick = (event) => setAnchorElProfile(event.currentTarget);
  const handleProfileClose = () => setAnchorElProfile(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // --- YENİ DİL DƏYİŞMƏ MƏNTİQİ (TOGGLE) ---
  const handleLanguageToggle = () => {
    const currentLang = i18n.language;
    let nextLang = 'az';

    // Sıralama: AZ -> EN -> RU -> AZ
    if (currentLang === 'az') nextLang = 'en';
    else if (currentLang === 'en') nextLang = 'ru';
    else nextLang = 'az';

    i18n.changeLanguage(nextLang);
  };

  // Hazırkı dilə uyğun Bayraq qaytaran funksiya
  const getCurrentFlag = () => {
    switch (i18n.language) {
        case 'en': return '🇬🇧';
        case 'ru': return '🇷🇺';
        default: return '🇦🇿'; // Varsayılan 'az'
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
          
          {/* ---------------- SOL TƏRƏF ---------------- */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            
            {/* DİL DÜYMƏSİ (TEK DÜYMƏ) */}
            <IconButton 
                onClick={handleLanguageToggle} 
                color="inherit" 
                sx={{ 
                    mr: 1,
                    width: 40,
                    height: 40,
                    fontSize: '1.5rem', // Bayrağı böyütmək üçün
                    transition: 'transform 0.2s',
                    '&:active': { transform: 'scale(0.9)' } // Basanda kiçilmə effekti
                }}
            >
                {getCurrentFlag()}
            </IconButton>

            {/* TEMA DÜYMƏSİ */}
            <IconButton onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

          </Box>

          <Box sx={{ flexGrow: 1 }} /> 

          {/* ---------------- SAĞ TƏRƏF (Profil) ---------------- */}
          <IconButton onClick={handleProfileClick} size="small" sx={{ ml: 1 }}>
             <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot" sx={StyledBadge}>
                <Avatar sx={{ width: 40, height: 40 }} src="/broken-image.jpg" />
              </Badge>
          </IconButton>

          {/* Profil Menyusu */}
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