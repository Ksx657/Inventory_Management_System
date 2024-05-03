import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import Swal from "sweetalert2";

const AddTransaction = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    transId:"",
    customerId: "",
    createdAt: "",
    quantity: "",
    cost: ""
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
      const response = await axios.post("http://localhost:5001/transactions/addtransactions", formData);

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Product updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        })
        // Redirect to transactions page
        navigate("/transactions");
      }
    } catch (error) {
      // Show error message
      toast.error("An error occurred while adding the transaction. Please try again.");
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
          Add Transaction
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMatch ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
              gap: "2rem",
            }}
          >
            <TextField
              name="transId"
              label="Transaction ID"
              value={formData.transId}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="customerId"
              label="Customer ID"
              value={formData.customerId}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="createdAt"
              label="Created At"
              type="date"
              value={formData.createdAt}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="quantity"
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="cost"
              label="Cost"
              type="number"
              value={formData.cost}
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
              Add Transaction
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddTransaction;
