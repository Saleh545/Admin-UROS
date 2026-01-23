import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Avatar, Menu, MenuItem, LinearProgress, useTheme 
} from '@mui/material';
import { 
  ShoppingBag, AttachMoney, Person, CalendarToday, 
  KeyboardArrowDown, EmojiEvents, CheckCircle 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Helper Icon
const ArrowUpIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 0L10 5H7V10H3V5H0L5 0Z" fill="currentColor" fillOpacity="0.7"/>
  </svg>
);

const Analytics = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  // --- STATE ---
  const [filter, setFilter] = useState('this_month'); // Default key
  const [dateAnchorEl, setDateAnchorEl] = useState(null);
  
  const [selectedBranch, setSelectedBranch] = useState('all_branches'); // Default key
  const [branchAnchorEl, setBranchAnchorEl] = useState(null);

  // --- DYNAMIC DATA (Inside Component for Translation) ---
  
  const BRANCHES = [
    { key: 'all_branches', label: t('analytics.all_branches') },
    { key: 'center', label: 'Grand Baku (Center)' }, // Xüsusi adlar tərcümə olunmur
    { key: 'mall', label: 'Grand Baku (Mall)' },
    { key: 'sea', label: 'Grand Baku (Sea Breeze)' }
  ];

  const DATE_FILTERS = [
    { key: 'this_week', label: t('analytics.filters.this_week') },
    { key: 'this_month', label: t('analytics.filters.this_month') },
    { key: 'last_month', label: t('analytics.filters.last_month') }
  ];

  const STATS = [
    { 
      title: t('analytics.stats.revenue'), 
      value: '45,250 ₼', 
      trend: '+12%', 
      isPositive: true, 
      icon: <CheckCircle sx={{ fontSize: 22 }} />, 
      color: '#72E128', 
      bg: 'rgba(114, 225, 40, 0.15)' 
    },
    { 
      title: t('analytics.stats.avg_check'), 
      value: '58.40 ₼', 
      trend: '+5%', 
      isPositive: true, 
      icon: <AttachMoney sx={{ fontSize: 22 }} />, 
      color: '#666CFF', 
      bg: 'rgba(102, 108, 255, 0.15)' 
    },
    { 
      title: t('analytics.stats.orders'), 
      value: '1,845', 
      trend: '-2%', 
      isPositive: false, 
      icon: <ShoppingBag sx={{ fontSize: 22 }} />, 
      color: '#26C6F9', 
      bg: 'rgba(38, 198, 249, 0.15)' 
    },
    { 
      title: t('analytics.stats.retention'), 
      value: '64%', 
      trend: '+8%', 
      isPositive: true, 
      icon: <Person sx={{ fontSize: 22 }} />, 
      color: '#FDB528', 
      bg: 'rgba(253, 181, 40, 0.15)' 
    },
  ];

  const REVENUE_BARS = [
    { label: `${t('analytics.week')} 1`, height: '40%' },
    { label: `${t('analytics.week')} 2`, height: '65%' },
    { label: `${t('analytics.week')} 3`, height: '50%' },
    { label: `${t('analytics.week')} 4`, height: '85%' },
  ];

  const CATEGORIES = [
    { name: t('analytics.categories.food'), value: 55, color: '#4285F4' },
    { name: t('analytics.categories.drinks'), value: 30, color: '#26C6F9' },
    { name: t('analytics.categories.hookah'), value: 15, color: '#FDB528' },
  ];

  const TOP_WAITERS = [
    { name: 'Murad A.', orders: '145', total: '12.5k ₼', color: '#666CFF' },
    { name: 'Aysel K.', orders: '132', total: '9.8k ₼', color: '#FDB528' },
    { name: 'Orkhan B.', orders: '98', total: '6.4k ₼', color: 'rgba(255, 255, 255, 0.5)' },
  ];

  // --- HANDLERS ---
  const handleDateClick = (event) => setDateAnchorEl(event.currentTarget);
  const handleDateClose = (key) => {
    if (key) setFilter(key);
    setDateAnchorEl(null);
  };

  const handleBranchClick = (event) => setBranchAnchorEl(event.currentTarget);
  const handleBranchClose = (key) => {
    if (key) setSelectedBranch(key);
    setBranchAnchorEl(null);
  };

  // Tapılan filialın adını göstərmək üçün
  const currentBranchLabel = BRANCHES.find(b => b.key === selectedBranch)?.label || selectedBranch;
  const currentDateLabel = DATE_FILTERS.find(d => d.key === filter)?.label || filter;

  // Sizin istədiyiniz konkret rəng kodu
  const CARD_BG = '#312d4b';

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 2, md: 3 } }}>
      
      {/* --- HEADER --- */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.5rem', color: 'text.primary' }}>
            {t('analytics.title')} 📈
          </Typography>
          
          {/* BRANCH SELECTOR */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, cursor: 'pointer' }} onClick={handleBranchClick}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mr: 1 }}>
              {t('analytics.showing_for')}: 
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              {currentBranchLabel} <KeyboardArrowDown sx={{ fontSize: 16, ml: 0.5 }} />
            </Typography>
          </Box>

          <Menu
            anchorEl={branchAnchorEl}
            open={Boolean(branchAnchorEl)}
            onClose={() => handleBranchClose(null)}
            PaperProps={{ sx: { mt: 1, minWidth: 220, bgcolor: CARD_BG, color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }}
          >
            {BRANCHES.map((branch) => (
              <MenuItem 
                key={branch.key} 
                onClick={() => handleBranchClose(branch.key)}
                selected={branch.key === selectedBranch}
                sx={{ fontSize: '0.9rem', '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.1)' }, '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
              >
                {branch.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        
        {/* DATE FILTER */}
        <Box>
          <Button 
            onClick={handleDateClick}
            endIcon={<KeyboardArrowDown />}
            startIcon={<CalendarToday fontSize="small" />}
            variant="outlined"
            sx={{ textTransform: 'none', borderColor: theme.palette.divider, color: 'text.primary', minWidth: 160, justifyContent: 'space-between', height: 40, borderRadius: '6px' }}
          >
            {currentDateLabel}
          </Button>
          <Menu
            anchorEl={dateAnchorEl}
            open={Boolean(dateAnchorEl)}
            onClose={() => handleDateClose(null)}
            PaperProps={{ sx: { mt: 1, minWidth: 160, bgcolor: CARD_BG, color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }}
          >
            {DATE_FILTERS.map((opt) => (
              <MenuItem key={opt.key} onClick={() => handleDateClose(opt.key)} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
                {opt.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      {/* --- 1. STATS CARDS --- */}
      <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, 
          gap: 2, 
          width: '100%', 
          mb: 3,
          boxSizing: 'border-box'
      }}>
        {STATS.map((stat, index) => (
          <Card key={index} sx={{ 
              width: '100%', 
              height: '100%',
              boxShadow: 3, 
              borderRadius: '12px', 
              bgcolor: CARD_BG, 
              backgroundImage: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minWidth: 0,
              color: '#fff'
          }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {stat.title}
                </Typography>
                <Avatar variant="rounded" sx={{ bgcolor: stat.bg, color: stat.color, width: 34, height: 34, borderRadius: '8px' }}>
                  {stat.icon}
                </Avatar>
              </Box>
              <Typography variant="h6" fontWeight="700" sx={{ mb: 0.5, color: '#fff' }}>{stat.value}</Typography>
              <Typography variant="caption" sx={{ color: stat.isPositive ? '#72E128' : '#FF4C51', fontWeight: 'bold' }}>
                {stat.trend}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* --- 2. MAIN CONTENT --- */}
      <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, 
          gap: 2, 
          width: '100%' 
      }}>
        
        {/* LEFT: Revenue Growth Chart */}
        <Card sx={{ 
            width: '100%', 
            boxShadow: 3, 
            borderRadius: '12px', 
            bgcolor: CARD_BG, 
            backgroundImage: 'none',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '380px',
            minWidth: 0,
            color: '#fff'
        }}>
          <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff' }}>{t('analytics.revenue_growth')}</Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>{t('analytics.sales_perf')}</Typography>
            </Box>
            
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              alignItems: 'flex-end', 
              justifyContent: 'space-around', 
              borderTop: '1px dashed rgba(255,255,255,0.1)', 
              borderBottom: '1px dashed rgba(255,255,255,0.1)', 
              py: 2, 
              position: 'relative'
            }}>
              {REVENUE_BARS.map((bar, i) => (
                <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '15%', height: '100%', justifyContent: 'flex-end', gap: 1, zIndex: 1 }}>
                  <Box 
                    sx={{ 
                      width: '100%', 
                      height: bar.height, 
                      bgcolor: '#4285F4', 
                      borderRadius: '4px', 
                      transition: 'height 0.8s ease',
                      '&:hover': { opacity: 0.9, cursor: 'pointer' }
                    }} 
                  />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>
                    {bar.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          
          {/* Sales by Category */}
          <Card sx={{ 
            width: '100%', 
            boxShadow: 3, 
            borderRadius: '12px', 
            bgcolor: CARD_BG, 
            backgroundImage: 'none',
            flex: 1, 
            color: '#fff' 
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: '#fff' }}>{t('analytics.sales_category')}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {CATEGORIES.map((cat, i) => (
                  <Box key={i}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>{cat.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{cat.value}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={cat.value} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 4, 
                        bgcolor: 'rgba(255,255,255,0.08)', 
                        '& .MuiLinearProgress-bar': { bgcolor: cat.color } 
                      }} 
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Top Waiters */}
          <Card sx={{ 
            width: '100%', 
            boxShadow: 3, 
            borderRadius: '12px', 
            bgcolor: CARD_BG, 
            backgroundImage: 'none',
            flex: 1, 
            color: '#fff' 
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#fff' }}>{t('analytics.top_waiters')}</Typography>
                <EmojiEvents sx={{ color: '#FFD700', fontSize: 18 }} />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {TOP_WAITERS.map((waiter, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: waiter.color, width: 32, height: 32, fontSize: '0.75rem', color: '#fff', fontWeight: 'bold', borderRadius: '50%' }}>
                        {waiter.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="600" sx={{ color: '#fff', fontSize: '0.85rem' }}>{waiter.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>{waiter.orders} orders</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                       <Typography variant="body2" fontWeight="bold" sx={{ color: '#fff', fontSize: '0.85rem' }}>{waiter.total}</Typography>
                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5, color: '#fff' }}>
                         <ArrowUpIcon />
                       </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

        </Box>

      </Box>
    </Box>
  );
};

export default Analytics;