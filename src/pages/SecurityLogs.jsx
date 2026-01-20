import React, { useState, useMemo } from 'react';
import { 
  Box, Card, CardContent, Typography, TextField, InputAdornment, 
  Chip, MenuItem, Select, FormControl, useTheme, useMediaQuery, Button, Menu 
} from '@mui/material';
import { 
  Search, DeleteOutline, CheckCircleOutline, WarningAmber, 
  Storage, KeyboardArrowDown, FilterList 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// FILIALLAR
const BRANCHES = ['Grand Baku (Center)', 'Grand Baku (Mall)', 'Grand Baku (Sea Breeze)'];
const FILTER_OPTIONS = ['All Branches', ...BRANCHES];

const SecurityLogs = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // States
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); 
  const [selectedBranch, setSelectedBranch] = useState('All Branches'); 
  const [anchorEl, setAnchorEl] = useState(null); 

  // --- MOCK DATA (Komponentin içində - Tərcümə üçün) ---
  // useMemo istifadə edirik ki, dil dəyişəndə avtomatik yenilənsin
  const logs = useMemo(() => [
    { 
      id: 1, type: 'danger', icon: <DeleteOutline />, 
      title: t('security.logs.deleted_receipt'), 
      branch: 'Center', user: 'Elvin Manager', time: `${t('security.logs.today')}, 12:45 PM`, 
      badge: '-145 ₼', badgeColor: 'error' 
    },
    { 
      id: 2, type: 'success', icon: <CheckCircleOutline />, 
      title: t('security.logs.closed_table'), 
      branch: 'Center', user: 'Samir Waiter', time: `${t('security.logs.today')}, 12:30 PM`, 
      badge: t('security.logs.badge_cash'), badgeColor: 'success' 
    },
    { 
      id: 3, type: 'warning', icon: <WarningAmber />, 
      title: t('security.logs.changed_service'), 
      branch: 'Mall', user: 'Rasim Admin', time: `${t('security.logs.today')}, 10:00 AM`, 
      badge: '10% → 15%', badgeColor: 'warning' 
    },
    { 
      id: 4, type: 'danger', icon: <DeleteOutline />, 
      title: t('security.logs.voided_item'), 
      branch: 'Center', user: 'Samir Waiter', time: `${t('security.logs.yesterday')}, 09:15 PM`, 
      badge: '-4 ₼', badgeColor: 'error' 
    },
    { 
      id: 5, type: 'info', icon: <Storage />, 
      title: t('security.logs.backup_created'), 
      branch: null, user: 'System Bot', time: `${t('security.logs.yesterday')}, 04:00 AM`, 
      badge: t('security.logs.badge_auto'), badgeColor: 'info' 
    },
    { 
      id: 6, type: 'warning', icon: <WarningAmber />, 
      title: t('security.logs.edited_reservation'), 
      branch: 'Mall', user: 'Aysel Hostess', time: `${t('security.logs.yesterday')}, 02:15 PM`, 
      badge: t('security.logs.badge_guest'), badgeColor: 'warning' 
    },
  ], [t]); // Dil dəyişəndə yenidən hesabla

  // Handlers
  const handleBranchClick = (event) => setAnchorEl(event.currentTarget);
  const handleBranchClose = (option) => {
    if (option) setSelectedBranch(option);
    setAnchorEl(null);
  };

  // Styles Helper
  const getStyles = (type) => {
    switch (type) {
      case 'danger': return { bg: 'rgba(255, 76, 81, 0.12)', color: '#FF4C51' };
      case 'success': return { bg: 'rgba(114, 225, 40, 0.12)', color: '#72E128' };
      case 'warning': return { bg: 'rgba(253, 181, 40, 0.12)', color: '#FDB528' };
      case 'info': return { bg: 'rgba(38, 198, 249, 0.12)', color: '#26C6F9' };
      default: return { bg: 'rgba(255,255,255,0.1)', color: '#fff' };
    }
  };

  // FILTER LOGIC
  const filteredLogs = logs.filter(log => {
    // 1. Text Search
    const matchesSearch = log.title.toLowerCase().includes(search.toLowerCase()) || 
                          log.user.toLowerCase().includes(search.toLowerCase());
    
    // 2. Risk Type Filter
    let matchesType = true;
    if (filter === 'High Risk') {
      matchesType = log.type === 'danger' || log.type === 'warning';
    } else if (filter === 'Normal') {
      matchesType = log.type === 'success' || log.type === 'info';
    }

    // 3. Branch Filter
    let matchesBranch = true;
    if (selectedBranch !== 'All Branches') {
      const branchShort = selectedBranch.match(/\(([^)]+)\)/)[1];
      matchesBranch = log.branch === branchShort;
    }

    return matchesSearch && matchesType && matchesBranch;
  });

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 } }}>
      
      {/* HEADER */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {t('security.title')} 🛡️
          </Typography>
          
          {/* BRANCH DROPDOWN */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary">{t('security.source')}:</Typography>
            <Button 
              onClick={handleBranchClick}
              endIcon={<KeyboardArrowDown fontSize="small" />} 
              sx={{ 
                color: '#4285F4', 
                textTransform: 'none', 
                fontWeight: 'bold', 
                p: 0, ml: 1, minWidth: 0,
                '&:hover': { bgcolor: 'transparent' } 
              }}
            >
              {selectedBranch === 'All Branches' ? t('security.all_branches') : selectedBranch}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleBranchClose(null)}
              PaperProps={{ sx: { bgcolor: '#2b2c40', color: '#fff', mt: 1, minWidth: 200 } }}
            >
              <MenuItem onClick={() => handleBranchClose('All Branches')}>
                {t('security.all_branches')}
              </MenuItem>
              {BRANCHES.map((option) => (
                <MenuItem key={option} onClick={() => handleBranchClose(option)}>{option}</MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <TextField 
            fullWidth={isMobile}
            size="small" 
            placeholder={t('security.search_placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" sx={{ color: 'text.secondary' }} /></InputAdornment> }}
            sx={{ minWidth: { md: 300 }, '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.05)' } }}
          />
          
          {/* RISK FILTER DROPDOWN */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              displayEmpty
              startAdornment={<FilterList fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />}
              sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' } }}
            >
              <MenuItem value="All">{t('security.filters.all')}</MenuItem>
              <MenuItem value="High Risk">{t('security.filters.high_risk')}</MenuItem>
              <MenuItem value="Normal">{t('security.filters.normal')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* LOGS LIST */}
      <Card sx={{ boxShadow: 3, borderRadius: '12px', bgcolor: '#2b2c40' }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          {filteredLogs.map((log, index) => {
            const style = getStyles(log.type);
            
            return (
              <Box 
                key={log.id} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 2, 
                  borderBottom: index !== filteredLogs.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 0 }
                }}
              >
                {/* ICON & MAIN INFO */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', minWidth: 0 }}>
                  
                  <Box sx={{ 
                    width: 44, height: 44, borderRadius: '8px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: style.bg, color: style.color, flexShrink: 0
                  }}>
                    {log.icon}
                  </Box>

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold" noWrap>
                      {log.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                      {log.branch && (
                        <Chip 
                          label={`📍 ${log.branch}`} 
                          size="small" 
                          sx={{ height: 20, fontSize: '0.65rem', bgcolor: 'rgba(255,255,255,0.1)', color: 'text.secondary', fontWeight: 'bold' }} 
                        />
                      )}
                      <Typography variant="caption" color="#4285F4" fontWeight="bold">
                        {log.user}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        • {log.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* RIGHT BADGE */}
                <Box sx={{ width: { xs: '100%', sm: 'auto' }, display: 'flex', justifyContent: 'flex-end' }}>
                  <Chip 
                    label={log.badge} 
                    size="small" 
                    sx={{ 
                      fontWeight: 'bold', 
                      borderRadius: '6px', 
                      height: 24,
                      ...getStyles(log.badgeColor)
                    }} 
                  />
                </Box>

              </Box>
            );
          })}
          {filteredLogs.length === 0 && (
            <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
              No logs found for this filter.
            </Box>
          )}
        </CardContent>
      </Card>

    </Box>
  );
};

export default SecurityLogs;