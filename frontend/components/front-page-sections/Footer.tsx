import React from "react";
import { Container, Box, Typography, Grid, Link, TextField, Button } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        pt: 8,
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "space-between",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Typography
            variant="h5"
            sx={{
              color: "white",
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
                color: "white",
                fontSize: "1rem",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                p: 0,
                "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
                },
              }}
              />
            </div>
            <Button
              sx={{
                backgroundColor: "rgb(40,40,40)",
                color: "white",
                textTransform: "none",
                padding: "5px 15px",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                border: "1px solid rgb(40,40,40)",
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
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
            Lorem Ipsum
          </Typography>
          {[
            { text: "Dolor sit", href: "#" },
            { text: "Dolor sit", href: "#" },
            { text: "Dolor sit", href: "#" },
            { text: "Dolor sit", href: "#" },
          ].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              sx={{
                color: "white",
                fontWeight: "regular",
                fontSize: "1rem",
                textDecoration: "none",
              }}>
              {link.text}
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
            Lorem Ipsum
          </Typography>
          {[
            { text: "Dolor sit", href: "#" },
            { text: "Dolor sit", href: "#" },
            { text: "Dolor sit", href: "#" },
            { text: "Dolor sit", href: "#" },
          ].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              sx={{
                color: "white",
                fontWeight: "regular",
                fontSize: "1rem",
                textDecoration: "none",
              }}>
              {link.text}
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
            Lorem Ipsum
          </Typography>
          {[
            { text: "Dolor sit", href: "#" },
            { text: "Dolor sit", href: "#" },
            { text: "Dolor sit", href: "#" },
            { text: "Dolor sit", href: "#" },
          ].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              sx={{
                color: "white",
                fontWeight: "regular",
                fontSize: "1rem",
                textDecoration: "none",
              }}>
              {link.text}
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
            Lorem Ipsum
          </Typography>
          <Link
            href="#"
            sx={{
              color: "white",
              fontWeight: "regular",
              fontSize: "1rem",
              textDecoration: "none",
            }}>
            email@email.com
          </Link>
          <Link
            href="#"
            sx={{
              color: "white",
              fontWeight: "regular",
              fontSize: "1rem",
              textDecoration: "none",
            }}>
            1-800-123-4567
          </Link>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}>
            <FaFacebook color="white" size="1.1rem" />
            <FaTwitter color="white" size="1.1rem" />
            <FaInstagram color="white" size="1.1rem" />
            <FaYoutube color="white" size="1.1rem" />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          px: "15%",
        }}>
        {["© 2024 Copyright. All Rights Reserved.", "Privacy Policy", "Terms of Service"].map((text, index) => (
          <Typography
            key={index}
            sx={{
              color: "white",
              fontWeight: "regular",
              fontSize: "1rem",
              textAlign: "center",
            }}>
            {text}
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default Footer;
