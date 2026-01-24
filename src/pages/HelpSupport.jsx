import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Grid, Avatar, Chip, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, useTheme, useMediaQuery,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  MenuItem, IconButton
} from '@mui/material';
import { 
  SupportAgent, MenuBook, WhatsApp, Email, 
  Add, BugReport, Payment, Close 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const HelpSupport = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  // --- STATE ---
  const [openModal, setOpenModal] = useState(false);

  // --- HANDLERS ---
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCardClick = (type) => {
    switch (type) {
      case 'kb':
        window.open('https://ur-os.az/docs', '_blank');
        break;
      case 'whatsapp':
        window.open('https://api.whatsapp.com/send/?phone=994703600100&text&type=phone_number&app_absent=0', '_blank');
        break;
      case 'email':
        window.location.href = 'mailto:support@ur-os.az';
        break;
      default:
        break;
    }
  };

  // --- MOCK DATA ---
  const CONTACT_OPTIONS = [
    { 
      id: 'kb',
      title: t('help_center.cards.kb_title'), 
      desc: t('help_center.cards.kb_desc'), 
      icon: <MenuBook />, 
      color: '#666CFF', 
      bg: 'rgba(102, 108, 255, 0.15)',
      border: '1px solid #666CFF'
    },
    { 
      id: 'whatsapp',
      title: 'WhatsApp', 
      desc: t('help_center.cards.wa_desc'), 
      icon: <WhatsApp />, 
      color: '#72E128', 
      bg: 'rgba(114, 225, 40, 0.15)',
      border: '1px solid #72E128'
    },
    { 
      id: 'email',
      title: 'Email', 
      desc: 'support@ur-os.az', 
      icon: <Email />, 
      color: '#26C6F9', 
      bg: 'rgba(38, 198, 249, 0.15)',
      border: '1px solid #26C6F9'
    }
  ];

  const TICKETS = [
    { 
      id: 1, 
      subject: 'Receipt printer not working', 
      desc: t('help_center.ticket_desc_1'), 
      category: 'Technical', 
      date: '2026-01-12', 
      priority: 'High', 
      status: 'In Progress',
      icon: <BugReport fontSize="small" />
    },
    { 
      id: 2, 
      subject: 'How to change tariff?', 
      desc: t('help_center.ticket_desc_2'), 
      category: 'Billing', 
      date: '2026-01-05', 
      priority: 'Low', 
      status: 'Closed',
      icon: <Payment fontSize="small" />
    }
  ];

  // Colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return { bg: 'rgba(255, 76, 81, 0.15)', text: '#FF4C51' }; 
      case 'Low': return { bg: 'rgba(114, 225, 40, 0.15)', text: '#72E128' };  
      default: return { bg: 'rgba(253, 181, 40, 0.15)', text: '#FDB528' };    
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return { bg: 'rgba(253, 181, 40, 0.15)', text: '#FDB528' }; 
      case 'Closed': return { bg: 'rgba(114, 225, 40, 0.15)', text: '#72E128' };      
      default: return { bg: 'rgba(102, 108, 255, 0.15)', text: '#666CFF' };           
    }
  };

  // --- STYLES ---
  const CARD_BG = '#312d4b'; 
  const MODAL_BG = '#312d4b'; // Modalın rəngi

  const modalStyle = {
    bgcolor: MODAL_BG,
    color: '#fff',
    backgroundImage: 'none',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.1)'
  };
  
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
      '&.Mui-focused fieldset': { borderColor: '#666CFF' },
    },
    '& .MuiInputLabel-root': { 
      color: 'rgba(255,255,255,0.6)',
      // Label fonu modal rəngi ilə eyni edirik ki, xətt görünməsin
      bgcolor: theme.palette.mode === 'dark' ? MODAL_BG : 'transparent', 
      px: 0.5 
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#666CFF' },
    '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.6)' },
    mb: 2.5
  };

  const menuProps = {
    PaperProps: {
      sx: {
        bgcolor: MODAL_BG,
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)',
        '& .MuiMenuItem-root': {
          '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
          '&.Mui-selected': { bgcolor: 'rgba(102, 108, 255, 0.15)', color: '#666CFF' }
        }
      }
    }
  };

  return (
    <Box sx={{ width: '100%', boxSizing: 'border-box', p: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      {/* --- HEADER --- */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.5rem', color: 'text.primary' }}>
            {t('help_center.title')} <SupportAgent sx={{ color: '#FF4C51' }} />
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
            {t('help_center.subtitle')}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={handleOpenModal}
          sx={{ bgcolor: '#4285F4', textTransform: 'none', fontWeight: 'bold', borderRadius: '8px', boxShadow: '0 4px 14px 0 rgba(66, 133, 244, 0.3)' }}
        >
          {t('help_center.btn_contact')}
        </Button>
      </Box>

      {/* --- CARDS --- */}
      <Grid container spacing={3}>
        {CONTACT_OPTIONS.map((option, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              onClick={() => handleCardClick(option.id)}
              sx={{ 
                height: '100%', cursor: 'pointer',
                bgcolor: theme.palette.mode === 'dark' ? CARD_BG : 'background.paper',
                border: `1px solid ${theme.palette.mode === 'dark' ? option.color : 'transparent'}`,
                boxShadow: 3, borderRadius: '12px', backgroundImage: 'none',
                transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                <Avatar variant="rounded" sx={{ bgcolor: option.bg, color: option.color, width: 48, height: 48, borderRadius: '10px' }}>
                  {option.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary', fontSize: '1rem' }}>
                    {option.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {option.desc}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* --- TABLE --- */}
      <Box>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: 'text.primary' }}>
          {t('help_center.my_requests')}
        </Typography>
        <TableContainer component={Card} sx={{ bgcolor: theme.palette.mode === 'dark' ? CARD_BG : 'background.paper', backgroundImage: 'none', boxShadow: 3, borderRadius: '12px', overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ '& th': { borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'text.secondary', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' } }}>
                <TableCell>{t('help_center.table.topic')}</TableCell>
                <TableCell>{t('help_center.table.category')}</TableCell>
                <TableCell>{t('help_center.table.date')}</TableCell>
                <TableCell>{t('help_center.table.priority')}</TableCell>
                <TableCell align="right">{t('help_center.table.status')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TICKETS.map((row) => {
                const priorityStyle = getPriorityColor(row.priority);
                const statusStyle = getStatusColor(row.status);
                return (
                  <TableRow key={row.id} sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)', py: 2 } }}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'text.primary' }}>{row.subject}</Typography>
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#72E128', mt: 0.5 }}>↬ {row.desc}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}>{row.icon}</Avatar>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{row.category}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{row.date}</Typography></TableCell>
                    <TableCell>
                      <Chip label={row.priority} size="small" sx={{ bgcolor: priorityStyle.bg, color: priorityStyle.text, fontWeight: 'bold', borderRadius: '6px', fontSize: '0.75rem', height: 24 }} />
                    </TableCell>
                    <TableCell align="right">
                      <Chip label={row.status} size="small" sx={{ bgcolor: statusStyle.bg, color: statusStyle.text, fontWeight: 'bold', borderRadius: '20px', fontSize: '0.75rem', height: 24 }} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* --- NEW REQUEST MODAL --- */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal} 
        fullWidth 
        maxWidth="sm"
        PaperProps={{ sx: theme.palette.mode === 'dark' ? modalStyle : {} }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {t('help_center.modal.title')}
          <IconButton onClick={handleCloseModal} sx={{ color: 'text.secondary' }}><Close /></IconButton>
        </DialogTitle>
        
        {/* pt: 3 (padding-top) əlavə edildi ki, ilk label kəsilməsin */}
        <DialogContent sx={{ mt: 1, pt: 3 }}> 
          
          {/* CATEGORY SELECT */}
          <TextField 
            select 
            fullWidth 
            label={t('help_center.modal.cat_label')} 
            defaultValue="tech_issue" 
            sx={{ ...inputSx, mt: 1.5 }} // İlk inputa margin-top veririk
            SelectProps={{ MenuProps: menuProps }}
          >
            <MenuItem value="tech_issue">{t('help_center.options.tech_issue')}</MenuItem>
            <MenuItem value="billing">{t('help_center.options.billing')}</MenuItem>
            <MenuItem value="feature">{t('help_center.options.feature')}</MenuItem>
            <MenuItem value="other">{t('help_center.options.other')}</MenuItem>
          </TextField>
          
          {/* TOPIC INPUT */}
          <TextField 
            fullWidth 
            label={t('help_center.modal.topic_label')} 
            placeholder="Brief subject" 
            sx={inputSx} 
          />
          
          {/* URGENCY SELECT */}
          <TextField 
            select 
            fullWidth 
            label={t('help_center.modal.urgency_label')} 
            defaultValue="Medium" 
            sx={inputSx}
            SelectProps={{ MenuProps: menuProps }}
          >
            <MenuItem value="High">{t('help_center.options.high')}</MenuItem>
            <MenuItem value="Medium">{t('help_center.options.medium')}</MenuItem>
            <MenuItem value="Low">{t('help_center.options.low')}</MenuItem>
          </TextField>

          {/* DESCRIPTION INPUT */}
          <TextField 
            fullWidth 
            multiline 
            rows={4} 
            label={t('help_center.modal.desc_label')} 
            placeholder="..." 
            sx={inputSx} 
          />
        </DialogContent>
        
        <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button onClick={handleCloseModal} sx={{ color: 'text.secondary' }}>{t('help_center.modal.btn_cancel')}</Button>
          <Button variant="contained" sx={{ bgcolor: '#4285F4' }}>{t('help_center.modal.btn_send')}</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default HelpSupport;