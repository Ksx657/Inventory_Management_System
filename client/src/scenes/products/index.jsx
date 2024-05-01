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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const EditDeleteProduct = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5001/products/${productId}`);
      if (response.status === 200) {
        // Product deleted successfully
        onDelete(productId); // Trigger the parent to refresh
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  };

  return (
    <>
      <Link to={`/updateproduct/${productId}`}>
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

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/products");
        setProducts(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (deletedProductId) => {
    // Update the product list by removing the deleted product
    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== deletedProductId));
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />

      <Link to="/addproduct">
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
          +Add Product
        </Button>
      </Link>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Price(Rs.)</TableCell>
                <TableCell align="right">Quantity(KG)</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.productName}
                  </TableCell>
                  <TableCell align="right">{product.category}</TableCell>
                  <TableCell align="right">{product.productPrice}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">
                    <EditDeleteProduct
                      productId={product._id}
                      onDelete={handleDelete} // Pass the onDelete handler
                    />
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

export default Products;