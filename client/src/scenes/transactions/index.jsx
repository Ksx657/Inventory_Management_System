import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";



const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5001/transactions");
        setTransactions(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

 
  

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />

      <Link to="/addtransaction">
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
          +Add Transaction
        </Button>
      </Link>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Customer ID</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Cost</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
            {transactions.map((transaction) => (
                    <TableRow key={transaction.transId}> {/* Update key */}
                    <TableCell>{transaction.transId}</TableCell> {/* Update field */}
                    <TableCell align="right">{transaction.customerId}</TableCell>
                    <TableCell align="right">{transaction.createdAt}</TableCell>
                    <TableCell align="right">{transaction.quantity}</TableCell>
                    <TableCell align="right">{transaction.cost}</TableCell>
                    
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Transactions;
