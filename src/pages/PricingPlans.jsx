import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Tabs, Tab, TextField, InputAdornment, Chip, 
  List, ListItem, useTheme, Divider, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Grid,
  Snackbar, Alert, Checkbox, FormControlLabel, FormGroup,
  Switch, ButtonGroup 
} from '@mui/material';
import { 
  CheckCircle, Cancel, Save, Close, Add, Edit, DeleteOutline 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// --- DEFAULT DATA ---
const DEFAULT_PLANS = [
  {
    name: 'Starter', price: '150', badge: 'DEFAULT',
    limits: { branches: 1, staff: 5, admins: 1 },
    features: [
      { name: 'POS System', included: true },
      { name: 'Basic Inventory', included: true },
      { name: 'WhatsApp Bot (Lite)', included: true },
    ]
  },
  {
    name: 'Network Pro', price: '450', badge: 'POPULAR',
    limits: { branches: 5, staff: 50, admins: 5 },
    features: [
       { name: 'All Starter Features', included: true },
       { name: 'Advanced Analytics', included: true },
       { name: 'Multi-Branch Control', included: true },
    ]
  },
  {
    name: 'Enterprise', price: '900', badge: '',
    limits: { branches: 999, staff: 999, admins: 999 },
    features: [
       { name: 'Unlimited Access', included: true },
       { name: 'Dedicated Manager', included: true },
       { name: 'White Label API', included: true },
    ]
  }
];

const PricingPlans = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // --- MODAL STATES ---
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddOnDialog, setOpenAddOnDialog] = useState(false);
  const [openCouponDialog, setOpenCouponDialog] = useState(false);
  
  const [editingSub, setEditingSub] = useState(null);
  
  // New Items States
  const [newAddOn, setNewAddOn] = useState({ name: '', price: '0' });
  const [newCoupon, setNewCoupon] = useState({ code: '', target: 'All', value: '0', type: 'percent' });

  // 1. PLANS STATE
  const [plans, setPlans] = useState(() => {
    try {
      const savedPlans = localStorage.getItem('ur_os_plans');
      return savedPlans ? JSON.parse(savedPlans) : DEFAULT_PLANS;
    } catch (error) { return DEFAULT_PLANS; }
  });

  // 2. SUBSCRIPTIONS STATE
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, restaurant: 'Grand Baku', plan: 'Network Pro', price: '450', discountPrice: '400', addons: ['Telegram Bot', 'Advanced AI Analytics'] },
    { id: 2, restaurant: 'Dolma Kitchen', plan: 'Starter', price: '150', discountPrice: null, addons: [] },
  ]);

  // 3. ADD-ONS STATE
  const [addOns, setAddOns] = useState([
    { id: 1, name: 'Telegram Bot', price: '20', active: true },
    { id: 2, name: 'Advanced AI Analytics', price: '50', active: true },
    { id: 3, name: 'SMS Notifications', price: '10', active: false },
  ]);

  // 4. COUPONS STATE
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'LAUNCH2026', target: 'All', discount: '-50%', active: true },
    { id: 2, code: 'GRAND_VIP', target: 'Grand Baku', discount: '-100%', active: true },
  ]);

  // --- HANDLERS ---
  const handleTabChange = (event, newValue) => { setActiveTab(newValue); };
  const handleSaveAll = () => { localStorage.setItem('ur_os_plans', JSON.stringify(plans)); setShowSnackbar(true); };
  const changeLanguage = (lang) => { i18n.changeLanguage(lang); };

  const handleAddPlan = () => setPlans([...plans, { name: 'New Plan', price: '0', badge: '', limits: { branches: 1, staff: 1, admins: 1 }, features: [] }]);
  const handleDeletePlan = (index) => { const n = [...plans]; n.splice(index, 1); setPlans(n); };
  const handlePlanFieldChange = (index, f, v) => { const n = [...plans]; n[index][f] = v; setPlans(n); };
  const handleLimitChange = (index, type, value) => { const n = [...plans]; n[index].limits[type] = value; setPlans(n); };
  const handleFeatureTextChange = (pIndex, fIndex, val) => { const n = [...plans]; n[pIndex].features[fIndex].name = val; setPlans(n); };
  const toggleFeatureStatus = (planIndex, featureIndex) => { const newPlans = [...plans]; newPlans[planIndex].features[featureIndex].included = !newPlans[planIndex].features[featureIndex].included; setPlans(newPlans); };
  const handleDeleteFeature = (planIndex, featureIndex) => { const newPlans = [...plans]; newPlans[planIndex].features.splice(featureIndex, 1); setPlans(newPlans); };
  const handleAddFeature = (planIndex) => { const newPlans = [...plans]; newPlans[planIndex].features.push({ name: '', included: true }); setPlans(newPlans); };

  const handleEditSubscription = (sub) => { setEditingSub({ ...sub }); setOpenDialog(true); };
  const handleSaveSubscription = () => { const updatedSubs = subscriptions.map(s => s.id === editingSub.id ? editingSub : s); setSubscriptions(updatedSubs); setOpenDialog(false); setShowSnackbar(true); };
  const handleAddonToggle = (addonName) => { if (editingSub.addons.includes(addonName)) { setEditingSub({ ...editingSub, addons: editingSub.addons.filter(a => a !== addonName) }); } else { setEditingSub({ ...editingSub, addons: [...editingSub.addons, addonName] }); } };

  const handleAddOnChange = (id, field, value) => { setAddOns(addOns.map(addon => addon.id === id ? { ...addon, [field]: value } : addon)); };
  const handleCreateAddOn = () => { if (!newAddOn.name) return; const newItem = { id: Date.now(), name: newAddOn.name, price: newAddOn.price, active: true }; setAddOns([...addOns, newItem]); setOpenAddOnDialog(false); setNewAddOn({ name: '', price: '0' }); setShowSnackbar(true); };

  const handleCouponToggle = (id) => { setCoupons(coupons.map(c => c.id === id ? { ...c, active: !c.active } : c)); };
  const handleCreateCoupon = () => { if (!newCoupon.code) return; const discountText = newCoupon.type === 'percent' ? `-${newCoupon.value}%` : `-${newCoupon.value}₼`; const newItem = { id: Date.now(), code: newCoupon.code.toUpperCase(), target: newCoupon.target, discount: discountText, active: true }; setCoupons([...coupons, newItem]); setOpenCouponDialog(false); setNewCoupon({ code: '', target: 'All', value: '0', type: 'percent' }); setShowSnackbar(true); };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', p: { xs: 1, md: 3 } }}>
      
      {/* HEADER & LANG */}
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box>
            <Typography variant="h5" fontWeight="700" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>{t('pricing.title')}</Typography>
            <Typography variant="body2" color="text.secondary">{t('pricing.subtitle')}</Typography>
        </Box>
      
      </Box>

      {/* TABS */}
      <Card sx={{ mb: 3, boxShadow: 2, bgcolor: 'background.paper', backgroundImage: 'none', minHeight: 'unset' }}>
          <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile sx={{ minHeight: '48px', '& .MuiTab-root': { minHeight: '48px', py: 1.5, fontSize: '0.85rem', textTransform: 'none', minWidth: 'auto', px: 2 } }}>
            <Tab label={t('pricing.tab_manage')} />
            <Tab label={t('pricing.tab_subscriptions')} />
            <Tab label={t('pricing.tab_addons')} />
            <Tab label={t('pricing.tab_coupons')} />
          </Tabs>
      </Card>

      {/* TAB 0: PLANS */}
      {activeTab === 0 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, alignItems: 'start' }}>
          {plans.map((plan, planIndex) => (
            <Card key={planIndex} sx={{ boxShadow: 3, bgcolor: 'background.paper', backgroundImage: 'none', position: 'relative', borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
              <IconButton size="small" onClick={() => handleDeletePlan(planIndex)} sx={{ position: 'absolute', top: 8, right: 8, color: 'text.disabled', '&:hover': { color: 'error.main' } }}><DeleteOutline fontSize="small" /></IconButton>
              <CardContent sx={{ p: 2.5 }}> 
                <TextField fullWidth variant="standard" value={plan.name} onChange={(e) => handlePlanFieldChange(planIndex, 'name', e.target.value)} placeholder={t('pricing.plan_name_placeholder')} InputProps={{ disableUnderline: true, style: { fontSize: '1.2rem', fontWeight: '800' } }} sx={{ mb: 1, pr: 4 }} />
                <Box sx={{ mb: 2 }}><TextField fullWidth size="small" value={plan.price} onChange={(e) => handlePlanFieldChange(planIndex, 'price', e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Typography fontWeight="bold">₼</Typography></InputAdornment>, style: { fontWeight: 'bold', fontSize: '1.1rem' } }} /></Box>
                <Box sx={{ mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}><Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{t('pricing.limits.branches')}</Typography><TextField variant="standard" type="number" value={plan.limits.branches} onChange={(e) => handleLimitChange(planIndex, 'branches', e.target.value)} InputProps={{ disableUnderline: true, style: { fontWeight: 'bold', fontSize: '0.9rem' } }} /></Grid>
                    <Grid item xs={4} sx={{ borderLeft: '1px solid rgba(0,0,0,0.1)', pl: 1 }}><Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{t('pricing.limits.staff')}</Typography><TextField variant="standard" type="number" value={plan.limits.staff} onChange={(e) => handleLimitChange(planIndex, 'staff', e.target.value)} InputProps={{ disableUnderline: true, style: { fontWeight: 'bold', fontSize: '0.9rem' } }} /></Grid>
                    <Grid item xs={4} sx={{ borderLeft: '1px solid rgba(0,0,0,0.1)', pl: 1 }}><Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{t('pricing.limits.admins')}</Typography><TextField variant="standard" type="number" value={plan.limits.admins} onChange={(e) => handleLimitChange(planIndex, 'admins', e.target.value)} InputProps={{ disableUnderline: true, style: { fontWeight: 'bold', fontSize: '0.9rem' } }} /></Grid>
                  </Grid>
                </Box>
                <List dense disablePadding>{plan.features.map((feat, featureIndex) => (
                  <ListItem key={featureIndex} disablePadding sx={{ py: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small" onClick={() => toggleFeatureStatus(planIndex, featureIndex)} sx={{ p: 0.5 }}>{feat.included ? <CheckCircle sx={{ color: '#72E128', fontSize: 18 }} /> : <Cancel sx={{ color: '#FF4C51', fontSize: 18 }} />}</IconButton>
                    <TextField fullWidth variant="standard" value={feat.name} onChange={(e) => handleFeatureTextChange(planIndex, featureIndex, e.target.value)} InputProps={{ disableUnderline: true, style: { fontSize: '0.85rem', color: feat.included ? theme.palette.text.primary : theme.palette.text.disabled } }} />
                    <IconButton size="small" onClick={() => handleDeleteFeature(planIndex, featureIndex)} sx={{ p: 0.5, opacity: 0.5 }}><Close sx={{ fontSize: 16 }} /></IconButton>
                  </ListItem>
                ))}</List>
                <Button variant="outlined" fullWidth size="small" onClick={() => handleAddFeature(planIndex)} startIcon={<Add />} sx={{ mt: 2, textTransform: 'none', py: 0.5, borderStyle: 'dashed' }}>{t('pricing.btn_add_feature')}</Button>
              </CardContent>
            </Card>
          ))}
          <Card onClick={handleAddPlan} sx={{ boxShadow: 'none', border: '2px dashed rgba(0,0,0,0.1)', bgcolor: 'transparent', borderRadius: 3, minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' } }}><Box textAlign="center"><Add sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} /><Typography variant="h6" color="text.secondary">{t('pricing.card_create')}</Typography></Box></Card>
        </Box>
      )}

      {/* TAB 1: SUBSCRIPTIONS */}
      {activeTab === 1 && (
        <Card sx={{ boxShadow: 3, bgcolor: 'background.paper', backgroundImage: 'none', borderRadius: 3 }}>
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{ minWidth: { xs: '600px', md: '100%' } }}> 
              <Box sx={{ display: { xs: 'none', md: 'grid' }, gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr 100px', gap: 2, px: 3, py: 2, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
                {[t('pricing.table.restaurant'), t('pricing.table.current_plan'), t('pricing.table.price_mo'), t('pricing.table.addons'), t('pricing.table.action')].map(h => (<Typography key={h} variant="caption" fontWeight="bold" color="text.secondary">{h}</Typography>))}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {subscriptions.map((sub) => (
                  <Box key={sub.id} sx={{ display: { xs: 'flex', md: 'grid' }, gridTemplateColumns: { md: '1.5fr 1fr 1fr 1.5fr 100px' }, flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 2 }, px: { xs: 2, md: 3 }, py: { xs: 2, md: 2 }, borderBottom: '1px solid', borderColor: 'divider', alignItems: { xs: 'flex-start', md: 'center' }, '&:last-child': { borderBottom: 'none' } }}>
                    <Box sx={{ width: '100%', mb: { xs: 1, md: 0 } }}><Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '1rem', md: '0.875rem' } }}>{sub.restaurant}</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: { xs: 1, md: 0 } }}><Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, minWidth: 80, fontWeight: 'bold' }}>{t('pricing.table.label_plan')}</Typography><Chip label={sub.plan} size="small" sx={{ fontWeight: 'bold', height: 24, fontSize: '0.75rem', bgcolor: sub.plan === 'Network Pro' ? 'rgba(102, 108, 255, 0.12)' : 'rgba(38, 198, 249, 0.12)', color: sub.plan === 'Network Pro' ? '#666CFF' : '#26C6F9' }} /></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', mb: { xs: 1, md: 0 } }}><Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, minWidth: 80, fontWeight: 'bold' }}>{t('pricing.table.label_price')}</Typography><Typography variant="body2" sx={{ textDecoration: sub.discountPrice ? 'line-through' : 'none', color: sub.discountPrice ? 'text.secondary' : 'text.primary' }}>{sub.price} ₼</Typography>{sub.discountPrice && <Chip label={`${sub.discountPrice} ₼`} size="small" sx={{ bgcolor: '#72E128', color: '#fff', fontWeight: 'bold', height: 20, fontSize: '0.7rem' }} />}</Box>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', width: '100%', mb: { xs: 2, md: 0 } }}><Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, minWidth: 80, fontWeight: 'bold' }}>{t('pricing.table.label_addons')}</Typography>{sub.addons.length > 0 ? sub.addons.map((addon, i) => (<Chip key={i} label={addon} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 22 }} />)) : <Typography variant="caption" color="text.secondary">-</Typography>}</Box>
                    <Box sx={{ width: { xs: '100%', md: 'auto' }, display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" size="small" startIcon={<Edit fontSize="small" />} onClick={() => handleEditSubscription(sub)} sx={{ textTransform: 'none', py: 0.5, fontSize: '0.8rem', width: { xs: '100%', md: 'auto' } }}>{t('pricing.table.btn_edit')}</Button></Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Card>
      )}

      {/* TAB 2: ADD-ONS */}
      {activeTab === 2 && (
        <Card sx={{ boxShadow: 3, bgcolor: 'background.paper', backgroundImage: 'none', borderRadius: 3 }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' }}>
            <Button variant="contained" size="small" startIcon={<Add />} onClick={() => setOpenAddOnDialog(true)} sx={{ bgcolor: '#4285F4', textTransform: 'none', fontWeight: 'bold' }}> {t('pricing.addons.btn_new')}</Button>
          </Box>
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{ minWidth: '600px' }}>
              <Box sx={{ display: { xs: 'none', md: 'grid' }, gridTemplateColumns: '2fr 1fr 1fr', gap: 2, px: 3, py: 2, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">{t('pricing.addons.col_name')}</Typography>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">{t('pricing.addons.col_price')}</Typography>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">{t('pricing.addons.col_active')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {addOns.map((addon) => (
                  <Box key={addon.id} sx={{ display: { xs: 'flex', md: 'grid' }, gridTemplateColumns: { md: '2fr 1fr 1fr' }, flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 2 }, px: { xs: 2, md: 3 }, py: { xs: 2, md: 2 }, borderBottom: '1px solid', borderColor: 'divider', alignItems: { xs: 'flex-start', md: 'center' }, '&:last-child': { borderBottom: 'none' } }}>
                    <Box sx={{ width: '100%', mb: { xs: 1, md: 0 } }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, mb: 0.5, fontWeight: 'bold' }}>{t('pricing.addons.label_name')}</Typography>
                      <TextField fullWidth variant="standard" value={addon.name} onChange={(e) => handleAddOnChange(addon.id, 'name', e.target.value)} InputProps={{ disableUnderline: true, style: { fontWeight: 'bold', fontSize: '0.95rem' } }} />
                    </Box>
                    <Box sx={{ width: '100%', mb: { xs: 1, md: 0 }, display: 'flex', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, minWidth: 80, fontWeight: 'bold', mr: 2 }}>{t('pricing.addons.label_price')}</Typography>
                      <TextField size="small" value={addon.price} onChange={(e) => handleAddOnChange(addon.id, 'price', e.target.value)} InputProps={{ endAdornment: <InputAdornment position="end">₼</InputAdornment>, style: { width: '80px', fontSize: '0.9rem' } }} />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, minWidth: 80, fontWeight: 'bold', mr: 2 }}>{t('pricing.addons.label_active')}</Typography>
                      <Switch checked={addon.active} onChange={(e) => handleAddOnChange(addon.id, 'active', e.target.checked)} color="success" />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Card>
      )}

      {/* TAB 3: COUPONS */}
      {activeTab === 3 && (
        <Card sx={{ boxShadow: 3, bgcolor: 'background.paper', backgroundImage: 'none', borderRadius: 3 }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' }}>
            <Button variant="contained" size="small" startIcon={<Add />} onClick={() => setOpenCouponDialog(true)} sx={{ bgcolor: '#4285F4', textTransform: 'none', fontWeight: 'bold' }}> {t('pricing.coupons.btn_create')}</Button>
          </Box>
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{ minWidth: '600px' }}>
              <Box sx={{ display: { xs: 'none', md: 'grid' }, gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 2, px: 3, py: 2, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">{t('pricing.coupons.col_code')}</Typography>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">{t('pricing.coupons.col_target')}</Typography>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">{t('pricing.coupons.col_discount')}</Typography>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">{t('pricing.coupons.col_status')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {coupons.map((coupon) => (
                  <Box key={coupon.id} sx={{ display: { xs: 'flex', md: 'grid' }, gridTemplateColumns: { md: '1.5fr 1fr 1fr 1fr' }, flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 2 }, px: { xs: 2, md: 3 }, py: { xs: 2, md: 2 }, borderBottom: '1px solid', borderColor: 'divider', alignItems: { xs: 'flex-start', md: 'center' }, '&:last-child': { borderBottom: 'none' } }}>
                    <Box sx={{ width: '100%', mb: { xs: 1, md: 0 } }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, mb: 0.5, fontWeight: 'bold' }}>{t('pricing.coupons.label_code')}</Typography>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#4285F4' }}>{coupon.code}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', mb: { xs: 1, md: 0 }, display: 'flex', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, minWidth: 80, fontWeight: 'bold', mr: 2 }}>{t('pricing.coupons.label_target')}</Typography>
                      <Chip label={coupon.target} size="small" sx={{ fontWeight: 'bold', height: 24, fontSize: '0.75rem', bgcolor: coupon.target === 'All' ? 'rgba(38, 198, 249, 0.12)' : 'rgba(253, 181, 40, 0.12)', color: coupon.target === 'All' ? '#26C6F9' : '#FDB528' }} />
                    </Box>
                    <Box sx={{ width: '100%', mb: { xs: 1, md: 0 }, display: 'flex', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, minWidth: 80, fontWeight: 'bold', mr: 2 }}>{t('pricing.coupons.label_discount')}</Typography>
                      <Typography variant="body2">{coupon.discount}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, minWidth: 80, fontWeight: 'bold', mr: 2 }}>{t('pricing.coupons.label_status')}</Typography>
                      <Switch checked={coupon.active} onChange={() => handleCouponToggle(coupon.id)} color="success" />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Card>
      )}

      {/* --- DIALOGS --- */}
      {/* 1. EDIT SUBSCRIPTION DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: theme.palette.mode === 'dark' ? '#2b2c40' : 'background.paper', backgroundImage: 'none', borderRadius: 2 } }}>
        {editingSub && (
          <>
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{t('pricing.dialog.manage_title', { restaurant: editingSub.restaurant })}</DialogTitle>
            <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                <FormControl fullWidth><InputLabel>{t('pricing.dialog.label_select_plan')}</InputLabel><Select value={editingSub.plan} label={t('pricing.dialog.label_select_plan')} onChange={(e) => { const newPlanName = e.target.value; const standardPrice = plans.find(p => p.name === newPlanName)?.price || '0'; setEditingSub({ ...editingSub, plan: newPlanName, price: standardPrice, discountPrice: '' }); }}>{plans.map((p) => (<MenuItem key={p.name} value={p.name}>{p.name}</MenuItem>))}</Select></FormControl>
                <TextField label={t('pricing.dialog.label_price_override')} fullWidth value={editingSub.discountPrice || ''} onChange={(e) => setEditingSub({ ...editingSub, discountPrice: e.target.value })} placeholder={editingSub.price} helperText={t('pricing.dialog.helper_price')} InputProps={{ endAdornment: <InputAdornment position="end">₼</InputAdornment> }} />
                <Box><Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary' }}>{t('pricing.dialog.label_addons_enable')}</Typography><FormGroup>{['Telegram Bot', 'Advanced AI Analytics', 'SMS Notifications'].map((addonName) => { const priceTag = addonName === 'Telegram Bot' ? '(20₼)' : addonName.includes('AI') ? '(50₼)' : '(10₼)'; return (<FormControlLabel key={addonName} control={<Checkbox checked={editingSub.addons.includes(addonName)} onChange={() => handleAddonToggle(addonName)} />} label={`${addonName} ${priceTag}`} />) })}</FormGroup></Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setOpenDialog(false)} color="inherit" sx={{ textTransform: 'none' }}>{t('pricing.dialog.btn_cancel')}</Button>
              <Button onClick={handleSaveSubscription} variant="contained" disableElevation sx={{ bgcolor: '#4285F4', textTransform: 'none', fontWeight: 'bold', px: 3 }}>{t('pricing.dialog.btn_save')}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* 2. NEW ADD-ON DIALOG */}
      <Dialog open={openAddOnDialog} onClose={() => setOpenAddOnDialog(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { bgcolor: theme.palette.mode === 'dark' ? '#2b2c40' : 'background.paper', backgroundImage: 'none', borderRadius: 2 } }}>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{t('pricing.dialog.addon_title')}</DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label={t('pricing.dialog.label_module_name')} fullWidth value={newAddOn.name} onChange={(e) => setNewAddOn({ ...newAddOn, name: e.target.value })} />
            <TextField label={t('pricing.dialog.label_price_input')} fullWidth type="number" value={newAddOn.price} onChange={(e) => setNewAddOn({ ...newAddOn, price: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenAddOnDialog(false)} color="inherit" sx={{ textTransform: 'none' }}>{t('pricing.dialog.btn_cancel')}</Button>
          <Button onClick={handleCreateAddOn} variant="contained" disableElevation sx={{ bgcolor: '#4285F4', textTransform: 'none', fontWeight: 'bold', px: 3 }}>{t('pricing.dialog.btn_create')}</Button>
        </DialogActions>
      </Dialog>

      {/* 3. NEW COUPON DIALOG */}
      <Dialog open={openCouponDialog} onClose={() => setOpenCouponDialog(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { bgcolor: theme.palette.mode === 'dark' ? '#2b2c40' : 'background.paper', backgroundImage: 'none', borderRadius: 2 } }}>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{t('pricing.dialog.coupon_title')}</DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label={t('pricing.dialog.label_code')} fullWidth value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })} />
            <FormControl fullWidth><InputLabel>{t('pricing.dialog.label_target')}</InputLabel><Select value={newCoupon.target} label={t('pricing.dialog.label_target')} onChange={(e) => setNewCoupon({ ...newCoupon, target: e.target.value })}><MenuItem value="All">All</MenuItem><MenuItem value="Grand Baku">Grand Baku</MenuItem><MenuItem value="Dolma Kitchen">Dolma Kitchen</MenuItem></Select></FormControl>
            <Grid container spacing={2}><Grid item xs={8}><TextField label={t('pricing.dialog.label_value')} type="number" fullWidth value={newCoupon.value} onChange={(e) => setNewCoupon({ ...newCoupon, value: e.target.value })} /></Grid><Grid item xs={4}><FormControl fullWidth><InputLabel>{t('pricing.dialog.label_type')}</InputLabel><Select value={newCoupon.type} label={t('pricing.dialog.label_type')} onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}><MenuItem value="percent">percent</MenuItem><MenuItem value="fixed">fixed</MenuItem></Select></FormControl></Grid></Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenCouponDialog(false)} color="inherit" sx={{ textTransform: 'none' }}>{t('pricing.dialog.btn_cancel')}</Button>
          <Button onClick={handleCreateCoupon} variant="contained" disableElevation sx={{ bgcolor: '#4285F4', textTransform: 'none', fontWeight: 'bold', px: 3 }}>{t('pricing.dialog.btn_create')}</Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={() => setShowSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setShowSnackbar(false)} severity="success" sx={{ width: '100%', fontWeight: 'bold' }}>{t('pricing.alert_saved')}</Alert>
      </Snackbar>

    </Box>
  );
};

export default PricingPlans;