import React, { useState, useEffect } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Tabs, Tab, TextField, InputAdornment, Chip, 
  List, ListItem, useTheme, Divider, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Grid,
  Snackbar, Alert
} from '@mui/material';
import { 
  CheckCircle, Cancel, Save, Close, Add, Edit, DeleteOutline 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // IMPORT ADDED

// --- DEFAULT DATA ---
const DEFAULT_PLANS = [
  {
    name: 'Standard',
    price: '150',
    badge: 'DEFAULT',
    limits: { branches: 1, staff: 5, admins: 1 },
    features: [
      { name: 'POS System', included: true },
      { name: 'Basic Inventory', included: true },
      { name: 'WhatsApp Bot', included: true },
    ]
  }
];

const PricingPlans = () => {
  const { t } = useTranslation(); // HOOK ADDED
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // --- STATE FOR EDIT SUBSCRIPTION DIALOG ---
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSub, setEditingSub] = useState(null);

  // 1. PLANS STATE (INITIALIZE FROM LOCAL STORAGE)
  const [plans, setPlans] = useState(() => {
    try {
      const savedPlans = localStorage.getItem('ur_os_plans');
      return savedPlans ? JSON.parse(savedPlans) : DEFAULT_PLANS;
    } catch (error) {
      console.error("Local Storage Error:", error);
      return DEFAULT_PLANS;
    }
  });

  // MOCK DATA: SUBSCRIPTIONS
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, restaurant: 'Grand Baku', plan: 'Standard', price: '150', discountPrice: null, addons: [] },
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // --- SAVE TO LOCAL STORAGE FUNCTION ---
  const handleSaveAll = () => {
    localStorage.setItem('ur_os_plans', JSON.stringify(plans));
    setShowSnackbar(true);
  };

  // --- PLAN MANAGEMENT FUNCTIONS ---
  // (Eyni qalıb, dəyişməyə ehtiyac yoxdur) ...
  const handleAddPlan = () => {
    const newPlan = {
      name: 'New Plan',
      price: '0',
      badge: '',
      limits: { branches: 1, staff: 1, admins: 1 },
      features: [
        { name: 'Feature 1', included: true },
        { name: 'Feature 2', included: false }
      ]
    };
    setPlans([...plans, newPlan]);
  };

  const handleDeletePlan = (index) => {
    const newPlans = [...plans];
    newPlans.splice(index, 1);
    setPlans(newPlans);
  };

  const handlePlanFieldChange = (index, field, value) => {
    const newPlans = [...plans];
    newPlans[index][field] = value;
    setPlans(newPlans);
  };

  const handleLimitChange = (index, type, value) => {
    const newPlans = [...plans];
    newPlans[index].limits[type] = value;
    setPlans(newPlans);
  };

  const handleFeatureTextChange = (planIndex, featureIndex, newText) => {
    const newPlans = [...plans];
    newPlans[planIndex].features[featureIndex].name = newText;
    setPlans(newPlans);
  };

  const toggleFeatureStatus = (planIndex, featureIndex) => {
    const newPlans = [...plans];
    newPlans[planIndex].features[featureIndex].included = !newPlans[planIndex].features[featureIndex].included;
    setPlans(newPlans);
  };

  const handleDeleteFeature = (planIndex, featureIndex) => {
    const newPlans = [...plans];
    newPlans[planIndex].features.splice(featureIndex, 1);
    setPlans(newPlans);
  };

  const handleAddFeature = (planIndex) => {
    const newPlans = [...plans];
    newPlans[planIndex].features.push({ name: '', included: true });
    setPlans(newPlans);
  };

  const handleEditSubscription = (sub) => {
    setEditingSub({ ...sub });
    setOpenDialog(true);
  };

  const handleSaveSubscription = () => {
    const updatedSubs = subscriptions.map(s => 
      s.id === editingSub.id ? editingSub : s
    );
    setSubscriptions(updatedSubs);
    setOpenDialog(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 } }}>
      
      {/* 1. HEADER */}
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box>
            <Typography variant="h5" fontWeight="700" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>{t('pricing.title')}</Typography>
            <Typography variant="body2" color="text.secondary">{t('pricing.subtitle')}</Typography>
        </Box>
        {activeTab === 0 && (
            <Button 
              variant="contained" 
              size="medium" 
              startIcon={<Save fontSize="small" />} 
              onClick={handleSaveAll} 
              sx={{ bgcolor: '#72E128', color: '#fff', fontWeight: 'bold', textTransform: 'none', width: { xs: '100%', sm: 'auto' } }}
            >
              {t('pricing.btn_save_all')}
            </Button>
        )}
      </Box>

      {/* 2. TABS */}
      <Card sx={{ mb: 3, boxShadow: 2, bgcolor: 'background.paper', backgroundImage: 'none', minHeight: 'unset' }}>
          <Tabs 
            value={activeTab}
            onChange={handleTabChange} 
            textColor="primary" 
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ minHeight: '48px', '& .MuiTab-root': { minHeight: '48px', py: 1.5, fontSize: '0.85rem', textTransform: 'none', minWidth: 'auto', px: 2 } }}
          >
            <Tab label={t('pricing.tab_manage')} />
            <Tab label={t('pricing.tab_subscriptions')} />
          </Tabs>
      </Card>

      {/* 3. PLANS CARDLARI */}
      {activeTab === 0 && (
        <Box>
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, 
              gap: 2,
              alignItems: 'start'
            }}
          >
            {plans.map((plan, planIndex) => (
              <Card key={planIndex} sx={{ boxShadow: 3, bgcolor: 'background.paper', backgroundImage: 'none', position: 'relative', borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
                
                <IconButton 
                  size="small" 
                  onClick={() => handleDeletePlan(planIndex)}
                  sx={{ position: 'absolute', top: 8, right: 8, color: 'text.disabled', '&:hover': { color: 'error.main' } }}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>

                <CardContent sx={{ p: { xs: 2, md: 2.5 }, '&:last-child': { pb: { xs: 2, md: 2.5 } } }}> 
                  
                  {/* Plan Name */}
                  <TextField
                    fullWidth
                    variant="standard"
                    value={plan.name}
                    onChange={(e) => handlePlanFieldChange(planIndex, 'name', e.target.value)}
                    placeholder={t('pricing.plan_name_placeholder')}
                    InputProps={{ disableUnderline: true, style: { fontSize: '1.2rem', fontWeight: '800' } }}
                    sx={{ mb: 1, pr: 4 }}
                  />
                  
                  {/* Price Input */}
                  <Box sx={{ mb: 2 }}>
                    <TextField 
                      fullWidth 
                      size="small" 
                      value={plan.price} 
                      onChange={(e) => handlePlanFieldChange(planIndex, 'price', e.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><Typography fontWeight="bold">₼</Typography></InputAdornment>,
                        style: { fontWeight: 'bold', fontSize: '1.1rem' } 
                      }}
                    />
                  </Box>

                  {/* LIMITS */}
                  <Box sx={{ mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 2 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{t('pricing.limits.branches')}</Typography>
                        <TextField 
                          variant="standard"
                          type="number"
                          value={plan.limits.branches}
                          onChange={(e) => handleLimitChange(planIndex, 'branches', e.target.value)}
                          InputProps={{ disableUnderline: true, style: { fontWeight: 'bold', fontSize: '0.9rem' } }}
                        />
                      </Grid>
                      <Grid item xs={4} sx={{ borderLeft: '1px solid rgba(0,0,0,0.1)', pl: 1 }}>
                        <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{t('pricing.limits.staff')}</Typography>
                        <TextField 
                          variant="standard"
                          type="number"
                          value={plan.limits.staff}
                          onChange={(e) => handleLimitChange(planIndex, 'staff', e.target.value)}
                          InputProps={{ disableUnderline: true, style: { fontWeight: 'bold', fontSize: '0.9rem' } }}
                        />
                      </Grid>
                      <Grid item xs={4} sx={{ borderLeft: '1px solid rgba(0,0,0,0.1)', pl: 1 }}>
                        <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{t('pricing.limits.admins')}</Typography>
                        <TextField 
                          variant="standard"
                          type="number"
                          value={plan.limits.admins}
                          onChange={(e) => handleLimitChange(planIndex, 'admins', e.target.value)}
                          InputProps={{ disableUnderline: true, style: { fontWeight: 'bold', fontSize: '0.9rem' } }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  {/* FEATURES */}
                  <Box>
                    <List dense disablePadding>
                      {plan.features.map((feat, featureIndex) => (
                        <ListItem key={featureIndex} disablePadding sx={{ py: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton size="small" onClick={() => toggleFeatureStatus(planIndex, featureIndex)} sx={{ p: 0.5 }}>
                            {feat.included ? <CheckCircle sx={{ color: '#72E128', fontSize: 18 }} /> : <Cancel sx={{ color: '#FF4C51', fontSize: 18 }} />}
                          </IconButton>
                          <TextField 
                            fullWidth
                            variant="standard"
                            value={feat.name}
                            onChange={(e) => handleFeatureTextChange(planIndex, featureIndex, e.target.value)}
                            InputProps={{
                              disableUnderline: true,
                              style: { fontSize: '0.85rem', color: feat.included ? theme.palette.text.primary : theme.palette.text.disabled }
                            }}
                          />
                          <IconButton size="small" onClick={() => handleDeleteFeature(planIndex, featureIndex)} sx={{ p: 0.5, opacity: 0.5 }}>
                            <Close sx={{ fontSize: 16 }} />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Button 
                    variant="outlined" 
                    fullWidth 
                    size="small" 
                    onClick={() => handleAddFeature(planIndex)}
                    startIcon={<Add />}
                    sx={{ mt: 2, textTransform: 'none', py: 0.5, borderStyle: 'dashed' }}
                  >
                    {t('pricing.btn_add_feature')}
                  </Button>

                </CardContent>
              </Card>
            ))}

            {/* CREATE PLAN BTN */}
            <Card 
              sx={{ 
                boxShadow: 'none', 
                border: '2px dashed rgba(0,0,0,0.1)', 
                bgcolor: 'transparent', 
                borderRadius: 3,
                minHeight: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' }
              }}
              onClick={handleAddPlan}
            >
              <Box textAlign="center">
                <Add sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                <Typography variant="h6" color="text.secondary">{t('pricing.card_create')}</Typography>
              </Box>
            </Card>

          </Box>
        </Box>
      )}

      {/* 4. SUBSCRIPTIONS TAB */}
      {activeTab === 1 && (
        <Card sx={{ boxShadow: 3, bgcolor: 'background.paper', backgroundImage: 'none', borderRadius: 3 }}>
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{ minWidth: { xs: '600px', md: '100%' } }}> 
              <Box 
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr 100px', 
                  gap: 2, px: 3, py: 2, 
                  bgcolor: 'action.hover', 
                  borderBottom: '1px solid', borderColor: 'divider'
                }}
              >
                {[
                  t('pricing.table.restaurant'), 
                  t('pricing.table.current_plan'), 
                  t('pricing.table.price_mo'), 
                  t('pricing.table.addons'), 
                  t('pricing.table.action')
                ].map(h => (
                  <Typography key={h} variant="caption" fontWeight="bold" color="text.secondary">{h}</Typography>
                ))}
              </Box>

              {subscriptions.map((sub) => (
                <Box 
                  key={sub.id}
                  sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr 100px', 
                    gap: 2, px: 3, py: 2, 
                    borderBottom: '1px solid', borderColor: 'divider',
                    alignItems: 'center',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">{sub.restaurant}</Typography>
                  <Box>
                    <Chip 
                      label={sub.plan} 
                      size="small" 
                      sx={{ fontWeight: 'bold', height: 24, fontSize: '0.75rem' }} 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ textDecoration: sub.discountPrice ? 'line-through' : 'none', color: sub.discountPrice ? 'text.secondary' : 'text.primary' }}>
                      {sub.price} ₼
                    </Typography>
                    {sub.discountPrice && (
                      <Chip label={`${sub.discountPrice} ₼`} size="small" sx={{ bgcolor: '#72E128', color: '#fff', fontWeight: 'bold', height: 20, fontSize: '0.7rem' }} />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {sub.addons.length > 0 ? sub.addons.map((addon, i) => (
                      <Chip key={i} label={addon} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 22 }} />
                    )) : (
                      <Typography variant="caption" color="text.secondary">-</Typography>
                    )}
                  </Box>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<Edit fontSize="small" />}
                    onClick={() => handleEditSubscription(sub)}
                    sx={{ textTransform: 'none', py: 0.5, fontSize: '0.8rem' }}
                  >
                    {t('pricing.table.btn_edit')}
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      )}

      {/* 5. EDIT SUBSCRIPTION DIALOG */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, m: 2 } }}
      >
        {editingSub && (
          <>
            <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>
              {t('pricing.dialog.title', { restaurant: editingSub.restaurant })}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                <FormControl fullWidth size="medium">
                  <InputLabel>{t('pricing.dialog.label_select_plan')}</InputLabel>
                  <Select
                    value={editingSub.plan}
                    label={t('pricing.dialog.label_select_plan')}
                    onChange={(e) => {
                      const newPlanName = e.target.value;
                      const standardPrice = plans.find(p => p.name === newPlanName)?.price || '0';
                      setEditingSub({ ...editingSub, plan: newPlanName, price: standardPrice, discountPrice: null });
                    }}
                  >
                    {plans.map((p) => (
                      <MenuItem key={p.name} value={p.name}>
                        {p.name} ({p.price} ₼)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label={t('pricing.dialog.label_standard_price')}
                      value={editingSub.price}
                      fullWidth
                      disabled
                      InputProps={{ endAdornment: <InputAdornment position="end">₼</InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label={t('pricing.dialog.label_custom_price')}
                      value={editingSub.discountPrice || ''}
                      onChange={(e) => setEditingSub({ ...editingSub, discountPrice: e.target.value })}
                      fullWidth
                      placeholder={t('pricing.dialog.placeholder_custom')}
                      InputProps={{ endAdornment: <InputAdornment position="end">₼</InputAdornment> }}
                      helperText={t('pricing.dialog.helper_custom')}
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button onClick={() => setOpenDialog(false)} color="inherit" sx={{ textTransform: 'none' }}>{t('pricing.dialog.btn_cancel')}</Button>
              <Button onClick={handleSaveSubscription} variant="contained" color="primary" disableElevation sx={{ textTransform: 'none', fontWeight: 'bold' }}>{t('pricing.dialog.btn_save')}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={() => setShowSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setShowSnackbar(false)} severity="success" sx={{ width: '100%', fontWeight: 'bold' }}>
          {t('pricing.alert_saved')}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default PricingPlans;