import express from 'express';
import { addTransaction, getAll, getTransactionById } from '../controllers/transaction.controller.js';

const router = express.Router();

// Route to add a new transaction
router.post('/addtransactions', addTransaction);

// Route to get all transactions
router.get('/', getAll);

// Route to get a transaction by ID
router.get('/transactions/:id', getTransactionById);

export default router;
