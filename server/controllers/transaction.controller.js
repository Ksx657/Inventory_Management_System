import Transaction from '../models/Transaction.js';
import asyncHandler from 'express-async-handler';
import { isValidObjectId } from 'mongoose';

export const addTransaction = async (req, res) => {
    try {
      const { transId,customerId,createdAt,quantity,cost } = req.body;
      const transaction = new Transaction({ transId,customerId,createdAt,quantity,cost });
      await transaction.save();
      res.status(201).json({ message: 'Transaction added successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getAll=async (req,res)=>{
    try{
        const transactions=await Transaction.find()
        return res.status(200).json({success:true,message:"Transactions fetched successfully",data:products})
    } catch (error){
        return res.status(500).json({success:false,message:error})
    }
  }

// Controller function to get a transaction by ID
export const getTransactionById = asyncHandler(async (req, res) => {
  const transId = req.params.id; // Get ID from the URL parameter

  if (!isValidObjectId(productId)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  const transaction = await Transaction.findById(transId);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, data: transaction });
});