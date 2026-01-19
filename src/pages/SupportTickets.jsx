import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, IconButton, 
  Table, TableBody, TableCell, TableHead, TableRow, 
  Chip, useTheme, useMediaQuery, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText 
} from '@mui/material';
import { 
  WhatsApp, MoreVert, Podcasts, DeleteOutline 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // YÖNLƏNDİRMƏ ÜÇÜN

// Başlanğıc Məlumatları
const INITIAL_TICKETS = [
  { 
    id: '#101', 
    restaurant: 'Grand Baku', 
    problem: 'Receipt printer not working', 
    priority: 'High', 
    status: 'Open' 
  },
  { 
    id: '#102', 
    restaurant: 'Pub Chef', 
    problem: 'How to change logo?', 
    priority: 'Low', 
    status: 'Closed' 
  },
  { 
    id: '#103', 
    restaurant: 'Dolma Kitchen', 
    problem: 'Payment error', 
    priority: 'High', 
    status: 'In Progress' 
  },
];

const SupportTickets = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate(); // Hook-u çağırırıq
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // --- STATES ---
  const [tickets, setTickets] = useState(INITIAL_TICKETS); 
  const [anchorEl, setAnchorEl] = useState(null); 
  const [selectedTicketId, setSelectedTicketId] = useState(null); 

  // --- HANDLERS ---
  
  const handleOpenMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicketId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTicketId(null);
  };

  const handleDelete = () => {
    if (selectedTicketId) {
      setTickets((prev) => prev.filter((ticket) => ticket.id !== selectedTicketId));
    }
    handleCloseMenu();
  };

  // --- STYLES ---
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High': return { bgcolor: 'rgba(255, 76, 81, 0.12)', color: '#FF4C51' };
      case 'Low': return { bgcolor: 'rgba(114, 225, 40, 0.12)', color: '#72E128' };
      default: return { bgcolor: 'rgba(58, 53, 65, 0.12)', color: '#8592A3' };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Open': return { bgcolor: 'rgba(255, 76, 81, 0.12)', color: '#FF4C51' };
      case 'Closed': return { bgcolor: 'rgba(114, 225, 40, 0.12)', color: '#72E128' };
      case 'In Progress': return { bgcolor: 'rgba(253, 181, 40, 0.12)', color: '#FDB528' };
      default: return { bgcolor: 'rgba(58, 53, 65, 0.12)', color: '#8592A3' };
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 } }}>
      
      {/* HEADER */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t('support.title')} 🎫
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('support.subtitle')}
          </Typography>
        </Box>
        
        {/* YÖNLƏNDİRMƏ DÜYMƏSİ */}
        <Button 
          variant="contained" 
          startIcon={<Podcasts />} 
          onClick={() => navigate('/push')} // Kliklədikdə /push səhifəsinə gedir
          sx={{ 
            bgcolor: 'rgba(66, 133, 244, 0.16)', 
            color: '#4285F4', 
            fontWeight: 'bold', 
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { bgcolor: 'rgba(66, 133, 244, 0.24)' }
          }}
        >
          {t('support.btn_push')}
        </Button>
      </Box>

      {/* CONTENT */}
      <Card sx={{ boxShadow: 3, borderRadius: '12px', width: '100%', overflow: 'hidden' }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          
          {isMobile ? (
            // --- MOBİL GÖRÜNÜŞ (KARTLAR) ---
            <Box sx={{ p: 2 }}>
              {tickets.map((row) => (
                <Card key={row.id} sx={{ mb: 2, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">{row.id}</Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#25D366', p: 0.5 }}>
                          <WhatsApp fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: 'text.secondary', p: 0.5 }} onClick={(e) => handleOpenMenu(e, row.id)}>
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography variant="h6" fontSize="1rem" fontWeight="bold" sx={{ mb: 0.5 }}>
                      {row.restaurant}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {row.problem}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', pt: 2 }}>
                      <Chip 
                        label={t(`support.priority.${row.priority.toLowerCase()}`)} 
                        size="small" 
                        sx={{ ...getPriorityStyle(row.priority), fontWeight: 'bold', borderRadius: '6px', height: 24, fontSize: '0.75rem' }} 
                      />
                      <Chip 
                        label={t(`support.status.${row.status.toLowerCase().replace(' ', '_')}`)} 
                        size="small" 
                        sx={{ ...getStatusStyle(row.status), fontWeight: 'bold', borderRadius: '6px', height: 24, fontSize: '0.75rem' }} 
                      />
                    </Box>

                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            // --- DESKTOP GÖRÜNÜŞ (CƏDVƏL) ---
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <Box sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                    <TableRow sx={{ '& th': { borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary' } }}>
                      <TableCell>{t('support.table.id')}</TableCell>
                      <TableCell>{t('support.table.restaurant')}</TableCell>
                      <TableCell>{t('support.table.problem')}</TableCell>
                      <TableCell align="center">{t('support.table.priority')}</TableCell>
                      <TableCell align="center">{t('support.table.status')}</TableCell>
                      <TableCell align="right">{t('support.table.actions')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tickets.map((row) => (
                      <TableRow key={row.id} hover sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)', py: 1.5 } }}>
                        <TableCell sx={{ color: '#4285F4', fontWeight: 'bold' }}>{row.id}</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>{row.restaurant}</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>{row.problem}</TableCell>
                        
                        <TableCell align="center">
                          <Chip 
                            label={t(`support.priority.${row.priority.toLowerCase()}`)} 
                            size="small" 
                            sx={{ ...getPriorityStyle(row.priority), fontWeight: 'bold', borderRadius: '6px' }} 
                          />
                        </TableCell>
                        
                        <TableCell align="center">
                          <Chip 
                            label={t(`support.status.${row.status.toLowerCase().replace(' ', '_')}`)} 
                            size="small" 
                            sx={{ ...getStatusStyle(row.status), fontWeight: 'bold', borderRadius: '6px' }} 
                          />
                        </TableCell>
                        
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                            <Tooltip title="WhatsApp">
                              <IconButton size="small" sx={{ color: '#25D366' }}>
                                <WhatsApp fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={(e) => handleOpenMenu(e, row.id)}>
                              <MoreVert fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* --- MENU (POPUP) --- */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            bgcolor: '#2b2c40', 
            color: '#fff',
            minWidth: 150,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            borderRadius: 2
          }
        }}
      >
        <MenuItem onClick={handleDelete} sx={{ color: '#FF4C51' }}> 
          <ListItemIcon>
            <DeleteOutline fontSize="small" sx={{ color: '#FF4C51' }} />
          </ListItemIcon>
          <ListItemText>{t('support.menu.delete')}</ListItemText>
        </MenuItem>
      </Menu>

    </Box>
  );
};

export default SupportTickets;