import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Avatar, Table, TableBody, TableCell, TableHead, TableRow, 
  LinearProgress, useTheme, useMediaQuery, Menu, MenuItem 
} from '@mui/material';
import { 
  MonetizationOn, LocalOffer, Star, Restaurant, 
  KeyboardArrowDown, CalendarToday, TrendingUp, TrendingDown 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
const REVENUE_DATA = [
  { hour: '12pm', height: '30%' },
  { hour: '1pm', height: '45%' },
  { hour: '2pm', height: '25%' },
  { hour: '3pm', height: '60%' },
  { hour: '4pm', height: '50%' },
  { hour: '5pm', height: '75%' },
  { hour: '6pm', height: '85%' },
  { hour: '7pm', height: '65%' },
  { hour: '8pm', height: '55%' },
];

const PROMOS = [
  { name: 'BAKU2026', type: 'Top Performer 🔥', usage: 98, color: '#72E128' },
  { name: 'LUNCH15', type: 'Steady', usage: 45, color: '#26C6F9' },
  { name: 'WINE50', type: 'Low Interest 📉', usage: 14, color: '#FF4C51' },
];

const TOP_DISHES = [
  { id: 1, name: 'Dolma (Grape Leaves)', price: '12.00 ₼', sold: 154, trend: 'up' },
  { id: 2, name: 'Shah Pilaf', price: '25.00 ₼', sold: 98, trend: 'up' },
  { id: 3, name: 'Lentil Soup', price: '6.00 ₼', sold: 85, trend: 'down' },
  { id: 4, name: 'Kebab Mix', price: '18.50 ₼', sold: 72, trend: 'up' },
];

const REVIEWS = [
  { id: 1, user: 'Aysel K.', rating: 5, text: 'Amazing atmosphere!' },
  { id: 2, user: 'John D.', rating: 4, text: 'Great food, slow service.' },
  { id: 3, user: 'Murad A.', rating: 5, text: 'Best plov in town.' },
];

const BRANCHES = [
  'All Branches (Network)',
  'Grand Baku (Center)',
  'Grand Baku (Mall)',
  'Grand Baku (Sea Breeze)'
];

const OwnerDashboard = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = (branch) => {
    if (branch) setSelectedBranch(branch);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 } }}>
      
      {/* HEADER */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t('ownerdashboard.owner.title')} 📊
          </Typography>
          <Button 
            onClick={handleClick}
            endIcon={<KeyboardArrowDown />} 
            sx={{ color: 'text.secondary', textTransform: 'none', p: 0, '&:hover': { bgcolor: 'transparent' }, justifyContent: 'flex-start', mt: 0.5 }}
          >
            {t('ownerdashboard.owner.subtitle')}: <strong style={{ marginLeft: '5px', color: '#fff' }}>{selectedBranch}</strong>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose(null)}
            PaperProps={{
              sx: { bgcolor: '#2b2c40', color: '#fff', mt: 1, minWidth: 200, boxShadow: '0px 4px 20px rgba(0,0,0,0.3)', borderRadius: 2 }
            }}
          >
            {BRANCHES.map((branch) => (
              <MenuItem 
                key={branch} 
                onClick={() => handleClose(branch)}
                sx={{ 
                  fontSize: '0.9rem', 
                  fontWeight: selectedBranch === branch ? 'bold' : 'normal',
                  color: selectedBranch === branch ? '#4285F4' : '#fff',
                  bgcolor: selectedBranch === branch ? 'rgba(66, 133, 244, 0.1)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                {branch}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Button variant="outlined" startIcon={<CalendarToday fontSize="small" />} sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'text.secondary', textTransform: 'none' }}>
          {t('ownerdashboard.owner.date_filter')}
        </Button>
      </Box>

      {/* 1. STATS CARDS */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        {[
          { title: t('ownerdashboard.stats.revenue'), val: "12,450 ₼", sub: "+18% vs yesterday", icon: <MonetizationOn />, color: '#72E128', bg: 'rgba(114, 225, 40, 0.12)' },
          { title: t('ownerdashboard.stats.promo'), val: "12", sub: "Campaigns running", icon: <LocalOffer />, color: '#4285F4', bg: 'rgba(66, 133, 244, 0.12)' },
          { title: t('ownerdashboard.stats.rating'), val: "4.8", sub: "Based on 45 reviews", icon: <Star />, color: '#FDB528', bg: 'rgba(253, 181, 40, 0.12)' },
          { title: t('ownerdashboard.stats.occupancy'), val: "75%", sub: "12 / 20 Tables", icon: <Restaurant />, color: '#26C6F9', bg: 'rgba(38, 198, 249, 0.12)' },
        ].map((stat, i) => (
          <Card key={i} sx={{ height: '100%', boxShadow: 3, borderRadius: '12px' }}>
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Avatar variant="rounded" sx={{ bgcolor: stat.bg, color: stat.color, width: 42, height: 42 }}>{stat.icon}</Avatar>
                <Typography variant="h5" fontWeight="bold">{stat.val}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight="bold" noWrap>{stat.title}</Typography>
                <Typography variant="caption" color="text.secondary" noWrap>{stat.sub}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 2. MIDDLE SECTION */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, mb: 3 }}>
        <Card sx={{ height: '100%', width: '100%', boxShadow: 3, borderRadius: '12px', minWidth: 0 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold">{t('ownerdashboard.revenue.title')}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>Today (12:00 - 21:00)</Typography>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 200, minWidth: '500px', gap: 2, mt: 4 }}>
                {REVENUE_DATA.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%' }}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', borderRadius: '4px 4px 0 0', bgcolor: 'rgba(66, 133, 244, 0.1)', position: 'relative', cursor: 'pointer', '&:hover .bar': { bgcolor: '#8c9eff' } }}>
                      <Box className="bar" sx={{ width: '100%', height: item.height, bgcolor: '#4285F4', borderRadius: '4px 4px 0 0', transition: 'all 0.3s ease' }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>{item.hour}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ height: '100%', width: '100%', boxShadow: 3, borderRadius: '12px', minWidth: 0 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>{t('ownerdashboard.promo.title')} 🎁</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {PROMOS.map((promo, i) => (
                <Box key={i}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" fontWeight="bold" noWrap>{promo.name}</Typography>
                      <Typography variant="caption" sx={{ color: promo.color, fontWeight: 'bold' }} noWrap>{promo.type}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right', minWidth: '60px' }}>
                      <Typography variant="body2" fontWeight="bold">{promo.usage}</Typography>
                      <Typography variant="caption" color="text.secondary">uses</Typography>
                    </Box>
                  </Box>
                  <LinearProgress variant="determinate" value={promo.usage} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#4285F4' } }} />
                </Box>
              ))}
            </Box>
            <Button fullWidth variant="contained" onClick={() => navigate('/marketing')} sx={{ mt: 4, bgcolor: 'rgba(255,255,255,0.05)', color: '#4285F4', fontWeight: 'bold', textTransform: 'none', '&:hover': { bgcolor: 'rgba(66, 133, 244, 0.1)' } }}>
              {t('ownerdashboard.promo.btn_manage')}
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* 3. BOTTOM SECTION */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        
        {/* TOP DISHES TABLE (RESPONSIVE) */}
        <Card sx={{ height: '100%', width: '100%', boxShadow: 3, borderRadius: '12px', overflow: 'hidden', minWidth: 0 }}>
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Box sx={{ p: 3, pb: 1 }}>
              <Typography variant="h6" fontWeight="bold">{t('ownerdashboard.dishes.title')} 🍔</Typography>
            </Box>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              {/* RESPONSIV CƏDVƏL TƏNZİMLƏMƏLƏRİ */}
              <Table sx={{ minWidth: { xs: 350, sm: 600 } }}> {/* Mobil üçün minWidth azaldıldı */}
                <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold', p: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{t('ownerdashboard.dishes.item')}</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold', p: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{t('ownerdashboard.dishes.price')}</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold', p: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{t('ownerdashboard.dishes.sold')}</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold', p: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{t('ownerdashboard.dishes.trend')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TOP_DISHES.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell sx={{ fontWeight: 'bold', p: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{row.name}</TableCell>
                      <TableCell sx={{ p: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{row.price}</TableCell>
                      <TableCell sx={{ p: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{row.sold}</TableCell>
                      <TableCell sx={{ p: { xs: 1.5, sm: 2 } }}>
                        {row.trend === 'up' ? <TrendingUp sx={{ color: '#72E128', fontSize: { xs: '1rem', sm: '1.5rem' } }} /> : <TrendingDown sx={{ color: '#FF4C51', fontSize: { xs: '1rem', sm: '1.5rem' } }} />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card sx={{ height: '100%', width: '100%', boxShadow: 3, borderRadius: '12px', minWidth: 0 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>{t('ownerdashboard.reviews.title')} ⭐</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {REVIEWS.map((review) => (
                <Box key={review.id} sx={{ p: 1.5, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem' }}>{review.user[0]}</Avatar>
                      <Typography variant="body2" fontWeight="bold" noWrap>{review.user}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Star sx={{ color: '#FDB528', fontSize: 16 }} />
                      <Typography variant="caption" fontWeight="bold">{review.rating}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{review.text}"</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

    </Box>
  );
};

export default OwnerDashboard;