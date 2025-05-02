const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== 'All' ? { category } : {};
    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

// Add new expense
router.post('/', async (req, res) => {
  try {
    const { date, description, amount, category } = req.body;

    // Validate required fields
    if (!date || !description || !amount || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate amount is a positive number
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const expense = new Expense({
      date: new Date(date),
      description,
      amount: parseFloat(amount),
      category
    });

    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(400).json({ message: 'Error adding expense' });
  }
});

// Smart add expense from SMS text
router.post('/smart-add', async (req, res) => {
  try {
    const { smsText } = req.body;
    
    if (!smsText) {
      return res.status(400).json({ message: 'SMS text is required' });
    }

    // Simple text parsing logic
    const amountMatch = smsText.match(/\₹?\d+(\.\d{2})?/);
    const amount = amountMatch ? parseFloat(amountMatch[0].replace('₹', '')) : null;
    
    if (!amount) {
      return res.status(400).json({ message: 'Could not extract amount from SMS text' });
    }

    // Default category if not found
    let category = 'Other';
    const categoryKeywords = {
      'Food': ['food', 'restaurant', 'cafe', 'dinner', 'lunch', 'coffee', 'starbucks'],
      'Transportation': ['uber', 'lyft', 'taxi', 'transport', 'fuel', 'gas', 'petrol'],
      'Entertainment': ['movie', 'theatre', 'concert', 'ticket', 'netflix', 'spotify'],
      'Shopping': ['store', 'shop', 'mall', 'amazon', 'walmart', 'target'],
      'Bills': ['bill', 'utility', 'electricity', 'water', 'rent', 'mortgage']
    };

    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => smsText.toLowerCase().includes(keyword))) {
        category = cat;
        break;
      }
    }

    const expense = new Expense({
      date: new Date(),
      description: smsText,
      amount,
      category
    });

    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error smart adding expense:', error);
    res.status(400).json({ message: 'Error processing SMS text' });
  }
});

module.exports = router; 