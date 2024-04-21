import React from "react";
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
import { useGetProductsQuery } from "../../state/api";
import { useNavigate } from "react-router-dom";

const EditDeleteProduct = ({ _id }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/updateproduct/${_id}`);
  };

  const handleDelete = () => {
    // Implement your delete logic here
    console.log(`Deleting product with id: ${_id}`);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mr: 1 }}>
        Edit
      </Button>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
};

const sampleData = [
  {
    _id: "1",
    name: "Sample Product 1",
    category: "Sample Category 1",
    price: 100,
    rating: 4.5,
    supply: 50,
  },
  {
    _id: "2",
    name: "Sample Product 2",
    category: "Sample Category 2",
    price: 200,
    rating: 4.2,
    supply: 75,
  },
  {
    _id: "3",
    name: "Sample Product 3",
    category: "Sample Category 3",
    price: 300,
    rating: 4.8,
    supply: 100,
  },
];

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Supply Left</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((product) => (
                  <TableRow
                    key={product._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">{product.category}</TableCell>
                    <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                    <TableCell align="right">{product.rating}</TableCell>
                    <TableCell align="right">{product.supply}</TableCell>
                    <TableCell align="right">
                      <EditDeleteProduct _id={product._id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                sampleData.map((product) => (
                  <TableRow
                    key={product._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">{product.category}</TableCell>
                    <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                    <TableCell align="right">{product.rating}</TableCell>
                    <TableCell align="right">{product.supply}</TableCell>
                    <TableCell align="right">
                      <EditDeleteProduct _id={product._id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;