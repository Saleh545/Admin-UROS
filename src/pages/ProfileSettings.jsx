import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  TextField, Avatar, MenuItem, Select, FormControl, InputLabel,
  useTheme, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Switch, useMediaQuery
} from '@mui/material';
import { 
  PersonOutline, LockOpen, NotificationsNone, Settings 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ProfileSettings = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Mobil yoxlanışı

  // --- STATE ---
  const [activeTab, setActiveTab] = useState('account');

  // 1. Account Data
  const [accountData, setAccountData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@ur-os.az',
    role: 'Administrator',
    phone: '+994 50 123 45 67',
    language: 'en'
  });

  // 2. Security Data
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: true
  });

  // 3. Notification Data
  const [notificationData, setNotificationData] = useState({
    newOrders: true,
    waiterCall: true,
    botOffline: true
  });

  // --- COLORS & STYLES ---
  const CARD_BG = isDark ? '#312d4b' : '#fff';
  const TEXT_MAIN = isDark ? 'rgba(231, 227, 252, 0.87)' : '#3a3541';
  const TEXT_MUTED = isDark ? 'rgba(231, 227, 252, 0.68)' : 'rgba(58, 53, 65, 0.68)';
  const PRIMARY_COLOR = '#666CFF'; 
  const BORDER_COLOR = isDark ? 'rgba(231, 227, 252, 0.12)' : 'rgba(58, 53, 65, 0.12)';
  const INPUT_BG = 'transparent';
  const RED = '#FF4C51';

  // Input Stilləri
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: INPUT_BG,
      color: TEXT_MAIN,
      '& fieldset': { borderColor: BORDER_COLOR },
      '&:hover fieldset': { borderColor: isDark ? 'rgba(231, 227, 252, 0.3)' : 'rgba(58, 53, 65, 0.3)' },
      '&.Mui-focused fieldset': { borderColor: PRIMARY_COLOR }
    },
    '& .MuiInputLabel-root': { color: TEXT_MUTED },
    '& .MuiInputLabel-root.Mui-focused': { color: PRIMARY_COLOR },
    '& .MuiSelect-icon': { color: TEXT_MUTED }
  };

  // --- RESPONSIVE MENU STYLE (Burada sehr baş verir) ---
  const getMenuButtonSx = (isActive) => {
    // MOBİL STİL (Horizontal, Textsiz, Alt xətt)
    if (isMobile) {
      return {
        justifyContent: 'center',
        borderBottom: isActive ? `2px solid ${PRIMARY_COLOR}` : '2px solid transparent',
        color: isActive ? PRIMARY_COLOR : TEXT_MUTED,
        bgcolor: 'transparent',
        borderRadius: 0,
        py: 1.5,
        '&:hover': { bgcolor: 'transparent', color: TEXT_MAIN }
      };
    }
    
    // DESKTOP STİL (Vertical, Textli, Sol xətt)
    return {
      mb: 0.5,
      borderRadius: '0 5px 5px 0', 
      borderLeft: isActive ? `3px solid ${PRIMARY_COLOR}` : '3px solid transparent',
      color: isActive ? PRIMARY_COLOR : TEXT_MAIN,
      bgcolor: isActive ? (isDark ? 'rgba(102, 108, 255, 0.16)' : 'rgba(102, 108, 255, 0.08)') : 'transparent',
      '&:hover': { bgcolor: isDark ? 'rgba(231, 227, 252, 0.04)' : 'rgba(58, 53, 65, 0.04)' },
      pl: 2.5,
      py: 1.2,
      width: '100%'
    };
  };

  // Ortaq Kart Stili
  const cardStyle = {
    bgcolor: CARD_BG, 
    boxShadow: 6, 
    borderRadius: '6px', 
    backgroundImage: 'none',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  };

  // --- HANDLERS ---
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountData(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (type, field) => {
    if (type === 'security') {
        setSecurityData(prev => ({ ...prev, [field]: !prev[field] }));
    } else {
        setNotificationData(prev => ({ ...prev, [field]: !prev[field] }));
    }
  };

  // --- RENDER CONTENT BASED ON TAB ---
  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <>
            <Typography variant="h6" fontWeight="500" sx={{ color: TEXT_MAIN, mb: 3 }}>
              {t('settings.profile_details')}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4, flexWrap: 'wrap' }}>
              <Avatar variant="rounded" sx={{ width: 100, height: 100, bgcolor: isDark ? '#3d3759' : '#ebebeb', borderRadius: '6px' }} />
              <Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                  <Button component="label" variant="contained" sx={{ bgcolor: PRIMARY_COLOR, color: '#fff', textTransform: 'none', boxShadow: '0px 4px 8px -4px rgba(102, 108, 255, 0.42)', '&:hover': { bgcolor: '#5C61E6' } }}>
                    {t('settings.upload_photo')}
                    <input hidden accept="image/*" type="file" />
                  </Button>
                  <Button variant="outlined" sx={{ color: TEXT_MUTED, borderColor: BORDER_COLOR, textTransform: 'none', '&:hover': { borderColor: TEXT_MAIN, color: TEXT_MAIN, bgcolor: 'transparent' } }}>
                    {t('settings.reset')}
                  </Button>
                </Box>
                <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{t('settings.allowed_files')}</Typography>
              </Box>
            </Box>
            <Divider sx={{ borderColor: BORDER_COLOR, mb: 4 }} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <TextField fullWidth label={t('settings.firstname')} name="firstName" value={accountData.firstName} onChange={handleAccountChange} sx={inputSx} />
              <TextField fullWidth label={t('settings.lastname')} name="lastName" value={accountData.lastName} onChange={handleAccountChange} sx={inputSx} />
              <TextField fullWidth label={t('settings.email')} name="email" value={accountData.email} sx={inputSx} />
              <TextField fullWidth label={t('settings.role')} name="role" value={accountData.role} sx={inputSx} InputProps={{ readOnly: true }} />
              <TextField fullWidth label={t('settings.phone')} name="phone" value={accountData.phone} onChange={handleAccountChange} sx={inputSx} />
              <FormControl fullWidth sx={inputSx}>
                <InputLabel>{t('settings.language')}</InputLabel>
                <Select value={accountData.language} label={t('settings.language')} name="language" onChange={handleAccountChange}>
                  <MenuItem value="az">Azerbaijani</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="ru">Russian</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </>
        );

      case 'security':
        return (
          <>
            <Typography variant="h6" fontWeight="500" sx={{ color: TEXT_MAIN, mb: 3 }}>
              {t('settings.change_password')}
            </Typography>
            <Box sx={{ display: 'grid', gap: 3, mb: 4 }}>
               <TextField fullWidth type="password" label={t('settings.current_password')} name="currentPassword" value={securityData.currentPassword} onChange={handleSecurityChange} sx={inputSx} />
               <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                 <TextField fullWidth type="password" label={t('settings.new_password')} name="newPassword" value={securityData.newPassword} onChange={handleSecurityChange} sx={inputSx} />
                 <TextField fullWidth type="password" label={t('settings.confirm_password')} name="confirmPassword" value={securityData.confirmPassword} onChange={handleSecurityChange} sx={inputSx} />
               </Box>
            </Box>

            <Typography variant="h6" fontWeight="500" sx={{ color: TEXT_MAIN, mb: 2 }}>
              {t('settings.two_factor')}
            </Typography>
            <Box sx={{ p: 2, borderRadius: '6px', border: `1px solid ${BORDER_COLOR}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <Box>
                 <Typography variant="body2" sx={{ color: TEXT_MAIN, fontWeight: 600, mb: 0.5 }}>{t('settings.enable_2fa')}</Typography>
                 <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{t('settings.secure_account')}</Typography>
               </Box>
               <Switch checked={securityData.twoFactor} onChange={() => handleSwitchChange('security', 'twoFactor')} />
            </Box>
          </>
        );

      case 'notifications':
        return (
          <>
            <Typography variant="h6" fontWeight="500" sx={{ color: TEXT_MAIN, mb: 3 }}>
              {t('settings.notifications_title')}
            </Typography>

            {/* New Orders */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, borderBottom: `1px solid ${BORDER_COLOR}` }}>
               <Box>
                 <Typography variant="body2" sx={{ color: TEXT_MAIN, fontWeight: 600, mb: 0.5 }}>{t('settings.new_orders')}</Typography>
                 <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{t('settings.new_orders_desc')}</Typography>
               </Box>
               <Switch checked={notificationData.newOrders} onChange={() => handleSwitchChange('notification', 'newOrders')} />
            </Box>

            {/* Waiter Call */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, borderBottom: `1px solid ${BORDER_COLOR}` }}>
               <Box>
                 <Typography variant="body2" sx={{ color: TEXT_MAIN, fontWeight: 600, mb: 0.5 }}>{t('settings.waiter_call')}</Typography>
                 <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{t('settings.waiter_call_desc')}</Typography>
               </Box>
               <Switch checked={notificationData.waiterCall} onChange={() => handleSwitchChange('notification', 'waiterCall')} />
            </Box>

            {/* Bot Offline (Critical) */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
               <Box>
                 <Typography variant="body2" sx={{ color: RED, fontWeight: 600, mb: 0.5 }}>{t('settings.bot_offline')}</Typography>
                 <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{t('settings.bot_offline_desc')}</Typography>
               </Box>
               <Switch checked={notificationData.botOffline} onChange={() => handleSwitchChange('notification', 'botOffline')} color="error" />
            </Box>
          </>
        );
      
      default: return null;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 2, md: 3 } }}>
      
      {/* HEADER */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600" sx={{ color: TEXT_MAIN, display: 'flex', alignItems: 'center', gap: 1 }}>
          {t('settings.title')} <Settings sx={{ fontSize: 24 }} />
        </Typography>
        <Typography variant="body2" sx={{ color: TEXT_MUTED, mt: 0.5 }}>{t('settings.subtitle')}</Typography>
      </Box>

      {/* LAYOUT GRID */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '300px 1fr' }, // Mobildə 1 sütun, Desktopda yanaşı
        gap: 3, 
        alignItems: 'start' 
      }}>
        
        {/* LEFT NAV (Mobildə Üfüqi, Desktopda Şaquli) */}
        <Box sx={{ minWidth: 0 }}>
          <Card sx={cardStyle}>
            <List sx={{ 
              py: isMobile ? 0 : 1, // Mobildə padding yoxdur
              pr: 0, pl: 0,
              display: isMobile ? 'flex' : 'block', // Mobildə flex (yanaşı)
              flexDirection: isMobile ? 'row' : 'column'
            }}>
              {['account', 'security', 'notifications'].map((tab) => (
                <ListItem key={tab} disablePadding sx={{ width: isMobile ? '100%' : 'auto' }}>
                  <ListItemButton 
                    selected={activeTab === tab} 
                    onClick={() => setActiveTab(tab)} 
                    sx={getMenuButtonSx(activeTab === tab)}
                  >
                    <ListItemIcon sx={{ 
                      color: 'inherit', 
                      minWidth: isMobile ? 0 : 35, // Mobildə ikon məsafəsi yoxdur
                      justifyContent: 'center'
                    }}>
                      {tab === 'account' ? <PersonOutline fontSize="small" /> : tab === 'security' ? <LockOpen fontSize="small" /> : <NotificationsNone fontSize="small" />}
                    </ListItemIcon>
                    
                    {/* Mobildə mətni gizlədirik, Desktopda göstəririk */}
                    {!isMobile && (
                      <ListItemText 
                        primary={t(`settings.tab_${tab}`)} 
                        primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }} 
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        </Box>

        {/* RIGHT CONTENT */}
        <Box sx={{ minWidth: 0 }}>
          <Card sx={cardStyle}>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              {renderContent()}
              
              {/* Footer Buttons */}
              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <Button variant="outlined" sx={{ color: TEXT_MUTED, borderColor: BORDER_COLOR, textTransform: 'none', '&:hover': { borderColor: TEXT_MUTED, bgcolor: 'transparent' } }}>
                  {t('settings.cancel')}
                </Button>
                <Button variant="contained" sx={{ bgcolor: PRIMARY_COLOR, color: '#fff', textTransform: 'none', fontWeight: 500, boxShadow: '0px 4px 8px -4px rgba(102, 108, 255, 0.42)', '&:hover': { bgcolor: '#5C61E6' } }}>
                  {t('settings.save_changes')}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

      </Box>
    </Box>
  );
};

export default ProfileSettings;