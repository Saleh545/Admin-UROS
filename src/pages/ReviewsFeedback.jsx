import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Avatar, IconButton, Rating, Chip, Menu, MenuItem, 
  Divider, useTheme, Fade, ListItemIcon 
} from '@mui/material';
import { 
  Star, MoreVert, Reply, VisibilityOff, Delete, 
  Restaurant, ExpandMore 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// --- MOCK DATA ---
const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Anar',
    time: '2 saat əvvəl',
    rating: 5,
    comment: 'Hər şey əla idi! Xüsusilə dolma möhtəşəmdir.',
    item: 'Dolma',
    avatarColor: '#FF4C51' // Red
  },
  {
    id: 2,
    name: 'Nigar',
    time: 'Dünən',
    rating: 4,
    comment: 'Yemək dadlı idi, amma xidmət biraz gecikdi.',
    item: 'Kabab',
    avatarColor: '#666CFF' // Purple
  },
  {
    id: 3,
    name: 'Rəşad',
    time: '2 gün əvvəl',
    rating: 5,
    comment: 'Əla atmosfer, əla musiqi. Təşəkkürlər!',
    item: 'Cola Zero',
    avatarColor: '#72E128' // Green
  }
];

const ReviewsFeedback = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === 'dark';

  // --- STATE ---
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [branchAnchorEl, setBranchAnchorEl] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('Grand Baku (Center)');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  // --- COLORS (Dynamic based on Theme) ---
  const CARD_BG = isDark ? '#312d4b' : '#fff';
  const TEXT_MAIN = isDark ? '#fff' : 'text.primary';
  const TEXT_SUB = isDark ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary';
  const ITEM_BG = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const MENU_BG = isDark ? '#2b2640' : '#fff';
  
  const BLUE = '#4285F4'; 
  const GREEN = '#72E128'; 
  const YELLOW = '#FDB528';
  const RED = '#FF4C51';

  // --- HANDLERS ---
  const handleBranchClick = (event) => setBranchAnchorEl(event.currentTarget);
  const handleBranchClose = (val) => {
    if (val) setSelectedBranch(val);
    setBranchAnchorEl(null);
  };
  const handleMenuClick = (event, id) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedReviewId(id);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedReviewId(null);
  };
  const handleReply = () => {
    handleMenuClose();
    navigate('/chat');
  };
  const handleDelete = () => {
    setReviews(prev => prev.filter(r => r.id !== selectedReviewId));
    handleMenuClose();
  };
  const handleHide = () => {
    setReviews(prev => prev.filter(r => r.id !== selectedReviewId));
    handleMenuClose();
  };

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: '100vw', 
      overflowX: 'hidden', 
      boxSizing: 'border-box', 
      p: { xs: 2, md: 3 } 
    }}>
      
      {/* --- HEADER --- */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.5rem', color: 'text.primary' }}>
          {t('reviews.title')} <Star sx={{ color: YELLOW }} />
        </Typography>
        
        {/* BRANCH SELECTOR */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mr: 1 }}>
            {t('reviews.managing')}:
          </Typography>
          <Button
            onClick={handleBranchClick}
            endIcon={<ExpandMore />}
            sx={{ 
              color: BLUE, 
              fontWeight: 'bold', 
              textTransform: 'none', 
              fontSize: '0.95rem',
              p: 0, minWidth: 0,
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
            }}
          >
            {selectedBranch}
          </Button>
          <Menu
            anchorEl={branchAnchorEl}
            open={Boolean(branchAnchorEl)}
            onClose={() => handleBranchClose(null)}
            TransitionComponent={Fade}
            PaperProps={{ 
              sx: { 
                bgcolor: MENU_BG, 
                color: TEXT_MAIN, 
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' 
              } 
            }}
          >
            <MenuItem onClick={() => handleBranchClose('Grand Baku (Center)')}>Grand Baku (Center)</MenuItem>
            <MenuItem onClick={() => handleBranchClose('Grand Baku (Mall)')}>Grand Baku (Mall)</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* --- MAIN GRID --- */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '300px 1fr' }, 
        gap: 3, 
        alignItems: 'start'
      }}>

        {/* 1. LEFT: SUMMARY CARD */}
        <Card sx={{ 
          bgcolor: CARD_BG, // Dynamic BG
          borderRadius: '16px', 
          boxShadow: 3,
          minWidth: 0,
          height: { md: '300px' }, 
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h2" fontWeight="bold" sx={{ color: GREEN, mb: 1 }}>
              4.5
            </Typography>
            <Rating value={4.5} precision={0.5} readOnly size="large" sx={{ color: YELLOW, mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ color: TEXT_MAIN, mb: 0.5 }}>
              {t('reviews.excellent')}
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_SUB }}>
              {t('reviews.based_on')} 2 {t('reviews.reviews_count')}
            </Typography>
          </CardContent>
        </Card>

        {/* 2. RIGHT: REVIEWS LIST */}
        <Card sx={{ 
          bgcolor: CARD_BG, // Dynamic BG
          borderRadius: '16px', 
          boxShadow: 3,
          minWidth: 0
        }}>
          <CardContent sx={{ p: 0 }}>
            {reviews.map((review, index) => (
              <Box key={review.id}>
                <Box sx={{ p: 3 }}>
                  
                  {/* Review Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar sx={{ bgcolor: review.avatarColor, width: 44, height: 44, fontWeight: 'bold', color: '#fff' }}>
                        {review.name[0]}
                      </Avatar>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: TEXT_MAIN }}>
                            {review.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: TEXT_SUB }}>
                            {review.time}
                          </Typography>
                        </Box>
                        <Rating value={review.rating} readOnly size="small" sx={{ color: YELLOW }} />
                      </Box>
                    </Box>

                    {/* Action Button */}
                    <IconButton 
                      onClick={(e) => handleMenuClick(e, review.id)}
                      sx={{ color: TEXT_SUB, mt: -1, mr: -1 }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                  {/* Comment */}
                  <Typography variant="body2" sx={{ color: TEXT_MAIN, mb: 2, lineHeight: 1.6 }}>
                    "{review.comment}"
                  </Typography>

                  {/* Tagged Item */}
                  <Chip 
                    icon={<Restaurant sx={{ fontSize: '14px !important', color: TEXT_SUB }} />}
                    label={review.item} 
                    size="small"
                    sx={{ 
                      bgcolor: ITEM_BG, 
                      color: TEXT_SUB, 
                      borderRadius: '6px',
                      '& .MuiChip-label': { px: 1, fontSize: '0.75rem', fontWeight: 500 }
                    }} 
                  />

                </Box>
                {/* Divider */}
                {index < reviews.length - 1 && <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />}
              </Box>
            ))}
            
            {/* Empty State */}
            {reviews.length === 0 && (
              <Box sx={{ p: 4, textAlign: 'center', color: TEXT_SUB }}>
                <Typography>{t('reviews.no_reviews') || "No reviews yet"}</Typography>
              </Box>
            )}
          </CardContent>
        </Card>

      </Box>

      {/* --- ACTION MENU --- */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            bgcolor: MENU_BG,
            color: TEXT_MAIN,
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
            boxShadow: 5,
            minWidth: 160,
            borderRadius: '12px',
            mt: 1
          }
        }}
      >
        <MenuItem onClick={handleReply} sx={{ fontSize: '0.9rem', gap: 1.5, py: 1.2, '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' } }}>
          <ListItemIcon sx={{ minWidth: 'auto !important' }}>
             <Reply fontSize="small" sx={{ color: TEXT_SUB }} />
          </ListItemIcon>
          {t('reviews.reply')}
        </MenuItem>

        <MenuItem onClick={handleHide} sx={{ fontSize: '0.9rem', gap: 1.5, py: 1.2, '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' } }}>
          <ListItemIcon sx={{ minWidth: 'auto !important' }}>
            <VisibilityOff fontSize="small" sx={{ color: TEXT_SUB }} />
          </ListItemIcon>
          {t('reviews.hide')}
        </MenuItem>
        
        <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', my: 0.5 }} />
        
        <MenuItem onClick={handleDelete} sx={{ fontSize: '0.9rem', gap: 1.5, py: 1.2, color: RED, '&:hover': { bgcolor: 'rgba(255, 76, 81, 0.1)' } }}>
          <ListItemIcon sx={{ minWidth: 'auto !important' }}>
            <Delete fontSize="small" sx={{ color: RED }} />
          </ListItemIcon>
          {t('reviews.delete')}
        </MenuItem>
      </Menu>

    </Box>
  );
};

export default ReviewsFeedback;