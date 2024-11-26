import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";

export default function Navbar() {
  return (
    <Container maxWidth="lg">
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "none",
        }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", fontSize: "1.2rem" }}>
            Jobly
          </Typography>
          <Box sx={{ display: "flex", gap: "25px", justifyContent: "center" }}>
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                fontWeight: "regular",
                fontSize: "1rem",
              }}>
              Home
            </Button>
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                fontWeight: "regular",
                fontSize: "1rem",
              }}>
              Features
            </Button>
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                fontWeight: "regular",
                fontSize: "1rem",
              }}>
              Pricing
            </Button>
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                fontWeight: "regular",
                fontSize: "1rem",
              }}>
              Statistics
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                border: "1px solid black",
                borderRadius: "20px",
                padding: "5px 15px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "rgb(240, 240, 240)",
                  boxShadow: "none",
                },
              }}>
              Sign In
            </Button>
            <Button
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                borderRadius: "20px",
                padding: "5px 15px",
                "&:hover": {
                  backgroundColor: "rgb(60, 60, 60)",
                  boxShadow: "none",
                },
                boxShadow: "none",
              }}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
