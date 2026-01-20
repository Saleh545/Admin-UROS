import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, TextField, 
  InputAdornment, IconButton, Avatar, useTheme, useMediaQuery, 
  Tabs, Tab, LinearProgress, Chip, Dialog, DialogTitle, 
  DialogContent, DialogActions, FormControl, InputLabel, 
  Select, MenuItem, Switch, FormControlLabel, Menu 
} from '@mui/material';
import { 
  Search, Add, Edit, DeleteOutline, Phone, VpnKey, 
  Refresh, Person, SupervisorAccount, KeyboardArrowDown 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// MOCK DATA (5 nəfər: 2 Manager, 3 Staff)
const INITIAL_USERS = [
  { id: 1, name: 'Elvin Aliyev', role: 'Manager', branch: 'Center', phone: '050-123-4567', pin: '1111', type: 'manager', email: 'elvin@ur-os.az', cashControl: false },
  { id: 2, name: 'Rasim Guliyev', role: 'Admin', branch: 'Mall', phone: '055-555-5555', pin: '1234', type: 'manager', email: 'rasim@ur-os.az', cashControl: false },
  { id: 3, name: 'Samir Valiyev', role: 'Waiter', branch: 'Center', phone: '055-987-6543', pin: '2222', type: 'staff', email: 'samir@ur-os.az', cashControl: false },
  { id: 4, name: 'Aysel K.', role: 'Hostess', branch: 'Center', phone: '070-555-4433', pin: '3333', type: 'staff', email: 'aysel@ur-os.az', cashControl: true },
  { id: 5, name: 'Orkhan B.', role: 'Waiter', branch: 'Mall', phone: '051-111-2233', pin: '4444', type: 'staff', email: 'orkhan@ur-os.az', cashControl: false },
];

const BRANCHES = ['Grand Baku (Center)', 'Grand Baku (Mall)', 'Grand Baku (Sea Breeze)'];
const FILTER_OPTIONS = ['All Branches', ...BRANCHES];

const StaffAccess = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // --- STATES ---
  const [activeTab, setActiveTab] = useState(0); 
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState('');
  
  // Branch Filter
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [anchorEl, setAnchorEl] = useState(null);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 
  const [formData, setFormData] = useState({
    name: '', role: 'Waiter', branch: BRANCHES[0], phone: '', pin: '', email: '', cashControl: false
  });

  // --- HANDLERS ---
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  // Branch Menu
  const handleBranchClick = (event) => setAnchorEl(event.currentTarget);
  const handleBranchClose = (option) => {
    if (option) setSelectedBranch(option);
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    if (window.confirm(t('staff.confirm_delete'))) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      const fullBranchName = BRANCHES.find(b => b.includes(user.branch)) || BRANCHES[0];
      setFormData({ ...user, branch: fullBranchName });
    } else {
      setEditingUser(null);
      setFormData({ 
        name: '', role: 'Waiter', branch: BRANCHES[0], phone: '', 
        pin: Math.floor(1000 + Math.random() * 9000).toString(), 
        email: '', cashControl: false 
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = () => {
    if (!formData.name) return;
    let branchShort = "Center";
    const match = formData.branch.match(/\(([^)]+)\)/);
    if (match) branchShort = match[1];
    
    const userType = activeTab === 0 ? 'manager' : 'staff';
    const finalData = {
      ...formData,
      branch: branchShort,
      type: userType,
      cashControl: userType === 'manager' ? false : formData.cashControl
    };

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...finalData } : u));
    } else {
      const newUser = { id: Date.now(), ...finalData };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const generatePin = () => {
    setFormData({ ...formData, pin: Math.floor(1000 + Math.random() * 9000).toString() });
  };

  // FILTER LOGIC
  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 0 ? user.type === 'manager' : user.type === 'staff';
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || user.pin.includes(search);
    
    // Filial Filtrasiyası
    let matchesBranch = true;
    if (selectedBranch !== 'All Branches') {
      const branchShort = selectedBranch.match(/\(([^)]+)\)/)[1];
      matchesBranch = user.branch === branchShort;
    }

    return matchesTab && matchesSearch && matchesBranch;
  });

  // PLAN LIMITS (Dinamik Hesablama - Ekranda görünən sayına görə)
  const PLAN_LIMIT = 20; 
  const currentCount = filteredUsers.length; // Siyahıdakı (filtrli) istifadəçi sayı
  const progressValue = Math.min((currentCount / PLAN_LIMIT) * 100, 100);

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 } }}>
      
      {/* HEADER */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t('staff.title')} 👥
          </Typography>
          
          {/* BRANCH SELECTOR */}
          <Button 
            onClick={handleBranchClick}
            endIcon={<KeyboardArrowDown />} 
            sx={{ color: 'text.secondary', textTransform: 'none', p: 0, mt: 0.5, '&:hover': { bgcolor: 'transparent' }, justifyContent: 'flex-start' }}
          >
            {t('staff.subtitle')}: <strong style={{ marginLeft: '5px', color: '#4285F4' }}>{selectedBranch}</strong>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleBranchClose(null)}
            PaperProps={{ sx: { bgcolor: '#2b2c40', color: '#fff', mt: 1, minWidth: 200 } }}
          >
            {FILTER_OPTIONS.map((option) => (
              <MenuItem key={option} onClick={() => handleBranchClose(option)}>{option}</MenuItem>
            ))}
          </Menu>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, width: { xs: '100%', md: 'auto' } }}>
          
          {/* PLAN LIMITS (DYNAMIC PROGRESS BAR) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
            <Typography variant="caption" color="text.secondary" noWrap>{t('staff.limits')}:</Typography>
            <LinearProgress 
              variant="determinate" 
              value={progressValue} 
              sx={{ width: 100, height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#72E128' } }} 
            />
            <Typography variant="caption" fontWeight="bold">{currentCount} / {PLAN_LIMIT}</Typography>
          </Box>

          <Button 
            fullWidth={isMobile}
            variant="contained" 
            startIcon={<Add />} 
            onClick={() => handleOpenModal(null)}
            sx={{ bgcolor: '#4285F4', fontWeight: 'bold', textTransform: 'none' }}
          >
            {t('staff.btn_add')}
          </Button>
        </Box>
      </Box>

      {/* TABS & SEARCH */}
      <Card sx={{ boxShadow: 3, borderRadius: '12px', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', px: 2 }}>
          <Tab icon={<SupervisorAccount fontSize="small"/>} iconPosition="start" label={t('staff.tab_managers')} sx={{ textTransform: 'none', fontWeight: 'bold', minHeight: 50 }} />
          <Tab icon={<Person fontSize="small"/>} iconPosition="start" label={t('staff.tab_staff')} sx={{ textTransform: 'none', fontWeight: 'bold', minHeight: 50 }} />
        </Tabs>
        <Box sx={{ p: 2 }}>
          <TextField 
            fullWidth size="small" placeholder={t('staff.search_placeholder')} 
            value={search} onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
            sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.02)' } }}
          />
        </Box>
      </Card>

      {/* USERS GRID */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, 
        gap: 2 
      }}>
        {filteredUsers.map((user) => (
          <Card key={user.id} sx={{ boxShadow: 3, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            
            <Chip 
              label={`📍 ${user.branch.toUpperCase()}`} 
              size="small" 
              sx={{ 
                position: 'absolute', top: 12, left: 12, 
                bgcolor: 'rgba(0,0,0,0.4)', color: '#fff', 
                fontSize: '0.65rem', fontWeight: 'bold', height: 20, backdropFilter: 'blur(4px)'
              }} 
            />

            <CardContent sx={{ p: 2.5, pt: 5, flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: '#2b2c40', border: '2px solid rgba(255,255,255,0.1)', fontSize: '1.2rem', fontWeight: 'bold', color: '#4285F4' }}>
                  {user.name.charAt(0)}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="h6" fontWeight="bold" fontSize="1rem" noWrap>{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{user.role}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#72E128' }} />
                    <Chip icon={<VpnKey style={{ fontSize: 12 }} />} label={`PIN: ${user.pin}`} size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: 'rgba(66, 133, 244, 0.1)', color: '#4285F4', fontWeight: 'bold' }} />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.85rem' }}>
                <Phone fontSize="small" /> {user.phone}
              </Box>
            </CardContent>

            <Box sx={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Button 
                onClick={() => handleOpenModal(user)}
                startIcon={<Edit />}
                sx={{ 
                  flex: 1, color: 'text.secondary', textTransform: 'none', borderRadius: 0, py: 1.5,
                  borderRight: '1px solid rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                {t('staff.btn_edit')}
              </Button>
              <Button 
                onClick={() => handleDelete(user.id)}
                startIcon={<DeleteOutline />}
                color="error"
                sx={{ 
                  flex: 1, textTransform: 'none', borderRadius: 0, py: 1.5,
                  '&:hover': { bgcolor: 'rgba(255, 76, 81, 0.1)' }
                }}
              >
                {t('staff.btn_remove')}
              </Button>
            </Box>

          </Card>
        ))}
      </Box>

      {/* --- MODAL --- */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal} 
        fullWidth 
        maxWidth="sm" 
        PaperProps={{ sx: { bgcolor: '#2b2c40', color: '#fff', backgroundImage: 'none', borderRadius: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {editingUser ? t('staff.modal.title_edit') : t('staff.modal.title_add')}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>{t('staff.modal.label_branch')}</InputLabel>
              <Select 
                name="branch" 
                value={formData.branch} 
                onChange={handleFormChange}
                label={t('staff.modal.label_branch')}
                sx={{ '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' }, color: '#fff', '& .MuiSvgIcon-root': { color: '#fff' } }}
              >
                {BRANCHES.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
              </Select>
            </FormControl>

            <TextField 
              fullWidth label={t('staff.modal.label_name')} name="name" size="small"
              value={formData.name} onChange={handleFormChange}
              InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, color: '#fff' } }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField 
                fullWidth label={t('staff.modal.label_phone')} name="phone" size="small"
                value={formData.phone} onChange={handleFormChange}
                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, color: '#fff' } }}
              />
              <TextField 
                fullWidth label={t('staff.modal.label_pin')} name="pin" size="small"
                value={formData.pin} onChange={handleFormChange}
                InputProps={{ 
                  endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={generatePin} sx={{ color: '#4285F4' }}><Refresh fontSize="small"/></IconButton></InputAdornment> 
                }}
                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, color: '#fff' } }}
              />
            </Box>

            <TextField 
              fullWidth label={t('staff.modal.label_email')} name="email" size="small"
              value={formData.email} onChange={handleFormChange}
              InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, color: '#fff' } }}
            />

            {activeTab === 1 && (
              <Box sx={{ p: 2, border: '1px dashed #4285F4', borderRadius: 2, bgcolor: 'rgba(66, 133, 244, 0.05)' }}>
                <FormControlLabel 
                  control={<Switch checked={formData.cashControl} onChange={handleFormChange} name="cashControl" />} 
                  label={<Typography fontSize="0.9rem" fontWeight="bold">{t('staff.modal.label_cash_control')}</Typography>} 
                />
              </Box>
            )}

          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleCloseModal} sx={{ color: 'text.secondary' }}>{t('staff.modal.btn_cancel')}</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#4285F4', fontWeight: 'bold' }}>
            {editingUser ? t('staff.modal.btn_save') : t('staff.modal.btn_add_confirm')}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default StaffAccess;