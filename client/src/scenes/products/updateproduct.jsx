import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Container, TextField, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // Sample product IDs, replace this with actual product IDs fetched from the database
  const productIds = ["1", "2", "3"];

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle updating product quantity in the database here

    // After successful update, redirect to dashboard or products page
    navigate("/products"); // Change this to the appropriate route
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
          Update Product
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
              label="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              fullWidth
              required
            >
              {productIds.map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
              Update Product
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateProduct;
