import React from "react";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logoImage from "@/public/logos/Pursuit_transparent-.png";
import SmallButton from "../general-components/SmallButton";
import { MdModeNight } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
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
      <AppBar
        sx={{
          position: "static",
          backgroundColor: "white",
          width: "100%",
          py: "5px",
          px: 2,
          boxShadow: "2px 0px 3px rgba(0,0,0,0.3)",
        }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}>
            <RiMenuUnfold2Line color="rgb(0,0,0)" size="1.5rem" />
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
