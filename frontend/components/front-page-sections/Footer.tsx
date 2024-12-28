import React from "react";
import { Container, Box, Typography, Link, TextField, Button } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { footer } from "@/data/data";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(20,20,20)",
      }}>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          pt: 6,
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
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "semibold",
              }}>
              Subscribe to our newsletter
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
                  padding: "6px 15px",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  border: "1px solid rgb(40,40,40)",
                  "&:hover": {
                    backgroundColor: "rgb(60, 60, 60)",
                    boxShadow: "none",
                  },
                  boxShadow: "none",
                  fontWeight: "regular",
                  fontSize: "0.95rem",
                }}>
                Sign Up
              </Button>
            </Box>
          </Box>
          {footer.map((section, sectionIndex) => (
            <Box
              key={sectionIndex}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}>
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: "semibold", fontSize: "1rem" }}>
                {section.title}
              </Typography>
              {section.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.href}
                  sx={{
                    color: "white",
                    fontWeight: "regular",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                  }}>
                  {link.text}
                </Link>
              ))}
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "semibold", fontSize: "1rem" }}>
              Contact Us
            </Typography>
            {["support@pursuit.com", "1-800-123-4567"].map((contact, index) => (
              <Link
                key={index}
                href="#"
                sx={{
                  color: "white",
                  fontWeight: "regular",
                  fontSize: "0.95rem",
                  textDecoration: "none",
                }}>
                {contact}
              </Link>
            ))}
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
          {["© 2024 Company Name. All Rights Reserved.", "Privacy Policy", "Terms of Service"].map(
            (text, index) => (
              <Typography
                key={index}
                sx={{
                  color: "white",
                  fontWeight: "regular",
                  fontSize: "0.95rem",
                  textAlign: "center",
                }}>
                {text}
              </Typography>
            )
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
