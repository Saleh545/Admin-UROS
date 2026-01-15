import React, { useState, useEffect } from 'react';
import { 
  Drawer, Box, Typography, IconButton, TextField, 
  MenuItem, Button, InputAdornment, Stack, Divider, Tooltip
} from '@mui/material';
import { 
  Close, Business, Link, AttachMoney, Add, Delete, 
  Person, Email, WhatsApp, Lock, Visibility, VisibilityOff, 
  AutoFixHigh, ContentCopy, LocalOffer 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; 

const EditRestaurantDrawer = ({ open, onClose, data, onSave }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation(); 

  // FORM STATES
  const [brandName, setBrandName] = useState('');
  const [slug, setSlug] = useState('');
  const [currency, setCurrency] = useState('AZN');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branches, setBranches] = useState([]);

  // Data dəyişəndə formu yeniləyirik
  useEffect(() => {
    if (data) {
      // EDIT MODE
      setBrandName(data.name || '');
      setSlug(data.link ? data.link.replace('/m/', '') : '');
      setCurrency(data.currency || 'AZN');
      setOwnerName(data.owner || '');
      setOwnerEmail('owner@example.com');
      setPhone('+994 50 000 00 00');
      setBranches(data.branchesList || [
         { name: `${data.name} (Center)`, address: 'Demo Address' } 
      ]);
    } else {
      // CREATE MODE
      setBrandName('');
      setSlug('');
      setCurrency('AZN');
      setOwnerName('');
      setOwnerEmail('');
      setPhone('');
      setBranches([]);
    }
  }, [data, open]);

  const handleAddBranch = () => {
    setBranches([...branches, { name: '', address: '' }]);
  };

  const handleRemoveBranch = (index) => {
    setBranches(branches.filter((_, i) => i !== index));
  };

  const handleBranchChange = (index, field, value) => {
    const newBranches = [...branches];
    newBranches[index][field] = value;
    setBranches(newBranches);
  };

  const handleSaveClick = () => {
    const newData = {
      name: brandName,
      owner: ownerName,
      slug: slug,
      currency: currency,
      branches: branches.length,
      branchesList: branches
    };
    if(onSave) onSave(newData);
  };

  // --- DİNAMİK MƏTNLƏR (Burada düzəliş edildi) ---
  const isEditMode = Boolean(data);
  const title = isEditMode ? t('drawer.title_edit') : t('drawer.title_new'); // Tərcümə ilə
  const subtitle = t('drawer.subtitle');
  const saveButtonText = isEditMode ? t('drawer.btn_save') : t('drawer.btn_create'); // Tərcümə ilə

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 480 }, bgcolor: '#232333', color: '#fff', backgroundImage: 'none' }
      }}
    >
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>{title}</Typography>
          <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}><Close /></IconButton>
      </Box>

      <Box sx={{ p: 3, overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        {/* BRAND IDENTITY */}
        <Box>
          <Typography variant="caption" sx={{ color: '#4285F4', fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Business fontSize="small" /> {t('drawer.section_identity')}
          </Typography>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField 
              label={t('drawer.label_brand_name')} 
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              fullWidth size="small"
              placeholder="e.g. Pub Chef Network"
              InputProps={{ startAdornment: <InputAdornment position="start"><Business fontSize="small" sx={{ color: 'text.secondary' }} /></InputAdornment> }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
                 <TextField 
                    label={t('drawer.label_slug')} 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    fullWidth size="small"
                    InputProps={{ startAdornment: <InputAdornment position="start"><Link fontSize="small" sx={{ color: 'text.secondary' }} /></InputAdornment> }}
                 />
            </Box>
            <TextField
              select label={t('drawer.label_currency')} 
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              fullWidth size="small"
              InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoney fontSize="small" sx={{ color: 'text.secondary' }} /></InputAdornment> }}
            >
              <MenuItem value="AZN">AZN</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </TextField>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* PHYSICAL LOCATIONS */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="caption" sx={{ color: '#72E128', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Business fontSize="small" /> {t('drawer.section_locations')}
            </Typography>
            <Button startIcon={<Add />} size="small" onClick={handleAddBranch} sx={{ textTransform: 'none', color: '#4285F4' }}>
                {t('drawer.btn_add_branch')}
            </Button>
          </Box>

          <Stack spacing={2}>
            {branches.map((branch, index) => (
                <Box key={index} sx={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2, p: 2, position: 'relative', '&:hover': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover .delete-btn': { opacity: 1, visibility: 'visible' } }}>
                    <Tooltip title={t('drawer.tooltip_remove')}>
                        <IconButton size="small" className="delete-btn" color="error" onClick={() => handleRemoveBranch(index)} sx={{ position: 'absolute', top: 8, right: 8, opacity: 0, visibility: 'hidden', bgcolor: 'rgba(255, 69, 58, 0.1)' }}><Delete fontSize="small" /></IconButton>
                    </Tooltip>
                    <Stack spacing={2} sx={{ mt: 1 }}> 
                        <TextField label={t('drawer.label_branch_name')} value={branch.name} onChange={(e) => handleBranchChange(index, 'name', e.target.value)} size="small" fullWidth variant="standard" placeholder={t('drawer.placeholder_branch')} InputLabelProps={{ shrink: true }} />
                        <TextField label={t('drawer.label_address')} value={branch.address} onChange={(e) => handleBranchChange(index, 'address', e.target.value)} size="small" fullWidth variant="standard" placeholder={t('drawer.placeholder_address')} InputLabelProps={{ shrink: true }} />
                    </Stack>
                </Box>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* OWNER PROFILE */}
        <Box>
           <Typography variant="caption" sx={{ color: '#26C6F9', fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
             <Person fontSize="small" /> {t('drawer.section_owner')}
           </Typography>
           <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField label={t('drawer.label_owner_name')} value={ownerName} onChange={(e) => setOwnerName(e.target.value)} fullWidth size="small" InputProps={{ startAdornment: <InputAdornment position="start"><Person fontSize="small" sx={{ color: 'text.secondary' }} /></InputAdornment> }} />
                <TextField label={t('drawer.label_email')} value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} fullWidth size="small" InputProps={{ startAdornment: <InputAdornment position="start"><Email fontSize="small" sx={{ color: 'text.secondary' }} /></InputAdornment> }} />
                <TextField label={t('drawer.label_phone')} value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth size="small" InputProps={{ startAdornment: <InputAdornment position="start"><WhatsApp fontSize="small" sx={{ color: 'text.secondary' }} /></InputAdornment> }} />
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField label={t('drawer.label_password')} type={showPassword ? 'text' : 'password'} defaultValue="123456" fullWidth size="small" InputProps={{ startAdornment: <InputAdornment position="start"><Lock fontSize="small" sx={{ color: 'text.secondary' }} /></InputAdornment>, endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }} />
                    <IconButton color="primary"><AutoFixHigh /></IconButton>
                    <IconButton color="default"><ContentCopy /></IconButton>
                </Box>
           </Stack>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* PLAN */}
        <Box>
            <Typography variant="caption" sx={{ color: '#FDB528', fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalOffer fontSize="small" /> {t('drawer.section_plan')}
            </Typography>
            <TextField select label={t('drawer.label_tariff')} defaultValue="basic" fullWidth size="small" sx={{ mt: 1 }} InputProps={{ startAdornment: <InputAdornment position="start"><LocalOffer fontSize="small" sx={{ color: 'text.secondary' }} /></InputAdornment> }}>
                <MenuItem value="basic">BASIC (150 ₼)</MenuItem>
                <MenuItem value="pro">PRO (300 ₼)</MenuItem>
                <MenuItem value="enterprise">ENTERPRISE (Custom)</MenuItem>
            </TextField>
        </Box>
      </Box>

      {/* FOOTER */}
      <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" fullWidth onClick={handleSaveClick} sx={{ bgcolor: '#4285F4', fontWeight: 600, py: 1.2 }}>{saveButtonText}</Button>
        <Button variant="outlined" fullWidth onClick={onClose} sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'text.secondary', fontWeight: 600, py: 1.2 }}>{t('drawer.btn_cancel')}</Button>
      </Box>
    </Drawer>
  );
};

export default EditRestaurantDrawer;