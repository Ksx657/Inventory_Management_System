import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    transId: { type: String, required: true }, // Retaining this field as it might be used elsewhere in your code
    customerId: { type: String, required: true }, 
    createdAt: { type: String, required: true }, 
    quantity: { type: Date, required: true }, 
    cost: { type: Number, required: true }, 
  
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;



