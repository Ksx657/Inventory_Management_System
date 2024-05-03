import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  GroupsOutlined,
  ReceiptOutlined,
  AssignmentOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import Header from "../../components/Header";
import backgroundImage from "../../assets/carousel/c1.jpg"; // Importing the background image

const Dashboard = () => {
  const navigate = useNavigate();

  const handleIconClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`, // Using the imported background image
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box m="1.5rem 2.5rem" bgcolor="rgba(11, 20, 86, 0.8)" borderRadius="1rem" p="2rem">
        <Grid container direction="column" alignItems="center" spacing={4}>
          <Grid item alignItems="center">
            <Header title="Choose what you want to do"  />
          </Grid>
          <Grid item>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box display="flex" justifyContent="center" gap={4}>
                <Box textAlign="center" onClick={() => handleIconClick("/products")}>
                  <ShoppingCartOutlined fontSize="large" />
                  <Typography variant="h6">Products</Typography>
                </Box>
                <Box textAlign="center" onClick={() => handleIconClick("/customers")}>
                  <GroupsOutlined fontSize="large" />
                  <Typography variant="h6">Customers</Typography>
                </Box>
                <Box textAlign="center" onClick={() => handleIconClick("/transactions")}>
                  <ReceiptOutlined fontSize="large" />
                  <Typography variant="h6">Transactions</Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" gap={4} mt={2}>
                <Box textAlign="center" onClick={() => handleIconClick("/task")}>
                  <AssignmentOutlined fontSize="large" />
                  <Typography variant="h6">Task Manager</Typography>
                </Box>
                <Box textAlign="center" onClick={() => handleIconClick("/admin")}>
                  <SettingsOutlined fontSize="large" />
                  <Typography variant="h6">Admin</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
