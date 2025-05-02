import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  Typography,
  Grid,
  CircularProgress
} from '@mui/material';

const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'];

const ExpenseForm = ({ onAddExpense, disabled }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: 'Other'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    setFormData({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: 'Other'
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Expense
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              name="date"
              label="Date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              name="amount"
              label="Amount"
              value={formData.amount}
              onChange={handleChange}
              InputProps={{ startAdornment: '₹' }}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              disabled={disabled}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={disabled || !formData.amount || !formData.description}
              startIcon={disabled ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {disabled ? 'Adding...' : 'Add Expense'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ExpenseForm; 