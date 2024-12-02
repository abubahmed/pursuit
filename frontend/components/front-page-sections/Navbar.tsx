import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";

export default function Navbar() {
  return (
    <Container maxWidth="lg">
      <AppBar
        sx={{
          position: "static",
          backgroundColor: "white",
          py: 1,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
        }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", fontSize: "1.3rem" }}>
            Logo Here
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "50px",
              justifyContent: "center",
            }}>
            <Box sx={{ display: "flex", gap: "15px", justifyContent: "center" }}>
              {["Lorem", "Dolor", "Ipsum", "Commodi"].map((text, index) => (
                <Button
                  key={index}
                  sx={{
                    color: "black",
                    textTransform: "none",
                    fontWeight: "medium",
                    fontSize: "1.05rem",
                    width: "90px",
                  }}>
                  {text}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
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
                  borderRadius: "20px",
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
