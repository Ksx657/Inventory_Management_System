import React, { useState } from "react";
import { useTheme, useMediaQuery, Button, TextField, Container, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAddTransactionMutation } from "../../state/api"; // Import the generated mutation hook from the API file

const AddTransaction = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerId: "",
    createdAt: "",
    quantity: "",
    cost: "",
  });

  const [addTransaction, { isLoading }] = useAddTransactionMutation(); // Use the generated mutation hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the addTransaction mutation function with the formData
      const { data } = await addTransaction(formData);

      // Assuming the response status is not used, you can navigate immediately
      navigate("/transactions");
    } catch (error) {
      console.error("An error occurred while adding the transaction. Please try again.", error);
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
              disabled={isLoading}
              sx={{
                width: isMatch ? "100%" : "40%",
                padding: "0.5rem 2rem",
                fontSize: "1rem",
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Add Transaction"}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddTransaction;
