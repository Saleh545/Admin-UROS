import React, { useState, useMemo, useEffect } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  TextField, Table, TableBody, TableCell, TableHead, TableRow, 
  Avatar, Chip, IconButton, MenuItem, Select, InputAdornment, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  useMediaQuery, useTheme
} from '@mui/material';
import { 
  Store, CheckCircle, Place, MonetizationOn, 
  Search, Add, Edit, Delete, Login, PersonOutline, Launch, MoreVert 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; 

import EditRestaurantDrawer from '../components/EditRestaurantDrawer';

const initialBrands = [
  { id: 1, name: 'Grand Baku Network', owner: 'Ilham Aliyev', branches: 3, currency: 'AZN', link: '/m/grand-baku', status: 'Active', initials: 'GB', color: '#666CFF' },
  { id: 2, name: 'Dolma Kitchen', owner: 'Leyla Mamedova', branches: 1, currency: 'AZN', link: '/m/dolma', status: 'Pending', initials: 'DK', color: '#26C6F9' },
  { id: 3, name: 'Caspian Grill Chain', owner: 'Rustam Guliyev', branches: 2, currency: 'USD', link: '/m/caspian-grill', status: 'Inactive', initials: 'CG', color: '#72E128' },
  { id: 4, name: 'Salam Qaqa', owner: 'Salam Salamov', branches: 0, currency: 'AZN', link: '/m/salam', status: 'Active', initials: 'SA', color: '#666CFF' },
];

// STATISTIKA KARTI
const StatCard = ({ title, value, icon, color, bgColor }) => (
  <Card sx={{ height: '100%', boxShadow: 3, borderRadius: '12px', width: '100%' }}>
    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
              {value}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.75rem' }}>
              {title}
          </Typography>
        </Box>
        <Avatar variant="rounded" sx={{ bgcolor: bgColor, color: color, width: 40, height: 40, borderRadius: '8px', ml: 1 }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

const Restaurants = () => {
  const { t } = useTranslation(); 
  const theme = useTheme();
  // Mobil ekranı təyin edirik (600px-dən kiçik)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [brandsData, setBrandsData] = useState(() => {
    const savedBrands = localStorage.getItem('ur_os_brands');
    return savedBrands ? JSON.parse(savedBrands) : initialBrands;
  });

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem('ur_os_brands', JSON.stringify(brandsData));
  }, [brandsData]);

  const filteredBrands = useMemo(() => {
    return brandsData.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) || brand.owner.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || brand.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [brandsData, searchQuery, statusFilter]);

  const handleAddNewClick = () => { setSelectedBrand(null); setOpenDrawer(true); };
  const handleEditClick = (brand) => { setSelectedBrand(brand); setOpenDrawer(true); };
  const handleCloseDrawer = () => { setOpenDrawer(false); setSelectedBrand(null); };

  const handleSaveBrand = (brandData) => {
    if (selectedBrand) {
      setBrandsData(prev => prev.map(b => b.id === selectedBrand.id ? { ...b, ...brandData } : b));
    } else {
      const newId = brandsData.length > 0 ? Math.max(...brandsData.map(b => b.id)) + 1 : 1;
      const initials = brandData.name.substring(0, 2).toUpperCase();
      setBrandsData(prev => [...prev, { id: newId, status: 'Active', initials, color: '#666CFF', link: `/m/${brandData.slug || 'new-link'}`, ...brandData }]);
    }
    setOpenDrawer(false);
  };

  const handleDeleteClick = (brand) => { setBrandToDelete(brand); setDeleteDialogOpen(true); };
  const confirmDelete = () => { setBrandsData(prev => prev.filter(b => b.id !== brandToDelete.id)); setDeleteDialogOpen(false); };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return { bg: 'rgba(114, 225, 40, 0.12)', text: '#72E128' };
      case 'Pending': return { bg: 'rgba(253, 181, 40, 0.12)', text: '#FDB528' };
      case 'Inactive': return { bg: 'rgba(133, 146, 163, 0.12)', text: '#8592A3' };
      default: return { bg: 'rgba(58, 53, 65, 0.12)', text: '#fff' };
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }}>
      
      {/* STATISTIKA */}
      <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, 
          gap: 2, 
          width: '100%', 
          mb: 3,
          boxSizing: 'border-box'
      }}>
        <StatCard title={t('restaurants.stats.total_brands')} value={brandsData.length} icon={<Store />} color="#666CFF" bgColor="rgba(102, 108, 255, 0.12)" />
        <StatCard title={t('restaurants.stats.active_networks')} value={brandsData.filter(b => b.status === 'Active').length} icon={<CheckCircle />} color="#72E128" bgColor="rgba(114, 225, 40, 0.12)" />
        <StatCard title={t('restaurants.stats.total_branches')} value={brandsData.reduce((acc, curr) => acc + (curr.branches || 0), 0)} icon={<Place />} color="#FDB528" bgColor="rgba(253, 181, 40, 0.12)" />
        <StatCard title={t('restaurants.stats.total_revenue')} value="17,850 ₼" icon={<MonetizationOn />} color="#26C6F9" bgColor="rgba(38, 198, 249, 0.12)" />
      </Box>

      {/* CƏDVƏL VƏ YA KART SİYAHISI */}
      <Card sx={{ boxShadow: 3, width: '100%', overflow: 'hidden' }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          
          <Box sx={{ p: 2 }}>
             <Typography variant="h6" fontWeight={700}>{t('restaurants.title')}</Typography>
          </Box>

          {/* TOOLBAR */}
          <Box sx={{ 
              display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, p: 2, pt: 0, width: '100%', boxSizing: 'border-box'
          }}>
            <Box sx={{ width: { xs: '100%', md: 'auto' }, flexGrow: 1 }}>
                <TextField 
                    placeholder={t('restaurants.search_placeholder')} size="small" fullWidth
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" sx={{ color: 'text.secondary' }} /></InputAdornment> }}
                />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '150px auto' }, gap: 2 }}>
                <Select 
                    size="small" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} fullWidth sx={{ borderRadius: '8px' }}
                >
                    <MenuItem value="all">{t('restaurants.filters.all')}</MenuItem>
                    <MenuItem value="active">{t('restaurants.filters.active')}</MenuItem>
                    <MenuItem value="pending">{t('restaurants.filters.pending')}</MenuItem>
                    <MenuItem value="inactive">{t('restaurants.filters.inactive')}</MenuItem>
                </Select>
                <Button 
                    variant="contained" startIcon={<Add />} onClick={handleAddNewClick} fullWidth
                    sx={{ bgcolor: '#4285F4', borderRadius: '8px', textTransform: 'none', fontWeight: 600, boxShadow: '0 4px 14px 0 rgba(66, 133, 244, 0.3)', whiteSpace: 'nowrap', height: 40 }}
                >
                    {t('restaurants.btn_new_brand')}
                </Button>
            </Box>
          </Box>

          {/* ----- ƏSAS DƏYİŞİKLİK BURADADIR ----- */}
          {/* Əgər Mobildirsə "KART", əgər PC-dirsə "CƏDVƏL" göstər */}
          
          {isMobile ? (
            // --- MOBİL GÖRÜNÜŞ (KARTLAR) ---
            <Box sx={{ p: 2, pt: 0 }}>
              {filteredBrands.map((row) => {
                 const statusStyle = getStatusColor(row.status);
                 return (
                   <Card key={row.id} sx={{ mb: 2, border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(255,255,255,0.02)' }}>
                     <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                           <Avatar variant="rounded" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: row.color, fontWeight: 700, borderRadius: '8px' }}>{row.initials}</Avatar>
                           <Box>
                             <Typography variant="subtitle2" fontWeight="bold">{row.name}</Typography>
                             <Typography variant="caption" color="text.secondary">{row.owner}</Typography>
                           </Box>
                         </Box>
                         <Chip label={row.status.toUpperCase()} size="small" sx={{ bgcolor: statusStyle.bg, color: statusStyle.text, fontWeight: 700, borderRadius: '6px', fontSize: '0.7rem', height: 24 }} />
                       </Box>
                       
                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, bgcolor: 'rgba(255,255,255,0.03)', p: 1, borderRadius: 1 }}>
                          <Box>
                             <Typography variant="caption" color="text.secondary" display="block">Branches</Typography>
                             <Typography variant="body2" fontWeight={600}>{row.branches}</Typography>
                          </Box>
                          <Box>
                             <Typography variant="caption" color="text.secondary" display="block">Currency</Typography>
                             <Typography variant="body2" fontWeight={600}>{row.currency}</Typography>
                          </Box>
                          <Button variant="outlined" size="small" startIcon={<Launch sx={{ fontSize: 14 }} />} sx={{ textTransform: 'none', borderRadius: '20px', fontSize: '0.75rem', borderColor: 'rgba(255,255,255,0.2)', color: '#26C6F9', height: 28 }}>Link</Button>
                       </Box>

                       <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button fullWidth variant="soft" size="small" startIcon={<Login />} sx={{ bgcolor: 'rgba(38, 198, 249, 0.1)', color: '#26C6F9' }}>Login</Button>
                          <Button fullWidth variant="soft" size="small" startIcon={<Edit />} onClick={() => handleEditClick(row)} sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'text.secondary' }}>Edit</Button>
                          <IconButton size="small" color="error" onClick={() => handleDeleteClick(row)} sx={{ bgcolor: 'rgba(255, 76, 81, 0.1)' }}><Delete fontSize="small" /></IconButton>
                       </Box>
                     </CardContent>
                   </Card>
                 );
              })}
            </Box>
          ) : (
            // --- PC GÖRÜNÜŞ (CƏDVƏL) ---
            <Box sx={{ width: '100%', overflowX: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Box sx={{ minWidth: 800 }}> 
                  <Table>
                  <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                      <TableRow sx={{ '& th': { borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary' } }}>
                      <TableCell>{t('restaurants.table.brand')}</TableCell>
                      <TableCell>{t('restaurants.table.stats')}</TableCell>
                      <TableCell>{t('restaurants.table.public_link')}</TableCell>
                      <TableCell>{t('restaurants.table.status')}</TableCell>
                      <TableCell align="right">{t('restaurants.table.actions')}</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {filteredBrands.length > 0 ? (
                          filteredBrands.map((row) => {
                              const statusStyle = getStatusColor(row.status);
                              const statusLabel = t(`restaurants.filters.${row.status.toLowerCase()}`); 
                              return (
                                  <TableRow key={row.id} hover sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)', py: 2 } }}>
                                  <TableCell>
                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                      <Avatar variant="rounded" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: row.color, fontWeight: 700, borderRadius: '8px' }}>{row.initials}</Avatar>
                                      <Box>
                                          <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '0.95rem' }}>{row.name}</Typography>
                                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                              <PersonOutline sx={{ fontSize: 14 }} />
                                              <Typography variant="caption">{row.owner}</Typography>
                                          </Box>
                                      </Box>
                                      </Box>
                                  </TableCell>
                                  <TableCell>
                                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                          <Chip label={t('restaurants.table.branches_count', { count: row.branches || 0 })} size="small" sx={{ bgcolor: 'rgba(66, 133, 244, 0.12)', color: '#4285F4', fontWeight: 700, borderRadius: '6px', height: 22, fontSize: '0.7rem', width: 'fit-content' }} />
                                          <Typography variant="caption" color="text.secondary">{t('restaurants.table.currency')}: {row.currency}</Typography>
                                      </Box>
                                  </TableCell>
                                  <TableCell>
                                      <Button variant="outlined" size="small" startIcon={<Launch sx={{ fontSize: 14 }} />} sx={{ textTransform: 'none', borderRadius: '20px', fontSize: '0.75rem', borderColor: 'rgba(255,255,255,0.2)', color: '#26C6F9' }}>{row.link}</Button>
                                  </TableCell>
                                  <TableCell>
                                      <Chip label={statusLabel.toUpperCase()} size="small" sx={{ bgcolor: statusStyle.bg, color: statusStyle.text, fontWeight: 700, borderRadius: '6px', fontSize: '0.7rem' }} />
                                  </TableCell>
                                  <TableCell align="right">
                                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                          <Tooltip title="Login"><IconButton size="small" sx={{ color: '#26C6F9', bgcolor: 'rgba(38, 198, 249, 0.1)' }}><Login fontSize="small" /></IconButton></Tooltip>
                                          <Tooltip title="Edit"><IconButton size="small" onClick={() => handleEditClick(row)} sx={{ color: 'text.secondary' }}><Edit fontSize="small" /></IconButton></Tooltip>
                                          <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => handleDeleteClick(row)}><Delete fontSize="small" /></IconButton></Tooltip>
                                      </Box>
                                  </TableCell>
                                  </TableRow>
                              );
                          })
                      ) : (
                          <TableRow>
                              <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                  <Typography color="text.secondary">No brands found matching your search.</Typography>
                              </TableCell>
                          </TableRow>
                      )}
                  </TableBody>
                  </Table>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} PaperProps={{ sx: { bgcolor: '#28243d', color: '#fff', backgroundImage: 'none', width: 'calc(100% - 32px)', maxWidth: '400px', m: 2 } }}>
        <DialogTitle>{t('restaurants.dialog.title')}</DialogTitle>
        <DialogContent>
            <DialogContentText sx={{ color: 'text.secondary' }}>
                {t('restaurants.dialog.text')} <strong>{brandToDelete?.name}</strong>? <br />
                {t('restaurants.dialog.text_warning')}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: 'text.secondary' }}>{t('restaurants.dialog.btn_cancel')}</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">{t('restaurants.dialog.btn_delete')}</Button>
        </DialogActions>
      </Dialog>

      <EditRestaurantDrawer 
        open={openDrawer} 
        onClose={handleCloseDrawer} 
        data={selectedBrand} 
        onSave={handleSaveBrand} 
      />
    </Box>
  );
};

export default Restaurants;