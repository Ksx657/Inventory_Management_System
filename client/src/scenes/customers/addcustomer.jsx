import React, { useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCustomer = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerId: "",
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/client/addCustomer",
        formData
      );
      if (response.status === 201) {
        // Show success message using SweetAlert2
        Swal.fire({
          title: "Success!",
          text: "Customer added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/customers"); // Redirect after closing the alert
        });
      }
    } catch (error) {
      console.error("Error adding customer:", error);
  
      // Handle error using SweetAlert2
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding the customer. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
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
          Add Customer
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMatch
                ? "repeat(1, 1fr)"
                : "repeat(2, 1fr)",
              gap: "2rem",
            }}
          >
            <TextField
              name="customerId"
              label="Customer ID"
              value={formData.customerId}
              onChange={handleChange} 
              fullWidth
              required
            />
            <TextField
              name="name" 
              label="Customer Name"
              value={formData.name}
              onChange={handleChange} 
              fullWidth
              required
            />
            <TextField
              name="address" 
              label="Customer Address"
              value={formData.address}
              onChange={handleChange} 
              fullWidth
              required
            />
            <TextField
              name="email" 
              label="Customer Email"
              value={formData.email}
              onChange={handleChange} 
              fullWidth
              required
            />
            <TextField
              name="phoneNumber" 
              label="Customer Phone Number"
              value={formData.phoneNumber}
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
              Add Customer
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddCustomer;
