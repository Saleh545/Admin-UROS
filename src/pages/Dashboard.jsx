import React from 'react';
import { 
  Box, Card, CardContent, Typography, Avatar, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, Button 
} from '@mui/material';
import { 
  Store, MonetizationOn, LocationOn, Favorite, // LocationOn ikonu əlavə olundu
  LockPerson 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  const stats = [
    { 
      title: t('dashboard.stats.brands'), // Brendlər (Şəbəkə)
      value: '12', 
      badge: `+2 ${t('dashboard.stats.new')}`, 
      color: '#666CFF', 
      bgColor: 'rgba(102, 108, 255, 0.12)', 
      icon: <Store />
    },
    { 
      title: t('dashboard.stats.branches'), // Cəmi Filiallar
      value: '45', 
      badge: `+5 ${t('dashboard.stats.new')}`, 
      color: '#26C6F9', // Mavi rəng (Şəkildəki kimi)
      bgColor: 'rgba(38, 198, 249, 0.12)', 
      icon: <LocationOn /> // Map/Location ikonu
    },
    { 
      title: t('dashboard.stats.revenue_total'), // Gəlir (Ümumi)
      value: '18,500 ₼', 
      badge: '+15%', 
      color: '#72E128', 
      bgColor: 'rgba(114, 225, 40, 0.12)', 
      icon: <MonetizationOn />
    },
    { 
      title: t('dashboard.stats.system'), // Sistem
      value: '100%', 
      badge: t('dashboard.stats.stable'), 
      color: '#72E128', 
      bgColor: 'rgba(114, 225, 40, 0.12)', 
      icon: <Favorite />
    },
  ];

  const recentRegistrations = [
    { id: 1, name: 'Grand Baku', branches: 3, date: t('dashboard.table.time_2_days'), status: t('dashboard.table.status_active'), color: 'success', letter: 'G' },
    { id: 2, name: 'Dolma Kitchen', branches: 1, date: t('dashboard.table.time_5_hours'), status: t('dashboard.table.status_pending'), color: 'warning', letter: 'D' },
    { id: 3, name: 'Caspian Grill', branches: 5, date: t('dashboard.table.time_1_week'), status: t('dashboard.table.status_active'), color: 'success', letter: 'C' },
    { id: 4, name: 'Old City Cafe', branches: 1, date: t('dashboard.table.time_2_weeks'), status: t('dashboard.table.status_active'), color: 'success', letter: 'O' },
  ];

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      
      {/* 1. YUXARI BANNER */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', '&:last-child': { pb: 2 } }}>
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
              {t('dashboard.title')} 🚀
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mt: 0.5, fontSize: '0.85rem' }}>
              {t('dashboard.subtitle')}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.04)', color: 'primary.main', width: 40, height: 40, borderRadius: '10px' }}>
             <LockPerson fontSize="small" />
          </Avatar>
        </CardContent>
      </Card>

      {/* 2. STATİSTİKA KARTLARI */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: {
            xs: '1fr', 
            sm: '1fr 1fr', 
            md: 'repeat(4, 1fr)' 
          },
          gap: 2, 
          width: '100%',
          mb: 2
        }}
      >
        {stats.map((item, index) => (
          <Card key={index} sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent 
              sx={{ 
                p: '16px !important', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between' 
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Avatar 
                  variant="rounded" 
                  sx={{ 
                    bgcolor: item.bgColor, 
                    color: item.color, 
                    width: 40, 
                    height: 40,
                    borderRadius: '8px' 
                  }}
                >
                  {item.icon}
                </Avatar>

                <Typography variant="caption" sx={{ color: item.color, fontWeight: 700 }}>
                  {item.badge}
                </Typography>
              </Box>
              
              <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 0 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px', fontSize: '0.7rem' }}>
                    {item.title}
                  </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 3. CƏDVƏL (Yeni Sütun: Filiallar) */}
      <Card sx={{ mt: 2 }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{t('dashboard.table.title')}</Typography>
            <Button size="small" sx={{ textTransform: 'none', fontSize: '0.75rem' }}>{t('dashboard.table.all')}</Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': { borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary', py: 1 } }}>
                <TableCell>{t('dashboard.table.col_brand')}</TableCell>
                <TableCell>{t('dashboard.table.col_branches')}</TableCell> {/* YENİ SÜTUN */}
                <TableCell>{t('dashboard.table.col_date')}</TableCell>
                <TableCell align="right">{t('dashboard.table.col_status')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentRegistrations.map((row) => (
                <TableRow key={row.id} hover sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)', py: 2 } }}> 
                  
                  {/* Brend Adı */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar 
                        variant="rounded" 
                        sx={{ bgcolor: 'rgba(102, 108, 255, 0.12)', color: '#666CFF', width: 28, height: 28, fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        {row.letter}
                      </Avatar>
                      <Typography variant="body2" fontWeight="bold" fontSize="0.85rem">{row.name}</Typography>
                    </Box>
                  </TableCell>

                  {/* Filial Sayı (Yeni Sütun - Chip ilə) */}
                  <TableCell>
                     <Chip 
                        label={t('dashboard.table.points', { count: row.branches })} // "3 filial"
                        size="small"
                        sx={{ 
                            bgcolor: 'rgba(38, 198, 249, 0.12)', 
                            color: '#26C6F9', 
                            fontWeight: 'bold', 
                            height: 22, 
                            fontSize: '0.7rem',
                            borderRadius: '6px'
                        }}
                     />
                  </TableCell>

                  {/* Tarix */}
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">{row.date}</Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell align="right">
                    <Chip 
                      label={row.status} 
                      color={row.color} 
                      size="small" 
                      sx={{ fontWeight: 'bold', height: 20, fontSize: '0.65rem', borderRadius: '4px' }} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Dashboard;