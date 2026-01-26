import React, { useState, useRef } from 'react';
import { 
  Box, Typography, Button, IconButton, Menu, MenuItem, 
  Switch, FormControlLabel, useTheme, useMediaQuery, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Paper, Divider
} from '@mui/material';
import { 
  MapOutlined, ExpandMore, Add, CloudUpload, Image as ImageIcon, Delete,
  GridView, CropFree, Weekend
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- MOCK DATA ---
const ZONES = [
  { id: 1, name: 'Main Hall' },
  { id: 2, name: 'Terrace' },
  { id: 3, name: 'VIP Room' }
];

const AVAILABLE_ITEMS = [
  { id: 't2', label: 'T-2', capacity: '2p', icon: <GridView fontSize="small" /> },
  { id: 't3', label: 'T-3', capacity: '6p', icon: <GridView fontSize="small" /> },
  { id: 'vip1', label: 'VIP-1', capacity: '8p', icon: <GridView fontSize="small" /> },
  { id: 'bar1', label: 'Bar-1', capacity: '1p', icon: <GridView fontSize="small" /> },
  { id: 'm1', label: 'M-1', capacity: '4p', icon: <GridView fontSize="small" /> },
];

const OBJECTS = [
  { id: 'wall', label: 'Wall / Divider', icon: <CropFree fontSize="small" /> },
  { id: 'decor', label: 'Decor / Object', icon: <Weekend fontSize="small" /> },
];

const VisualFloorPlan = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
  const fileInputRef = useRef(null);

  // --- STATE ---
  const [activeZone, setActiveZone] = useState(ZONES[0]);
  const [selectedBranch, setSelectedBranch] = useState('Grand Baku (Center)');
  const [anchorEl, setAnchorEl] = useState(null);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [mapImage, setMapImage] = useState(null);
  
  const [openAddFloorModal, setOpenAddFloorModal] = useState(false);
  const [newFloorName, setNewFloorName] = useState('');

  // --- COLORS ---
  const TEXT_MAIN = isDark ? '#fff' : 'text.primary';
  const TEXT_MUTED = isDark ? 'rgba(255, 255, 255, 0.6)' : 'text.secondary';
  const BLUE = '#4285F4'; 
  const CANVAS_BG = isDark ? '#231f36' : '#f0f2f5'; 
  const CARD_BG = isDark ? '#312d4b' : '#fff';
  const BORDER_COLOR = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const INPUT_BG = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const MODAL_BG = isDark ? '#312D4B' : '#FFFFFF';

  // --- HANDLERS ---
  const handleBranchClick = (e) => setAnchorEl(e.currentTarget);
  const handleBranchClose = (val) => {
    if (val) setSelectedBranch(val);
    setAnchorEl(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMapImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (isEditMode) fileInputRef.current.click();
  };

  const handleAddFloor = () => {
    if (newFloorName) {
      setNewFloorName('');
      setOpenAddFloorModal(false);
    }
  };

  // --- GRID & STYLES ---
  
  const gridContainerSx = {
    display: 'grid',
    width: '100%',
    // FIX: Mobil versiyada hündürlük "auto" olsun ki, scroll etsin. Desktopda "fix" qalsın.
    height: isMobile ? 'auto' : 'calc(100vh - 110px)',
    gap: 2,
    p: { xs: 2, md: 3 },
    boxSizing: 'border-box',
    // FIX: Mobil versiyada səhifə scroll olsun, Desktopda gizli qalsın
    overflowY: isMobile ? 'auto' : 'hidden', 
    
    // Grid Columns
    gridTemplateColumns: isMobile || !isEditMode 
      ? '1fr' 
      : '1fr 280px',
      
    // Grid Rows
    gridTemplateRows: isMobile 
      ? 'auto auto auto' // Header, Canvas, Sidebar (alt-alta)
      : 'auto 1fr',     // Header, Content
      
    gridTemplateAreas: isMobile
      ? `"header"
         "canvas"
         "sidebar"`
      : isEditMode 
        ? `"header header"
           "canvas sidebar"`
        : `"header header"
           "canvas canvas"`,
  };

  const sidebarItemSx = {
    border: `1px solid ${BORDER_COLOR}`,
    borderRadius: '8px',
    mb: 1.5,
    bgcolor: 'rgba(255,255,255,0.02)',
    cursor: 'grab',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    p: 1.5,
    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: BLUE },
    transition: 'all 0.2s'
  };

  return (
    <Box sx={gridContainerSx}>
      
      {/* --- AREA: HEADER --- */}
      <Box sx={{ gridArea: 'header', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        
        {/* Title */}
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.5rem', color: TEXT_MAIN }}>
            {t('floor_plan.title')} <MapOutlined sx={{ color: '#26C6F9' }} />
          </Typography>
        </Box>

        {/* Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button onClick={handleBranchClick} endIcon={<ExpandMore />} sx={{ color: TEXT_MAIN, borderColor: BORDER_COLOR, textTransform: 'none', px: 2, py: 0.8, border: `1px solid ${BORDER_COLOR}`, borderRadius: '8px', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
            {selectedBranch}
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleBranchClose(null)} PaperProps={{ sx: { bgcolor: CARD_BG, backgroundImage: 'none', color: TEXT_MAIN } }}>
            <MenuItem onClick={() => handleBranchClose('Grand Baku (Center)')}>Grand Baku (Center)</MenuItem>
            <MenuItem onClick={() => handleBranchClose('Grand Baku (Mall)')}>Grand Baku (Mall)</MenuItem>
          </Menu>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {ZONES.map(zone => (
              <Button key={zone.id} onClick={() => setActiveZone(zone)} sx={{ textTransform: 'none', color: activeZone.id === zone.id ? '#fff' : TEXT_MUTED, bgcolor: activeZone.id === zone.id ? BLUE : 'transparent', border: `1px solid ${activeZone.id === zone.id ? BLUE : BORDER_COLOR}`, borderRadius: '8px', px: 2, '&:hover': { bgcolor: activeZone.id === zone.id ? '#3367d6' : 'rgba(255,255,255,0.05)' } }}>
                {zone.name}
              </Button>
            ))}
            <IconButton onClick={() => setOpenAddFloorModal(true)} sx={{ border: `1px solid ${BORDER_COLOR}`, borderRadius: '8px', color: BLUE, '&:hover': { bgcolor: 'rgba(66, 133, 244, 0.1)' } }}>
              <Add fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ borderLeft: `1px solid ${BORDER_COLOR}`, pl: 2, ml: 1 }}>
             <FormControlLabel control={<Switch checked={isEditMode} onChange={(e) => setIsEditMode(e.target.checked)} />} label={<Typography sx={{ color: TEXT_MAIN, fontWeight: 500 }}>{t('floor_plan.edit')}</Typography>} sx={{ mr: 0 }} />
          </Box>
        </Box>
      </Box>

      {/* --- AREA: CANVAS (MAP) --- */}
      <Box sx={{ 
        gridArea: 'canvas',
        bgcolor: CANVAS_BG, 
        borderRadius: '12px', 
        border: `1px solid ${BORDER_COLOR}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        // FIX: Mobildə konkret hündürlük veririk ki, görünməz olmasın
        height: isMobile ? '400px' : '100%', 
        minHeight: isMobile ? '400px' : 'auto' 
      }}>
        <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
        {mapImage ? (
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <img src={mapImage} alt="Floor Plan" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            {isEditMode && (
              <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => setMapImage(null)} sx={{ position: 'absolute', bottom: 20, right: 20 }}>
                {t('floor_plan.remove_map')}
              </Button>
            )}
          </Box>
        ) : (
          <Box onClick={triggerFileInput} sx={{ textAlign: 'center', color: TEXT_MUTED, cursor: isEditMode ? 'pointer' : 'default', opacity: isEditMode ? 1 : 0.7, transition: 'opacity 0.2s', '&:hover': isEditMode ? { opacity: 0.9 } : {} }}>
            <Box sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              {isEditMode ? <CloudUpload sx={{ fontSize: 40, color: BLUE }} /> : <ImageIcon sx={{ fontSize: 40 }} />}
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: TEXT_MAIN }}>{isEditMode ? t('floor_plan.upload_title') : t('floor_plan.no_map')}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{isEditMode ? t('floor_plan.upload_desc') : t('floor_plan.switch_desc')}</Typography>
          </Box>
        )}
      </Box>

      {/* --- AREA: SIDEBAR (EDIT ITEMS) --- */}
      {isEditMode && (
        <Paper sx={{ 
          gridArea: 'sidebar',
          bgcolor: CARD_BG, 
          backgroundImage: 'none',
          borderRadius: '12px',
          border: `1px solid ${BORDER_COLOR}`,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          // FIX: Mobildə panel görünməsi üçün hündürlük veririk. Desktopda 100%
          height: isMobile ? '400px' : '100%',
          mb: isMobile ? 3 : 0 // Mobildə aşağıdan boşluq
        }}>
          <Box sx={{ p: 2, borderBottom: `1px solid ${BORDER_COLOR}` }}>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: TEXT_MUTED, textTransform: 'uppercase', letterSpacing: 1 }}>
              {t('floor_plan.add_items')}
            </Typography>
          </Box>
          
          <Box sx={{ 
            p: 2, 
            overflowY: 'auto', 
            flexGrow: 1,
            // HIDE SCROLLBAR
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { display: 'none' }
          }}>
            {/* TABLES */}
            <Typography variant="caption" sx={{ color: TEXT_MUTED, mb: 1, display: 'block' }}>{t('floor_plan.available_tables')}</Typography>
            {AVAILABLE_ITEMS.map((item) => (
              <Box key={item.id} sx={sidebarItemSx}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ color: TEXT_MUTED }}>{item.icon}</Box>
                  <Typography variant="body2" fontWeight="bold" sx={{ color: TEXT_MAIN }}>{item.label}</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{item.capacity}</Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2, borderColor: BORDER_COLOR }} />

            {/* OBJECTS */}
            <Typography variant="caption" sx={{ color: TEXT_MUTED, mb: 1, display: 'block' }}>{t('floor_plan.objects')}</Typography>
            {OBJECTS.map((obj) => (
              <Box key={obj.id} sx={sidebarItemSx}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ color: TEXT_MUTED }}>{obj.icon}</Box>
                  <Typography variant="body2" sx={{ color: TEXT_MAIN }}>{t(`floor_plan.${obj.id}`)}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {/* --- ADD FLOOR MODAL --- */}
      <Dialog open={openAddFloorModal} onClose={() => setOpenAddFloorModal(false)} PaperProps={{ sx: { bgcolor: MODAL_BG, backgroundImage: 'none', color: TEXT_MAIN, minWidth: 320, borderRadius: '12px' } }}>
        <DialogTitle sx={{ color: TEXT_MAIN, fontWeight: 'bold' }}>{t('floor_plan.add_floor')}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ color: TEXT_MUTED, mb: 0.5, display: 'block' }}>{t('floor_plan.floor_name')}</Typography>
            <TextField 
              fullWidth 
              value={newFloorName} 
              onChange={(e) => setNewFloorName(e.target.value)} 
              placeholder="e.g. 2nd Floor"
              sx={{ 
                mt: 1,
                '& .MuiOutlinedInput-root': { bgcolor: INPUT_BG, borderRadius: '8px', color: TEXT_MAIN, '& fieldset': { borderColor: BORDER_COLOR }, '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' }, '&.Mui-focused fieldset': { borderColor: BLUE } },
                '& .MuiInputLabel-root': { color: TEXT_MUTED }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenAddFloorModal(false)} sx={{ color: TEXT_MUTED, textTransform: 'none' }}>{t('settings.cancel')}</Button>
          <Button onClick={handleAddFloor} sx={{ color: BLUE, fontWeight: 'bold', textTransform: 'none' }}>{t('floor_plan.create')}</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default VisualFloorPlan;