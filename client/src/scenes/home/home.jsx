import React from "react";
import MainCarousel from "../home/maincarousel";
import Footer from "../home/footer";


import { Link } from "react-router-dom"; 
import { Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <MainCarousel />
      <Link to="/login">
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
        onClick={() => navigate("/user")}
      >
        Login
      </Button>
    </Link>
      <Footer />

    </div>
  );
}

export default Home;