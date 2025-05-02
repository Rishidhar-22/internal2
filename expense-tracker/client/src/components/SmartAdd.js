import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';

const SmartAdd = ({ onSmartAdd, disabled }) => {
  const [smsText, setSmsText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (smsText.trim()) {
      onSmartAdd(smsText);
      setSmsText('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Smart Add Expense
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Paste SMS text to automatically extract expense details
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={smsText}
          onChange={(e) => setSmsText(e.target.value)}
          placeholder="Paste SMS text here (e.g., 'Spent ₹25.50 at Starbucks for coffee')"
          sx={{ mb: 2 }}
          disabled={disabled}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={disabled || !smsText.trim()}
          startIcon={disabled ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {disabled ? 'Processing...' : 'Smart Add'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SmartAdd; 