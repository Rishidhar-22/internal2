import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';

const categories = ['All', 'Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'];

const ExpenseList = ({ expenses, loading }) => {
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredExpenses = categoryFilter === 'All'
    ? expenses
    : expenses.filter(expense => expense.category === categoryFilter);

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Expense List</Typography>
        <TextField
          select
          label="Filter by Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ minWidth: 200 }}
          disabled={loading}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <TableContainer>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No expenses found
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense._id}>
                      <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell align="right">₹{expense.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <strong>Total:</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>₹{totalAmount.toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Paper>
  );
};

export default ExpenseList; 