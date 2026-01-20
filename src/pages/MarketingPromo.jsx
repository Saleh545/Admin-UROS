import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, useTheme, useMediaQuery, Switch, IconButton, Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment
} from '@mui/material';
import { 
  Add, DeleteOutline, KeyboardArrowDown, PersonOutline, LocalOffer,
  ConfirmationNumber, Store, Percent, CalendarToday
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// MOCK DATA
const INITIAL_PROMOS = [
  { id: 1, name: 'New Year', code: 'BAKU2026', branch: 'All Branches', discount: '10%', uses: 45, date: '2026-12-31', active: true },
  { id: 2, name: 'Lunch Time', code: 'LUNCH15', branch: 'Grand Baku (Center)', discount: '15%', uses: 12, date: '2026-06-01', active: true },
  { id: 3, name: 'Welcome Drink', code: 'FREE_DRINK', branch: 'Grand Baku (Mall)', discount: 'Free', uses: 102, date: '2025-08-31', active: false },
];

const BRANCHES = ['All Branches', 'Grand Baku (Center)', 'Grand Baku (Mall)', 'Grand Baku (Sea Breeze)'];

const MarketingPromo = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // States
  const [promos, setPromos] = useState(INITIAL_PROMOS);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);
  const [openModal, setOpenModal] = useState(false); // MODAL STATE

  // Form State
  const [form, setForm] = useState({
    name: '',
    code: '',
    branch: 'All Branches',
    value: '',
    type: 'percent',
    date: ''
  });

  // Handlers
  const handleBranchClick = (event) => setAnchorEl(event.currentTarget);
  const handleBranchClose = (branch) => {
    if (branch) setSelectedBranch(branch);
    setAnchorEl(null);
  };

  const handleToggleStatus = (id) => {
    setPromos(promos.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const handleDelete = (id) => {
    setPromos(promos.filter(p => p.id !== id));
  };

  // Modal Handlers
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    if (!form.name || !form.code) return;
    const discountText = form.type === 'percent' ? `${form.value}%` : `${form.value}₼`;
    
    const newPromo = {
      id: Date.now(),
      name: form.name,
      code: form.code.toUpperCase(),
      branch: form.branch,
      discount: discountText,
      uses: 0,
      date: form.date || '2026-12-31',
      active: true
    };

    setPromos([newPromo, ...promos]);
    handleCloseModal();
    setForm({ name: '', code: '', branch: 'All Branches', value: '', type: 'percent', date: '' });
  };

  // Styles
  const getBranchStyle = (branch) => {
    if (branch === 'All Branches') return { bgcolor: '#4285F4', color: '#fff' };
    return { bgcolor: 'rgba(255,255,255,0.15)', color: '#fff' };
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 } }}>
      
      {/* HEADER */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t('marketing.title')} 🎁
          </Typography>
          <Button 
            onClick={handleBranchClick}
            endIcon={<KeyboardArrowDown />} 
            sx={{ color: 'text.secondary', textTransform: 'none', p: 0, mt: 0.5, '&:hover': { bgcolor: 'transparent' }, justifyContent: 'flex-start' }}
          >
            {t('marketing.managing')}: <strong style={{ marginLeft: '8px', color: '#4285F4' }}>{selectedBranch}</strong>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleBranchClose(null)}
            PaperProps={{ sx: { bgcolor: '#2b2c40', color: '#fff', mt: 1, minWidth: 200 } }}
          >
            {BRANCHES.map((b) => (
              <MenuItem key={b} onClick={() => handleBranchClose(b)}>{b}</MenuItem>
            ))}
          </Menu>
        </Box>

        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={handleOpenModal} // MODAL ACIR
          sx={{ bgcolor: '#4285F4', fontWeight: 'bold', textTransform: 'none', boxShadow: '0 4px 14px 0 rgba(66, 133, 244, 0.3)' }}
        >
          {t('marketing.btn_create')}
        </Button>
      </Box>

      {/* CONTENT */}
      <Card sx={{ boxShadow: 3, borderRadius: '12px', width: '100%', overflow: 'hidden' }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          
          {isMobile ? (
            <Box sx={{ p: 2 }}>
              {promos.map((row) => (
                <Card key={row.id} sx={{ mb: 2, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalOffer sx={{ color: '#4285F4', fontSize: 20 }} />
                        <Typography variant="subtitle1" fontWeight="bold">{row.name}</Typography>
                      </Box>
                      <Switch checked={row.active} onChange={() => handleToggleStatus(row.id)} size="small" color="success" />
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip label={row.code} size="small" sx={{ bgcolor: 'rgba(66, 133, 244, 0.15)', color: '#4285F4', fontWeight: 'bold', borderRadius: '6px' }} />
                      <Chip label={row.branch} size="small" sx={{ ...getBranchStyle(row.branch), fontWeight: 'bold', borderRadius: '6px' }} />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2, bgcolor: 'rgba(255,255,255,0.03)', p: 1.5, borderRadius: 1 }}>
                      <Box><Typography variant="caption" color="text.secondary">{t('marketing.table.discount')}</Typography><Typography variant="body2" fontWeight="bold">{row.discount}</Typography></Box>
                      <Box><Typography variant="caption" color="text.secondary">{t('marketing.table.stats')}</Typography><Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><PersonOutline fontSize="small" sx={{ fontSize: 16 }} /> {row.uses}</Typography></Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', pt: 1 }}>
                      <Typography variant="caption" color="text.secondary">{t('marketing.table.expires')}: {row.date}</Typography>
                      <IconButton size="small" onClick={() => handleDelete(row.id)} sx={{ color: '#FF4C51', bgcolor: 'rgba(255, 76, 81, 0.1)' }}><DeleteOutline fontSize="small" /></IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
              <Table sx={{ minWidth: 900 }}>
                <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                  <TableRow sx={{ '& th': { borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 700, color: 'text.secondary' } }}>
                    <TableCell>{t('marketing.table.name')}</TableCell>
                    <TableCell>{t('marketing.table.code')}</TableCell>
                    <TableCell>{t('marketing.table.branch')}</TableCell>
                    <TableCell>{t('marketing.table.discount')}</TableCell>
                    <TableCell>{t('marketing.table.stats')}</TableCell>
                    <TableCell>{t('marketing.table.expires')}</TableCell>
                    <TableCell align="right">{t('marketing.table.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {promos.map((row) => (
                    <TableRow key={row.id} hover sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)', py: 1.5 } }}>
                      <TableCell sx={{ minWidth: 0 }}><Typography variant="body2" fontWeight="bold">{row.name}</Typography></TableCell>
                      <TableCell><Chip label={row.code} size="small" sx={{ bgcolor: 'rgba(66, 133, 244, 0.15)', color: '#4285F4', fontWeight: 'bold', borderRadius: '6px', fontSize: '0.75rem' }} /></TableCell>
                      <TableCell><Chip label={row.branch} size="small" sx={{ ...getBranchStyle(row.branch), fontWeight: 'bold', borderRadius: '12px', fontSize: '0.75rem', height: 24 }} /></TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>{row.discount}</TableCell>
                      <TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}><PersonOutline fontSize="small" /> {row.uses}</Box></TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{row.date}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                          <Switch checked={row.active} onChange={() => handleToggleStatus(row.id)} size="small" color="success" />
                          <IconButton size="small" onClick={() => handleDelete(row.id)} sx={{ color: '#FF4C51', p: 0.5 }}><DeleteOutline fontSize="small" /></IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* --- CREATE PROMO MODAL --- */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal} 
        fullWidth 
        maxWidth="sm" 
        PaperProps={{ sx: { bgcolor: '#2b2c40', color: '#fff', backgroundImage: 'none', borderRadius: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 2 }}>
          {t('marketing.modal.title')}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            
            {/* Promo Name */}
            <TextField 
              fullWidth label={t('marketing.modal.label_name')} name="name" 
              value={form.name} onChange={handleInputChange}
              InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, color: '#fff' } }}
            />

            {/* Promo Code */}
            <TextField 
              fullWidth label={t('marketing.modal.label_code')} name="code" 
              value={form.code} onChange={handleInputChange}
              InputProps={{ startAdornment: <InputAdornment position="start"><ConfirmationNumber sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }}
              InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, color: '#fff' } }}
            />

            {/* Branch Select */}
            <TextField
              select fullWidth label={t('marketing.modal.label_branch')} name="branch"
              value={form.branch} onChange={handleInputChange}
              InputProps={{ startAdornment: <InputAdornment position="start"><Store sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }}
              InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, color: '#fff' } }}
            >
              {BRANCHES.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
            </TextField>

            {/* Discount Row */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField 
                fullWidth label={t('marketing.modal.label_value')} name="value" type="number"
                value={form.value} onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, color: '#fff' } }}
              />
              <TextField
                select fullWidth label={t('marketing.modal.label_type')} name="type"
                value={form.type} onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, color: '#fff' } }}
              >
                <MenuItem value="percent">{t('marketing.modal.type_percent')}</MenuItem>
                <MenuItem value="fixed">{t('marketing.modal.type_fixed')}</MenuItem>
              </TextField>
            </Box>

            {/* Date Picker */}
            <TextField 
              fullWidth label={t('marketing.modal.label_date')} name="date" type="date"
              value={form.date} onChange={handleInputChange}
              InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><CalendarToday sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' }, color: '#fff', '& input::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } } }}
            />

          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1, justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={handleCloseModal} sx={{ color: 'text.secondary', textTransform: 'none' }}>{t('marketing.modal.btn_cancel')}</Button>
          <Button onClick={handleCreate} variant="contained" sx={{ bgcolor: '#4285F4', fontWeight: 'bold', textTransform: 'none' }}>{t('marketing.modal.btn_create')}</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default MarketingPromo;