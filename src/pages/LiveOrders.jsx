import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Tabs, Tab, Badge, Avatar, Chip, useTheme,
  Menu, MenuItem, Fade, Divider // <--- Divider bura əlavə edildi
} from '@mui/material';
import { 
  NotificationsActive, VolumeUp, ShoppingBag, 
  AccessTime, Phone, Restaurant, Comment, Inventory,
  ExpandMore, DoneAll 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- INITIAL MOCK DATA ---
const INITIAL_ORDERS = [
  {
    id: '#1023',
    type: 'takeaway', 
    time: '14:30',
    customer: 'Murad Aliyev',
    phone: '050-123-45-67',
    eta: '15:00',
    items: [
      { name: 'Cheeseburger', qty: 1, price: 12 },
      { name: 'Cola Zero', qty: 1, price: 3 },
    ],
    total: 15,
    note: 'Put more napkins',
    status: 'new'
  },
  {
    id: '#1025',
    type: 'dine_in',
    time: '14:15',
    tableNum: 5,
    location: 'In restaurant',
    items: [
      { name: 'Ribeye Steak', qty: 1, price: 45 },
      { name: 'Caesar Salad', qty: 1, price: 14 },
    ],
    total: 59,
    status: 'working'
  }
];

const LiveOrders = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  // --- STATE ---
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [tabValue, setTabValue] = useState('new');
  const [soundOn, setSoundOn] = useState(true);
  
  // Dropdown State
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [selectedBranch, setSelectedBranch] = useState('Grand Baku (Center)');

  // --- HANDLERS ---
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Dropdown Handlers
  const handleBranchClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleBranchClose = (branch) => {
    if (branch) setSelectedBranch(branch);
    setAnchorEl(null);
  };

  // Order Actions (Move or Delete)
  const handleAction = (id, action) => {
    // Real tətbiqdə burada API sorğusu olacaq.
    // İndi sadəcə siyahıdan silirik ki, "Boş vəziyyət" görünsün.
    setOrders((prev) => prev.filter(order => order.id !== id));
  };

  // --- COLORS ---
  const CARD_BG = '#312d4b'; 
  const GREEN = '#72E128'; 
  const RED = '#FF4C51';
  const YELLOW = '#FDB528';
  const BLUE = '#4285F4';
  const CYAN = '#26C6F9'; 
  const TEXT_GRAY = 'rgba(255, 255, 255, 0.7)';
  const ITEM_BG = 'rgba(0, 0, 0, 0.2)';

  // Filter orders
  const filteredOrders = orders.filter(o => o.status === tabValue);

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: '100vw', 
      overflowX: 'hidden', 
      boxSizing: 'border-box', 
      p: { xs: 2, md: 3 } 
    }}>
      
      {/* --- HEADER --- */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.5rem', color: 'text.primary' }}>
            {t('live_orders.title')} 🛎️
          </Typography>
          
          {/* BRANCH DROPDOWN */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('live_orders.managing')}:
            </Typography>
            <Button
              onClick={handleBranchClick}
              endIcon={<ExpandMore />}
              sx={{ 
                color: BLUE, 
                fontWeight: 'bold', 
                textTransform: 'none', 
                p: 0, 
                minWidth: 0,
                fontSize: '0.95rem',
                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
              }}
            >
              {selectedBranch}
            </Button>
            
            {/* Styled Menu */}
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={() => handleBranchClose(null)}
              TransitionComponent={Fade}
              PaperProps={{
                sx: {
                  bgcolor: '#1f2940', // Tünd fon (şəkildəki kimi)
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                  mt: 1,
                  minWidth: 200,
                  '& .MuiMenuItem-root': {
                    fontSize: '0.9rem',
                    '&:hover': { bgcolor: 'rgba(66, 133, 244, 0.15)' },
                    '&.Mui-selected': { bgcolor: BLUE, color: '#fff', '&:hover': { bgcolor: BLUE } }
                  }
                }
              }}
            >
              <MenuItem onClick={() => handleBranchClose('Grand Baku (Center)')}>Grand Baku (Center)</MenuItem>
              <MenuItem onClick={() => handleBranchClose('Grand Baku (Mall)')}>Grand Baku (Mall)</MenuItem>
              <MenuItem onClick={() => handleBranchClose('Grand Baku (Sea Breeze)')}>Grand Baku (Sea Breeze)</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Button 
          variant="contained" 
          startIcon={soundOn ? <VolumeUp /> : <NotificationsActive />}
          onClick={() => setSoundOn(!soundOn)}
          sx={{ bgcolor: 'rgba(66, 108, 255, 0.1)', color: BLUE, fontWeight: 'bold', textTransform: 'none' }}
        >
          {soundOn ? t('live_orders.sound_on') : t('live_orders.sound_off')}
        </Button>
      </Box>

      {/* --- TABS --- */}
      <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.1)', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} textColor="inherit" indicatorColor="primary">
          <Tab 
            value="new" 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {t('live_orders.tabs.new')}
                <Badge badgeContent={orders.filter(o => o.status === 'new').length} color="error" />
              </Box>
            } 
          />
          <Tab value="working" label={t('live_orders.tabs.working')} />
          <Tab value="history" label={t('live_orders.tabs.history')} />
        </Tabs>
      </Box>

      {/* --- CONTENT AREA --- */}
      
      {/* 1. EMPTY STATE (Şəkildəki Dizayn) */}
      {filteredOrders.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          py: 10,
          opacity: 0.8
        }}>
          <Box sx={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%', 
            bgcolor: 'rgba(255,255,255,0.03)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mb: 2
          }}>
            <DoneAll sx={{ fontSize: 40, color: GREEN }} />
          </Box>
          <Typography variant="h6" sx={{ color: TEXT_GRAY, fontWeight: 500 }}>
            {t('live_orders.all_clean')}
          </Typography>
        </Box>
      ) : (
        /* 2. ORDERS GRID */
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, 
          gap: 3 
        }}>
          {filteredOrders.map((order) => (
            <Card key={order.id} sx={{ 
              width: '100%', 
              bgcolor: theme.palette.mode === 'dark' ? CARD_BG : 'background.paper', 
              borderRadius: '12px', 
              boxShadow: 3, 
              backgroundImage: 'none',
              minWidth: 0, 
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <CardContent sx={{ p: 0 }}>
                
                {/* Header */}
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Chip 
                      label={order.type === 'takeaway' ? t('live_orders.type_takeaway') : t('live_orders.type_dinein')} 
                      size="small"
                      sx={{ 
                        bgcolor: order.type === 'takeaway' ? YELLOW : GREEN, 
                        color: order.type === 'takeaway' ? '#000' : '#fff', 
                        fontWeight: '900', 
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        height: 24, fontSize: '0.75rem'
                      }} 
                    />
                    <Typography variant="body1" fontWeight="bold" sx={{ color: 'text.primary' }}>
                      {order.time}
                    </Typography>
                  </Box>
                  {order.status === 'new' && <NotificationsActive sx={{ color: RED, fontSize: 20 }} />}
                </Box>

                {/* Info */}
                <Box sx={{ p: 2, pb: 1, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  {order.type === 'dine_in' ? (
                    <Avatar variant="rounded" sx={{ bgcolor: 'rgba(66, 108, 255, 0.15)', color: BLUE, width: 48, height: 48, borderRadius: '8px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                      {order.tableNum}
                    </Avatar>
                  ) : (
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: TEXT_GRAY, width: 48, height: 48, borderRadius: '8px' }}>
                      <ShoppingBag />
                    </Avatar>
                  )}
                  
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'text.primary', lineHeight: 1.2 }}>
                      {order.type === 'dine_in' ? `${t('live_orders.table')} #${order.tableNum}` : order.customer}
                    </Typography>
                    <Typography variant="body2" sx={{ color: TEXT_GRAY, fontSize: '0.85rem', mt: 0.5 }}>
                      {order.type === 'dine_in' ? t('live_orders.in_restaurant') : order.phone}
                    </Typography>
                    {order.eta && (
                      <Typography variant="caption" fontWeight="900" sx={{ color: RED, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                        <AccessTime sx={{ fontSize: 14 }} /> {t('live_orders.eta')}: {order.eta}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Items */}
                <Box sx={{ px: 2, py: 1 }}>
                  <Box sx={{ bgcolor: ITEM_BG, borderRadius: '8px', p: 1.5 }}>
                    {order.items.map((item, i) => (
                      <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, '&:last-child': { mb: 0 } }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Typography variant="body2" fontWeight="bold" sx={{ color: BLUE }}>{item.qty}x</Typography>
                          <Typography variant="body2" sx={{ color: TEXT_GRAY }}>{item.name}</Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="bold" sx={{ color: 'text.primary' }}>{item.price} ₼</Typography>
                      </Box>
                    ))}
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1.5 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1" fontWeight="bold" sx={{ color: TEXT_GRAY, textTransform: 'uppercase' }}>
                        {t('live_orders.total')}:
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: BLUE }}>
                        {order.total} ₼
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Note */}
                {order.note && (
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Box sx={{ border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '8px', p: 1.5 }}>
                      <Typography variant="caption" fontWeight="bold" sx={{ color: YELLOW, display: 'flex', alignItems: 'center', gap: 0.5, textTransform: 'uppercase' }}>
                        <Comment sx={{ fontSize: 14 }} /> {t('live_orders.note')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.primary', fontStyle: 'italic' }}>"{order.note}"</Typography>
                    </Box>
                  </Box>
                )}

                {/* ACTIONS - İşlək düymələr */}
                <Box sx={{ p: 2, pt: 0 }}>
                  {order.type === 'dine_in' ? (
                    <Button 
                      fullWidth 
                      onClick={() => handleAction(order.id, 'assemble')}
                      variant="contained" 
                      startIcon={<Inventory />}
                      sx={{ bgcolor: CYAN, color: '#fff', fontWeight: 'bold', textTransform: 'none', py: 1, boxShadow: 'none', '&:hover': { bgcolor: '#1db5e6' } }}
                    >
                      {t('live_orders.btn_assemble')}
                    </Button>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button 
                        fullWidth 
                        onClick={() => handleAction(order.id, 'cancel')}
                        variant="outlined" 
                        sx={{ borderColor: RED, color: RED, fontWeight: 'bold', textTransform: 'none', '&:hover': { borderColor: '#d32f2f', bgcolor: 'rgba(255, 76, 81, 0.05)' } }}
                      >
                        {t('live_orders.btn_cancel')}
                      </Button>
                      <Button 
                        fullWidth 
                        onClick={() => handleAction(order.id, 'cook')}
                        variant="contained" 
                        startIcon={<Restaurant />}
                        sx={{ bgcolor: GREEN, color: '#000', fontWeight: 'bold', textTransform: 'uppercase', boxShadow: 'none', '&:hover': { bgcolor: '#66c924' } }}
                      >
                        {t('live_orders.btn_cook')}
                      </Button>
                    </Box>
                  )}
                </Box>

              </CardContent>
            </Card>
          ))}
        </Box>
      )}

    </Box>
  );
};

export default LiveOrders;