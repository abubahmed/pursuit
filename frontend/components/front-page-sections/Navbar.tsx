import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logoImage from "@/public/logos/Pursuit_transparent-.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <Container maxWidth="lg">
      <AppBar
        sx={{
          position: "static",
          backgroundColor: "white",
          boxShadow: "none",
        }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", fontSize: "1.3rem" }}>
            Logo Here
          </Typography> */}
          <Image src={logoImage} alt="logo" width={130} height={40} />
          <Box
            sx={{
              display: "flex",
              gap: "50px",
              justifyContent: "center",
            }}>
            <Box sx={{ display: "flex", gap: "20px", justifyContent: "center" }}>
              {["Features", "Pricing", "Questions", "Reviews"].map((text, index) => (
                <Button
                  key={index}
                  sx={{
                    color: "black",
                    textTransform: "none",
                    fontWeight: "medium",
                    fontSize: "1.05rem",
                    width: "100px",
                    justifyContent: "center",
                    gap: "5px",
                  }}>
                  {text}
                  <ExpandMoreIcon />
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "5px 15px",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "rgb(240, 240, 240)",
                    boxShadow: "none",
                  },
                  fontWeight: "regular",
                  fontSize: "1rem",
                }}>
                Sign In
              </Button>
              <Button
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "10px",
                  padding: "5px 15px",
                  "&:hover": {
                    backgroundColor: "rgb(60, 60, 60)",
                    boxShadow: "none",
                  },
                  boxShadow: "none",
                  fontWeight: "regular",
                  fontSize: "1rem",
                }}>
                Sign Up
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
