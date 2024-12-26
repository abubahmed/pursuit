import React from "react";
import { AppBar, Box, Toolbar, Typography, CssBaseline } from "@mui/material";
import Image from "next/image";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RiMenuUnfold2Line } from "react-icons/ri";

const Navbar = () => {
  const email = "abuahmed0821@gmail.com";
  const name = "Abu Ahmed";
  const profileImage = "https://avatars.githubusercontent.com/u/54769171?v=4";

  return (
    <Box
      sx={{
        width: "100%",
      }}>
      <CssBaseline />
      <AppBar
        sx={{
          position: "static",
          backgroundColor: "white",
          width: "100%",
          py: "5px",
          pr: 2,
          pl: 1,
          boxShadow: "none",
          borderBottom: "2px solid rgba(0,0,0,0.1)",
        }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}>
            <MdOutlineDarkMode color="rgb(0,0,0)" size="1.5rem" />
            <IoSettingsOutline color="rgb(0,0,0)" size="1.5rem" />
            <IoMdNotificationsOutline color="rgb(0,0,0)" size="1.5rem" />
          </Box>
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
