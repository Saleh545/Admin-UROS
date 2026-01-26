import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Tabs, Tab, IconButton, Menu, MenuItem, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Select, FormControl, InputLabel, useTheme, useMediaQuery
} from '@mui/material';
import { 
  Add, ExpandMore, Map, CropSquare, Circle, CropLandscape, 
  Close, Delete, People, QrCode 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- MOCK DATA ---
const INITIAL_ZONES = [
  { id: 1, name: 'Main Hall' },
  { id: 2, name: 'Terrace' },
  { id: 3, name: 'VIP Room' }
];

const INITIAL_TABLES = [
  { id: 1, zoneId: 1, number: 'T-1', seats: 4, shape: 'square', status: 'occupied' },
  { id: 2, zoneId: 1, number: 'T-2', seats: 2, shape: 'circle', status: 'available' },
  { id: 3, zoneId: 1, number: 'T-3', seats: 6, shape: 'rectangle', status: 'reserved' },
  { id: 4, zoneId: 1, number: 'T-4', seats: 4, shape: 'square', status: 'available' },
  { id: 5, zoneId: 1, number: 'T-5', seats: 8, shape: 'rectangle', status: 'available' }
];

const TableLayout = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // --- STATE ---
  const [zones, setZones] = useState(() => {
    const saved = localStorage.getItem('tableZones');
    return saved ? JSON.parse(saved) : INITIAL_ZONES;
  });
  
  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem('tableLayout');
    return saved ? JSON.parse(saved) : INITIAL_TABLES;
  });

  const [activeZoneId, setActiveZoneId] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('Grand Baku (Center)');

  // Modals
  const [openZoneModal, setOpenZoneModal] = useState(false);
  const [openTableModal, setOpenTableModal] = useState(false);
  
  const [newZoneName, setNewZoneName] = useState('');
  const [newTable, setNewTable] = useState({ number: '', seats: '', shape: 'square' });

  // --- EFFECTS ---
  useEffect(() => {
    localStorage.setItem('tableZones', JSON.stringify(zones));
    localStorage.setItem('tableLayout', JSON.stringify(tables));
  }, [zones, tables]);

  // --- COLORS ---
  const MODAL_BG = isDark ? '#312D4B' : '#FFFFFF'; 
  const TEXT_MAIN = isDark ? '#fff' : '#3a3541'; 
  const TEXT_MUTED = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(58, 53, 65, 0.6)';
  
  const BLUE = '#4285F4'; 
  const GREEN = '#72E128'; 
  const RED = '#FF4C51';
  const ORANGE = '#FDB528'; 
  const CANVAS_BG = isDark ? '#231f36' : '#f4f5fa'; 
  const INPUT_BG = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

  // --- HANDLERS ---
  const handleBranchClick = (e) => setAnchorEl(e.currentTarget);
  const handleBranchClose = (val) => {
    if (val) setSelectedBranch(val);
    setAnchorEl(null);
  };

  const handleZoneChange = (event, newValue) => setActiveZoneId(newValue);

  const handleTableClick = (id) => {
    setTables(tables.map(t => {
      if (t.id !== id) return t;
      let nextStatus = 'available';
      if (t.status === 'available') nextStatus = 'occupied';
      else if (t.status === 'occupied') nextStatus = 'reserved';
      else if (t.status === 'reserved') nextStatus = 'available';
      return { ...t, status: nextStatus };
    }));
  };

  const handleAddZone = () => {
    if (!newZoneName.trim()) return;
    const newId = zones.length > 0 ? Math.max(...zones.map(z => z.id)) + 1 : 1;
    setZones([...zones, { id: newId, name: newZoneName }]);
    setActiveZoneId(newId);
    setNewZoneName('');
    setOpenZoneModal(false);
  };

  const handleAddTable = () => {
    if (!newTable.number || !newTable.seats) return;
    const table = {
      id: Date.now(),
      zoneId: activeZoneId,
      number: newTable.number,
      seats: parseInt(newTable.seats),
      shape: newTable.shape,
      status: 'available'
    };
    setTables([...tables, table]);
    setNewTable({ number: '', seats: '', shape: 'square' });
    setOpenTableModal(false);
  };

  const handleDeleteTable = (id) => {
    if (window.confirm(t('tables.confirm_delete'))) {
      setTables(tables.filter(t => t.id !== id));
    }
  };

  const activeTables = tables.filter(t => t.zoneId === activeZoneId);

  // --- STYLES ---
  const modalPaperProps = {
    sx: { 
      bgcolor: MODAL_BG, 
      backgroundImage: 'none', 
      color: TEXT_MAIN, 
      minWidth: 300, 
      width: '90%',
      borderRadius: '16px',
      boxShadow: 24 
    } 
  };

  const modalInputSx = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      bgcolor: INPUT_BG, borderRadius: '8px', color: TEXT_MAIN,
      '& fieldset': { borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.23)' },
      '&:hover fieldset': { borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.87)' },
      '&.Mui-focused fieldset': { borderColor: BLUE }
    },
    '& .MuiInputLabel-root': { color: TEXT_MUTED },
    '& .MuiInputLabel-root.Mui-focused': { color: BLUE },
    '& .MuiSelect-icon': { color: TEXT_MAIN }
  };

  const getTableStyle = (shape, status) => {
    let color = GREEN;
    let border = `2px solid ${GREEN}`;

    if (status === 'occupied') {
      color = RED;
      border = `2px solid ${RED}`;
    } else if (status === 'reserved') {
      color = ORANGE;
      border = `2px solid ${ORANGE}`;
    }
    
    let borderRadius = '16px';
    let aspectRatio = '1/1';

    if (shape === 'circle') {
      borderRadius = '50%';
    } else if (shape === 'rectangle') {
      borderRadius = '12px';
      aspectRatio = '1.6/1';
    }

    return {
      width: '100%',
      maxWidth: '140px',
      aspectRatio: aspectRatio,
      borderRadius: borderRadius,
      border: border,
      bgcolor: isDark ? 'rgba(35, 31, 54, 0.4)' : '#fff', 
      color: color,
      
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 0,
      
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 10px rgba(0,0,0,0.1)`,
      // margin: '0 auto' // Grid justifyItems həll edir
    };
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 2, md: 3 } }}>
      
      {/* HEADER */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 3, gap: 2 }}>
        <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.5rem', color: TEXT_MAIN }}>
            {t('tables.title')} <Map sx={{ color: '#26C6F9' }} />
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Typography variant="body2" sx={{ color: TEXT_MUTED, mr: 1 }}>{t('menu.managing')}:</Typography>
            <Button onClick={handleBranchClick} endIcon={<ExpandMore />} sx={{ color: BLUE, fontWeight: 'bold', textTransform: 'none', p: 0, minWidth: 0 }}>{selectedBranch}</Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleBranchClose(null)} PaperProps={{ sx: { bgcolor: MODAL_BG, backgroundImage: 'none', color: TEXT_MAIN } }}>
              <MenuItem onClick={() => handleBranchClose('Grand Baku (Center)')}>Grand Baku (Center)</MenuItem>
              <MenuItem onClick={() => handleBranchClose('Grand Baku (Mall)')}>Grand Baku (Mall)</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <Button fullWidth={isMobile} variant="outlined" startIcon={<Add />} onClick={() => setOpenZoneModal(true)} sx={{ color: TEXT_MUTED, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)', textTransform: 'none', whiteSpace: 'nowrap' }}>
            {t('tables.new_zone')}
          </Button>
          <Button fullWidth={isMobile} variant="contained" startIcon={<Add />} onClick={() => setOpenTableModal(true)} sx={{ bgcolor: BLUE, color: '#fff', textTransform: 'none', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            {t('tables.add_table')}
          </Button>
        </Box>
      </Box>

      {/* TABS */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 0 }}>
        <Tabs value={activeZoneId} onChange={handleZoneChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile
          sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, color: TEXT_MUTED, fontSize: '1rem' }, '& .Mui-selected': { color: `${BLUE} !important` }, '& .MuiTabs-indicator': { bgcolor: BLUE } }}
        >
          {zones.map(zone => (
            <Tab key={zone.id} label={zone.name} value={zone.id} />
          ))}
        </Tabs>
      </Box>

      {/* GRID CANVAS */}
      <Box sx={{ 
        width: '100%', 
        minHeight: '600px', 
        bgcolor: CANVAS_BG, 
        borderRadius: '0 0 12px 12px', 
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)'}`,
        
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
        gap: 3, 
        p: 4,
        alignContent: 'start', 
        
        // --- HƏLL BURADADIR ---
        alignItems: 'center', // Bütün sətirdəki masaları şaquli mərkəzləyir (biri yuxarı, biri aşağı qalmır)
        justifyItems: 'center', // Hüceyrə daxilində üfüqi mərkəzləyir
        // ----------------------

        overflowY: 'auto' 
      }}>
        {activeTables.length > 0 ? activeTables.map((table) => (
          <Box 
            key={table.id}
            onClick={() => handleTableClick(table.id)}
            sx={{
              ...getTableStyle(table.shape, table.status),
              '&:hover': {
                bgcolor: isDark ? '#28243d' : '#fff',
                border: `2px solid ${BLUE}`,
                zIndex: 2,
                transform: 'scale(1.05)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
              },
              '&:hover .default-content': { opacity: 0, display: 'none' }, 
              '&:hover .hover-content': { opacity: 1, display: 'flex' },
            }}
          >
            {/* 1. DEFAULT VIEW */}
            <Box 
              className="default-content" 
              sx={{ 
                height: '100%', 
                width: '100%',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 0.5 
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ lineHeight: 1 }}>
                {table.number}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                <People sx={{ fontSize: 18, opacity: 0.8, color: 'inherit' }} /> 
                <Typography variant="body2" fontWeight="bold" sx={{ lineHeight: 1 }}>
                  {table.seats}
                </Typography>
              </Box>
            </Box>

            {/* 2. HOVER VIEW */}
            <Box className="hover-content" sx={{ 
              display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: '100%', height: '100%', animation: 'fadeIn 0.2s ease-in-out'
            }}>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: 'rgba(66, 133, 244, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QrCode sx={{ fontSize: 20, color: `${BLUE} !important` }} />
                </Box>
                <Box 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    handleDeleteTable(table.id); 
                  }}
                  sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: 'rgba(255, 76, 81, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255, 76, 81, 0.3)' } }}
                >
                  <Delete sx={{ fontSize: 20, color: `${RED} !important` }} />
                </Box>
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: isDark ? '#fff' : TEXT_MAIN }}>
                {t(`tables.status_${table.status}`)}
              </Typography>
            </Box>
          </Box>
        )) : (
          <Box sx={{ gridColumn: '1 / -1', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_MUTED, flexDirection: 'column', minHeight: '300px' }}>
            <Map sx={{ fontSize: 60, opacity: 0.2, mb: 2 }} />
            <Typography>{t('tables.no_tables')}</Typography>
          </Box>
        )}
      </Box>

      {/* --- ADD ZONE MODAL --- */}
      <Dialog open={openZoneModal} onClose={() => setOpenZoneModal(false)} PaperProps={modalPaperProps}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>{t('tables.new_zone')}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label={t('tables.zone_name')} fullWidth value={newZoneName} onChange={(e) => setNewZoneName(e.target.value)} sx={modalInputSx} />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={() => setOpenZoneModal(false)} sx={{ color: TEXT_MUTED }}>{t('settings.cancel')}</Button>
          <Button onClick={handleAddZone} variant="contained" sx={{ bgcolor: BLUE }}>{t('menu.create_item')}</Button>
        </DialogActions>
      </Dialog>

      {/* --- ADD TABLE MODAL --- */}
      <Dialog open={openTableModal} onClose={() => setOpenTableModal(false)} PaperProps={modalPaperProps}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>{t('tables.add_table')}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label={t('tables.table_number')} fullWidth value={newTable.number} onChange={(e) => setNewTable({ ...newTable, number: e.target.value })} sx={modalInputSx} />
          <TextField margin="dense" label={t('tables.seats')} type="number" fullWidth value={newTable.seats} onChange={(e) => setNewTable({ ...newTable, seats: e.target.value })} sx={modalInputSx} />
          <FormControl fullWidth sx={modalInputSx}>
            <InputLabel>{t('tables.shape')}</InputLabel>
            <Select value={newTable.shape} label={t('tables.shape')} onChange={(e) => setNewTable({ ...newTable, shape: e.target.value })}>
              <MenuItem value="square"><CropSquare sx={{ mr: 1, fontSize: 18 }} /> {t('tables.shape_square')}</MenuItem>
              <MenuItem value="circle"><Circle sx={{ mr: 1, fontSize: 18 }} /> {t('tables.shape_circle')}</MenuItem>
              <MenuItem value="rectangle"><CropLandscape sx={{ mr: 1, fontSize: 18 }} /> {t('tables.shape_rectangle')}</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={() => setOpenTableModal(false)} sx={{ color: TEXT_MUTED }}>{t('settings.cancel')}</Button>
          <Button onClick={handleAddTable} variant="contained" sx={{ bgcolor: BLUE }}>{t('menu.create_item')}</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default TableLayout;