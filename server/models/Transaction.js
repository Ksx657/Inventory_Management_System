import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    customerId: { type: String, required: true }, 
    createdAt: { type: String, required: true }, 
    quantity: { type: Date, required: true }, 
    cost: { type: Number, required: true }, 
  
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;



