import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
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
      const response = await axios.post("http://localhost:5001/users/register", formData);

      if (response.status === 200) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect to the login page
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred during registration. Please try again.";
      toast.error(errorMessage);
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
          Sign Up
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
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="role"
              label="Role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
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
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
