import React from "react";
import { AppBar, Toolbar, Button, Box, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logoImage from "@/public/logos/Pursuit_transparent-.png";
import Image from "next/image";
import SmallButton from "../general-components/SmallButton";

export default function Navbar() {
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        sx={{
          position: "static",
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          py: "5px",
        }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between" }}>
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
                      fontWeight: "regular",
                      fontSize: "1rem",
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
                <SmallButton type="outlined">Log In</SmallButton>
                <SmallButton type="contained">Sign Up</SmallButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
