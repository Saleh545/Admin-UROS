import React, { useState } from 'react';
import { 
  Box, Grid, Card, CardContent, Typography, Button, 
  TextField, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Avatar, Chip, IconButton, MenuItem, Select, InputAdornment 
} from '@mui/material';
import { 
  Store, VerifiedUser, AccessTime, MonetizationOn, 
  Search, Add, Refresh, Edit, Delete, Launch 
} from '@mui/icons-material';

import EditRestaurantDrawer from '../components/EditRestaurantDrawer';

// BU HİSSƏ SƏNDƏ ÇATIŞMIRDI 👇
const restaurants = [
  { 
    id: 1, 
    name: 'Grand Baku Restaurant', 
    address: 'ул. Низами, 12', 
    link: '/m/grand-baku', 
    status: 'Active', 
    color: 'success', 
    initials: 'GB' 
  },
  { 
    id: 2, 
    name: 'Dolma Kitchen', 
    address: 'Ичери Шехер', 
    link: '/m/dolma', 
    status: 'Pending', 
    color: 'warning', 
    initials: 'DK' 
  },
  { 
    id: 3, 
    name: 'Caspian Grill', 
    address: 'Бульвар', 
    link: '/m/caspian-grill', 
    status: 'Inactive', 
    color: 'default', 
    initials: 'CG' 
  },
];

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>{value}</Typography>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
      </Box>
      <Avatar variant="rounded" sx={{ bgcolor: `${color}.main`, width: 48, height: 48 }}>
        {icon}
      </Avatar>
    </CardContent>
  </Card>
);

const Restaurants = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleEditClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedRestaurant(null);
  };

  return (
    <Box>
      {/* 1. Statistika Hissəsi */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Restaurants" value="3" icon={<Store />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Clients" value="1" icon={<VerifiedUser />} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Pending Approval" value="1" icon={<AccessTime />} color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Monthly Revenue" value="17,850 ₼" icon={<MonetizationOn />} color="info" />
        </Grid>
      </Grid>

      {/* 2. Cədvəl Hissəsi */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Restaurants List</Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField 
              placeholder="Search Restaurant or Owner..." 
              size="small" 
              fullWidth
              sx={{ flexGrow: 1, maxWidth: { md: 400 } }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
              }}
            />
            <Select size="small" defaultValue="all" sx={{ minWidth: 120 }}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
            <Button variant="contained" startIcon={<Add />}>
              Add New
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>RESTAURANT</TableCell>
                  <TableCell>PUBLIC LINK</TableCell>
                  <TableCell>STATUS</TableCell>
                  <TableCell align="right">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurants.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar variant="rounded" sx={{ bgcolor: 'background.default', color: 'primary.main', fontSize: 14 }}>
                          {row.initials}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">{row.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{row.address}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip 
                        icon={<Launch sx={{ fontSize: 14 }} />} 
                        label={row.link} 
                        variant="outlined" 
                        color="primary" 
                        size="small" 
                        clickable
                      />
                    </TableCell>

                    <TableCell>
                      <Chip 
                        label={row.status.toUpperCase()} 
                        color={row.color} 
                        size="small" 
                        sx={{ fontWeight: 'bold' }} 
                      />
                    </TableCell>

                    <TableCell align="right">
                      <IconButton size="small" color="primary"><Refresh /></IconButton>
                      <IconButton 
                        size="small" 
                        color="default" 
                        onClick={() => handleEditClick(row)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error"><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* 3. Panel (Drawer) */}
      <EditRestaurantDrawer 
        open={openDrawer} 
        onClose={handleCloseDrawer} 
        data={selectedRestaurant} 
      />
    </Box>
  );
};

export default Restaurants;