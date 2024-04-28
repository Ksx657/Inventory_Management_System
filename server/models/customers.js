import mongoose from 'mongoose';

// Define the customer schema
const customerSchema = new mongoose.Schema({
  //_id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated object ID
  customerId: { type: String, required: true }, // Retaining this field as it might be used elsewhere in your code

  name: { type: String, required: true }, // Customer name
  address: { type: String, required: true }, // Customer address
  email: { type: String, required: true }, // Customer email
  phoneNumber: { type: String, required: true }, // Customer phone number

}, { timestamps: true }); // Optionally include timestamps to track creation and update times

// Create the Customer model
const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
