import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";


const EditDeleteCustomer = ({ customerId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5001/client/deleteCustomer/${customerId}`);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Customer deleted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        })
        onDelete(customerId);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding the customer. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <>
      <Link to={`/updatecustomer/${customerId}`}>
        <Button variant="contained" color="primary" sx={{ mr: 1 }}>
          Edit
        </Button>
      </Link>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
};


const Customers = () => {
  const [customers, setCustomers] = useState();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/client/customers');
        setCustomers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = (deletedCustomerId) => {
    // Update the product list by removing the deleted product
    setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer._id !== deletedCustomerId));
  };


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />


      <Link to="/addcustomer">
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#21295c",
            fontSize: "1.2rem",
            fontWeight: "bold",
            padding: "1rem 2rem",
            mb: "2rem",
            mt: "2rem",
            ":hover": {
              backgroundColor: "#191F45",
            },
          }}
        >
          +Add Customer
        </Button>
      </Link>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Actions</TableCell> {/* Moved the Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer._id}</TableCell>
                  <TableCell align="right">{customer.name}</TableCell>
                  <TableCell align="right">{customer.address}</TableCell>
                  <TableCell align="right">{customer.email}</TableCell>
                  <TableCell align="right">{customer.phoneNumber}</TableCell>
                  <TableCell align="right">
                    <EditDeleteCustomer customerId={customer._id}
                    onDelete={handleDelete} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Customers;
