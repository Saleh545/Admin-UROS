import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  TextField, IconButton, InputAdornment, Chip, 
  Switch, useTheme, Menu, MenuItem, Fade, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, Select, FormControl, InputLabel
} from '@mui/material';
import { 
  Search, Add, ContentCopy, Edit, Delete, 
  ExpandMore, LunchDining, Close, CloudUpload, Image as ImageIcon 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- KATEQORIYA AÇAR SÖZLƏRİ ---
const CATEGORY_KEYS = ['all', 'main', 'hot_dishes', 'cold_dishes', 'soups', 'drinks', 'desserts'];

// --- İLKİN MƏLUMATLAR ---
const INITIAL_ITEMS = [
  {
    id: 1,
    name: 'Adana Kebab',
    description: 'Spicy minced lamb with grilled vegetables.',
    price: 12.50,
    category: 'main',
    inStock: true,
    image: null 
  },
  {
    id: 2,
    name: 'Lentil Soup',
    description: 'Traditional lentil soup with lemon.',
    price: 5.00,
    category: 'soups',
    inStock: true,
    image: null
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce, croutons and parmesan.',
    price: 9.00,
    category: 'cold_dishes',
    inStock: false,
    image: null
  },
  {
    id: 4,
    name: 'Cola Zero',
    description: '330ml cold beverage.',
    price: 3.00,
    category: 'drinks',
    inStock: true,
    image: null
  }
];

const MenuManagement = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const fileInputRef = useRef(null); // Fayl inputunu idarə etmək üçün

  // --- STATE ---
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('menuItems');
    return savedItems ? JSON.parse(savedItems) : INITIAL_ITEMS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('Grand Baku (Center)');

  // Modal State
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [currentItem, setCurrentItem] = useState({
    name: '',
    price: '',
    category: 'main',
    description: '',
    image: null // Şəkil üçün state
  });

  // --- USE EFFECT ---
  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(items));
  }, [items]);

  // --- COLORS ---
  const CARD_BG = isDark ? '#312d4b' : '#fff';
  const MODAL_BG = isDark ? '#2b2640' : '#fff';
  const TEXT_MAIN = isDark ? '#fff' : 'text.primary';
  const TEXT_MUTED = isDark ? 'rgba(255, 255, 255, 0.6)' : 'text.secondary';
  const INPUT_BG = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const IMAGE_PLACEHOLDER_BG = isDark ? '#231f36' : '#f0f0f0';
  const BLUE = '#4285F4'; 
  const GREEN = '#72E128'; 
  const RED = '#FF4C51';

  // --- HANDLERS ---
  
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStockToggle = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, inStock: !item.inStock } : item
    ));
  };

  const handleDeleteItem = (id) => {
    if (window.confirm(t('menu.confirm_delete'))) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleBranchClick = (event) => setAnchorEl(event.currentTarget);
  const handleBranchClose = (val) => {
    if (val) setSelectedBranch(val);
    setAnchorEl(null);
  };

  // --- IMAGE UPLOAD HANDLER ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Base64 formatında şəkli state-ə yazırıq
        setCurrentItem(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // --- MODAL HANDLERS ---
  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setCurrentItem({ name: '', price: '', category: 'main', description: '', image: null });
    setOpenModal(true);
  };

  const handleOpenEditModal = (item) => {
    setIsEditMode(true);
    setEditingId(item.id);
    setCurrentItem({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image || null
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveItem = () => {
    if (!currentItem.name || !currentItem.price) return; 

    if (isEditMode) {
      setItems(items.map(item => 
        item.id === editingId ? { 
          ...item, 
          ...currentItem, 
          price: parseFloat(currentItem.price) 
        } : item
      ));
    } else {
      const newItem = {
        id: Date.now(),
        ...currentItem,
        price: parseFloat(currentItem.price),
        inStock: true
      };
      setItems([...items, newItem]);
    }
    handleCloseModal();
  };

  // --- STYLES ---
  const modalInputSx = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      bgcolor: INPUT_BG,
      borderRadius: '8px',
      color: TEXT_MAIN,
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
      '&.Mui-focused fieldset': { borderColor: BLUE }
    },
    '& .MuiInputLabel-root': { color: TEXT_MUTED },
    '& .MuiInputLabel-root.Mui-focused': { color: BLUE },
    '& .MuiSelect-icon': { color: TEXT_MAIN }
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
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.5rem', color: TEXT_MAIN }}>
            {t('menu.title')} <LunchDining sx={{ color: '#FDB528' }} />
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Typography variant="body2" sx={{ color: TEXT_MUTED, mr: 1 }}>
              {t('menu.managing')}:
            </Typography>
            <Button
              onClick={handleBranchClick}
              endIcon={<ExpandMore />}
              sx={{ color: BLUE, fontWeight: 'bold', textTransform: 'none', p: 0, minWidth: 0 }}
            >
              {selectedBranch}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleBranchClose(null)}
              TransitionComponent={Fade}
              PaperProps={{ sx: { bgcolor: isDark ? '#2b2640' : '#fff', color: TEXT_MAIN } }}
            >
              <MenuItem onClick={() => handleBranchClose('Grand Baku (Center)')}>Grand Baku (Center)</MenuItem>
              <MenuItem onClick={() => handleBranchClose('Grand Baku (Mall)')}>Grand Baku (Mall)</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<ContentCopy />} sx={{ color: TEXT_MUTED, borderColor: 'rgba(255,255,255,0.1)', textTransform: 'none' }}>
            {t('menu.copy_menu')}
          </Button>
          <Button onClick={handleOpenCreateModal} variant="contained" startIcon={<Add />} sx={{ bgcolor: BLUE, color: '#fff', textTransform: 'none', fontWeight: 'bold' }}>
            {t('menu.add_item')}
          </Button>
        </Box>
      </Box>

      {/* --- FILTERS --- */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4 }}>
        <TextField 
          placeholder={t('menu.search_placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: { md: '300px' }, '& .MuiOutlinedInput-root': { bgcolor: INPUT_BG, borderRadius: '8px', color: TEXT_MAIN } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: TEXT_MUTED }} /></InputAdornment> }}
        />

        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5, '&::-webkit-scrollbar': { display: 'none' } }}>
          <IconButton sx={{ bgcolor: 'rgba(66, 133, 244, 0.15)', color: BLUE, borderRadius: '8px' }}><Add /></IconButton>
          
          {CATEGORY_KEYS.map((catKey) => (
            <Chip 
              key={catKey}
              label={t(`menu.categories.${catKey}`)}
              onClick={() => setSelectedCategory(catKey)}
              sx={{ 
                bgcolor: selectedCategory === catKey ? BLUE : INPUT_BG,
                color: selectedCategory === catKey ? '#fff' : TEXT_MUTED,
                fontWeight: selectedCategory === catKey ? 'bold' : 'normal',
                borderRadius: '8px', cursor: 'pointer'
              }}
            />
          ))}
        </Box>
      </Box>

      {/* --- GRID --- */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
        {filteredItems.map((item) => (
          <Card key={item.id} sx={{ bgcolor: CARD_BG, borderRadius: '12px', boxShadow: 3, backgroundImage: 'none', minWidth: 0 }}>
            <Box sx={{ 
              height: 180, 
              bgcolor: IMAGE_PLACEHOLDER_BG, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              position: 'relative', overflow: 'hidden' // Şəkil daşmasın
            }}>
              
              {/* IMAGE OR SPINNER */}
              {item.image ? (
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <CircularProgress size={30} sx={{ color: BLUE }} />
              )}

              <Box sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', px: 1, py: 0.5, borderRadius: '6px' }}>
                <Typography variant="caption" fontWeight="bold" sx={{ color: '#fff' }}>{item.price.toFixed(2)} ₼</Typography>
              </Box>
            </Box>

            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: TEXT_MAIN, mb: 0.5 }}>{item.name}</Typography>
              <Typography variant="body2" sx={{ color: TEXT_MUTED, mb: 3, height: '40px', overflow: 'hidden' }}>{item.description}</Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Switch checked={item.inStock} onChange={() => handleStockToggle(item.id)} size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: GREEN }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: GREEN } }} />
                  <Typography variant="caption" sx={{ color: item.inStock ? TEXT_MAIN : TEXT_MUTED }}>{item.inStock ? t('menu.in_stock') : t('menu.out_of_stock')}</Typography>
                </Box>
                <Box>
                  <IconButton size="small" onClick={() => handleOpenEditModal(item)} sx={{ color: TEXT_MUTED, '&:hover': { color: BLUE } }}><Edit fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => handleDeleteItem(item.id)} sx={{ color: TEXT_MUTED, '&:hover': { color: RED } }}><Delete fontSize="small" /></IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* --- MODAL --- */}
      <Dialog open={openModal} onClose={handleCloseModal} PaperProps={{ sx: { bgcolor: MODAL_BG, color: TEXT_MAIN, borderRadius: '16px', maxWidth: '500px', width: '100%', backgroundImage: 'none', boxShadow: 24 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h6" fontWeight="bold">{isEditMode ? t('menu.edit_item') : t('menu.new_item')}</Typography>
          <IconButton onClick={handleCloseModal} sx={{ color: TEXT_MUTED }}><Close /></IconButton>
        </DialogTitle>

        <DialogContent>
          
          {/* IMAGE UPLOAD BOX */}
          <Box 
            onClick={triggerFileInput} // Klikləyəndə fayl seçimi açılır
            sx={{ 
              height: 140, 
              border: `1px dashed ${TEXT_MUTED}`, 
              borderRadius: '12px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 3, 
              bgcolor: INPUT_BG, 
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Hiddet Input */}
            <input 
              type="file" 
              hidden 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
            />

            {/* Əgər şəkil varsa, onu göstər */}
            {currentItem.image ? (
              <img src={currentItem.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              // Şəkil yoxdursa ikonu göstər
              <>
                <ImageIcon sx={{ fontSize: 40, color: TEXT_MUTED, mb: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CloudUpload sx={{ fontSize: 18, color: BLUE }} />
                  <Typography variant="body2" sx={{ color: TEXT_MUTED }}>{t('menu.upload_image')}</Typography>
                </Box>
              </>
            )}
          </Box>

          <TextField fullWidth label={t('menu.item_name')} name="name" value={currentItem.name} onChange={handleInputChange} sx={modalInputSx} />

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField fullWidth label={t('menu.price')} type="number" name="price" value={currentItem.price} onChange={handleInputChange} sx={{ ...modalInputSx, mb: 0 }} />
            
            <FormControl fullWidth sx={modalInputSx}>
              <InputLabel>{t('menu.category')}</InputLabel>
              <Select
                value={currentItem.category}
                label={t('menu.category')}
                name="category"
                onChange={handleInputChange}
                sx={{ mb: 0 }}
              >
                {CATEGORY_KEYS.filter(c => c !== 'all').map((catKey) => (
                  <MenuItem key={catKey} value={catKey}>{t(`menu.categories.${catKey}`)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField 
            fullWidth 
            label={t('menu.description')} 
            name="description" 
            value={currentItem.description} 
            onChange={handleInputChange} 
            multiline rows={3} 
            sx={{ ...modalInputSx, mb: 0 }} 
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button fullWidth variant="contained" onClick={handleSaveItem} sx={{ bgcolor: BLUE, color: '#fff', fontWeight: 'bold', py: 1.2, borderRadius: '8px', textTransform: 'none', fontSize: '1rem', '&:hover': { bgcolor: '#3367d6' } }}>
            {isEditMode ? t('menu.save_changes') : t('menu.create_item')}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default MenuManagement;