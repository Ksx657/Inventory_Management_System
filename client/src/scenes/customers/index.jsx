import React, { useEffect, useState } from "react";
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
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";

const EditDeleteCustomer = ({ customerId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5001/customers/${customerId}`);
      if (response.status === 200) {
        // Customer deleted successfully
        onDelete(customerId);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      // Handle error gracefully, e.g., display error message in UI
      alert("An error occurred while deleting the customer. Please try again.");
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
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/client/src/state/api.js/customers");
        setCustomers(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDeleteCustomer = (customerId) => {
    setCustomers(customers.filter((customer) => customer._id !== customerId));
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
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  key={customer._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {customer._id}
                  </TableCell>
                  <TableCell align="right">{customer.name}</TableCell>
                  <TableCell align="right">{customer.address}</TableCell>
                  <TableCell align="right">{customer.email}</TableCell>
                  <TableCell align="right">{customer.phoneNumber}</TableCell>
                  <TableCell align="right">
                    <EditDeleteCustomer customerId={customer._id} onDelete={handleDeleteCustomer} />
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
