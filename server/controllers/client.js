
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/userSchema.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
import mongoose from 'mongoose';
import Customer from "../models/customers.js";
import asyncHandler from 'express-async-handler';
import { isValidObjectId } from 'mongoose';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCustomer = async (req, res) => {
  try {
    const { customerId, name, address,email,phoneNumber } = req.body;
    const customer = new Customer({ customerId, name, address,email,phoneNumber });
    await customer.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  // Extracting the MongoDB document ID from request parameters
  const { id } = req.params;

  // Data from the request body to update the customer
  const customerData = req.body;

  try {
    // Validate the MongoDB document ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid MongoDB document ID" });
    }

    // Find the customer by ID and update with new data
    const updatedCustomer = await Customer.findByIdAndUpdate(id, customerData, { new: true });

    // If the customer is not found, return a 404 status
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Return the updated customer data if successful
    res.status(200).json(updatedCustomer);

  } catch (error) {
    // Handle unexpected errors with a 500 status
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCustomer = async (req, res) => {
  try{
     const {id} = req.params;
     const customer = await Customer.findByIdAndDelete(id);
     if (!customer) {
      return res.status(404).json('No Customer with id: ${id}');
  }
  res.status(200).jason(customer);   
  

    res.status(200).send("Custoemr deleted");
  } catch (error) {
     res.status(500).json({msg: error.message});

  }
};


export const getcustomerById = asyncHandler(async (req, res) => {
  const customerId = req.params.id; // Get ID from the URL parameter

  if (!isValidObjectId(customerId)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  const customer = await Customer.findById(customerId);

  if (!customer) {
    return res.status(404).json({ success: false, message: "customer not found" });
  }

  res.status(200).json({ success: true, data: customer });
});


export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // Parse the sort parameter if provided
    const sortOptions = sort ? JSON.parse(sort) : {};

    // Define the sort direction based on the sort field and order
    const sortField = sortOptions.field || "_id"; // Default to sorting by ID
    const sortOrder = sortOptions.sort === "desc" ? -1 : 1;

    // Define the search criteria for cost and userId fields
    const searchCriteria = {
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    };
  
  

    // Perform the database query
    const transactions = await Transaction.find(searchCriteria)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * pageSize) // Adjust page number to skip the correct number of documents
      .limit(pageSize);

    // Count the total number of documents matching the search criteria
    const total = await Transaction.countDocuments(searchCriteria);

    // Return the results
    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const { customerId,createdAt,quantity,cost } = req.body;
    const transaction = new Transaction({ customerId,createdAt,quantity,cost });
    await transaction.save();
    res.status(201).json({ message: 'Transaction added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
