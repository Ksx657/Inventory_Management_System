import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Login = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login submission here

    // After successful login, redirect to dashboard
    navigate("/dashboard");
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
          padding: isMatch? "2rem" : "3rem",
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMatch? "repeat(1, 1fr)" : "repeat(2, 1fr)",
              gap: "2rem",
            }}
          >
            <TextField
              label="email"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                width: isMatch? "100%" : "40%",
                padding: "0.5rem 2rem",
                fontSize: "1rem",
              }}
            >
              Login
            </Button>
          </Box>
        </form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Typography>
            Don't have an account?{" "}
            <Link to="/register" sx={{ color: "theme.palette.primary.light", textDecoration: "none" }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;