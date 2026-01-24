import React from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  LinearProgress, List, ListItem, ListItemText, 
  ListItemIcon, Divider, Chip, useTheme 
} from '@mui/material';
import { 
  CreditCard, EmojiEvents, Store, Group, RestaurantMenu, 
  SmartToy, CheckCircle, RadioButtonUnchecked, 
  Download, CalendarToday 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- MOCK DATA ---
const RESOURCES = [
  { label: 'Active Branches', current: 3, max: 5, icon: <Store fontSize="small" /> },
  { label: 'Staff Accounts', current: 24, max: 50, icon: <Group fontSize="small" /> },
  { label: 'Menu Items (SKU)', current: 145, max: 500, icon: <RestaurantMenu fontSize="small" /> },
  { label: 'Monthly AI Messages', current: 1240, max: 5000, icon: <SmartToy fontSize="small" /> },
];

const ADDONS = [
  { name: 'WhatsApp Bot', status: 'active', price: 'Included' },
  { name: 'Instagram Bot', status: 'active', price: 'Included' },
  { name: 'Advanced Analytics', status: 'active', price: '+50 ₼/mo' },
  { name: 'Telegram Bot', status: 'inactive', price: '+20 ₼/mo' }
];

const INVOICES = [
  { id: 'INV-2026-001', date: 'Jan 01, 2026', amount: '500.00 ₼' },
  { id: 'INV-2025-012', date: 'Dec 01, 2025', amount: '500.00 ₼' },
  { id: 'INV-2025-11', date: 'Nov 01, 2025', amount: '450.00 ₼' },
];

const Billing = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  // --- COLORS ---
  const CARD_BG = '#312d4b'; 
  const BLUE = '#4285F4'; 
  const TEXT_GRAY = 'rgba(255, 255, 255, 0.7)';
  const BORDER_COLOR = 'rgba(255, 255, 255, 0.1)';

  // --- COMMON CARD STYLE ---
  const commonCardSx = {
    width: '100%',
    boxShadow: 3,
    borderRadius: '12px',
    bgcolor: theme.palette.mode === 'dark' ? CARD_BG : 'background.paper',
    backgroundImage: 'none',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0, 
    color: '#fff',
    height: '100%'
  };

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: '100vw', 
      overflowX: 'hidden', 
      boxSizing: 'border-box', 
      p: { xs: 2, md: 3 } 
    }}>
      
      {/* --- HEADER --- */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.5rem', color: 'text.primary' }}>
          {t('billing.title')} <CreditCard sx={{ color: BLUE, ml: 1 }} />
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
          {t('billing.subtitle')}
        </Typography>
      </Box>

      {/* --- MAIN LAYOUT (CSS GRID) --- */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' }, 
        gap: 3, 
        width: '100%' 
      }}>
        
        {/* === LEFT COLUMN: SUBSCRIPTION PLAN === */}
        <Box>
          <Card sx={commonCardSx}>
            {/* Padding azaldıldı: p: 3 -> p: 2.5 */}
            <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              
              {/* Badge & Crown */}
              {/* Margin azaldıldı: mb: 4 -> mb: 3 */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Chip 
                  label={t('billing.active_sub')} 
                  size="small" 
                  sx={{ bgcolor: 'rgba(66, 133, 244, 0.15)', color: BLUE, fontWeight: 'bold', borderRadius: '6px', fontSize: '0.7rem', height: 24 }} 
                />
                <EmojiEvents sx={{ color: '#FFD700', fontSize: 26 }} />
              </Box>

              {/* Plan Details */}
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: 'text.primary', fontSize: '1.4rem' }}>
                UR-OS Network Pro
              </Typography>
              
              {/* Margin azaldıldı: mb: 3 -> mb: 2 */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 2 }}>
                <Typography variant="h3" fontWeight="bold" sx={{ color: BLUE }}>450 ₼</Typography>
                <Typography variant="body1" sx={{ color: TEXT_GRAY }}>/ {t('billing.month')}</Typography>
              </Box>

              {/* Margin azaldıldı: mb: 4 -> mb: 3 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <CalendarToday sx={{ fontSize: 18, color: '#72E128' }} />
                <Typography variant="body2" fontWeight="500" sx={{ color: 'text.secondary' }}>
                  {t('billing.next_billing')}: <strong style={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>Feb 01, 2026</strong>
                </Typography>
              </Box>

              {/* Card Info */}
              {/* Margin azaldıldı: mb: 4 -> mb: 3 */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ bgcolor: '#fff', px: 0.5, borderRadius: '3px', height: 14, display: 'flex', alignItems: 'center' }}>
                       <Typography variant="caption" fontWeight="900" sx={{ color: '#1A1F71', fontStyle: 'italic', fontSize: '0.6rem', lineHeight: 1 }}>VISA</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight="600" sx={{ color: 'text.primary' }}>•••• 4242</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: BLUE, cursor: 'pointer', fontWeight: 'bold' }}>
                    {t('billing.update')}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: TEXT_GRAY }}>{t('billing.expires')} 12/28</Typography>
              </Box>

              {/* Button */}
              <Box sx={{ mt: 'auto' }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  // Padding azaldıldı: py: 1.2 -> py: 1
                  sx={{ bgcolor: BLUE, fontWeight: 'bold', textTransform: 'none', py: 1, borderRadius: '8px', boxShadow: 'none' }}
                >
                  {t('billing.upgrade_btn')}
                </Button>
              </Box>

            </CardContent>
          </Card>
        </Box>

        {/* === RIGHT COLUMN WRAPPER === */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
          
          {/* 1. RESOURCE USAGE (TOP) */}
          <Card sx={commonCardSx}>
            <CardContent sx={{ p: 2.5 }}> {/* Padding azaldıldı */}
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: 'text.primary' }}> {/* mb azaldıldı */}
                {t('billing.resource_usage')}
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                gap: 2 // Gap azaldıldı: 3 -> 2
              }}>
                {RESOURCES.map((res, index) => (
                  <Box key={index} sx={{ border: `1px solid ${BORDER_COLOR}`, borderRadius: '10px', p: 1.5 }}> {/* Inner padding azaldıldı */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ p: 0.5, borderRadius: '6px', bgcolor: 'rgba(255,255,255,0.05)', display: 'flex', color: TEXT_GRAY }}>
                          {res.icon}
                        </Box>
                        <Typography variant="body2" fontWeight="600" sx={{ color: 'text.primary' }}>
                          {t(`billing.resources.${index}`)}
                        </Typography>
                      </Box>
                      <Typography variant="caption" fontWeight="bold" sx={{ color: BLUE }}>
                        {res.current} / {res.max}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(res.current / res.max) * 100} 
                      sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: BLUE } }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* 2. BOTTOM SECTION (GRID: ADDONS & INVOICES) */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 3, 
            flexGrow: 1 
          }}>
            
            {/* Add-ons */}
            <Card sx={commonCardSx}>
              <CardContent sx={{ p: 2.5 }}> {/* Padding azaldıldı */}
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: 'text.primary' }}> {/* mb azaldıldı */}
                  {t('billing.addons')}
                </Typography>
                <List disablePadding>
                  {ADDONS.map((addon, i) => (
                    <ListItem key={i} disablePadding sx={{ py: 1 }}> {/* List padding azaldıldı: 1.5 -> 1 */}
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {addon.status === 'active' ? (
                          <CheckCircle sx={{ color: '#72E128', fontSize: 20 }} />
                        ) : (
                          <RadioButtonUnchecked sx={{ color: 'text.disabled', fontSize: 20 }} />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={addon.name} 
                        primaryTypographyProps={{ fontSize: '0.85rem', color: 'text.primary', fontWeight: 500 }}
                      />
                      <Typography variant="caption" fontWeight="bold" sx={{ color: addon.price === 'Included' ? BLUE : (addon.status === 'inactive' ? 'text.disabled' : BLUE) }}>
                        {addon.price === 'Included' ? t('billing.included') : addon.price}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Invoices */}
            <Card sx={commonCardSx}>
              <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}> {/* Padding azaldıldı */}
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: 'text.primary' }}>
                  {t('billing.invoices')}
                </Typography>
                
                <List disablePadding sx={{ flexGrow: 1 }}>
                  {INVOICES.map((inv, i) => (
                    <React.Fragment key={i}>
                      <ListItem disablePadding sx={{ py: 1.5 }}> {/* List padding azaldıldı */}
                        <ListItemText 
                          primary={inv.id}
                          secondary={inv.date}
                          primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 'bold', color: BLUE, mb: 0.3 }}
                          secondaryTypographyProps={{ fontSize: '0.75rem', color: TEXT_GRAY }}
                        />
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" fontWeight="bold" sx={{ color: 'text.primary', mb: 0.5 }}>{inv.amount}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5, color: TEXT_GRAY, cursor: 'pointer' }}>
                             <Download sx={{ fontSize: 14 }} />
                             <Typography variant="caption">PDF</Typography>
                          </Box>
                        </Box>
                      </ListItem>
                      {i < INVOICES.length - 1 && <Divider sx={{ borderColor: BORDER_COLOR }} />}
                    </React.Fragment>
                  ))}
                </List>

                <Box sx={{ mt: 1, textAlign: 'center' }}>
                   <Typography variant="caption" sx={{ color: BLUE, cursor: 'pointer', fontWeight: 'bold' }}>
                      {t('billing.view_history')}
                   </Typography>
                </Box>
              </CardContent>
            </Card>

          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Billing;