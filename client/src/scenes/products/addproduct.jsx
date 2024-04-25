import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";

const AddProduct = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    productPrice: "",
    
    category: "",
    rating: "",
    
    quantity: ""
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
      const response = await axios.post("http://localhost:5001/products/", formData);

      if (response.status === 201) {
        // Show success message
        toast.success("Product added successfully!");
        // Redirect to products page
        navigate("/products");
      }
    } catch (error) {
      // Show error message
      toast.error("An error occurred while adding the product. Please try again.");
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
          Add Product
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
              name="productId"
              label="Product ID"
              value={formData.productId} // Fixed value reference
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="productName"
              label="Name"
              value={formData.productName} // Fixed value reference
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="productPrice"
              label="Price(per KG)"
              type="number"
              value={formData.productPrice} // Fixed value reference
              onChange={handleChange}
              fullWidth
              required
            />
            
            <TextField
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              
            />
            <TextField
              name="rating"
              label="Rating"
              type="number"
              value={formData.rating}
              onChange={handleChange}
              fullWidth
            />
            
            <TextField
              name="quantity"
              label="Quantity(KG)"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
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
              Add Product
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddProduct;
