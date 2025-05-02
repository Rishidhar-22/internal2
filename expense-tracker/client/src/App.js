import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SmartAdd from './components/SmartAdd';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const API_URL = 'http://localhost:5001/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/expenses`);
      setExpenses(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError('Failed to fetch expenses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/expenses`, expenseData);
      setExpenses(prev => [response.data, ...prev]);
      setError(null);
    } catch (error) {
      console.error('Error adding expense:', error);
      setError('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSmartAdd = async (smsText) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/expenses/smart-add`, { smsText });
      setExpenses(prev => [response.data, ...prev]);
      setError(null);
    } catch (error) {
      console.error('Error smart adding expense:', error);
      setError('Failed to process SMS text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SmartAdd onSmartAdd={handleSmartAdd} disabled={loading} />
        <ExpenseForm onAddExpense={handleAddExpense} disabled={loading} />
        <ExpenseList expenses={expenses} loading={loading} />
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
