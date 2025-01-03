import React from "react";
import { AppBar, Toolbar, Button, Box, Container, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SlArrowDown } from "react-icons/sl";
import logoImage from "@/public/logos/Logo maker project (2).png";
import Image from "next/image";
import SmallButton from "../general-components/SmallButton";
import { signIn } from "next-auth/react";

export default function Navbar() {
  return (
    <Paper sx={{ width: "100%" }} elevation={0}>
      <AppBar
        sx={{
          position: "static",
          backgroundColor: "white",
          boxShadow: "none",
          py: "5px",
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
              <Box
                sx={{
                  display: { xs: "none", md: "none", lg: "flex" },
                  gap: "15px",
                  justifyContent: "center",
                }}>
                {[
                  {
                    text: "Features",
                    link: "features",
                  },
                  {
                    text: "Pricing",
                    link: "pricing",
                  },
                  {
                    text: "Questions",
                    link: "contact",
                  },
                  {
                    text: "Reviews",
                    link: "reviews",
                  },
                ].map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      const element = document.getElementById(item.link);
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                        });
                      } else {
                        console.error(`Element with id ${item.link} not found`);
                      }
                    }}
                    sx={{
                      color: "black",
                      fontWeight: "regular",
                      fontSize: "1rem",
                      justifyContent: "center",
                      textTransform: "none",
                      width: "120px",
                      gap: "5px",
                    }}>
                    {item.text}
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
