import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, TextField, 
  Select, MenuItem, FormControl, InputLabel, Grid, IconButton, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, useTheme, useMediaQuery, Paper 
} from '@mui/material';
import { 
  Send, DeleteOutline, Campaign, People, Info 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Başlanğıc Tarixçə Məlumatları (Mock Data)
const INITIAL_HISTORY = [
  { 
    id: 1, 
    date: '2025-12-20', 
    title: 'Server Maintenance', 
    message: 'Technical work tomorrow at 04:00.', 
    recipients: 'All Owners', 
    type: 'warning' 
  },
  { 
    id: 2, 
    date: '2026-01-10', 
    title: 'Welcome New Feature', 
    message: 'Added QR-constructor module!', 
    recipients: 'PRO Plan', 
    type: 'info' 
  },
];

const PushNotifications = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // States
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [form, setForm] = useState({
    recipients: 'all',
    type: 'info',
    title: '',
    message: ''
  });

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (!form.title || !form.message) return; // Sadə validasiya

    const newPush = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: form.title,
      message: form.message,
      recipients: form.recipients === 'all' ? 'All Restaurants' : form.recipients,
      type: form.type
    };

    setHistory([newPush, ...history]);
    setForm({ ...form, title: '', message: '' }); // Formu təmizlə
  };

  const handleDelete = (id) => {
    setHistory(history.filter(item => item.id !== id));
  };

  // Helper for Chip color
  const getRecipientStyle = (recipients) => {
    if (recipients.includes('All')) return { bgcolor: 'rgba(114, 225, 40, 0.12)', color: '#72E128' };
    return { bgcolor: 'rgba(66, 133, 244, 0.12)', color: '#4285F4' };
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 } }}>
      
      {/* 1. HEADER */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {t('push.title')} 📢
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('push.subtitle')}
        </Typography>
      </Box>

      {/* 2. CREATE MESSAGE FORM */}
      <Card sx={{ mb: 4, boxShadow: 3, borderRadius: '12px' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>{t('push.form.title')}</Typography>
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>{t('push.form.label_recipients')}</InputLabel>
                <Select
                  name="recipients"
                  value={form.recipients}
                  label={t('push.form.label_recipients')}
                  onChange={handleInputChange}
                  startAdornment={<People fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />}
                >
                  <MenuItem value="all">{t('push.form.option_all')}</MenuItem>
                  <MenuItem value="pro">{t('push.form.option_pro')}</MenuItem>
                  <MenuItem value="active">{t('push.form.option_active')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>{t('push.form.label_type')}</InputLabel>
                <Select
                  name="type"
                  value={form.type}
                  label={t('push.form.label_type')}
                  onChange={handleInputChange}
                  startAdornment={<Info fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />}
                >
                  <MenuItem value="info">{t('push.form.type_info')}</MenuItem>
                  <MenuItem value="warning">{t('push.form.type_warning')}</MenuItem>
                  <MenuItem value="success">{t('push.form.type_success')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TextField 
            fullWidth 
            name="title"
            label={t('push.form.label_title')} 
            value={form.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          
          <TextField 
            fullWidth 
            name="message"
            label={t('push.form.label_message')} 
            multiline 
            rows={3} 
            value={form.message}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              startIcon={<Send />} 
              onClick={handleSend}
              sx={{ 
                bgcolor: '#4285F4', 
                fontWeight: 'bold', 
                textTransform: 'none',
                px: 3,
                boxShadow: '0 4px 14px 0 rgba(66, 133, 244, 0.3)'
              }}
            >
              {t('push.form.btn_send')}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 3. HISTORY TABLE (RESPONSIVE) */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>{t('push.history.title')}</Typography>
      
      <Card sx={{ boxShadow: 3, borderRadius: '12px', overflow: 'hidden' }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          
          {isMobile ? (
            // --- MOBİL GÖRÜNÜŞ (KARTLAR) ---
            <Box sx={{ p: 2 }}>
              {history.map((row) => (
                <Card key={row.id} sx={{ mb: 2, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">{row.date}</Typography>
                      <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>{row.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.85rem' }}>{row.message}</Typography>
                    
                    <Box sx={{ pt: 1.5, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <Chip 
                        label={row.recipients} 
                        size="small" 
                        sx={{ ...getRecipientStyle(row.recipients), fontWeight: 'bold', borderRadius: '6px', fontSize: '0.7rem', height: 24 }} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
              {history.length === 0 && <Typography align="center" color="text.secondary" sx={{ py: 2 }}>No history found.</Typography>}
            </Box>
          ) : (
            // --- PC GÖRÜNÜŞ (CƏDVƏL) ---
            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
              <Table>
                <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                  <TableRow>
                    <TableCell width="15%" sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '0.75rem' }}>{t('push.history.col_date')}</TableCell>
                    <TableCell width="50%" sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '0.75rem' }}>{t('push.history.col_message')}</TableCell>
                    <TableCell width="20%" sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '0.75rem' }}>{t('push.history.col_recipients')}</TableCell>
                    <TableCell width="15%" align="right" sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '0.75rem' }}>{t('push.history.col_actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((row) => (
                    <TableRow key={row.id} hover sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)', py: 2 } }}>
                      <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>{row.date}</TableCell>
                      <TableCell sx={{ minWidth: 0 }}> {/* minWidth: 0 Vacibdir! */}
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="body2" fontWeight="bold" noWrap>{row.title}</Typography>
                          <Typography variant="caption" color="text.secondary" noWrap display="block">{row.message}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={row.recipients} 
                          size="small" 
                          sx={{ ...getRecipientStyle(row.recipients), fontWeight: 'bold', borderRadius: '6px' }} 
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="error" onClick={() => handleDelete(row.id)} sx={{ opacity: 0.8, '&:hover': { opacity: 1, bgcolor: 'rgba(255, 76, 81, 0.1)' } }}>
                          <DeleteOutline />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {history.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>No broadcast history available.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

    </Box>
  );
};

export default PushNotifications;