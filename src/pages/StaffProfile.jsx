import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Avatar, TextField, IconButton, Switch, 
  InputAdornment, useTheme 
} from '@mui/material';
import { 
  ArrowBack, CameraAlt, AccessTime, ShoppingBag, 
  Person, CheckCircleOutline, Phone, Logout, 
  Schedule 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const StaffProfile = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  // --- STATE ---
  const [formData, setFormData] = useState({
    firstName: 'Leyla',
    lastName: 'Aliyeva',
    phone: '+994 50 123 45 67'
  });
  const [isWorking, setIsWorking] = useState(true);

  // --- COLORS ---
  const CARD_BG = '#312d4b'; 
  const BLUE = '#4285F4'; 
  const RED = '#FF4C51';
  const GREEN = '#72E128';
  const TEXT_GRAY = 'rgba(255, 255, 255, 0.7)';
  const INPUT_BG = 'rgba(255, 255, 255, 0.05)';

  // --- STYLES ---
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: INPUT_BG,
      borderRadius: '8px',
      color: '#fff',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
      '&.Mui-focused fieldset': { borderColor: BLUE },
    },
    '& .MuiInputLabel-root': { color: TEXT_GRAY },
    '& .MuiInputLabel-root.Mui-focused': { color: BLUE },
    mb: 2.5
  };

  const commonCardSx = {
    bgcolor: theme.palette.mode === 'dark' ? CARD_BG : 'background.paper',
    borderRadius: '16px',
    backgroundImage: 'none',
    boxShadow: 3,
    minWidth: 0,
    width: '100%'
  };

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: '100vw', 
      overflowX: 'hidden', 
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      // PADDING SİLİNDİ (Ana konteynerdən)
    }}>

      {/* --- HEADER BAR --- */}
      <Box sx={{ 
        width: '100%', 
        bgcolor: CARD_BG, 
        p: 2, 
        // Margin top/left/right silindi, tam yuxarı yapışması üçün:
        mt: 0,
        borderRadius: 0, // Künclər düz olsun (şəkilə uyğun tam width)
        mb: 3, // Aşağıdakı elementlərdən məsafə
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        boxShadow: 3
      }}>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ 
            color: TEXT_GRAY, 
            bgcolor: 'rgba(255,255,255,0.05)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
          }}
        >
          <ArrowBack />
        </IconButton>

        <Typography variant="h6" fontWeight="bold" sx={{ 
          color: '#fff',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap'
        }}>
          {t('staff_profile.title')}
        </Typography>
      </Box>

      {/* --- SCROLLABLE CONTENT AREA --- */}
      <Box sx={{ 
        width: '100%', 
        maxWidth: '800px', // Məzmunun eni limitlənir
        mx: 'auto',        // Mərkəzləşir
        px: { xs: 2, md: 3 }, // Məzmunun kənar boşluqları bura verildi
        pb: 4 
      }}>

        {/* --- AVATAR SECTION --- */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar 
              sx={{ width: 100, height: 100, border: `4px solid ${CARD_BG}` }}
              src="https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp" 
            />
            <IconButton sx={{ 
              position: 'absolute', bottom: 0, right: 0, 
              bgcolor: BLUE, color: '#fff', 
              width: 32, height: 32,
              '&:hover': { bgcolor: '#3367d6' }
            }}>
              <CameraAlt sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: '#fff' }}>
            Leyla Aliyeva
          </Typography>
          <Typography variant="body2" sx={{ color: TEXT_GRAY }}>
            {t('staff_profile.role')}
          </Typography>
        </Box>

        {/* --- STATS CARDS (GRID) --- */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 2, 
          mb: 3, 
          width: '100%'
        }}>
          <Card sx={commonCardSx}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
              <AccessTime sx={{ color: BLUE, mb: 1 }} />
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#fff' }}>142</Typography>
              <Typography variant="caption" sx={{ color: TEXT_GRAY }}>{t('staff_profile.hours')}</Typography>
            </CardContent>
          </Card>
          
          <Card sx={commonCardSx}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
              <ShoppingBag sx={{ color: BLUE, mb: 1 }} />
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#fff' }}>85</Typography>
              <Typography variant="caption" sx={{ color: TEXT_GRAY }}>{t('staff_profile.orders')}</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* --- PERSONAL DATA FORM --- */}
        <Card sx={{ ...commonCardSx, mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3, color: TEXT_GRAY }}>
              {t('staff_profile.personal_data')}
            </Typography>

            <TextField 
              fullWidth 
              label={t('staff_profile.firstname')}
              value={formData.firstName}
              sx={inputSx}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Person sx={{ color: TEXT_GRAY }} /></InputAdornment>,
              }}
            />

            <TextField 
              fullWidth 
              label={t('staff_profile.lastname')}
              value={formData.lastName}
              sx={inputSx}
              InputProps={{
                startAdornment: <InputAdornment position="start"><CheckCircleOutline sx={{ color: TEXT_GRAY }} /></InputAdornment>,
              }}
            />

            <TextField 
              fullWidth 
              label={t('staff_profile.phone')}
              value={formData.phone}
              sx={{ ...inputSx, mb: 0 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Phone sx={{ color: TEXT_GRAY }} /></InputAdornment>,
              }}
            />
          </CardContent>
        </Card>

        {/* --- SHIFT STATUS --- */}
        <Card sx={{ ...commonCardSx, mb: 4 }}>
          <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Schedule sx={{ color: TEXT_GRAY }} />
              <Box>
                <Typography variant="body1" fontWeight="bold" sx={{ color: '#fff' }}>
                  {t('staff_profile.shift_status')}
                </Typography>
                <Typography variant="caption" sx={{ color: isWorking ? GREEN : TEXT_GRAY }}>
                  {isWorking ? t('staff_profile.working_now') : t('staff_profile.offline')}
                </Typography>
              </Box>
            </Box>
            <Switch 
              checked={isWorking} 
              onChange={(e) => setIsWorking(e.target.checked)}
              sx={{ 
                '& .MuiSwitch-switchBase.Mui-checked': { color: GREEN },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: GREEN },
              }} 
            />
          </CardContent>
        </Card>

        {/* --- ACTION BUTTONS --- */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Button 
            fullWidth 
            variant="contained" 
            sx={{ 
              bgcolor: BLUE, 
              color: '#fff', 
              fontWeight: 'bold', 
              py: 1.5, 
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': { bgcolor: '#3367d6' }
            }}
          >
            {t('staff_profile.btn_save')}
          </Button>

          <Button 
            fullWidth 
            variant="contained" 
            startIcon={<Logout />}
            sx={{ 
              bgcolor: 'rgba(255, 76, 81, 0.15)', 
              color: RED, 
              fontWeight: 'bold', 
              py: 1.5, 
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: 'none',
              '&:hover': { bgcolor: 'rgba(255, 76, 81, 0.25)' }
            }}
          >
            {t('staff_profile.btn_logout')}
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default StaffProfile;