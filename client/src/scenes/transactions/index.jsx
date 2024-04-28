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

const EditDeleteTransaction = ({ transactionId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5001/transactions/${transactionId}`);
      if (response.status === 200) {
        // Transaction deleted successfully
        onDelete(transactionId);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      // Handle error gracefully, e.g., display error message in UI
      alert("An error occurred while deleting the transaction. Please try again.");
    }
  };

  return (
    <>
      <Link to={`/edittransaction/${transactionId}`}>
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

  const handleDeleteTransaction = (deletedTransactionId) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction._id !== deletedTransactionId)
    );
  };

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
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction._id}</TableCell>
                  <TableCell align="right">{transaction.customerId}</TableCell>
                  <TableCell align="right">{transaction.createdAt}</TableCell>
                  <TableCell align="right">{transaction.quantity}</TableCell>
                  <TableCell align="right">{transaction.cost}</TableCell>
                  <TableCell align="right">
                    <EditDeleteTransaction
                      transactionId={transaction._id}
                      onDelete={handleDeleteTransaction}
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

export default Transactions;
