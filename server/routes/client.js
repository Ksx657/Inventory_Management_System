
import express from "express";
import {
  getProducts,
  getCustomers,
  getGeography,
  addTransaction, 
  getTransactions,
  updateCustomer,
  addCustomer,
  getcustomerById
} from "../controllers/client.js";



const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.post("/addcustomer",addCustomer);
router.put("/updatecustomer",updateCustomer);
router.get("/customer/:id",getcustomerById);
router.get("/gettransactions", getTransactions);
router.post("/addTransaction", addTransaction);
router.get("/geography", getGeography);

export default router;
