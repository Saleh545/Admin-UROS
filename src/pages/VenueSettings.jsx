import React, { useState, useRef } from 'react';
import { 
  Box, Card, CardContent, Typography, TextField, Button, Grid, 
  InputAdornment, Menu, MenuItem, useTheme, useMediaQuery, Paper 
} from '@mui/material';
import { 
  CloudUpload, KeyboardArrowDown, Store, Place, Map, Phone, Wifi, 
  Instagram, WhatsApp, Download, Percent, Save, Settings, MyLocation 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// MOCK BRANCHES
const BRANCHES = ['Grand Baku (Center)', 'Grand Baku (Mall)', 'Grand Baku (Sea Breeze)'];

const VenueSettings = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // --- STATES ---
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Logo Upload State
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  // QR Code URL (Sabit bir nümunə, realda backenddən gəlir)
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ur-os.az/r/grand-baku-center";

  // Form State
  const [formData, setFormData] = useState({
    displayName: 'Grand Baku (Center)',
    slug: 'grand-baku-center',
    address: 'Nizami St. 42, Baku',
    mapLink: 'https://goo.gl/maps/center',
    lat: '40.3700',
    lng: '49.8400',
    phone: '+994 50 111 11 11',
    wifi: 'center2026',
    currency: 'AZN',
    serviceFee: '10',
    insta: '@grand_baku_center',
    whatsapp: '994501111111'
  });

  // --- HANDLERS ---

  // Branch Menu
  const handleBranchClick = (event) => setAnchorEl(event.currentTarget);
  const handleBranchClose = (branch) => {
    if (branch) setSelectedBranch(branch);
    setAnchorEl(null);
  };

  // Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 1. UPLOAD LOGO FUNCTION
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. DOWNLOAD QR FUNCTION
  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR_${formData.slug}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('QR yüklənmədi:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 }, pb: { xs: 5, md: 5 } }}>
      
      {/* HEADER */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
        <Settings fontSize="medium" sx={{ color: '#fff' }} />
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#fff' }}>{t('venue.header_title')}</Typography>
      </Box>

      {/* BRANCH SELECTOR */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
          {t('venue.configure')}:
        </Typography>
        <Button 
          onClick={handleBranchClick}
          endIcon={<KeyboardArrowDown fontSize="small" />} 
          sx={{ color: '#4285F4', fontWeight: 'bold', textTransform: 'none', p: 0, fontSize: '0.95rem', '&:hover': { bgcolor: 'transparent' } }}
        >
          {selectedBranch}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleBranchClose(null)}
          PaperProps={{ sx: { bgcolor: '#2b2c40', color: '#fff', mt: 1, minWidth: 250, border: '1px solid rgba(255,255,255,0.1)' } }}
        >
          {BRANCHES.map((b) => (
            <MenuItem key={b} onClick={() => handleBranchClose(b)} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>{b}</MenuItem>
          ))}
        </Menu>
      </Box>

      {/* MAIN GRID */}
      <Grid container spacing={3}>
        
        {/* LEFT COLUMN */}
        <Grid item xs={12} lg={8} sx={{ minWidth: 0 }}>
          <Card sx={{ 
            boxShadow: 3, 
            borderRadius: '12px', 
            height: '100%', 
            // YENİ RƏNG STİLİ:
            bgcolor: 'rgba(255,255,255,0.02)', 
            color: '#fff', 
            border: '1px solid rgba(255,255,255,0.1)' 
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                {t('venue.identity_title')}
              </Typography>

              {/* LOGO UPLOAD SECTION */}
              <Box sx={{ display: 'flex', gap: 3, mb: 4, alignItems: 'flex-start' }}>
                <Box 
                  sx={{ 
                    width: 100, height: 100, 
                    bgcolor: '#32344a', borderRadius: 2, 
                    border: '1px solid rgba(255,255,255,0.1)',
                    backgroundImage: logoPreview ? `url(${logoPreview})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} 
                />
                <Box sx={{ pt: 1 }}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                  />
                  <Button 
                    variant="contained" 
                    startIcon={<CloudUpload />} 
                    onClick={handleUploadClick}
                    sx={{ bgcolor: '#4285F4', textTransform: 'none', fontWeight: 'bold', mb: 1 }}
                  >
                    {t('venue.btn_upload')}
                  </Button>
                  <Typography variant="caption" display="block" color="text.secondary">
                    {t('venue.upload_hint')}
                  </Typography>
                </Box>
              </Box>

              {/* INPUTS */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField 
                  fullWidth label={t('venue.label_name')} name="displayName" value={formData.displayName} onChange={handleChange}
                  InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Store sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }}
                  sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }}
                />
                <TextField 
                  fullWidth label={t('venue.label_slug')} name="slug" value={formData.slug} onChange={handleChange}
                  InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Typography color="text.secondary" sx={{ bgcolor: 'rgba(255,255,255,0.05)', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.85rem' }}>ur-os.az/r/</Typography></InputAdornment> }}
                  sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }}
                />
                <TextField 
                  fullWidth label={t('venue.label_address')} name="address" value={formData.address} onChange={handleChange}
                  InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Place sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }}
                  sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }}
                />
                <TextField 
                  fullWidth label={t('venue.label_map')} name="mapLink" value={formData.mapLink} onChange={handleChange}
                  helperText={t('venue.map_hint')}
                  InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Map sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }}
                  sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } }, '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.5)' } }}
                />
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Typography variant="body2" fontWeight="bold" color="text.secondary">{t('venue.bot_coords')}</Typography>
                    <Button size="small" startIcon={<MyLocation />} sx={{ textTransform: 'none', color: '#4285F4' }}>{t('venue.pick_map')}</Button>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField fullWidth label={t('venue.label_lat')} name="lat" value={formData.lat} onChange={handleChange} InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }} sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
                    <TextField fullWidth label={t('venue.label_lng')} name="lng" value={formData.lng} onChange={handleChange} InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }} sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField fullWidth label={t('venue.label_phone')} name="phone" value={formData.phone} onChange={handleChange} InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }} InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
                  <TextField fullWidth label={t('venue.label_wifi')} name="wifi" value={formData.wifi} onChange={handleChange} InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }} InputProps={{ startAdornment: <InputAdornment position="start"><Wifi sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item xs={12} lg={4} sx={{ minWidth: 350 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* QR CENTER */}
            <Card sx={{ 
                boxShadow: 3, 
                borderRadius: '12px', 
                bgcolor: 'rgba(255,255,255,0.02)', 
                color: '#fff', 
                border: '1px solid rgba(255,255,255,0.1)' 
            }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold">QR Center 📱</Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
                  {t('venue.qr_subtitle')} <strong style={{ color: '#fff' }}>{selectedBranch}</strong>
                </Typography>
                
                <Box sx={{ bgcolor: '#fff', p: 1.5, borderRadius: 2, display: 'inline-block', mb: 3 }}>
                  <img src={qrCodeUrl} alt="QR" style={{ width: 140, height: 140 }} />
                </Box>
                
                <Button 
                  fullWidth 
                  variant="contained" 
                  startIcon={<Download />} 
                  onClick={handleDownloadQR} 
                  sx={{ bgcolor: '#4285F4', fontWeight: 'bold', textTransform: 'none', mb: 2 }}
                >
                  {t('venue.btn_download')}
                </Button>
                
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', wordBreak: 'break-all' }}>
                  Link: <span style={{ color: '#4285F4', cursor: 'pointer' }}>https://ur-os.az/r/{formData.slug}</span>
                </Typography>
              </CardContent>
            </Card>

            {/* NETWORK RULES */}
            <Card sx={{ 
                boxShadow: 3, 
                borderRadius: '12px', 
                bgcolor: 'rgba(255,255,255,0.02)', 
                color: '#fff', 
                border: '1px solid rgba(255,255,255,0.1)' 
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>{t('venue.rules_title')}</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField fullWidth label={t('venue.label_currency')} name="currency" value={formData.currency} onChange={handleChange} InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }} sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
                  <TextField fullWidth label={t('venue.label_service')} name="serviceFee" value={formData.serviceFee} onChange={handleChange} InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }} InputProps={{ endAdornment: <InputAdornment position="end"><Percent fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
                </Box>
              </CardContent>
            </Card>

            {/* BOT CONTACTS */}
            <Card sx={{ 
                boxShadow: 3, 
                borderRadius: '12px', 
                bgcolor: 'rgba(255,255,255,0.02)', 
                color: '#fff', 
                border: '1px solid rgba(255,255,255,0.1)' 
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>{t('venue.bot_contacts')}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <TextField fullWidth label={t('venue.label_insta')} name="insta" value={formData.insta} onChange={handleChange} InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }} InputProps={{ startAdornment: <InputAdornment position="start"><Instagram sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
                  <TextField fullWidth label={t('venue.label_whatsapp')} name="whatsapp" value={formData.whatsapp} onChange={handleChange} InputLabelProps={{ shrink: true, style: { color: 'rgba(255,255,255,0.7)' } }} InputProps={{ startAdornment: <InputAdornment position="start"><WhatsApp sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
                </Box>
              </CardContent>
            </Card>

            {/* SAVE BUTTON */}
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, mt: 1 }}>
              <Button variant="contained" startIcon={<Save />} sx={{ bgcolor: '#4285F4', fontWeight: 'bold', textTransform: 'none', px: 4, py: 1.5, fontSize: '1rem', borderRadius: 2, width: { xs: '100%', md: 'auto' } }}>
                {t('venue.btn_save')}
              </Button>
            </Box>

          </Box>
        </Grid>
      </Grid>

    </Box>
  );
};

export default VenueSettings;