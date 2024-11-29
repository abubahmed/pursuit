import React from "react";
import { Container, Box, Typography, Grid, Link, TextField, Button } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "space-between",
        mb: 6,
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}>
        <Typography
          variant="h5"
          sx={{
            color: "black",
            fontWeight: "bold",
          }}>
          Lorem ipsum dolor sit
          <br /> lorem dolor.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: 2,
          }}>
          <div className="TextField-without-border-radius">
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "5px 15px",
                color: "black",
                fontSize: "1rem",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                p: 0,
              }}
            />
          </div>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              padding: "5px 15px",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              border: "1px solid black",
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}>
        <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", fontSize: "1rem" }}>
          Lorem Ipsum
        </Typography>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}>
        <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", fontSize: "1rem" }}>
          Lorem Ipsum
        </Typography>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}>
        <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", fontSize: "1rem" }}>
          Lorem Ipsum
        </Typography>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          Dolor sit
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}>
        <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", fontSize: "1rem" }}>
          Lorem Ipsum
        </Typography>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          email@email.com
        </Link>
        <Link href="#" sx={{ color: "black", fontWeight: "regular", fontSize: "0.9rem" }}>
          1-800-123-4567
        </Link>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}>
          <FaFacebook color="black" size="1.1rem" />
          <FaTwitter color="black" size="1.1rem" />
          <FaInstagram color="black" size="1.1rem" />
          <FaYoutube color="black" size="1.1rem" />
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
