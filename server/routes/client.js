
import express from "express";
import {
  getProducts,
  getCustomers,
  getGeography,
  addTransaction, 
  getTransactions,
  updateCustomer,
  addCustomer
} from "../controllers/client.js";



const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.post("/addCustomer",addCustomer);
router.put("/updateCustomer",updateCustomer);
router.get("/gettransactions", getTransactions);
router.post("/addTransaction", addTransaction);
router.get("/geography", getGeography);

export default router;
