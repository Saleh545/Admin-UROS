import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, IconButton, 
  Avatar, Badge, useTheme, alpha, Fade, Menu, MenuItem, ListItemIcon 
} from '@mui/material';
import { 
  PowerSettingsNew, Notifications, Restaurant, Map, 
  MoreVert, Person, AccessTime, Add, PlayArrow, FreeBreakfast,
  DoneAll, ReceiptLong 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- MOCK DATA ---
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'success', title: 'Masa 5', message: 'Pasta Karbonara hazırdır!' },
  { id: 2, type: 'error', title: 'Masa 2', message: 'Ofisiant çağırır' },
];

const MY_TABLES = [
  { id: 1, name: 'T-1', guests: 4, amount: '45.5 ₼', time: '12 dəq', active: true },
  { id: 2, name: 'T-2', guests: 2, amount: '12 ₼', time: '5 dəq', active: true },
  { id: 3, name: 'V-1', guests: 0, amount: '0 ₼', time: '0 dəq', active: false },
  { id: 4, name: 'V-2', guests: 5, amount: '120 ₼', time: '45 dəq', active: true },
];

const OpenMobile = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  // --- STATES ---
  // DƏYİŞİKLİK BURADA: Default dəyər 'true' edildi (Növbə açıq başlayır)
  const [isShiftOpen, setIsShiftOpen] = useState(true); 
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  
  // MENU STATES
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTableId, setActiveTableId] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // --- COLORS ---
  const BLUE = '#4285F4'; 
  const GREEN = '#72E128'; 
  const RED = '#FF4C51';

  // --- STYLE ---
  const commonCardStyle = {
    bgcolor: 'background.paper', 
    borderRadius: '12px', 
    width: '100%',      
    height: '100%',     
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.shadows[2],
    border: `1px solid ${theme.palette.divider}`,
    boxSizing: 'border-box'
  };

  // --- HANDLERS ---
  const handleToggleShift = () => setIsShiftOpen(!isShiftOpen);
  const handleClearNotifications = () => setNotifications([]);

  const handleMenuOpen = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setActiveTableId(id);
  };

  const handleMenuClose = (event) => {
    if (event) event.stopPropagation();
    setAnchorEl(null);
    setActiveTableId(null);
  };

  const handleAction = (action) => {
    console.log(`Action: ${action} on Table ID: ${activeTableId}`);
    handleMenuClose();
  };

  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      p: 2, 
      boxSizing: 'border-box',
      pb: 4,
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* --- HEADER PROFILE --- */}
      <Card sx={{ 
        width: '100%', 
        borderRadius: '16px', 
        bgcolor: alpha(BLUE, 0.12), 
        mb: 3, 
        border: `1px solid ${alpha(BLUE, 0.3)}`,
        boxShadow: 'none'
      }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), width: 48, height: 48 }}>
                <Person color="primary" />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ color: 'text.primary', lineHeight: 1.2 }}>
                  {t('mobile.welcome', { name: 'Leyla' })}
                </Typography>
                <Typography variant="caption" noWrap sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                  📍 Grand Baku (Center)
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: isShiftOpen ? GREEN : 'text.disabled' }} />
                  <Typography variant="caption" fontWeight="600" sx={{ color: isShiftOpen ? 'text.primary' : 'text.disabled' }}>
                    {isShiftOpen ? t('mobile.status_online') : t('mobile.status_offline')}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <IconButton 
              onClick={handleToggleShift}
              sx={{ 
                bgcolor: isShiftOpen ? alpha(RED, 0.1) : alpha(GREEN, 0.1), 
                color: isShiftOpen ? RED : GREEN, 
                border: `1px solid ${isShiftOpen ? alpha(RED, 0.3) : alpha(GREEN, 0.3)}`,
                '&:hover': { bgcolor: isShiftOpen ? alpha(RED, 0.2) : alpha(GREEN, 0.2) } 
              }}
            >
              {isShiftOpen ? <PowerSettingsNew /> : <PlayArrow />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* --- CONTENT AREA --- */}
      {isShiftOpen ? (
        <Fade in={isShiftOpen}>
          <Box>
            {/* NOTIFICATIONS */}
            {notifications.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, px: 0.5 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', letterSpacing: 1, textTransform: 'uppercase' }}>
                    {t('mobile.urgent')}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    onClick={handleClearNotifications}
                    sx={{ color: BLUE, fontWeight: 'bold', cursor: 'pointer', '&:hover': { textDecoration: 'underline', opacity: 0.8 } }}
                  >
                    {t('mobile.clear')}
                  </Typography>
                </Box>
                {notifications.map((note) => (
                  <Card key={note.id} sx={{ 
                    width: '100%', mb: 1.5, borderRadius: '12px', 
                    bgcolor: note.type === 'success' ? alpha(GREEN, 0.12) : alpha(RED, 0.12), 
                    borderLeft: `4px solid ${note.type === 'success' ? GREEN : RED}`,
                    boxShadow: 'none'
                  }}>
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ color: note.type === 'success' ? GREEN : RED, display: 'flex', alignItems: 'center' }}><Notifications fontSize="small" /></Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight="bold" noWrap sx={{ color: 'text.primary' }}>{note.title}</Typography>
                        <Typography variant="caption" noWrap sx={{ color: 'text.secondary' }}>{note.message}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}

            {/* NAVIGATION CARDS */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: '100%', mb: 3, mt: 1 }}>
              <Card sx={{ ...commonCardStyle, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                <CardContent sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: alpha(BLUE, 0.15), color: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}><Map /></Box>
                  <Typography variant="body2" fontWeight="bold" sx={{ color: 'text.primary' }}>{t('mobile.halls')}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{t('mobile.table_map')}</Typography>
                </CardContent>
              </Card>
              <Card sx={{ ...commonCardStyle, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                <CardContent sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: alpha('rgba(255, 255, 255, 0.5)', 0.15), color: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}><Restaurant /></Box>
                  <Typography variant="body2" fontWeight="bold" sx={{ color: 'text.primary' }}>{t('mobile.menu')}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{t('mobile.stop_list')}</Typography>
                </CardContent>
              </Card>
            </Box>

            {/* QUICK ORDER */}
            <Button 
              fullWidth variant="contained" 
              sx={{ width: '100%', bgcolor: GREEN, color: '#fff', fontWeight: '900', fontSize: '1rem', py: 2, borderRadius: '12px', mb: 4, boxShadow: `0 4px 20px ${alpha(GREEN, 0.4)}`, textTransform: 'uppercase', '&:hover': { bgcolor: '#64c925' } }}
              startIcon={<Add sx={{ fontWeight: 'bold' }} />}
            >
              {t('mobile.quick_order')}
            </Button>

            {/* MY TABLES HEADER */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, px: 0.5 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 'bold' }}>{t('mobile.my_tables')}</Typography>
              <Badge badgeContent={4} color="primary" sx={{ '& .MuiBadge-badge': { bgcolor: BLUE, color: '#fff', fontWeight: 'bold' } }}>
                 <Typography variant="caption" sx={{ color: 'transparent' }}>.</Typography>
              </Badge>
            </Box>

            {/* MY TABLES GRID */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, width: '100%' }}>
              {MY_TABLES.map((table) => (
                <Card key={table.id} sx={{ ...commonCardStyle, borderLeft: `4px solid ${table.active ? BLUE : theme.palette.divider}` }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, flex: 1, width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" fontWeight="bold" noWrap sx={{ color: 'text.primary', fontSize: '1.1rem' }}>{table.name}</Typography>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleMenuOpen(e, table.id)}
                        sx={{ color: 'text.secondary', p: 0, mt: -0.5, mr: -0.5 }}
                      >
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box sx={{ textAlign: 'right', mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: GREEN, lineHeight: 1 }}>{table.amount}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary' }}>
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Person sx={{ fontSize: 16 }} /><Typography variant="caption" fontWeight="bold">{table.guests}</Typography></Box>
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><AccessTime sx={{ fontSize: 14 }} /><Typography variant="caption" sx={{ fontSize: '0.75rem' }}>{table.time}</Typography></Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Fade>
      ) : (
        // CLOSED SHIFT
        <Fade in={!isShiftOpen}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', opacity: 0.7 }}>
            <FreeBreakfast sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" sx={{ color: 'text.primary', mb: 1 }}>
              {t('mobile.shift_closed_title')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              {t('mobile.shift_start_instruction_1')} <strong style={{ color: GREEN }}>{t('mobile.green_button')}</strong> {t('mobile.shift_start_instruction_2')}
            </Typography>
          </Box>
        </Fade>
      )}

      {/* --- MENU MODAL --- */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 4,
          sx: {
            borderRadius: '12px',
            bgcolor: 'background.paper',
            minWidth: '160px',
            mt: 1,
            '& .MuiMenuItem-root': { fontSize: '0.9rem', fontWeight: 500, gap: 1.5, py: 1.5 }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleAction('close')}>
          <ListItemIcon sx={{ minWidth: 0 }}><DoneAll fontSize="small" sx={{ color: 'text.secondary' }} /></ListItemIcon>
          {t('mobile.close_table')}
        </MenuItem>
        <MenuItem onClick={() => handleAction('order')}>
          <ListItemIcon sx={{ minWidth: 0 }}><ReceiptLong fontSize="small" sx={{ color: 'text.secondary' }} /></ListItemIcon>
          {t('mobile.to_order')}
        </MenuItem>
      </Menu>

    </Box>
  );
};

export default OpenMobile;