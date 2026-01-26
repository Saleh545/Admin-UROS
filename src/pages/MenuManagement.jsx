import React, { useState, useEffect } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  TextField, IconButton, InputAdornment, Chip, 
  Switch, useTheme, Menu, MenuItem, Fade, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, Select, FormControl
} from '@mui/material';
import { 
  Search, Add, ContentCopy, Edit, Delete, 
  ExpandMore, LunchDining, Close, CloudUpload, Image 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- MOCK DATA (İlkin Məlumatlar) ---
const CATEGORIES = ['All', 'Main', 'Hot Dishes', 'Cold Dishes', 'Soups', 'Drinks', 'Desserts'];

const INITIAL_ITEMS = [
  {
    id: 1,
    name: 'Adana Kebab',
    description: 'Spicy minced lamb with grilled vegetables.',
    price: 12.50,
    category: 'Main',
    inStock: true,
    image: null 
  },
  {
    id: 2,
    name: 'Lentil Soup',
    description: 'Traditional lentil soup with lemon.',
    price: 5.00,
    category: 'Soups',
    inStock: true,
    image: null
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce, croutons and parmesan.',
    price: 9.00,
    category: 'Cold Dishes',
    inStock: false,
    image: null
  },
  {
    id: 4,
    name: 'Cola Zero',
    description: '330ml cold beverage.',
    price: 3.00,
    category: 'Drinks',
    inStock: true,
    image: null
  }
];

const MenuManagement = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // --- STATE ---
  
  // 1. ITEMS STATE (LocalStorage ilə)
  const [items, setItems] = useState(() => {
    // Səhifə açılanda yaddaşı yoxla
    const savedItems = localStorage.getItem('menuItems');
    return savedItems ? JSON.parse(savedItems) : INITIAL_ITEMS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Branch Dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('Grand Baku (Center)');

  // Modal State
  const [openModal, setOpenModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'Main',
    description: ''
  });

  // --- USE EFFECT (Yaddaşda Saxlamaq) ---
  useEffect(() => {
    // Items dəyişən kimi (əlavə, silmə, edit) LocalStorage-ə yazır
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
  
  // Search Logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Stock Toggle
  const handleStockToggle = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, inStock: !item.inStock } : item
    ));
  };

  // DELETE ITEM (Yeni Funksiya)
  const handleDeleteItem = (id) => {
    // İstifadəçidən təsdiq alırıq
    if (window.confirm(t('menu.confirm_delete') || "Are you sure you want to delete this item?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Branch
  const handleBranchClick = (event) => setAnchorEl(event.currentTarget);
  const handleBranchClose = (val) => {
    if (val) setSelectedBranch(val);
    setAnchorEl(null);
  };

  // Modal Handlers
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateItem = () => {
    if (!newItem.name || !newItem.price) return; 

    const createdItem = {
      id: Date.now(),
      name: newItem.name,
      description: newItem.description,
      price: parseFloat(newItem.price),
      category: newItem.category,
      inStock: true,
      image: null
    };

    setItems([...items, createdItem]); // Bu sətir useEffect-i işə salacaq və yaddaşa yazacaq
    handleCloseModal();
    setNewItem({ name: '', price: '', category: 'Main', description: '' });
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
              sx={{ 
                color: BLUE, 
                fontWeight: 'bold', 
                textTransform: 'none', 
                p: 0, minWidth: 0,
                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
              }}
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

        {/* Header Actions */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<ContentCopy />}
            sx={{ 
              color: TEXT_MUTED, 
              borderColor: 'rgba(255,255,255,0.1)', 
              textTransform: 'none',
              '&:hover': { borderColor: TEXT_MUTED, bgcolor: 'rgba(255,255,255,0.05)' }
            }}
          >
            {t('menu.copy_menu')}
          </Button>
          <Button 
            onClick={handleOpenModal}
            variant="contained" 
            startIcon={<Add />}
            sx={{ 
              bgcolor: BLUE, 
              color: '#fff', 
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#3367d6' }
            }}
          >
            {t('menu.add_item')}
          </Button>
        </Box>
      </Box>

      {/* --- SEARCH & FILTERS --- */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4 }}>
        <TextField 
          placeholder={t('menu.search_placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            minWidth: { md: '300px' },
            '& .MuiOutlinedInput-root': { 
              bgcolor: INPUT_BG, 
              borderRadius: '8px',
              color: TEXT_MAIN,
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
              '&.Mui-focused fieldset': { borderColor: BLUE }
            } 
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search sx={{ color: TEXT_MUTED }} /></InputAdornment>
          }}
        />

        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5, '&::-webkit-scrollbar': { display: 'none' } }}>
          <IconButton sx={{ bgcolor: 'rgba(66, 133, 244, 0.15)', color: BLUE, borderRadius: '8px', '&:hover': { bgcolor: 'rgba(66, 133, 244, 0.25)' } }}>
            <Add />
          </IconButton>
          {CATEGORIES.map((cat) => (
            <Chip 
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat)}
              sx={{ 
                bgcolor: selectedCategory === cat ? BLUE : INPUT_BG,
                color: selectedCategory === cat ? '#fff' : TEXT_MUTED,
                fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                borderRadius: '8px',
                cursor: 'pointer',
                '&:hover': { bgcolor: selectedCategory === cat ? '#3367d6' : 'rgba(255,255,255,0.1)' }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* --- MENU GRID --- */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: 3 
      }}>
        {filteredItems.map((item) => (
          <Card key={item.id} sx={{ 
            bgcolor: CARD_BG, 
            borderRadius: '12px', 
            boxShadow: 3, 
            backgroundImage: 'none',
            minWidth: 0
          }}>
            <Box sx={{ 
              height: 180, 
              bgcolor: IMAGE_PLACEHOLDER_BG, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative'
            }}>
              <CircularProgress size={30} sx={{ color: BLUE }} />
              <Box sx={{ 
                position: 'absolute', top: 12, right: 12, 
                bgcolor: 'rgba(0,0,0,0.6)', 
                backdropFilter: 'blur(4px)',
                px: 1, py: 0.5, 
                borderRadius: '6px' 
              }}>
                <Typography variant="caption" fontWeight="bold" sx={{ color: '#fff' }}>
                  {item.price.toFixed(2)} ₼
                </Typography>
              </Box>
            </Box>

            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: TEXT_MAIN, mb: 0.5 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" sx={{ color: TEXT_MUTED, mb: 3, height: '40px', overflow: 'hidden' }}>
                {item.description}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Switch 
                    checked={item.inStock} 
                    onChange={() => handleStockToggle(item.id)}
                    size="small"
                    sx={{ 
                      '& .MuiSwitch-switchBase.Mui-checked': { color: GREEN },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: GREEN },
                    }} 
                  />
                  <Typography variant="caption" sx={{ color: item.inStock ? TEXT_MAIN : TEXT_MUTED }}>
                    {item.inStock ? t('menu.in_stock') : t('menu.out_of_stock')}
                  </Typography>
                </Box>

                <Box>
                  <IconButton size="small" sx={{ color: TEXT_MUTED, '&:hover': { color: BLUE } }}>
                    <Edit fontSize="small" />
                  </IconButton>
                  
                  {/* DELETE BUTTON */}
                  <IconButton 
                    size="small" 
                    onClick={() => handleDeleteItem(item.id)}
                    sx={{ color: TEXT_MUTED, '&:hover': { color: RED } }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* --- ADD ITEM MODAL --- */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            bgcolor: MODAL_BG,
            color: TEXT_MAIN,
            borderRadius: '16px',
            maxWidth: '500px',
            width: '100%',
            backgroundImage: 'none',
            boxShadow: 24
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h6" fontWeight="bold">{t('menu.new_item') || "New Item"}</Typography>
          <IconButton onClick={handleCloseModal} sx={{ color: TEXT_MUTED }}><Close /></IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ 
            height: 140, 
            border: `1px dashed ${TEXT_MUTED}`, 
            borderRadius: '12px', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            mb: 3,
            bgcolor: INPUT_BG,
            cursor: 'pointer'
          }}>
            <Image sx={{ fontSize: 40, color: TEXT_MUTED, mb: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
               <CloudUpload sx={{ fontSize: 18, color: BLUE }} />
               <Typography variant="body2" sx={{ color: TEXT_MUTED }}>{t('menu.upload_image') || "Upload Image"}</Typography>
            </Box>
          </Box>

          <TextField 
            fullWidth label={t('menu.item_name') || "Item Name"}
            name="name" value={newItem.name} onChange={handleInputChange}
            sx={modalInputSx}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField 
              fullWidth label={t('menu.price') || "Price"} type="number"
              name="price" value={newItem.price} onChange={handleInputChange}
              sx={{ ...modalInputSx, mb: 0 }}
            />
            
            <FormControl fullWidth sx={modalInputSx}>
              <Select
                value={newItem.category}
                name="category"
                onChange={handleInputChange}
                sx={{ mb: 0 }}
                displayEmpty
                inputProps={{ 'aria-label': 'Category' }}
              >
                {CATEGORIES.filter(c => c !== 'All').map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField 
            fullWidth label={t('menu.description') || "Description / Ingredients"}
            name="description" value={newItem.description} onChange={handleInputChange}
            multiline rows={3}
            sx={{ ...modalInputSx, mb: 0 }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={handleCreateItem}
            sx={{ 
              bgcolor: BLUE, 
              color: '#fff', 
              fontWeight: 'bold', 
              py: 1.2,
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': { bgcolor: '#3367d6' }
            }}
          >
            {t('menu.create_item') || "Create Item"}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default MenuManagement;