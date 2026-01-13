import React from 'react';
import { 
  Drawer, Box, Typography, IconButton, TextField, 
  Button, Divider, InputAdornment 
} from '@mui/material';
import { Close, Store, Person, Map, Email, Phone, Lock, Diamond } from '@mui/icons-material';

const EditRestaurantDrawer = ({ open, onClose, data }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 400, backgroundColor: '#28243d' } // Panelin eni və rəngi
      }}
    >
      {/* 1. Başlıq Hissəsi */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Box>
          <Typography variant="h6" fontWeight="bold">Edit Restaurant</Typography>
          <Typography variant="caption" color="text.secondary">Update details & limits</Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {/* 2. Form Hissəsi */}
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        {/* Business Details Section */}
        <Box>
          <Typography variant="caption" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
            <Store fontSize="small" /> BUSINESS DETAILS
          </Typography>
          
          <TextField 
            fullWidth label="Restaurant Name" defaultValue={data?.name} margin="dense" 
            InputProps={{ startAdornment: <InputAdornment position="start"><Store fontSize="small"/></InputAdornment> }}
          />
          <TextField 
            fullWidth label="Owner Full Name" defaultValue="Ilham Aliyev" margin="dense"
            InputProps={{ startAdornment: <InputAdornment position="start"><Person fontSize="small"/></InputAdornment> }}
          />
          <TextField 
            fullWidth label="Address" defaultValue={data?.address} margin="dense" multiline rows={2}
            InputProps={{ startAdornment: <InputAdornment position="start"><Map fontSize="small"/></InputAdornment> }}
          />
        </Box>

        <Divider />

        {/* Access Credentials Section */}
        <Box>
          <Typography variant="caption" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
            <Lock fontSize="small" /> ACCESS CREDENTIALS
          </Typography>

          <TextField 
            fullWidth label="Login Email" defaultValue="admin@grandbaku.az" margin="dense"
            InputProps={{ startAdornment: <InputAdornment position="start"><Email fontSize="small"/></InputAdornment> }}
          />
          <TextField 
            fullWidth label="Phone (WhatsApp)" defaultValue="+994 50 123 45 67" margin="dense"
            InputProps={{ startAdornment: <InputAdornment position="start"><Phone fontSize="small"/></InputAdornment> }}
          />
           <TextField 
            fullWidth label="Password" type="password" defaultValue="123456" margin="dense"
            InputProps={{ startAdornment: <InputAdornment position="start"><Lock fontSize="small"/></InputAdornment> }}
          />
        </Box>

        <Divider />

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" fullWidth size="large">Save Changes</Button>
          <Button variant="outlined" color="error" fullWidth size="large" onClick={onClose}>Cancel</Button>
        </Box>

      </Box>
    </Drawer>
  );
};

export default EditRestaurantDrawer;1