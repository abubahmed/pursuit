import React from "react";
import { AppBar, Box, Toolbar, Typography, CssBaseline, Paper } from "@mui/material";
import Image from "next/image";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const Navbar = ({ profileDetails }: { profileDetails: any }) => {
  const {
    email = "",
    first_name = "User",
    last_name = "",
    avatar_url = "http://www.gravatar.com/avatar/?d=mp",
  } = profileDetails;
  const name =
    first_name && last_name ? `${first_name} ${last_name}` : first_name ? first_name : "User";

  return (
    <Paper
      elevation={2}
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
            <Image
              src={avatar_url}
              alt="profile image"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}>
              <Typography
                variant="body1"
                sx={{ color: "black", fontWeight: "regular", fontSize: "1rem" }}>
                {name}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
                {email}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};

export default Navbar;
