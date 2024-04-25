import express from 'express';
import { addTransaction, getAllTransactions, getTransactionById } from '../controllers/transaction.controller.js';

const router = express.Router();

// Route to add a new transaction
router.post('/transactions', addTransaction);

// Route to get all transactions
router.get('/transactions', getAllTransactions);

// Route to get a transaction by ID
router.get('/transactions/:id', getTransactionById);

export default router;
