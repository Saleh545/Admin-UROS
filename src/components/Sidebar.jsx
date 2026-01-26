import React from 'react';
import { 
  Drawer, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, Box, Typography, ListSubheader, Chip 
} from '@mui/material';
import { 
  Home, Store, Person, AccountTree, HeadsetMic, 
  Podcasts, Storage, CardGiftcard, PeopleOutline, 
  Security, Settings, BarChart, ShoppingBag,
  LocalOffer, RocketLaunch, ReceiptLong, DashboardCustomize,
  FactCheck, Chat, Star, Restaurant, TableRestaurant,
  Map, Smartphone, PermIdentity, AutoAwesome, HelpOutline,
  CreditCard, GridView
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from "../assets/logo.png";

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

const navigation = [
    // --- SUPER ADMIN ---
    { kind: 'header', title: t('sidebar.super_admin') },
    { kind: 'item', title: t('sidebar.dashboard'), icon: <Home />, path: '/' },
    { kind: 'item', title: t('sidebar.restaurants'), icon: <Store />, path: '/restaurants' },
    { kind: 'item', title: t('sidebar.users'), icon: <Person />, path: '/users' },
    { kind: 'item', title: t('sidebar.pricing'), icon: <LocalOffer />, path: '/pricing' },
    { kind: 'item', title: t('sidebar.automation'), icon: <AccountTree />, path: '/automation' },
    { kind: 'item', title: t('sidebar.support'), icon: <HeadsetMic />, path: '/support' },
    { kind: 'item', title: t('sidebar.push'), icon: <Podcasts />, path: '/push' },
    { kind: 'item', title: t('sidebar.releases'), icon: <RocketLaunch />, path: '/releases' },
    { kind: 'item', title: t('sidebar.logs'), icon: <Storage />, path: '/logs' },

    // --- MANAGEMENT ---
    { kind: 'header', title: t('sidebar.management') },
    { kind: 'item', title: t('sidebar.dashboard'), icon: <ShoppingBag />, path: '/dashboard' },
    { kind: 'item', title: t('sidebar.marketing'), icon: <CardGiftcard />, path: '/marketing' },
    { 
      kind: 'item', 
      title: t('sidebar.staff'), 
      icon: <PeopleOutline />, 
      path: '/staff',
      badge: { label: t('sidebar.badge_limits'), color: '#4285F4' } 
    },
    { kind: 'item', title: t('sidebar.security_logs'), icon: <Security />, path: '/security' },
    { kind: 'item', title: t('sidebar.venue_settings'), icon: <Settings />, path: '/venue-settings' },
    { kind: 'item', title: t('sidebar.analytics'), icon: <BarChart />, path: '/analytics' },
    { 
      kind: 'item', 
      title: t('sidebar.whats_new'), 
      icon: <AutoAwesome />, 
      path: '/whats-new',
      badge: { label: t('sidebar.badge_new'), color: '#FF4C51' } 
    },
    { kind: 'item', title: t('sidebar.help'), icon: <HelpOutline />, path: '/help-support' },

    // --- FINANCE ---
    { kind: 'header', title: t('sidebar.header_finance') },
    { kind: 'item', title: t('sidebar.billing'), icon: <CreditCard />, path: '/billing' },

    // --- OPERATIONS ---
    { kind: 'header', title: t('sidebar.header_operations') },
    { kind: 'item', title: t('sidebar.dashboard'), icon: <GridView />, path: '/venue-dashboard' },
    { 
      kind: 'item', 
      title: t('sidebar.live_orders'), 
      icon: <FactCheck />, 
      path: '/live-orders',
      badge: { label: t('sidebar.badge_live'), color: '#FF4C51' } 
    },
    { 
      kind: 'item', 
      title: t('sidebar.chat'), 
      icon: <Chat />, 
      path: '/chat',
      badge: { label: '3', color: '#4285F4' } // Rəqəmləri tərcümə etməyə ehtiyac yoxdur
    },
    { kind: 'item', title: t('sidebar.reviews'), icon: <Star />, path: '/reviews' },
    { kind: 'item', title: t('sidebar.menu'), icon: <Restaurant />, path: '/menu-management' },
    { kind: 'item', title: t('sidebar.table_layout'), icon: <TableRestaurant />, path: '/table-layout' },
    { kind: 'item', title: t('sidebar.floor_plan'), icon: <Map />, path: '/floor-plan' },

    // --- PERSONAL ---
    { kind: 'header', title: t('sidebar.header_personal') },
    { kind: 'item', title: t('sidebar.profile_settings'), icon: <Person />, path: '/profile-settings' },

    // --- STAFF INTERFACE ---
    { kind: 'header', title: t('sidebar.header_staff') },
    { 
        kind: 'item', 
        title: t('sidebar.mobile_app'), 
        icon: <Smartphone />, 
        path: '/mobile-app',
        badge: { label: t('sidebar.badge_mobile'), color: '#72E128' } 
    },
    { kind: 'item', title: t('sidebar.staff_profile'), icon: <PermIdentity />, path: '/staff-profile' },
  ];;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      
      {/* LOGO */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', minHeight: 64 }}>
        <img src={logo} alt="UR-OS" style={{ height: '32px', objectFit: 'contain' }} />
        <Typography variant="h6" fontWeight="bold" sx={{ ml: 2, fontSize: '1.35rem', letterSpacing: '0.15px' }}>
            UR-OS
        </Typography>
      </Box>

      {/* MENYU SCROLL */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          overflowX: 'hidden',
          pb: 2,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none', // DÜZƏLİŞ BURADADIR (kebab-case camelCase ilə əvəz olundu)
        }}
      >
        <List sx={{ px: 0 }}>
          {navigation.map((item, index) => {
            
            // --- BAŞLIQLAR ---
            if (item.kind === 'header') {
              return (
                <ListSubheader 
                  key={index} 
                  disableSticky
                  sx={{ 
                    bgcolor: 'transparent', 
                    mt: 2.5, mb: 0.5, px: 3 
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', color: 'text.disabled', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      <Box sx={{ width: '8px', height: '1px', bgcolor: 'rgba(231, 227, 252, 0.12)', mr: 1.5 }} />
                      <Box component="span" sx={{ whiteSpace: 'nowrap', mr: 1.5 }}>{item.title}</Box>
                      <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'rgba(231, 227, 252, 0.12)' }} />
                  </Box>
                </ListSubheader>
              );
            }

            // Seçili olub-olmadığını yoxlayırıq
            const isSelected = location.pathname === item.path;

            return (
              <ListItem key={index} disablePadding sx={{ mb: 0.5, display: 'block' }}>
                <ListItemButton 
                  onClick={() => {
                    navigate(item.path);
                    if(mobileOpen) handleDrawerToggle();
                  }}
                  selected={isSelected} 
                  sx={{ 
                    // Yalnız seçili olanda (isSelected) Mavi olur
                    background: isSelected ? 'linear-gradient(98deg, #4285F4, #346efd 94%)' : 'transparent',
                    color: isSelected ? 'white' : 'text.primary',
                    
                    borderTopRightRadius: '50px',
                    borderBottomRightRadius: '50px',
                    mr: 2, pl: 3, py: 1.2, 
                    
                    boxShadow: isSelected ? '0px 4px 8px -4px rgba(66, 133, 244, 0.42)' : 'none',
                    
                    '&:hover': { 
                        background: isSelected ? '#3b78e7' : 'rgba(255, 255, 255, 0.04)' 
                    },
                    '& .MuiListItemIcon-root': { 
                        color: isSelected ? 'white' : 'text.secondary' 
                    } 
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                  </ListItemIcon>
                  
                  <ListItemText 
                      primary={item.title} 
                      primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: isSelected ? 600 : 400 }}
                  />

                  {item.badge && (
                    <Chip 
                      label={item.badge.label} 
                      size="small" 
                      sx={{ 
                        height: 22, 
                        fontSize: '0.75rem', 
                        fontWeight: 700,
                        bgcolor: item.badge.color, 
                        color: '#fff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }} 
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;