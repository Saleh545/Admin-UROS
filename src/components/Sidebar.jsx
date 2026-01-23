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
    // --- SUPER ADMIN (Köhnə menyular saxlanıldı) ---
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

    // --- MANAGEMENT (Yeniləndi: Şəkildəki kimi) ---
    { kind: 'header', title: t('sidebar.management') },
    { kind: 'item', title: 'Dashboard', icon: <ShoppingBag />, path: '/dashboard' }, // Əvvəlki
    { kind: 'item', title: 'Marketing & Promo', icon: <CardGiftcard />, path: '/marketing' }, // Ad dəyişdirildi
    { 
      kind: 'item', 
      title: 'Staff & Access', 
      icon: <PeopleOutline />, 
      path: '/staff',
      badge: { label: 'Limits', color: '#4285F4' } 
    },
    { kind: 'item', title: 'Security Logs', icon: <Security />, path: '/security' },
    { kind: 'item', title: 'Venue Settings', icon: <Settings />, path: '/venue-settings' },
    { kind: 'item', title: 'Analytics', icon: <BarChart />, path: '/analytics' },
    { 
      kind: 'item', 
      title: "What's New", 
      icon: <AutoAwesome />, 
      path: '/whats-new',
      badge: { label: 'New', color: '#FF4C51' } 
    },
    { kind: 'item', title: 'Help & Support', icon: <HelpOutline />, path: '/help-support' },

    // --- FINANCE ---
    { kind: 'header', title: 'FINANCE' },
    { kind: 'item', title: 'Billing', icon: <CreditCard />, path: '/billing' },

    // --- OPERATIONS ---
    { kind: 'header', title: 'OPERATIONS' },
    { kind: 'item', title: 'Dashboard', icon: <GridView />, path: '/venue-dashboard' },
    { 
      kind: 'item', 
      title: 'Live Orders', 
      icon: <FactCheck />, 
      path: '/live-orders',
      badge: { label: 'Live', color: '#FF4C51' } 
    },
    { 
      kind: 'item', 
      title: 'Chat / CRM', 
      icon: <Chat />, 
      path: '/chat',
      badge: { label: '3', color: '#4285F4' } 
    },
    { kind: 'item', title: 'Reviews / Feedback', icon: <Star />, path: '/reviews' },
    { kind: 'item', title: 'Menu Management', icon: <Restaurant />, path: '/menu-management' },
    { kind: 'item', title: 'Table Layout', icon: <TableRestaurant />, path: '/table-layout' },
    { kind: 'item', title: 'Visual Floor Plan', icon: <Map />, path: '/floor-plan' },

    // --- PERSONAL ---
    { kind: 'header', title: 'PERSONAL' },
    { kind: 'item', title: 'Profile Settings', icon: <Person />, path: '/profile-settings' },

    // --- STAFF INTERFACE ---
    { kind: 'header', title: 'STAFF INTERFACE' },
    { 
        kind: 'item', 
        title: 'Open Mobile App', 
        icon: <Smartphone />, 
        path: '/mobile-app',
        badge: { label: 'Mobile', color: '#72E128' } 
    },
    { kind: 'item', title: 'Staff Profile', icon: <PermIdentity />, path: '/staff-profile' },
  ];

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
          '-ms-overflow-style': 'none',
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