import React from 'react';
import { 
  Drawer, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, Box, Typography, ListSubheader, Chip 
} from '@mui/material';
import { 
  Home, Store, Person, AccountTree, HeadsetMic, 
  Podcasts, Storage, CardGiftcard, PeopleOutline, 
  Security, Settings, BarChart, ShoppingBag 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png"

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { kind: 'header', title: 'SUPER ADMIN' },
    { kind: 'item', title: 'Dashboard', icon: <Home />, path: '/' },
    { kind: 'item', title: 'Restaurants', icon: <Store />, path: '/restaurants' },
    { kind: 'item', title: 'Users', icon: <Person />, path: '/users' },
    { kind: 'item', title: 'n8n Automation', icon: <AccountTree />, path: '/automation' },
    { kind: 'item', title: 'Support Tickets', icon: <HeadsetMic />, path: '/support' },
    { kind: 'item', title: 'Push Notifications', icon: <Podcasts />, path: '/push' },
    { kind: 'item', title: 'Global Logs', icon: <Storage />, path: '/logs' },

    { kind: 'header', title: 'MANAGEMENT' },
    { kind: 'item', title: 'Dashboard', icon: <ShoppingBag />, path: '/venue-dashboard' },
    { kind: 'item', title: 'Marketing & Promo', icon: <CardGiftcard />, path: '/marketing' },
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
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      
      {/* LOGO HİSSƏSİ */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', minHeight: 64 }}>
        <img src={logo} alt="UR-OS" style={{ height: '32px', objectFit: 'contain' }} />
        <Typography variant="h6" fontWeight="bold" sx={{ ml: 2, fontSize: '1.35rem', letterSpacing: '0.15px' }}>
            UR-OS
        </Typography>
      </Box>

      {/* MENYU */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          overflowX: 'hidden',
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
                    mt: 2.5, mb: 0.5, px: 3 // Paddingi düymələr ilə eyniləşdirdik
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      width: '100%',
                      color: 'text.disabled', 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px'
                    }}
                  >
                      {/* SOL XƏTT (Çox qısa - səliqəli görünməsi üçün) */}
                      <Box 
                        sx={{ 
                          width: '8px', 
                          height: '1px', 
                          bgcolor: 'rgba(231, 227, 252, 0.12)', 
                          mr: 1.5 
                        }} 
                      />

                      {/* YAZI */}
                      <Box component="span" sx={{ whiteSpace: 'nowrap', mr: 1.5 }}>
                        {item.title}
                      </Box>

                      {/* SAĞ XƏTT (Sona qədər) */}
                      <Box 
                        sx={{ 
                          flexGrow: 1, 
                          height: '1px', 
                          bgcolor: 'rgba(231, 227, 252, 0.12)' 
                        }} 
                      />
                  </Box>
                </ListSubheader>
              );
            }

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
                    borderTopRightRadius: '50px',
                    borderBottomRightRadius: '50px',
                    borderTopLeftRadius: '0px',
                    borderBottomLeftRadius: '0px',
                    mr: 2, 
                    pl: 3, // İkonlar buradan başlayır (24px)
                    py: 1.2, 
                    '&.Mui-selected': { 
                        background: 'linear-gradient(98deg, #4285F4, #346efd 94%)', 
                        color: 'white', 
                        boxShadow: '0px 4px 8px -4px rgba(66, 133, 244, 0.42)', 
                        '&:hover': { background: '#3b78e7' },
                        '& .MuiListItemIcon-root': { color: 'white' } 
                    },
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' }
                  }}
                >
                  <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
                      {item.icon}
                  </ListItemIcon>
                  
                  <ListItemText 
                      primary={item.title} 
                      primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: isSelected ? 500 : 400 }}
                  />

                  {item.badge && (
                    <Chip 
                      label={item.badge.label} 
                      size="small" 
                      sx={{ 
                        height: 22, 
                        fontSize: '0.75rem', 
                        fontWeight: 600,
                        bgcolor: item.badge.color, 
                        color: '#fff' 
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