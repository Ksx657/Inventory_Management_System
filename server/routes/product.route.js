import express from "express";
const router = express.Router();
import {addProduct, getAll, updateProduct, deleteProduct, getProductById, patchProductQuantity } from '../controllers/product.controller.js'

// POST request to add a new product
router.post('/', addProduct);
router.get('/', getAll);
router.get('/:id', getProductById);
router.put("/:id", updateProduct);
router.patch("/:id", patchProductQuantity);
router.delete("/:id", deleteProduct);



export default router;