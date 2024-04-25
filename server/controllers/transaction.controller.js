import Transaction from '../models/Transaction.js';
import asyncHandler from 'express-async-handler';
import { isValidObjectId } from 'mongoose';

export const addTransaction = async (req, res) => {
    try {
      const { customerId,createdAt,quantity,cost } = req.body;
      const transaction = new Transaction({ customerId,createdAt,quantity,cost });
      await transaction.save();
      res.status(201).json({ message: 'Transaction added successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getAllTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find();
    res.status(200).json({ success: true, data: transactions });
});

// Controller function to get a transaction by ID
export const getTransactionById = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;

    if (!isValidObjectId(transactionId)) {
        return res.status(400).json({ success: false, message: "Invalid transaction ID" });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
        return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, data: transaction });
});