import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, TextField, 
  InputAdornment, IconButton, Avatar, useTheme, Chip, 
  Table, TableBody, TableCell, TableHead, TableRow, 
  useMediaQuery, CircularProgress, LinearProgress, Link 
} from '@mui/material';
import { 
  Visibility, VisibilityOff, Refresh, Storage, Bolt, 
  AccountTree, ErrorOutline, WhatsApp, Telegram, Instagram,
  CheckCircle, PauseCircle, Error as ErrorIcon, OpenInNew
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const N8nAutomation = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  // Mobil ekranı təyin edirik
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // States
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('sk_live_51M3p...'); 
  const [isPinging, setIsPinging] = useState(false);
  const [restartingBots, setRestartingBots] = useState({});

  // Mock Data for Bots
  const bots = [
    { id: 1, name: 'WhatsApp Business', status: 'online', ping: 24, icon: <WhatsApp />, color: '#25D366' },
    { id: 2, name: 'Instagram Direct', status: 'online', ping: 120, icon: <Instagram />, color: '#E1306C' },
    { id: 3, name: 'Telegram Bot', status: 'maintenance', ping: null, icon: <Telegram />, color: '#0088cc' },
  ];

  // YENİLƏNMİŞ MOCK DATA (ŞƏKİLDƏKİ KİMİ)
  const workflows = [
    { id: 1, name: 'Menu Sync (QR Scan)', lastRun: '1 min ago', tenant: 'Grand Baku', type: 'CORE', status: 'active', health: 100, runs: 1240 },
    { id: 2, name: 'Table Reservation Flow', lastRun: '5 sec ago', tenant: 'Dolma Kitchen', type: 'BOOKING', status: 'active', health: 98, runs: 8500 },
    { id: 3, name: 'IG Story Mention Reply', lastRun: '2 days ago', tenant: 'Caspian Grill', type: 'MARKETING', status: 'paused', health: 0, runs: 45 },
    { id: 4, name: 'EOD Revenue Report', lastRun: '10 min ago', tenant: 'Global (All)', type: 'FINANCE', status: 'error', health: 85, runs: 120 },
    { id: 5, name: 'Waiter Call Alert', lastRun: 'Just now', tenant: 'Grand Baku', type: 'OPS', status: 'active', health: 99, runs: 450 },
  ];

  // --- HELPER FUNCTIONS ---
  const handleTestConnection = () => {
    setIsPinging(true);
    setTimeout(() => setIsPinging(false), 2000);
  };

  const handleRestartBot = (botId) => {
    setRestartingBots(prev => ({ ...prev, [botId]: true }));
    setTimeout(() => setRestartingBots(prev => ({ ...prev, [botId]: false })), 2000);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <CheckCircle sx={{ color: '#72E128' }} />;
      case 'paused': return <PauseCircle sx={{ color: '#FDB528' }} />;
      case 'error': return <ErrorIcon sx={{ color: '#FF4C51' }} />;
      default: return <CheckCircle />;
    }
  };

  const getHealthColor = (val) => {
    if (val >= 90) return '#72E128'; // Green
    if (val >= 50) return '#FDB528'; // Orange
    return '#FF4C51'; // Red
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 } }}>
      
      {/* 1. TOP STATS CARDS */}
      <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, 
          gap: 2, 
          width: '100%', 
          mb: 3,
          boxSizing: 'border-box'
      }}>
        {[
          { title: t('automation.stats.uptime'), val: "99.9%", sub: "Last 30 days", icon: <Storage />, color: theme.palette.success.main, bg: 'rgba(114, 225, 40, 0.12)' },
          { title: t('automation.stats.executions'), val: "142.5k", sub: "+12% this week", icon: <Bolt />, color: '#4285F4', bg: 'rgba(66, 133, 244, 0.12)' },
          { title: t('automation.stats.workflows'), val: "24", sub: "Global Scenarios", icon: <AccountTree />, color: '#00BCD4', bg: 'rgba(0, 188, 212, 0.12)' },
          { title: t('automation.stats.errors'), val: "3", sub: "Tunnel issues", icon: <ErrorOutline />, color: theme.palette.error.main, bg: 'rgba(255, 76, 81, 0.12)' },
        ].map((stat, i) => (
            <Card key={i} sx={{ height: '100%', boxShadow: 3, borderRadius: '12px', width: '100%' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>{stat.val}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.75rem' }}>{stat.title}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem' }}>{stat.sub}</Typography>
                    </Box>
                    <Avatar variant="rounded" sx={{ bgcolor: stat.bg, color: stat.color, width: 40, height: 40, borderRadius: '8px', ml: 1 }}>{stat.icon}</Avatar>
                </Box>
              </CardContent>
            </Card>
        ))}
      </Box>

      {/* 2. SERVER & CHANNELS */}
      <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
          gap: 3, 
          width: '100%', 
          mb: 3,
          boxSizing: 'border-box'
      }}>
        {/* Server Config */}
        <Card sx={{ height: '100%', width: '100%', boxShadow: 3, borderRadius: '12px' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>{t('automation.server.title')}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{t('automation.server.desc')}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField fullWidth size="small" label={t('automation.server.url_label')} defaultValue="https://automation.uros.app/" InputProps={{ startAdornment: <InputAdornment position="start"><Storage fontSize="small"/></InputAdornment> }} />
              <TextField fullWidth size="small" label={t('automation.server.api_label')} type={showApiKey ? 'text' : 'password'} value={apiKey} onChange={(e) => setApiKey(e.target.value)} InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowApiKey(!showApiKey)} edge="end" size="small">{showApiKey ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}</IconButton></InputAdornment>) }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Chip icon={isPinging ? <CircularProgress size={10} thickness={6} sx={{ color: '#FDB528 !important' }} /> : <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#72E128', boxShadow: '0 0 8px #72E128' }} />} label={isPinging ? "PINGING..." : t('automation.server.status_online')} size="small" sx={{ bgcolor: isPinging ? 'rgba(253, 181, 40, 0.12)' : 'rgba(114, 225, 40, 0.1)', color: isPinging ? '#FDB528' : '#72E128', fontWeight: 'bold', border: `1px solid ${isPinging ? 'rgba(253, 181, 40, 0.2)' : 'rgba(114, 225, 40, 0.2)'}` }} />
                <Button variant="contained" size="small" onClick={handleTestConnection} disabled={isPinging} sx={{ bgcolor: '#4285F4', textTransform: 'none', fontWeight: 'bold', minWidth: '140px' }}>{isPinging ? <CircularProgress size={20} color="inherit" /> : t('automation.server.btn_test')}</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Communication Channels */}
        <Card sx={{ height: '100%', width: '100%', boxShadow: 3, borderRadius: '12px' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">{t('automation.channels.title')}</Typography>
              <IconButton size="small"><Refresh /></IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {bots.map((bot) => {
                const isBotRestarting = restartingBots[bot.id];
                return (
                  <Box key={bot.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar variant="rounded" sx={{ bgcolor: bot.color, color: '#fff', width: 36, height: 36, borderRadius: '8px' }}>{bot.icon}</Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">{bot.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: bot.status === 'online' ? '#72E128' : '#FDB528' }} />
                          <Typography variant="caption" color="text.secondary">
                            {bot.status === 'online' ? t('automation.channels.status_online') : t('automation.channels.status_maintenance')}
                            {bot.ping && ` • Ping: ${bot.ping}ms`}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Button variant="outlined" size="small" onClick={() => handleRestartBot(bot.id)} disabled={isBotRestarting} endIcon={!isBotRestarting && <Refresh fontSize="small"/>} startIcon={isBotRestarting && <CircularProgress size={12} color="inherit" />} sx={{ textTransform: 'none', color: isBotRestarting ? '#FDB528' : 'text.secondary', borderColor: isBotRestarting ? '#FDB528' : 'divider', minWidth: isBotRestarting ? '110px' : 'auto', px: 1 }}>
                      {isBotRestarting ? "Restarting..." : (isMobile ? '' : t('automation.channels.btn_restart'))}
                    </Button>
                  </Box>
                )
              })}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* 4. ACTIVE SCENARIOS LIST (YENİLƏNİB - RESPONSIV) */}
      <Card sx={{ boxShadow: 3, width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          
          <Box sx={{ p: 2.5, pb: 2 }}>
             <Typography variant="h6" fontWeight="bold">{t('automation.scenarios.title')}</Typography>
          </Box>

          {isMobile ? (
             // --- MOBİL (CARD VIEW) ---
             <Box sx={{ p: 2, pt: 0 }}>
               {workflows.map((row) => (
                 <Card key={row.id} sx={{ mb: 2, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                   <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      {/* Header: Name + Status Icon */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'flex-start' }}>
                         <Box>
                            <Typography variant="subtitle2" fontWeight="bold">{row.name}</Typography>
                            <Typography variant="caption" color="text.secondary">Last run: {row.lastRun}</Typography>
                         </Box>
                         {getStatusIcon(row.status)}
                      </Box>

                      {/* Info Chips */}
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip label={row.tenant} size="small" variant="outlined" sx={{ color: '#4285F4', borderColor: 'rgba(66, 133, 244, 0.3)', fontWeight: 'bold', fontSize: '0.65rem', height: 22 }} />
                        <Chip label={row.type} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 'bold', borderRadius: '4px', height: 22, fontSize: '0.65rem' }} />
                      </Box>

                      {/* Health Bar */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                         <Typography variant="caption" color="text.secondary" sx={{ minWidth: 40 }}>Health:</Typography>
                         <LinearProgress variant="determinate" value={row.health} sx={{ width: '100%', height: 4, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: getHealthColor(row.health) } }} />
                         <Typography variant="caption" fontWeight="bold" sx={{ color: getHealthColor(row.health), minWidth: 30, textAlign: 'right' }}>{row.health}%</Typography>
                      </Box>

                      {/* Runs */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', pt: 1, mt: 1 }}>
                         <Typography variant="caption" color="text.secondary">Total Runs</Typography>
                         <Typography variant="body2" fontWeight="bold">{row.runs}</Typography>
                      </Box>
                   </CardContent>
                 </Card>
               ))}
             </Box>
          ) : (
            // --- PC (TABLE VIEW) ---
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <Box sx={{ minWidth: 800 }}> 
                <Table>
                  <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                    <TableRow sx={{ '& th': { borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary' } }}>
                      <TableCell>{t('automation.scenarios.cols.name')}</TableCell>
                      <TableCell>{t('automation.scenarios.cols.tenant')}</TableCell>
                      <TableCell>{t('automation.scenarios.cols.type')}</TableCell>
                      <TableCell align="center">{t('automation.scenarios.cols.status')}</TableCell>
                      <TableCell>{t('automation.scenarios.cols.health')}</TableCell>
                      <TableCell align="right">{t('automation.scenarios.cols.runs')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workflows.map((row) => (
                      <TableRow key={row.id} hover sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)', py: 1.5 } }}>
                        {/* Name Column */}
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">{row.name}</Typography>
                            <Typography variant="caption" color="text.disabled">Last run: {row.lastRun}</Typography>
                          </Box>
                        </TableCell>
                        
                        {/* Tenant Column */}
                        <TableCell>
                          <Chip 
                            label={row.tenant} 
                            size="small" 
                            variant="outlined"
                            sx={{ 
                              color: '#4285F4', borderColor: 'rgba(66, 133, 244, 0.3)', 
                              fontWeight: 'bold', fontSize: '0.75rem', borderRadius: '12px', height: 24 
                            }} 
                          />
                        </TableCell>
                        
                        {/* Type Column */}
                        <TableCell>
                          <Chip 
                            label={row.type} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', 
                              fontWeight: 'bold', borderRadius: '4px', height: 20, fontSize: '0.65rem' 
                            }} 
                          />
                        </TableCell>
                        
                        {/* Status Column (Icon) */}
                        <TableCell align="center">
                          {getStatusIcon(row.status)}
                        </TableCell>
                        
                        {/* Health Column (Progress Bar) */}
                        <TableCell sx={{ minWidth: 150 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={row.health} 
                              sx={{ 
                                width: '100%', height: 4, borderRadius: 2, 
                                bgcolor: 'rgba(255,255,255,0.1)',
                                '& .MuiLinearProgress-bar': { bgcolor: getHealthColor(row.health) }
                              }} 
                            />
                            <Typography variant="caption" fontWeight="bold" sx={{ color: getHealthColor(row.health) }}>
                              {row.health}%
                            </Typography>
                          </Box>
                        </TableCell>
                        
                        {/* Runs Column */}
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{row.runs}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          )}

          {/* Footer Link */}
          <Box sx={{ p: 2, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Button 
              endIcon={<OpenInNew />} 
              sx={{ textTransform: 'none', color: '#4285F4' }}
              href="https://automation.uros.app" target="_blank"
            >
              Open N8n Canvas
            </Button>
          </Box>

        </CardContent>
      </Card>

    </Box>
  );
};

export default N8nAutomation;