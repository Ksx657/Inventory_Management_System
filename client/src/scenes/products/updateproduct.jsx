import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { productId } = useParams();

  const [productData, setProductData] = useState({
    productId: "",
    price: "",
    quantity: "",
    rating: "",
    category:"",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/products/${productId}`);
        const { productPrice, quantity,category } = response.data.data;
        setProductData({
          productId,
          price: productPrice,
          quantity,
          category
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        // Handle error gracefully, e.g., display error message in UI
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5001/products/${productId}`, {
        price: productData.price,
        quantity: productData.quantity,
        category:productData.category
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Product updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        })
        // Redirect to products page
        navigate("/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error gracefully, e.g., display error message in UI
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
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
              type="text"
              value={productData.productId}
              disabled
              fullWidth
              required
            />
            <TextField
              label="Price"
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Quantity"
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              fullWidth
              required
            />
            
            <TextField
              label="Category"
              type="text"
              name="category"
              value={productData.category}
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
              Update Product
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateProduct;
