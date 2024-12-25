import React from "react";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logoImage from "@/public/logos/Pursuit_transparent-.png";
import SmallButton from "../general-components/SmallButton";

const Navbar = () => {
  const email = "abuahmed0821@gmail.com";
  const name = "Abu Ahmed";
  const profileImage = "https://avatars.githubusercontent.com/u/54769171?v=4";

  return (
    <Box
      sx={{
        width: "100%",
      }}>
      <AppBar
        sx={{
          position: "static",
          backgroundColor: "white",
          width: "100%",
          py: "5px",
          boxShadow: "none",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}>
            {" "}
            <Image
              src={profileImage}
              alt="profile image"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Typography
                variant="body1"
                sx={{ color: "black", fontWeight: "regular", fontSize: "1rem" }}>
                {name}
                <Typography
                  variant="body1"
                  sx={{ color: "rgb(70,70,70)", fontWeight: "regular", fontSize: "0.9rem" }}>
                  {email}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
