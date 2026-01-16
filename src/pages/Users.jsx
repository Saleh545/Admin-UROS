import React, { useState, useEffect } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Avatar, TextField, MenuItem, Select, InputAdornment, 
  Chip, IconButton, Drawer, FormControl, InputLabel,
  useTheme, Stack, Dialog, DialogTitle, DialogContent, 
  DialogActions, Alert, Tooltip
} from '@mui/material';
import { 
  Search, Add, Email, Phone, Close, 
  LockReset, Block, ArrowForward, Person, Save,
  ContentCopy, CheckCircle
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // i18n Hook

const Users = () => {
  const theme = useTheme();
  const { t } = useTranslation(); // Tərcümə funksiyası

  // 1. STATE & LOCAL STORAGE
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('app_users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { 
        id: 1, 
        name: 'Рауф Гасанов', 
        email: 'admin@ur-os.az', 
        phone: '+994 50 123 45 67', 
        role: 'SUPER ADMIN', 
        restaurant: 'Global Access', 
        lastLogin: '2 мин назад', 
        status: 'ACTIVE', 
        avatarColor: '#666CFF',
        avatarText: 'Р' 
      },
      { 
        id: 2, 
        name: 'Ильхам Алиев', 
        email: 'ilham@grandbaku.az', 
        phone: '+994 50 222 33 44', 
        role: 'OWNER', 
        restaurant: 'Grand Baku', 
        lastLogin: '1 час назад', 
        status: 'ACTIVE', 
        avatarColor: '#26C6F9',
        avatarText: 'И' 
      }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'STAFF', restaurant: '', status: 'ACTIVE' });

  // --- PASSWORD RESET STATES ---
  const [resetDialog, setResetDialog] = useState({ open: false, step: 1, user: null, newPass: '' });
  const [copied, setCopied] = useState(false);

  // LocalStorage yenilənməsi
  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(users));
  }, [users]);

  // --- FILTERS ---
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // --- ACTIONS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSaveUser = () => {
    if (!newUser.name || !newUser.email) return alert(t('users_page.drawer.alert_required'));
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const userToAdd = {
      id: newId, ...newUser, lastLogin: 'Never',
      avatarColor: getRandomColor(), avatarText: newUser.name.charAt(0).toUpperCase()
    };
    setUsers([...users, userToAdd]);
    setOpenDrawer(false);
    setNewUser({ name: '', email: '', phone: '', role: 'STAFF', restaurant: '', status: 'ACTIVE' });
  };

  const handleToggleStatus = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { 
          ...user, 
          status: user.status === 'BANNED' ? 'ACTIVE' : 'BANNED' 
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const getRandomColor = () => {
    const colors = ['#666CFF', '#26C6F9', '#72E128', '#FDB528', '#FF4C51'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // --- RESET PASSWORD LOGIC ---
  const handleOpenResetDialog = (user) => {
    setResetDialog({ open: true, step: 1, user: user, newPass: '' });
    setCopied(false);
  };

  const handleGeneratePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setResetDialog(prev => ({ ...prev, step: 2, newPass: password }));
  };

  const handleCloseResetDialog = () => {
    setResetDialog({ open: false, step: 1, user: null, newPass: '' });
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(resetDialog.newPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- STYLES ---
  const getRoleColor = (role) => {
    switch (role) {
      case 'SUPER ADMIN': return { bg: 'rgba(255, 76, 81, 0.12)', text: '#FF4C51' }; 
      case 'OWNER': return { bg: 'rgba(102, 108, 255, 0.12)', text: '#666CFF' }; 
      case 'MANAGER': return { bg: 'rgba(38, 198, 249, 0.12)', text: '#26C6F9' }; 
      case 'STAFF': return { bg: 'rgba(114, 225, 40, 0.12)', text: '#72E128' }; 
      default: return { bg: 'rgba(138, 141, 147, 0.12)', text: '#8A8D93' };
    }
  };

  const getStatusColor = (status) => {
    if (status === 'ACTIVE') return { bg: 'rgba(114, 225, 40, 0.12)', text: '#72E128' };
    if (status === 'PENDING') return { bg: 'rgba(253, 181, 40, 0.12)', text: '#FDB528' };
    if (status === 'BANNED') return { bg: 'rgba(255, 76, 81, 0.12)', text: '#FF4C51' };
    return { bg: 'rgba(138, 141, 147, 0.12)', text: '#8A8D93' };
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }}>
      
      {/* 1. HEADER */}
      <Card sx={{ mb: 3, boxShadow: 3, bgcolor: 'background.paper', backgroundImage: 'none' }}>
        <CardContent sx={{ p: 2.5, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {t('users_page.title')} 👥
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('users_page.subtitle')}
            </Typography>
          </Box>
          <Button 
            variant="contained" startIcon={<Add />} onClick={() => setOpenDrawer(true)}
            sx={{ bgcolor: '#4285F4', textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}
          >
            {t('users_page.btn_add_user')}
          </Button>
        </CardContent>
      </Card>

      {/* 2. TABLE */}
      <Card sx={{ boxShadow: 3, bgcolor: 'background.paper', backgroundImage: 'none', overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <TextField 
            placeholder={t('users_page.search_placeholder')} size="small" fullWidth
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
            sx={{ flex: { xs: '1 1 100%', md: '1 1 400px' } }} 
          />
          <Select 
            value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} size="small" 
            sx={{ minWidth: 150, flex: { xs: '1 1 100%', md: '0 0 auto' } }}
          >
            <MenuItem value="All Roles">{t('users_page.filter_all_roles')}</MenuItem>
            <MenuItem value="SUPER ADMIN">Super Admin</MenuItem>
            <MenuItem value="OWNER">Owner</MenuItem>
            <MenuItem value="MANAGER">Manager</MenuItem>
            <MenuItem value="STAFF">Staff</MenuItem>
          </Select>
        </Box>

        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <Box sx={{ minWidth: '800px' }}>
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'grid' }, 
                gridTemplateColumns: '2.5fr 1.2fr 1.5fr 2fr 1fr 1fr', 
                gap: 2, px: 3, py: 1.5, 
                bgcolor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              {[
                t('users_page.table.col_user'), 
                t('users_page.table.col_role'), 
                t('users_page.table.col_restaurant'), 
                t('users_page.table.col_contact'), 
                t('users_page.table.col_status'), 
                t('users_page.table.col_actions')
              ].map((head) => (
                <Typography key={head} variant="caption" fontWeight="bold" color="text.secondary">{head}</Typography>
              ))}
            </Box>

            {filteredUsers.length > 0 ? filteredUsers.map((user) => {
              const roleStyle = getRoleColor(user.role);
              const statusStyle = getStatusColor(user.status);
              return (
                <Box 
                  key={user.id}
                  sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', md: '2.5fr 1.2fr 1.5fr 2fr 1fr 1fr' }, 
                    gap: { xs: 2, md: 2 }, p: 3, borderBottom: '1px solid rgba(255,255,255,0.05)',
                    alignItems: 'center', '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }, transition: '0.2s'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: user.avatarColor, width: 38, height: 38, fontSize: '0.9rem', fontWeight: 'bold' }}>{user.avatarText}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ lineHeight: 1.2 }}>{user.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t('users_page.table.last_login', { time: user.lastLogin })}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip label={user.role} size="small" sx={{ bgcolor: roleStyle.bg, color: roleStyle.text, fontWeight: 'bold', fontSize: '0.7rem', borderRadius: '6px', height: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontStyle: user.restaurant === 'Global Access' ? 'italic' : 'normal', color: 'text.secondary' }}>{user.restaurant}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}><Email sx={{ fontSize: 14 }} /><Typography variant="caption">{user.email}</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}><Phone sx={{ fontSize: 14 }} /><Typography variant="caption">{user.phone}</Typography></Box>
                  </Box>
                  <Box>
                    <Chip label={user.status} size="small" sx={{ bgcolor: statusStyle.bg, color: statusStyle.text, fontWeight: 'bold', fontSize: '0.65rem', height: 22 }} />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" sx={{ color: '#26C6F9', bgcolor: 'rgba(38, 198, 249, 0.1)' }}><ArrowForward fontSize="small" /></IconButton>
                    
                    <Tooltip title={t('users_page.tooltips.reset_pass')}>
                      <IconButton size="small" onClick={() => handleOpenResetDialog(user)} sx={{ color: 'text.secondary' }}><LockReset fontSize="small" /></IconButton>
                    </Tooltip>
                    
                    <Tooltip title={user.status === 'BANNED' ? t('users_page.tooltips.unban_user') : t('users_page.tooltips.ban_user')}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleToggleStatus(user.id)}
                        sx={{ 
                          color: user.status === 'BANNED' ? '#72E128' : '#FF4C51', 
                          bgcolor: user.status === 'BANNED' ? 'rgba(114, 225, 40, 0.1)' : 'transparent' 
                        }}
                      >
                        {user.status === 'BANNED' ? <CheckCircle fontSize="small" /> : <Block fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              );
            }) : (
              <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}><Typography>No user found</Typography></Box>
            )}
          </Box>
        </Box>
      </Card>

      {/* 3. ADD NEW USER DRAWER */}
      <Drawer
        anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}
        PaperProps={{ 
          sx: { 
            width: { xs: '100%', sm: 400 }, 
            p: 3, 
            bgcolor: theme.palette.mode === 'dark' ? '#312d4b' : 'background.paper', 
            backgroundImage: 'none', 
            boxShadow: 24 
          } 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="700">{t('users_page.drawer.title')}</Typography>
          <IconButton onClick={() => setOpenDrawer(false)} sx={{ color: 'text.secondary' }}><Close /></IconButton>
        </Box>
        <Stack spacing={3}>
          <TextField label={t('users_page.drawer.label_fullname')} name="name" value={newUser.name} onChange={handleInputChange} fullWidth />
          <TextField label={t('users_page.drawer.label_email')} name="email" value={newUser.email} onChange={handleInputChange} fullWidth />
          <TextField label={t('users_page.drawer.label_phone')} name="phone" value={newUser.phone} onChange={handleInputChange} fullWidth />
          
          <FormControl fullWidth>
            <InputLabel>{t('users_page.drawer.label_restaurant')}</InputLabel>
            <Select name="restaurant" value={newUser.restaurant} label={t('users_page.drawer.label_restaurant')} onChange={handleInputChange}>
              <MenuItem value="Grand Baku">Grand Baku</MenuItem>
              <MenuItem value="Dolma Kitchen">Dolma Kitchen</MenuItem>
              <MenuItem value="Caspian Grill">Caspian Grill</MenuItem>
              <MenuItem value="Global Access">Global Access</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>{t('users_page.drawer.label_role')}</InputLabel>
            <Select name="role" value={newUser.role} label={t('users_page.drawer.label_role')} onChange={handleInputChange}>
              <MenuItem value="SUPER ADMIN">Super Admin</MenuItem>
              <MenuItem value="OWNER">Owner</MenuItem>
              <MenuItem value="MANAGER">Manager</MenuItem>
              <MenuItem value="STAFF">Staff</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>{t('users_page.drawer.label_status')}</InputLabel>
            <Select name="status" value={newUser.status} label={t('users_page.drawer.label_status')} onChange={handleInputChange}>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="contained" fullWidth size="large" onClick={handleSaveUser} startIcon={<Save />} sx={{ bgcolor: '#4285F4' }}>
              {t('users_page.drawer.btn_save')}
            </Button>
            <Button variant="outlined" fullWidth size="large" onClick={() => setOpenDrawer(false)} color="secondary">
              {t('users_page.drawer.btn_cancel')}
            </Button>
          </Box>
        </Stack>
      </Drawer>

      {/* 4. RESET PASSWORD DIALOG */}
      <Dialog
        open={resetDialog.open}
        onClose={handleCloseResetDialog}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.mode === 'dark' ? '#312d4b' : 'background.paper',
            backgroundImage: 'none',
            maxWidth: '450px',
            width: '100%',
            p: 1
          }
        }}
      >
        {resetDialog.step === 1 ? (
          <>
            <DialogTitle sx={{ fontWeight: 'bold' }}>{t('users_page.reset_password.title')}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {t('users_page.reset_password.confirm_text')} <b>{resetDialog.user?.name}</b>?
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t('users_page.reset_password.warning')}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button onClick={handleCloseResetDialog} color="inherit">{t('users_page.reset_password.btn_cancel')}</Button>
              <Button onClick={handleGeneratePassword} variant="contained" sx={{ bgcolor: '#4285F4' }}>
                {t('users_page.reset_password.btn_reset')}
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle sx={{ fontWeight: 'bold' }}>{t('users_page.reset_password.title')}</DialogTitle>
            <DialogContent>
              <Alert 
                icon={<CheckCircle fontSize="inherit" />} 
                severity="success" 
                variant="filled"
                sx={{ mb: 3, bgcolor: 'rgba(114, 225, 40, 0.12)', color: '#72E128', border: '1px solid rgba(114, 225, 40, 0.2)' }}
              >
                {t('users_page.reset_password.success')}
              </Alert>
              
              <TextField
                label={t('users_page.reset_password.label_new_pass')}
                fullWidth
                value={resetDialog.newPass}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCopyToClipboard} edge="end">
                        {copied ? <CheckCircle fontSize="small" color="success" /> : <ContentCopy fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mt: 1 }}
              />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button onClick={handleCloseResetDialog} variant="contained" fullWidth sx={{ bgcolor: '#4285F4' }}>
                {t('users_page.reset_password.btn_done')}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

    </Box>
  );
};

export default Users;