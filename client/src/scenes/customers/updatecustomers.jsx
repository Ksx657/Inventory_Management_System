import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateCustomer = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { customerId } = useParams();

  const [customerData, setCustomerData] = useState({
    customerId: "",
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/client/customer/${customerId}`);
        const { name, address, email, phoneNumber } = response.data.data;
        setCustomerData({
          customerId,
          name,
          address,
          email,
          phoneNumber,
        });
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };
  
    fetchCustomer();
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5001/client/updatecustomer/${customerId}`, {
        name: customerData.name,
        address: customerData.address,
        email: customerData.email,
        phoneNumber: customerData.phoneNumber,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Customer updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/customers"); 
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding the customer. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error updating customer details:", error);
      
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          padding: isMatch ? "2rem" : "3rem",
          borderRadius: "1rem",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            color: theme.palette.secondary.light,
            marginBottom: "2rem",
          }}
        >
          Update Customer Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMatch ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
              gap: "2rem",
            }}
          >
            {/* Populate form fields with existing data */}
            <TextField
              label="Customer ID"
              type="text"
              value={customerData.customerId}
              disabled
              fullWidth
              required
            />
            <TextField
              label="Name"
              type="text"
              name="name"
              value={customerData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Address"
              type="text"
              name="address"
              value={customerData.address}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={customerData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              value={customerData.phoneNumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: isMatch ? "100%" : "40%",
                padding: "0.5rem 2rem",
                fontSize: "1rem",
              }}
            >
              Update Customer Details
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateCustomer;
