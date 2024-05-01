import mongoose from 'mongoose';

// Define the new product schema
const productSchema = new mongoose.Schema({
  //_id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated object ID
  productId: { type: String, required: true }, // Retaining this field as it might be used elsewhere in your code

  productName: { type: String, required: true }, // Equivalent to `productName`
  productPrice: { type: Number, required: true }, // Equivalent to `productPrice`
  
  category: { type: String}, // New field for product category
  
  
  quantity: { type: Number, default: 0 }, // Existing field for quantity, with default value
}, { timestamps: true }); // Optionally include timestamps to track creation and update times

// Create the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;
