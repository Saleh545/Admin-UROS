import React from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Avatar, List, ListItem, Chip, Divider 
} from '@mui/material';
import { 
  AccessTime, Groups, Person, SmartToy, 
  CalendarMonth, ArrowForwardIos, Phone, Block 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // Tərcümə hook-u

const VenueDashboard = () => {
  const { t } = useTranslation();

  // 1. STATISTIKA DATA (Tərcüməli)
  const stats = [
    { 
      title: t('venue_dashboard.stats.hall_load'), 
      value: '60%', 
      sub: t('venue_dashboard.stats.tables_count', { count: 12 }), 
      icon: <Groups fontSize="small" />, 
      color: '#666CFF', 
      bg: 'rgba(102, 108, 255, 0.12)' 
    },
    { 
      title: t('venue_dashboard.stats.reserves'), 
      value: '8', 
      sub: t('venue_dashboard.stats.guests_count', { count: 32 }), 
      icon: <CalendarMonth fontSize="small" />, 
      color: '#26C6F9', 
      bg: 'rgba(38, 198, 249, 0.12)' 
    },
    { 
      title: t('venue_dashboard.stats.waiters'), 
      value: '4', 
      sub: t('venue_dashboard.stats.on_shift'), 
      icon: <Person fontSize="small" />, 
      color: '#FDB528', 
      bg: 'rgba(253, 181, 40, 0.12)' 
    },
    { 
      title: t('venue_dashboard.stats.ai_assistant'), 
      value: t('venue_dashboard.stats.status_online'), 
      sub: t('venue_dashboard.stats.status_norm'), 
      icon: <SmartToy fontSize="small" />, 
      color: '#72E128', 
      bg: 'rgba(114, 225, 40, 0.12)' 
    },
  ];

  // 2. REZERVLƏR DATA (Tərcümə üçün açarlar)
  const reserves = [
    { time: '19:00', name: 'Aliyev A.', phone: '+994 50 123 45 67', guests: 4, hall: 'hall_vip', status: 'status_confirmed', statusColor: 'success' },
    { time: '19:30', name: 'John Doe', phone: '+994 55 987 65 43', guests: 2, hall: 'hall_terrace', status: 'status_pending', statusColor: 'warning' },
    { time: '20:00', name: 'Corp. Party', phone: '+994 70 111 22 33', guests: 12, hall: 'hall_main', status: 'status_confirmed', statusColor: 'success' },
    { time: '21:00', name: 'Birthday', phone: '+994 55 111 22 33', guests: 8, hall: 'hall_main', status: 'status_confirmed', statusColor: 'success' },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }}>
      
      {/* BAŞLIQ HİSSƏSİ - Kompakt */}
      <Card sx={{ mb: 1.5, boxShadow: 2 }}>
        <CardContent sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', '&:last-child': { pb: 1.5 } }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.7rem' }}>
              {t('venue_dashboard.you_manage')}
            </Typography>
            <Typography variant="subtitle1" fontWeight="700" lineHeight={1.2}>Grand Baku (Center)</Typography>
          </Box>
          <Button 
            variant="contained" 
            size="small"
            startIcon={<AccessTime sx={{ fontSize: '1rem' }} />} 
            sx={{ bgcolor: '#4285F4', borderRadius: '20px', textTransform: 'none', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 0.5 }}
          >
            {t('venue_dashboard.shift')}
          </Button>
        </CardContent>
      </Card>

      {/* STATISTIKA KARTLARI - Light Mode düzəldildi */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: '1fr 1fr', 
            md: '1fr 1fr 1fr 1fr' 
          }, 
          gap: 1.5, 
          width: '100%',
          mb: 1.5,
          boxSizing: 'border-box'
        }}
      >
        {stats.map((item, index) => (
          <Card key={index} sx={{ height: '100%', boxShadow: 2, bgcolor: 'background.paper', backgroundImage: 'none' }}>
            <CardContent sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'start', '&:last-child': { pb: 1.5 } }}>
                <Box>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.65rem' }}>{item.title}</Typography>
                    <Typography variant="h5" fontWeight="700" sx={{ mt: 0.5, mb: 0, fontSize: '1.5rem' }}>{item.value}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>{item.sub}</Typography>
                </Box>
                <Avatar variant="rounded" sx={{ bgcolor: item.bg, color: item.color, width: 34, height: 34 }}>{item.icon}</Avatar>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* MAIN CONTENT GRID - Light Mode düzəldildi */}
      <Box 
        sx={{ 
          display: 'grid',
          // PC (md): 70% sol, 30% sağ
          gridTemplateColumns: { xs: '1fr', md: '2.5fr 1fr' }, 
          gap: 1.5,
          alignItems: 'stretch' // Kartların hündürlüyünü bərabərləşdirir
        }}
      >
        
        {/* SOL TƏRƏF: REZERVLƏR */}
        <Card sx={{ height: '100%', boxShadow: 2, bgcolor: 'background.paper', backgroundImage: 'none' }}>
            <CardContent sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column', '&:last-child': { pb: 1.5 } }}> 
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="600">{t('venue_dashboard.reserves.title')}</Typography>
                    <Button size="small" endIcon={<ArrowForwardIos sx={{ fontSize: 10 }} />} sx={{ fontSize: '0.75rem' }}>
                      {t('venue_dashboard.reserves.calendar')}
                    </Button>
                </Box>

                <List sx={{ p: 0, flexGrow: 1 }}>
                    {reserves.map((res, i) => (
                        <Box key={i}>
                            <ListItem disablePadding sx={{ py: 1, display: 'flex', flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: 1.5 }}>
                                <Box sx={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', p: 0.5, textAlign: 'center', minWidth: 45 }}>
                                    <Typography variant="body2" fontWeight="bold" sx={{ color: '#4285F4', fontSize: '0.85rem' }}>{res.time.split(':')[0]}</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>{res.time.split(':')[1]}</Typography>
                                </Box>
                                <Box sx={{ flex: 1, minWidth: 120 }}>
                                    <Typography variant="subtitle2" fontWeight="bold" sx={{ lineHeight: 1.2, fontSize: '0.9rem' }}>{res.name}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.2, color: 'text.secondary' }}>
                                        <Phone sx={{ fontSize: 12, mr: 0.5 }} />
                                        <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{res.phone}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', sm: 'flex-end' }, gap: 0.5, width: { xs: '100%', sm: 'auto' }, mt: { xs: 0.5, sm: 0 } }}>
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <Chip 
                                          label={t(`venue_dashboard.reserves.${res.hall}`)} 
                                          size="small" 
                                          sx={{ bgcolor: '#666CFF', color: '#fff', fontWeight: 'bold', fontSize: '0.65rem', height: 20 }} 
                                        />
                                        <Chip 
                                          label={t(`venue_dashboard.reserves.${res.status}`)} 
                                          size="small" 
                                          sx={{ fontWeight: 'bold', fontSize: '0.65rem', height: 20, bgcolor: res.statusColor === 'warning' ? 'rgba(253, 181, 40, 0.12)' : 'rgba(114, 225, 40, 0.12)', color: res.statusColor === 'warning' ? '#FDB528' : '#72E128' }} 
                                        />
                                    </Box>
                                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontSize: '0.7rem' }}>
                                        <Person sx={{ fontSize: 12 }} /> {t('venue_dashboard.reserves.guest_count', { count: res.guests })}
                                    </Typography>
                                </Box>
                            </ListItem>
                            
                            {i < reserves.length - 1 && (
                                <Divider 
                                    variant="middle" 
                                    sx={{ 
                                        my: 0.5, 
                                        borderColor: 'rgba(255, 255, 255, 0.1)' 
                                    }} 
                                />
                            )}
                        </Box>
                    ))}
                </List>
            </CardContent>
        </Card>

        {/* SAĞ TƏRƏF: STOP LIST */}
        <Card 
            sx={{ 
                height: '100%', 
                boxShadow: 2, 
                bgcolor: 'background.paper', // Light Mode düzəldildi
                backgroundImage: 'none', 
                display: 'flex', 
                flexDirection: 'column', 
                cursor: 'pointer', 
                transition: '0.3s', 
                '&:hover': { bgcolor: 'action.hover' }, // Hover effekti mövzuya uyğun
                position: 'relative',
                minHeight: { xs: '200px', md: 'auto' }
            }}
        >
            <CardContent 
                sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: 1.5,
                    p: 2,
                    '&:last-child': { pb: 2 }
                }}
            >
                <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar sx={{ width: 64, height: 64, bgcolor: '#FF4C51', boxShadow: '0 0 15px rgba(255, 76, 81, 0.5)', zIndex: 2 }}>
                        <Block sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box sx={{ 
                        position: 'absolute', width: '100%', height: '100%', 
                        border: '2px solid rgba(255, 76, 81, 0.3)', borderRadius: '50%',
                        animation: 'pulse 2s infinite', transform: 'scale(1.2)', zIndex: 1
                    }} />
                </Box>

                <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>{t('venue_dashboard.stop_list.title')}</Typography>
                    <Typography variant="body2" color="error" fontWeight="600" sx={{ mt: 0 }}>
                      {t('venue_dashboard.stop_list.count', { count: 3 })}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, opacity: 0.7, fontSize: '0.7rem' }}>
                      {t('venue_dashboard.stop_list.hint')}
                    </Typography>
                </Box>

                <ArrowForwardIos sx={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)', color: 'text.disabled', fontSize: '1rem' }} />
            </CardContent>
        </Card>

      </Box>
      
      <style>{`
        @keyframes pulse {
            0% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </Box>
  );
};

export default VenueDashboard;