import React from 'react';
import { 
  Box, Card, CardContent, Typography, Button, IconButton, 
  Avatar, Grid, useTheme, Badge 
} from '@mui/material';
import { 
  PowerSettingsNew, Notifications, Restaurant, Map, 
  MoreVert, Person, AccessTime, Add 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- MOCK DATA ---
const NOTIFICATIONS = [
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
  
  // --- COLORS ---
  const TEXT_MAIN = '#fff';
  const TEXT_MUTED = 'rgba(255, 255, 255, 0.6)';
  const BLUE = '#4285F4'; 
  const GREEN = '#72E128'; 
  const RED = '#FF4C51';
  const CARD_BG = '#312d4b'; 
  const BG_MAIN = '#231f36'; 

  // Ümumi Kart Stili
  const commonCardStyle = {
    bgcolor: CARD_BG, 
    borderRadius: '12px', 
    width: '100%',      
    height: '100%',     
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.05)',
    boxSizing: 'border-box'
  };

  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: '100vh', 
      bgcolor: BG_MAIN, 
      p: 2, 
      boxSizing: 'border-box',
      pb: 4,
      overflowX: 'hidden'
    }}>
      
      {/* --- HEADER PROFILE CARD --- */}
      <Card sx={{ width: '100%', borderRadius: '16px', bgcolor: 'rgba(66, 133, 244, 0.2)', mb: 3, border: '1px solid rgba(66, 133, 244, 0.3)' }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', width: 48, height: 48 }}>
                <Person sx={{ color: '#fff' }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ color: TEXT_MAIN, lineHeight: 1.2 }}>
                  Salam, Leyla!
                </Typography>
                <Typography variant="caption" noWrap sx={{ color: TEXT_MUTED, display: 'block', mb: 0.5 }}>
                  📍 Grand Baku (Center)
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: GREEN }} />
                  <Typography variant="caption" fontWeight="600" sx={{ color: TEXT_MAIN }}>Növbədə</Typography>
                </Box>
              </Box>
            </Box>
            <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
              <PowerSettingsNew />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* --- NOTIFICATIONS --- */}
      {NOTIFICATIONS.map((note) => (
        <Card key={note.id} sx={{ width: '100%', mb: 2, borderRadius: '12px', bgcolor: note.type === 'success' ? 'rgba(114, 225, 40, 0.15)' : 'rgba(255, 76, 81, 0.15)', borderLeft: `4px solid ${note.type === 'success' ? GREEN : RED}` }}>
          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 }, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ color: note.type === 'success' ? GREEN : RED, display: 'flex', alignItems: 'center' }}>
              <Notifications fontSize="small" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight="bold" noWrap sx={{ color: TEXT_MAIN }}>{note.title}</Typography>
              <Typography variant="caption" noWrap sx={{ color: TEXT_MUTED }}>{note.message}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* --- NAVIGATION CARDS --- */}
      <Grid container spacing={2} sx={{ mb: 3, mt: 1 }}>
        <Grid item xs={6}>
          <Card sx={{ ...commonCardStyle, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
            <CardContent sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: 'rgba(66, 133, 244, 0.15)', color: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <Map />
              </Box>
              <Typography variant="body2" fontWeight="bold" sx={{ color: TEXT_MAIN }}>{t('mobile.halls')}</Typography>
              <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{t('mobile.table_map')}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ ...commonCardStyle, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
            <CardContent sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: 'rgba(255, 255, 255, 0.08)', color: TEXT_MUTED, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <Restaurant />
              </Box>
              <Typography variant="body2" fontWeight="bold" sx={{ color: TEXT_MAIN }}>{t('mobile.menu')}</Typography>
              <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{t('mobile.stop_list')}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* --- QUICK ORDER BUTTON --- */}
      <Button 
        fullWidth variant="contained" 
        sx={{ width: '100%', bgcolor: GREEN, color: '#fff', fontWeight: '900', fontSize: '1rem', py: 2, borderRadius: '12px', mb: 4, boxShadow: '0 4px 20px rgba(114, 225, 40, 0.25)', textTransform: 'uppercase', '&:hover': { bgcolor: '#64c925' } }}
        startIcon={<Add sx={{ fontWeight: 'bold' }} />}
      >
        {t('mobile.quick_order')}
      </Button>

      {/* --- MY TABLES HEADER --- */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, px: 0.5 }}>
        <Typography variant="caption" sx={{ color: TEXT_MUTED, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 'bold' }}>{t('mobile.my_tables')}</Typography>
        <Badge badgeContent={4} color="primary" sx={{ '& .MuiBadge-badge': { bgcolor: BLUE, color: '#fff', fontWeight: 'bold' } }}>
           <Typography variant="caption" sx={{ color: 'transparent' }}>.</Typography>
        </Badge>
      </Box>

      {/* --- MY TABLES GRID --- */}
      <Grid container spacing={2}>
        {MY_TABLES.map((table) => (
          
          // DÜZƏLİŞ: minWidth: '0 !important' əlavə etdim
          <Grid item xs={6} key={table.id} sx={{ minWidth: '0 !important' }}>
            <Card sx={{ 
              ...commonCardStyle,
              borderLeft: `4px solid ${table.active ? BLUE : 'rgba(255,255,255,0.1)'}`, 
            }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, flex: 1, width: '100%', boxSizing: 'border-box' }}>
                
                {/* 1-ci Sətir: Masa Adı və Menyu */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, width: '100%' }}>
                  <Typography variant="h6" fontWeight="bold" noWrap sx={{ color: TEXT_MAIN }}>
                    {table.name}
                  </Typography>
                  <IconButton size="small" sx={{ color: TEXT_MUTED, p: 0 }}>
                    <MoreVert fontSize="small" />
                  </IconButton>
                </Box>

                {/* 2-ci Sətir: Adam Sayı, Vaxt və Qiymət */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  
                  {/* Sol tərəf: İkonlar */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: TEXT_MUTED }}>
                      <Person sx={{ fontSize: 18 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{table.guests}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: TEXT_MUTED }}>
                      <AccessTime sx={{ fontSize: 16 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{table.time}</Typography>
                    </Box>
                  </Box>

                  {/* Sağ tərəf: Qiymət */}
                  <Typography variant="h6" fontWeight="bold" sx={{ color: GREEN, lineHeight: 1 }}>
                    {table.amount}
                  </Typography>

                </Box>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default OpenMobile;