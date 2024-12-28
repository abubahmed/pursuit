import React from "react";
import { AppBar, Toolbar, Button, Box, Container, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logoImage from "@/public/logos/Logo maker project (2).png";
import Image from "next/image";
import SmallButton from "../general-components/SmallButton";
import { signIn, useSession } from "next-auth/react";

export default function Navbar() {
  return (
    <Paper sx={{ width: "100%" }} elevation={0}>
      <AppBar
        sx={{
          position: "static",
          backgroundColor: "white",
          boxShadow: "none",
          py: "5px",
          borderBottom: "1px solid #e0e0e0",
        }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Image src={logoImage} alt="logo" height={36} />
            <Box
              sx={{
                display: "flex",
                gap: "40px",
                justifyContent: "center",
              }}>
              <Box sx={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                {["Features", "Pricing", "Questions", "Reviews"].map((text, index) => (
                  <Button
                    key={index}
                    sx={{
                      color: "black",
                      textTransform: "none",
                      fontWeight: "regular",
                      fontSize: "1rem",
                      justifyContent: "center",
                      gap: "5px",
                    }}>
                    {text}
                    <ExpandMoreIcon />
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <SmallButton
                  type="outlined"
                  onClick={() => {
                    signIn(undefined, { callbackUrl: "/dashboard" });
                  }}>
                  Log In
                </SmallButton>
                <SmallButton
                  type="contained"
                  onClick={() => {
                    signIn(undefined, { callbackUrl: "/dashboard" });
                  }}>
                  Sign Up
                </SmallButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Paper>
  );
}
