import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, Switch, 
  Table, TableBody, TableCell, TableHead, TableRow, 
  Chip, useTheme, useMediaQuery, Tooltip, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, FormControl, InputLabel, Select, MenuItem, 
  Checkbox, FormControlLabel 
} from '@mui/material';
import { CheckCircle, AddAlert } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Mock Data
const INITIAL_RELEASES = [
  { id: 1, version: 'v1.2.0', type: 'FEATURE', title: 'Telegram Integration', desc: 'Added full Telegram Bot support for orders.', date: '2026-01-12', status: 'active' },
  { id: 2, version: 'v1.1.5', type: 'FIX', title: 'Billing Fixes', desc: 'Fixed invoice generation PDF bug.', date: '2026-01-10', status: 'active' },
  { id: 3, version: 'v1.1.0', type: 'MAJOR', title: 'Initial Launch', desc: 'System go-live.', date: '2026-01-01', status: 'active' },
];

const SystemReleases = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // States
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [releases, setReleases] = useState(INITIAL_RELEASES);
  const [openModal, setOpenModal] = useState(false);
  
  // Form State
  const [form, setForm] = useState({
    version: '',
    type: 'feature',
    title: '',
    desc: '',
    notify: true
  });

  // Handlers
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handlePublish = () => {
    if (!form.version || !form.title) return;

    const newRelease = {
      id: Date.now(),
      version: form.version,
      type: form.type.toUpperCase(),
      title: form.title,
      desc: form.desc,
      date: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    setReleases([newRelease, ...releases]);
    handleClose();
    setForm({ version: '', type: 'feature', title: '', desc: '', notify: true }); // Reset form
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'FEATURE': return { bg: 'rgba(114, 225, 40, 0.12)', text: '#72E128' }; 
      case 'FIX': return { bg: 'rgba(253, 181, 40, 0.12)', text: '#FDB528' }; 
      case 'MAJOR': return { bg: 'rgba(102, 108, 255, 0.12)', text: '#666CFF' }; 
      case 'SECURITY': return { bg: 'rgba(255, 76, 81, 0.12)', text: '#FF4C51' }; 
      default: return { bg: 'rgba(133, 146, 163, 0.12)', text: '#8592A3' };
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 } }}>
      
      {/* HEADER */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t('releases.title')} 🚀
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('releases.subtitle')}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch checked={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.checked)} color="error" />
            <Typography variant="body2" fontWeight="bold" color="text.secondary">{t('releases.maintenance')}</Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<AddAlert />} 
            onClick={handleOpen} // MODAL AÇIR
            sx={{ bgcolor: '#4285F4', fontWeight: 'bold', textTransform: 'none', boxShadow: '0 4px 14px 0 rgba(66, 133, 244, 0.3)' }}
          >
            {t('releases.btn_push')}
          </Button>
        </Box>
      </Box>

      {/* CONTENT */}
      <Card sx={{ boxShadow: 3, borderRadius: '12px', width: '100%', overflow: 'hidden' }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          {isMobile ? (
            // --- MOBILE VIEW (CARDS) ---
            <Box sx={{ p: 2 }}>
              {releases.map((row) => {
                const typeStyle = getTypeColor(row.type);
                return (
                  <Card key={row.id} sx={{ mb: 2, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Chip label={row.version} size="small" sx={{ fontWeight: 'bold', bgcolor: 'rgba(255,255,255,0.1)' }} />
                        <Chip label={row.type} size="small" sx={{ bgcolor: typeStyle.bg, color: typeStyle.text, fontWeight: 'bold', fontSize: '0.65rem', height: 20, borderRadius: '4px' }} />
                      </Box>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>{row.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.85rem' }}>{row.desc}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1.5, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <Typography variant="caption" color="text.disabled">{row.date}</Typography>
                        <CheckCircle sx={{ color: '#72E128', fontSize: 20 }} />
                      </Box>
                    </CardContent>
                  </Card>
                )
              })}
            </Box>
          ) : (
            // --- DESKTOP VIEW (TABLE) ---
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <Box sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                    <TableRow sx={{ '& th': { borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary' } }}>
                      <TableCell>{t('releases.table.version')}</TableCell>
                      <TableCell>{t('releases.table.type')}</TableCell>
                      <TableCell width="40%">{t('releases.table.desc')}</TableCell>
                      <TableCell>{t('releases.table.date')}</TableCell>
                      <TableCell align="right">{t('releases.table.status')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {releases.map((row) => {
                      const typeStyle = getTypeColor(row.type);
                      return (
                        <TableRow key={row.id} hover sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)', py: 2 } }}>
                          <TableCell><Chip label={row.version} size="small" sx={{ fontWeight: 'bold', bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} /></TableCell>
                          <TableCell><Chip label={row.type} size="small" sx={{ bgcolor: typeStyle.bg, color: typeStyle.text, fontWeight: 'bold', borderRadius: '6px', fontSize: '0.7rem', height: 24 }} /></TableCell>
                          <TableCell><Box><Typography variant="body2" fontWeight="bold">{row.title}</Typography><Typography variant="caption" color="text.secondary">{row.desc}</Typography></Box></TableCell>
                          <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{row.date}</TableCell>
                          <TableCell align="right"><Tooltip title="Deployed"><CheckCircle sx={{ color: '#72E128', fontSize: 20 }} /></Tooltip></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* --- NEW UPDATE MODAL --- */}
      <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#2b2c40', backgroundImage: 'none', borderRadius: 2, color: '#fff' } }}>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{t('releases.modal.title')}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField 
                fullWidth label={t('releases.modal.version')} name="version" size="small" 
                value={form.version} onChange={handleInputChange} 
                sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
              />
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>{t('releases.modal.type')}</InputLabel>
                <Select 
                  name="type" value={form.type} label={t('releases.modal.type')} onChange={handleInputChange}
                  sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' }, '& .MuiSvgIcon-root': { color: '#fff' } }}
                >
                  <MenuItem value="major">Major</MenuItem>
                  <MenuItem value="feature">Feature</MenuItem>
                  <MenuItem value="fix">Fix</MenuItem>
                  <MenuItem value="security">Security</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField 
              fullWidth label={t('releases.modal.update_title')} name="title" size="small" 
              value={form.title} onChange={handleInputChange} 
              sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />

            <TextField 
              fullWidth label={t('releases.modal.desc')} name="desc" multiline rows={3} 
              value={form.desc} onChange={handleInputChange} 
              sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } }, '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' } }}
            />

            <FormControlLabel 
              control={<Checkbox checked={form.notify} onChange={handleInputChange} name="notify" sx={{ color: '#4285F4', '&.Mui-checked': { color: '#4285F4' } }} />} 
              label={<Typography color="text.secondary" fontSize="0.9rem">{t('releases.modal.notify')}</Typography>} 
            />

          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>{t('releases.modal.btn_cancel')}</Button>
          <Button onClick={handlePublish} variant="contained" sx={{ bgcolor: '#4285F4', fontWeight: 'bold' }}>{t('releases.modal.btn_publish')}</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default SystemReleases;