import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [transId, setTransId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [transDate, setTransDate] = useState("");
  const [transQuantity, setTransQuantity] = useState("");
  const [transCost, setTransCost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle adding product to the database here

    // After successful addition, redirect to dashboard or products page
    navigate("/customers"); // Change this to the appropriate route
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
              label="ID"
              value={transId}
              onChange={(e) => setTransId(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Customer ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Created At"
              value={transDate}
              onChange={(e) => setTransDate(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Quantity"
              value={transQuantity}
              onChange={(e) => setTransQuantity(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Cost"
              value={transCost}
              onChange={(e) => setTransCost(e.target.value)}
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
