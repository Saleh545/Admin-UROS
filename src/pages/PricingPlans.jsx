import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Button, 
  Tabs, Tab, TextField, InputAdornment, Chip, 
  List, ListItem, useTheme, Divider, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';
import { 
  CheckCircle, Cancel, Save, Close, Add, Edit 
} from '@mui/icons-material';

const PricingPlans = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  // --- STATE FOR EDIT SUBSCRIPTION DIALOG ---
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSub, setEditingSub] = useState(null); // The subscription being edited

  // 1. PLANS STATE (Added 'admins' to limits)
  const [plans, setPlans] = useState([
    {
      name: 'Starter',
      price: '150',
      badge: '',
      // Added 'admins' limit here
      limits: { branches: 1, staff: 5, admins: 1 },
      features: [
        { name: 'POS System', included: true },
        { name: 'Basic Inventory', included: true },
        { name: 'WhatsApp Bot (Lite)', included: true },
        { name: 'Advanced Analytics', included: false },
        { name: 'Priority Support', included: false },
      ]
    },
    {
      name: 'Network Pro',
      price: '450',
      badge: 'POPULAR',
      // Added 'admins' limit here
      limits: { branches: 5, staff: 50, admins: 3 },
      features: [
        { name: 'All Starter Features', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Multi-Branch Control', included: true },
        { name: 'Priority Support', included: true },
        { name: 'White Label API', included: false },
      ]
    },
    {
      name: 'Enterprise',
      price: '900',
      badge: '',
      // Added 'admins' limit here
      limits: { branches: 999, staff: 999, admins: 999 },
      features: [
        { name: 'Unlimited Access', included: true },
        { name: 'Dedicated Manager', included: true },
        { name: 'White Label API', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'SLA Support', included: true },
      ]
    }
  ]);

  // MOCK DATA: SUBSCRIPTIONS
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, restaurant: 'Grand Baku', plan: 'Network Pro', price: '450', discountPrice: '400', addons: ['Telegram Bot'] },
    { id: 2, restaurant: 'Dolma Kitchen', plan: 'Starter', price: '150', discountPrice: null, addons: [] },
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // --- PLAN EDIT FUNCTIONS ---
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

  // --- SUBSCRIPTION EDIT FUNCTIONS ---
  const handleEditSubscription = (sub) => {
    setEditingSub({ ...sub }); // Copy data to edit state
    setOpenDialog(true);
  };

  const handleSaveSubscription = () => {
    // Update the main state with new values
    const updatedSubs = subscriptions.map(s => 
      s.id === editingSub.id ? editingSub : s
    );
    setSubscriptions(updatedSubs);
    setOpenDialog(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }}>
      
      {/* 1. HEADER */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
            <Typography variant="h6" fontWeight="700">Monetization & Pricing 💰</Typography>
            <Typography variant="body2" color="text.secondary">Manage plans, limits & restaurant subscriptions.</Typography>
        </Box>
        {activeTab === 0 && (
            <Button variant="contained" size="small" startIcon={<Save fontSize="small" />} sx={{ bgcolor: '#72E128', color: '#fff', fontWeight: 'bold', textTransform: 'none' }}>
              Publish Changes
            </Button>
        )}
      </Box>

      {/* 2. TABS */}
      <Card sx={{ mb: 2, boxShadow: 2, bgcolor: 'background.paper', backgroundImage: 'none', minHeight: 'unset' }}>
          <Tabs 
            value={activeTab}
            onChange={handleTabChange} 
            textColor="primary" 
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ minHeight: '42px', '& .MuiTab-root': { minHeight: '42px', py: 1.5, fontSize: '0.85rem' } }}
          >
            <Tab label="Plans & Limits" />
            <Tab label="Restaurant Subscriptions" />
            <Tab label="Add-Ons" />
          </Tabs>
      </Card>

      {/* 3. PLANS CARDLARI */}
      {activeTab === 0 && (
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, 
            gap: 2,
            alignItems: 'start'
          }}
        >
          {plans.map((plan, planIndex) => (
            <Card key={planIndex} sx={{ boxShadow: 3, bgcolor: 'background.paper', backgroundImage: 'none', position: 'relative', border: planIndex === 1 ? '1px solid #FDB528' : '1px solid transparent' }}>
              {plan.badge && (
                <Chip 
                  label={plan.badge} 
                  size="small" 
                  sx={{ 
                    position: 'absolute', top: 12, right: 12, 
                    bgcolor: '#FDB528', color: '#000', fontWeight: 'bold', height: 20, fontSize: '0.65rem'
                  }} 
                />
              )}
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}> 
                
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>Plan Name</Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, lineHeight: 1.2 }}>{plan.name}</Typography>
                
                {/* Price Input */}
                <Box sx={{ mb: 2.5 }}>
                  <Typography variant="caption" color="text.secondary">Price</Typography>
                  <TextField 
                    fullWidth 
                    size="small" 
                    defaultValue={plan.price} 
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Typography fontSize="0.9rem">₼</Typography></InputAdornment>,
                      endAdornment: <InputAdornment position="end"><Typography fontSize="0.8rem">/mo</Typography></InputAdornment>,
                      style: { fontSize: '0.95rem', height: '36px' } 
                    }}
                  />
                </Box>

                {/* LIMITS (Updated Layout for 3 Items) */}
                <Box sx={{ mb: 2.5, p: 1.5, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2 }}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={3} textAlign="center">
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Branches</Typography>
                      <Typography variant="body2" fontWeight="bold">🏠 {plan.limits.branches}</Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ height: '20px', my: 'auto' }} />
                    <Grid item xs={3} textAlign="center">
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Staff</Typography>
                      <Typography variant="body2" fontWeight="bold">👤 {plan.limits.staff}</Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ height: '20px', my: 'auto' }} />
                    <Grid item xs={3} textAlign="center">
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Admins</Typography>
                      <Typography variant="body2" fontWeight="bold">🛡️ {plan.limits.admins}</Typography>
                    </Grid>
                  </Grid>
                </Box>

                {/* EDITABLE FEATURES LIST */}
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ mb: 1, display: 'block', fontSize: '0.7rem' }}>FEATURES</Typography>
                  <List dense disablePadding>
                    {plan.features.map((feat, featureIndex) => (
                      <ListItem key={featureIndex} disablePadding sx={{ py: 0.3, display: 'flex', alignItems: 'center', gap: 1 }}>
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
                            style: { fontSize: '0.8rem', color: feat.included ? theme.palette.text.primary : theme.palette.text.disabled }
                          }}
                        />
                        <IconButton size="small" onClick={() => handleDeleteFeature(planIndex, featureIndex)} sx={{ p: 0.5, color: 'text.secondary' }}>
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
                  startIcon={<Add fontSize="small" />}
                  sx={{ mt: 2.5, textTransform: 'none', py: 0.5 }}
                >
                  Add Feature
                </Button>

              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* 4. SUBSCRIPTIONS TAB (MANAGE RESTAURANT PLANS) */}
      {activeTab === 1 && (
        <Card sx={{ boxShadow: 3, bgcolor: 'background.paper', backgroundImage: 'none' }}>
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{ minWidth: '800px' }}>
              <Box 
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1.5fr 1fr 1fr 2fr 1fr', 
                  gap: 2, px: 3, py: 2, 
                  bgcolor: 'rgba(255,255,255,0.02)', 
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                {['RESTAURANT', 'CURRENT PLAN', 'PRICE/MO', 'ADD-ONS', 'ACTION'].map(h => (
                  <Typography key={h} variant="caption" fontWeight="bold" color="text.secondary">{h}</Typography>
                ))}
              </Box>

              {subscriptions.map((sub) => (
                <Box 
                  key={sub.id}
                  sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1.5fr 1fr 1fr 2fr 1fr', 
                    gap: 2, px: 3, py: 2, 
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">{sub.restaurant}</Typography>
                  
                  {/* Plan Badge */}
                  <Box>
                    <Chip 
                      label={sub.plan} 
                      size="small" 
                      sx={{ 
                        bgcolor: sub.plan === 'Network Pro' ? 'rgba(102, 108, 255, 0.12)' : sub.plan === 'Enterprise' ? 'rgba(253, 181, 40, 0.12)' : 'rgba(38, 198, 249, 0.12)', 
                        color: sub.plan === 'Network Pro' ? '#666CFF' : sub.plan === 'Enterprise' ? '#FDB528' : '#26C6F9', 
                        fontWeight: 'bold', height: 24, fontSize: '0.75rem' 
                      }} 
                    />
                  </Box>

                  {/* Price Display */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ textDecoration: sub.discountPrice ? 'line-through' : 'none', color: sub.discountPrice ? 'text.secondary' : 'text.primary' }}>
                      {sub.price} ₼
                    </Typography>
                    {sub.discountPrice && (
                      <Chip label={`${sub.discountPrice} ₼`} size="small" sx={{ bgcolor: '#72E128', color: '#fff', fontWeight: 'bold', height: 20, fontSize: '0.7rem' }} />
                    )}
                  </Box>

                  {/* Addons */}
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {sub.addons.length > 0 ? sub.addons.map((addon, i) => (
                      <Chip key={i} label={addon} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 22 }} />
                    )) : (
                      <Typography variant="caption" color="text.secondary">-</Typography>
                    )}
                  </Box>

                  {/* Edit Button */}
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<Edit fontSize="small" />}
                    onClick={() => handleEditSubscription(sub)}
                    sx={{ textTransform: 'none', py: 0.4, fontSize: '0.8rem', minWidth: '90px' }}
                  >
                    Change
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      )}

      {/* 5. EDIT SUBSCRIPTION DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        {editingSub && (
          <>
            <DialogTitle sx={{ fontWeight: 'bold' }}>
              Manage: {editingSub.restaurant}
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                
                {/* Change Plan */}
                <FormControl fullWidth size="small">
                  <InputLabel>Select Plan</InputLabel>
                  <Select
                    value={editingSub.plan}
                    label="Select Plan"
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

                {/* Custom Pricing */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Standard Price"
                      value={editingSub.price}
                      fullWidth
                      disabled
                      size="small"
                      InputProps={{ endAdornment: <InputAdornment position="end">₼</InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Custom Offer (Optional)"
                      value={editingSub.discountPrice || ''}
                      onChange={(e) => setEditingSub({ ...editingSub, discountPrice: e.target.value })}
                      fullWidth
                      size="small"
                      placeholder="e.g. 400"
                      InputProps={{ endAdornment: <InputAdornment position="end">₼</InputAdornment> }}
                      helperText="Leave empty for standard price"
                    />
                  </Grid>
                </Grid>

              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="inherit">Cancel</Button>
              <Button onClick={handleSaveSubscription} variant="contained" color="primary">Save Changes</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

    </Box>
  );
};

export default PricingPlans;