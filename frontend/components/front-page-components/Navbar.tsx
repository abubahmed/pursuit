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
          mt: 1,
        }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", fontSize: "1.3rem" }}>
            Logo Here
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "30px",
              justifyContent: "center",
            }}>
            <Box sx={{ display: "flex", gap: "20px", justifyContent: "center" }}>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontWeight: "regular",
                  fontSize: "1rem",
                  width: "90px",
                }}>
                Lorem
              </Button>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontWeight: "regular",
                  fontSize: "1rem",
                  width: "90px",
                }}>
                Dolor
              </Button>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontWeight: "regular",
                  fontSize: "1rem",
                  width: "90px",
                }}>
                Ipsum
              </Button>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontWeight: "regular",
                  fontSize: "1rem",
                  width: "90px",
                }}>
                Commodi
              </Button>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontWeight: "regular",
                  fontSize: "1rem",
                  width: "90px",
                }}>
                Lorem
              </Button>
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
