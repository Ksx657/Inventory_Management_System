import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';
import { isValidObjectId } from 'mongoose'; // For ID validation
// Controller function to add a new product

export const addProduct = async (req, res) => {
  try {
    const { productId, productName, productPrice } = req.body;
    const product = new Product({ productId, productName, productPrice });
    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll=async (req,res)=>{
  try{
      const products=await Product.find()
      return res.status(200).json({success:true,message:"Products fetched successfully",data:products})
  } catch (error){
      return res.status(500).json({success:false,message:error})
  }
}

export const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id; // Get ID from the URL parameter

  if (!isValidObjectId(productId)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, data: product });
});

// Function to update a product
export const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id; // Get ID from the URL parameter

  if (!isValidObjectId(productId)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    req.body,
    { new: true } // Return the updated document
  );

  res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
});


export const patchProductQuantity = asyncHandler(async (req, res) => {
  const productId = req.params.id; // Get ID from the URL parameter

  if (!isValidObjectId(productId)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const { quantity } = req.body; // Get the new quantity from the request body

  if (typeof quantity !== 'number') {
    return res.status(400).json({ success: false, message: "Invalid quantity type" });
  }

  product.quantity = quantity; // Update the quantity field
  const updatedProduct = await product.save(); // Save the updated product

  res.status(200).json({ success: true, message: "Product quantity updated successfully", data: updatedProduct });
});

// Function to delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id; // Get ID from the URL parameter

  if (!isValidObjectId(productId)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, message: "Product deleted successfully", data: product });
});
