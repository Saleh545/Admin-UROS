import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, TextField, InputAdornment, 
  Table, TableBody, TableCell, TableHead, TableRow, Chip, 
  useTheme, useMediaQuery, IconButton, Avatar, Select, MenuItem, 
  FormControl, InputLabel, Dialog, DialogTitle, DialogContent, 
  DialogActions, Button 
} from '@mui/material';
import { 
  Search, Visibility, ErrorOutline, WarningAmber, CheckCircle, 
  Security, Description, ReportProblem, SupervisorAccount, Close, Block 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// MOCK DATA
const INITIAL_LOGS = [
  { 
    id: 1054, event: 'DELETE_RESTAURANT', module: 'Restaurants', tenant: 'Platform (Global)', 
    user: 'Super Admin', role: 'Super Admin', source: '192.168.1.45 (AZ)', status: 'success', time: 'Just now',
    payload: '{\n  "reason": "Manual deletion",\n  "target_id": 2,\n  "admin_note": "Request via email"\n}' 
  },
  { 
    id: 1053, event: 'FAILED_LOGIN', module: 'Auth', tenant: 'Dolma Kitchen', 
    user: 'unknown', role: 'Guest', source: '45.12.33.11 (RU)', status: 'error', time: '5 min ago',
    payload: '{\n  "attempt": 3,\n  "browser": "Chrome/120",\n  "error": "Invalid Password"\n}' 
  },
  { 
    id: 1052, event: 'UPDATE_SUBSCRIPTION', module: 'Billing', tenant: 'Grand Baku', 
    user: 'Ilham Owner', role: 'Owner', source: '85.132.44.12 (AZ)', status: 'warning', time: '1 hour ago',
    payload: '{\n  "plan_from": "Starter",\n  "plan_to": "Pro",\n  "payment_method": "Card"\n}' 
  },
  { 
    id: 1051, event: 'WEBHOOK_FAILURE', module: 'n8n', tenant: 'Caspian Grill', 
    user: 'System Bot', role: 'Bot', source: '127.0.0.1 (Server)', status: 'error', time: '2 hours ago',
    payload: '{\n  "webhook_id": "wh_123",\n  "error_code": 500,\n  "response": "Internal Server Error"\n}' 
  },
  { 
    id: 1050, event: 'SYSTEM_BACKUP', module: 'System', tenant: 'Platform (Global)', 
    user: 'Auto Backup', role: 'System', source: '127.0.0.1 (Server)', status: 'success', time: 'Yesterday',
    payload: '{\n  "size": "2.4GB",\n  "location": "s3-bucket-eu-central-1",\n  "duration": "120s"\n}' 
  },
];

const GlobalLogs = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // States
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal States
  const [openModal, setOpenModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  // Handlers
  const handleOpenLog = (log) => {
    setSelectedLog(log);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLog(null);
  };

  // Helper Functions
  const getStatusIcon = (status) => {
    switch(status) {
      case 'success': return <CheckCircle sx={{ color: '#72E128', fontSize: 20 }} />;
      case 'error': return <ErrorOutline sx={{ color: '#FF4C51', fontSize: 20 }} />;
      case 'warning': return <WarningAmber sx={{ color: '#FDB528', fontSize: 20 }} />;
      default: return <CheckCircle sx={{ fontSize: 20 }} />;
    }
  };

  const getEventIconColor = (status) => {
    switch(status) {
      case 'success': return { bg: 'rgba(114, 225, 40, 0.12)', color: '#72E128' };
      case 'error': return { bg: 'rgba(255, 76, 81, 0.12)', color: '#FF4C51' };
      case 'warning': return { bg: 'rgba(253, 181, 40, 0.12)', color: '#FDB528' };
      default: return { bg: 'rgba(58, 53, 65, 0.12)', color: '#8592A3' };
    }
  };

  const filteredLogs = INITIAL_LOGS.filter(log => {
    const matchesSearch = log.event.toLowerCase().includes(search.toLowerCase()) || 
                          log.tenant.toLowerCase().includes(search.toLowerCase()) || 
                          log.user.toLowerCase().includes(search.toLowerCase());
    const matchesModule = moduleFilter === 'All' || log.module === moduleFilter;
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter.toLowerCase();
    return matchesSearch && matchesModule && matchesStatus;
  });

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 } }}>
      
      {/* 1. TOP STATS */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        {[
          { title: t('logs.stats.total'), val: "1,240", icon: <Description />, color: '#4285F4', bg: 'rgba(66, 133, 244, 0.12)' },
          { title: t('logs.stats.errors'), val: "3", icon: <ReportProblem />, color: '#FF4C51', bg: 'rgba(255, 76, 81, 0.12)' },
          { title: t('logs.stats.security'), val: "12", icon: <Security />, color: '#FDB528', bg: 'rgba(253, 181, 40, 0.12)' },
          { title: t('logs.stats.admins'), val: "2", icon: <SupervisorAccount />, color: '#72E128', bg: 'rgba(114, 225, 40, 0.12)' },
        ].map((stat, i) => (
          <Card key={i} sx={{ height: '100%', boxShadow: 3, borderRadius: '12px' }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h5" fontWeight="700">{stat.val}</Typography>
                <Typography variant="caption" color="text.secondary">{stat.title}</Typography>
              </Box>
              <Avatar variant="rounded" sx={{ bgcolor: stat.bg, color: stat.color }}>{stat.icon}</Avatar>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 2. MAIN CARD */}
      <Card sx={{ boxShadow: 3, borderRadius: '12px', width: '100%', overflow: 'hidden' }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          
          <Box sx={{ p: 2.5, pb: 1 }}>
            <Typography variant="h6" fontWeight="bold">{t('logs.title')}</Typography>
          </Box>

          <Box sx={{ p: 2.5, pt: 0, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <TextField 
              fullWidth size="small" placeholder={t('logs.search_placeholder')} 
              value={search} onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
              sx={{ flexGrow: 1 }}
            />
            <Box sx={{ display: 'flex', gap: 2, minWidth: { md: 300 } }}>
              <FormControl fullWidth size="small">
                <InputLabel>{t('logs.filter_module')}</InputLabel>
                <Select value={moduleFilter} label={t('logs.filter_module')} onChange={(e) => setModuleFilter(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Restaurants">Restaurants</MenuItem>
                  <MenuItem value="Auth">Auth</MenuItem>
                  <MenuItem value="Billing">Billing</MenuItem>
                  <MenuItem value="System">System</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>{t('logs.filter_status')}</InputLabel>
                <Select value={statusFilter} label={t('logs.filter_status')} onChange={(e) => setStatusFilter(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Success">Success</MenuItem>
                  <MenuItem value="Warning">Warning</MenuItem>
                  <MenuItem value="Error">Error</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {isMobile ? (
            <Box sx={{ p: 2, pt: 0 }}>
              {filteredLogs.map((row) => {
                const iconStyle = getEventIconColor(row.status);
                return (
                  <Card key={row.id} sx={{ mb: 2, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
                        <Avatar variant="rounded" sx={{ bgcolor: iconStyle.bg, color: iconStyle.color, width: 32, height: 32 }}>
                          <Description fontSize="small" />
                        </Avatar>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="subtitle2" fontWeight="bold" noWrap>{row.event}</Typography>
                          <Typography variant="caption" color="text.secondary">{row.module}</Typography>
                        </Box>
                        <Box sx={{ ml: 'auto' }}>{getStatusIcon(row.status)}</Box>
                      </Box>
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1.5 }}>
                        <Box><Typography variant="caption" color="text.secondary" display="block">{t('logs.cols.tenant')}</Typography><Chip label={row.tenant} size="small" variant="outlined" sx={{ borderColor: '#4285F4', color: '#4285F4', height: 20, fontSize: '0.65rem' }} /></Box>
                        <Box><Typography variant="caption" color="text.secondary" display="block">{t('logs.cols.user')}</Typography><Typography variant="body2" fontSize="0.8rem">{row.user}</Typography></Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <Typography variant="caption" color="text.disabled">{row.source}</Typography>
                        <IconButton size="small" onClick={() => handleOpenLog(row)} sx={{ color: '#26C6F9' }}><Visibility fontSize="small" /></IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                )
              })}
            </Box>
          ) : (
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <Box sx={{ minWidth: 1000 }}>
                <Table>
                  <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                    <TableRow sx={{ '& th': { borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 700, color: 'text.secondary' } }}>
                      <TableCell>{t('logs.cols.event')}</TableCell>
                      <TableCell>{t('logs.cols.tenant')}</TableCell>
                      <TableCell>{t('logs.cols.user')}</TableCell>
                      <TableCell>{t('logs.cols.source')}</TableCell>
                      <TableCell align="center">{t('logs.cols.status')}</TableCell>
                      <TableCell align="right">{t('logs.cols.time')}</TableCell>
                      <TableCell align="right">{t('logs.cols.action')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredLogs.map((row) => {
                      const iconStyle = getEventIconColor(row.status);
                      return (
                        <TableRow key={row.id} hover sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)', py: 1.5 } }}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar variant="rounded" sx={{ bgcolor: iconStyle.bg, color: iconStyle.color, width: 34, height: 34 }}><Description fontSize="small" /></Avatar>
                              <Box sx={{ minWidth: 0 }}><Typography variant="body2" fontWeight="bold">{row.event}</Typography><Typography variant="caption" color="text.secondary">{row.module}</Typography></Box>
                            </Box>
                          </TableCell>
                          <TableCell><Chip label={row.tenant} size="small" variant="outlined" sx={{ borderColor: 'rgba(66, 133, 244, 0.5)', color: '#4285F4', fontWeight: 'bold', fontSize: '0.75rem', height: 24, borderRadius: '12px' }} /></TableCell>
                          <TableCell><Box sx={{ minWidth: 0 }}><Typography variant="body2" fontWeight="bold">{row.user}</Typography><Typography variant="caption" color="text.secondary">{row.role}</Typography></Box></TableCell>
                          <TableCell sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{row.source}</TableCell>
                          <TableCell align="center">{getStatusIcon(row.status)}</TableCell>
                          <TableCell align="right" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{row.time}</TableCell>
                          <TableCell align="right">
                            <IconButton size="small" onClick={() => handleOpenLog(row)} sx={{ color: '#26C6F9', bgcolor: 'rgba(38, 198, 249, 0.1)' }}><Visibility fontSize="small" /></IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* --- LOG DETAILS MODAL (UPDATED PADDING) --- */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal} 
        fullWidth 
        maxWidth="sm" 
        PaperProps={{ 
          sx: { bgcolor: '#2b2c40', color: '#fff', backgroundImage: 'none', borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ px: 3, py: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {t('logs.modal.title')} #{selectedLog?.id}
          <IconButton onClick={handleCloseModal} sx={{ color: 'text.secondary' }}><Close /></IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {selectedLog && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              
              {/* Info Rows */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 1.5, alignItems: 'center' ,pt:2}}>
                <Typography color="text.secondary" variant="body2" fontWeight="bold">{t('logs.modal.tenant')}:</Typography>
                <Typography variant="body2">{selectedLog.tenant}</Typography>

                <Typography color="text.secondary" variant="body2" fontWeight="bold">{t('logs.modal.user')}:</Typography>
                <Typography variant="body2">{selectedLog.user} <Typography component="span" color="text.secondary">({selectedLog.role})</Typography></Typography>

                <Typography color="text.secondary" variant="body2" fontWeight="bold">{t('logs.modal.ip')}:</Typography>
                <Typography variant="body2">{selectedLog.source}</Typography>

                <Typography color="text.secondary" variant="body2" fontWeight="bold">{t('logs.modal.module')}:</Typography>
                <Chip label={selectedLog.module} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', height: 24, width: 'fit-content' }} />
              </Box>

              {/* Payload Block */}
              <Box>
                <Typography variant="body2" fontWeight="bold" sx={{ mb: 1.5, color: 'text.secondary' }}>{t('logs.modal.payload')}:</Typography>
                <Box sx={{ bgcolor: 'rgba(0,0,0,0.3)', p: 2.5, borderRadius: 2, fontFamily: 'monospace', fontSize: '0.85rem', color: '#a6e22e', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <pre style={{ margin: 0 }}>{selectedLog.payload}</pre>
                </Box>
              </Box>

            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(255,255,255,0.1)', justifyContent: 'space-between' }}>
          <Button startIcon={<Block />} color="error" sx={{ textTransform: 'none' }}>
            {t('logs.modal.ban_ip')}
          </Button>
          <Button variant="contained" onClick={handleCloseModal} sx={{ bgcolor: '#4285F4', textTransform: 'none', fontWeight: 'bold' }}>
            {t('logs.modal.close')}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default GlobalLogs;