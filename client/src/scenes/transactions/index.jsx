import React from "react";
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
import { useGetTransactionsQuery } from "../../state/api";

const Transactions = () => {
  const { data: transactionsData, isLoading, isError } = useGetTransactionsQuery({
    page: 1, // Specify page number if paginating
    pageSize: 20, // Specify page size
    sort: { field: "createdAt", sort: "asc" }, // Specify sorting field and order
    search: "", // Specify search query if needed
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error fetching transactions.</Typography>;
  }

  const transactions = transactionsData ? transactionsData.transactions : [];

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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Customer ID</TableCell>
              <TableCell align="right">CreatedAt</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {transaction._id}
                </TableCell>
                <TableCell align="right">{transaction.customerId}</TableCell>
                <TableCell align="right">{transaction.createdAt}</TableCell>
                <TableCell align="right">{transaction.quantity}</TableCell>
                <TableCell align="right">{transaction.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Transactions;
