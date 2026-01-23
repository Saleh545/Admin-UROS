import React from 'react';
import { 
  Box, Card, CardContent, Typography, Chip, Button, 
  List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, Divider 
} from '@mui/material';
import { AutoAwesome, CheckCircle, CalendarToday, Tag } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- MOCK DATA (Keys for Translation) ---
// Məlumatları birbaşa mətn kimi yox, tərcümə açarları kimi saxlayırıq
const RELEASES = [
  {
    version: 'v1.2.0',
    date: 'Jan 12, 2026',
    type: 'FEATURE',
    titleKey: 'whats_new.releases.telegram.title',
    descKey: 'whats_new.releases.telegram.desc',
    changesKeys: [
      'whats_new.releases.telegram.changes.bot',
      'whats_new.releases.telegram.changes.speed',
      'whats_new.releases.telegram.changes.bugs'
    ]
  },
  {
    version: 'v1.1.5',
    date: 'Jan 10, 2026',
    type: 'FIX',
    titleKey: 'whats_new.releases.billing.title',
    descKey: 'whats_new.releases.billing.desc',
    changesKeys: [
      'whats_new.releases.billing.changes.pdf',
      'whats_new.releases.billing.changes.ios'
    ]
  },
  {
    version: 'v1.1.0',
    date: 'Jan 01, 2026',
    type: 'MAJOR',
    titleKey: 'whats_new.releases.launch.title',
    descKey: 'whats_new.releases.launch.desc',
    changesKeys: []
  }
];

const getTypeStyle = (type, theme) => {
  const isDark = theme.palette.mode === 'dark';
  switch (type) {
    case 'FEATURE': 
      return { 
        bg: isDark ? 'rgba(114, 225, 40, 0.15)' : 'rgba(114, 225, 40, 0.1)', 
        text: '#72E128',
        border: '#72E128'
      }; 
    case 'FIX': 
      return { 
        bg: isDark ? 'rgba(253, 181, 40, 0.15)' : 'rgba(253, 181, 40, 0.1)', 
        text: '#FDB528',
        border: '#FDB528'
      };     
    case 'MAJOR': 
      return { 
        bg: isDark ? 'rgba(66, 108, 255, 0.15)' : 'rgba(66, 108, 255, 0.1)', 
        text: '#666CFF',
        border: '#666CFF'
      };   
    default: 
      return { 
        bg: theme.palette.action.hover, 
        text: theme.palette.text.primary,
        border: theme.palette.divider
      };
  }
};

const WhatsNew = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // İstədiyiniz xüsusi rəng (Dark mode üçün)
  const CARD_BG = '#312d4b';

  return (
    <Box sx={{ 
      width: '100%', 
      boxSizing: 'border-box', 
      p: { xs: 2, md: 3 },
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* --- HEADER --- */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', md: 'center' }, 
        mb: 2, 
        gap: 2
      }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.5rem', color: 'text.primary' }}>
            {t('whats_new.title')} <AutoAwesome sx={{ color: '#FF4C51' }} />
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
            {t('whats_new.subtitle')}
          </Typography>
        </Box>
        
        <Chip 
          label={`${t('whats_new.current_version')}: v1.2.0`} 
          sx={{ 
            bgcolor: 'rgba(66, 108, 255, 0.1)', 
            color: '#666CFF', 
            fontWeight: 'bold',
            border: '1px solid rgba(66, 108, 255, 0.2)'
          }} 
        />
      </Box>

      {/* --- LIST SECTION --- */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2, 
        width: '100%', 
        maxWidth: '100%'
      }}>
        
        {RELEASES.map((release, index) => {
          const style = getTypeStyle(release.type, theme);
          
          // Type etiketi üçün tərcümə (FEATURE -> YENİLİK)
          const typeLabel = t(`whats_new.types.${release.type.toLowerCase()}`);

          return (
            <Card key={index} sx={{ 
              width: '100%', 
              boxShadow: 3, 
              borderRadius: '12px', 
              backgroundImage: 'none',
              bgcolor: theme.palette.mode === 'dark' ? CARD_BG : 'background.paper',
              borderLeft: `4px solid ${style.border}`,
              overflow: 'visible'
            }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}> 
                
                {/* 1. TOP ROW */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: theme.palette.action.hover, px: 1, py: 0.5, borderRadius: 1 }}>
                    <Tag sx={{ fontSize: 13, color: 'text.secondary' }} />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: 'text.primary' }}>
                      {release.version}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarToday sx={{ fontSize: 13, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {release.date}
                    </Typography>
                  </Box>

                  <Box sx={{ flexGrow: 1 }} />

                  <Chip 
                    label={typeLabel} 
                    size="small" 
                    sx={{ 
                      bgcolor: style.bg, 
                      color: style.text, 
                      fontWeight: 'bold', 
                      borderRadius: '6px',
                      height: 20,
                      fontSize: '0.65rem'
                    }} 
                  />
                </Box>

                {/* 2. TITLE & DESC */}
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5, color: 'text.primary', fontSize: '1rem' }}>
                  {t(release.titleKey)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.4, mb: release.changesKeys.length ? 1 : 0, fontSize: '0.85rem' }}>
                  {t(release.descKey)}
                </Typography>

                {/* 3. CHANGES LIST */}
                {release.changesKeys.length > 0 && (
                  <>
                    <Divider sx={{ my: 1, borderStyle: 'dashed', opacity: 0.5 }} />
                    <List disablePadding>
                      {release.changesKeys.map((changeKey, i) => (
                        <ListItem key={i} disablePadding sx={{ mb: 0.5, alignItems: 'flex-start' }}>
                          <ListItemIcon sx={{ minWidth: 24, mt: 0.2 }}>
                            <CheckCircle sx={{ fontSize: 16, color: '#72E128' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={t(changeKey)} 
                            primaryTypographyProps={{ fontSize: '0.85rem', color: 'text.secondary', lineHeight: 1.3 }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}

              </CardContent>
            </Card>
          );
        })}

      </Box>
    </Box>
  );
};

export default WhatsNew;