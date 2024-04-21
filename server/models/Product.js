import mongoose from 'mongoose';

// Define the new product schema
const productSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated object ID
  // productId: { type: String, required: true }, // Retaining this field as it might be used elsewhere in your code
  name: { type: String, required: true }, // Equivalent to `productName`
  price: { type: Number, required: true }, // Equivalent to `productPrice`
  description: { type: String, required: true }, // New field to describe the product
  category: { type: String, required: true }, // New field for product category
  rating: { type: Number, default: 0 }, // New field for product rating, default to 0
  supply: { type: Number, default: 0 }, // New field for product supply, default to 0
  quantity: { type: Number, default: 0 }, // Existing field for quantity, with default value
}, { timestamps: true }); // Optionally include timestamps to track creation and update times

// Create the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;
