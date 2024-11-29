import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";

const Hero = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ flexGrow: 1 }}>
        <Box flex={1} pr={{ md: 8 }} mb={{ xs: 8, md: 0 }}>
          <Typography
            variant="h2"
            component="h1"
            mb={4}
            sx={{
              color: "black",
              fontWeight: "bold",
            }}>
            Lorem, ipsum dolor sit amet adipisicing elit lorem.
          </Typography>
          <Typography
            variant="body1"
            mb={5}
            sx={{
              color: "black",
              fontWeight: "regular",
              fontSize: "1.1rem",
            }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ratione ducimus,
            labore quo laudantium aperiam. Ipsum explicabo nisi, sed voluptates natus commodi cumque
            nihil tempora.
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                borderRadius: "100px",
                padding: "10px 25px",
                "&:hover": {
                  backgroundColor: "rgb(60, 60, 60)",
                  boxShadow: "none",
                },
                fontSize: "1rem",
                boxShadow: "none",
                fontWeight: "regular",
                mr: 3,
              }}>
              Request a Demo
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                color: "black",
                textTransform: "none",
                border: "1px solid black",
                borderRadius: "100px",
                padding: "10px 25px",
                fontSize: "1rem",
                fontWeight: "regular",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "rgb(240, 240, 240)",
                  boxShadow: "none",
                },
              }}>
              Sign Up Now
            </Button>
          </Box>
        </Box>
        <Box
          flex={1}
          sx={{
            borderRadius: "30px",
          }}>
          <img
            src="https://placehold.co/1400x1100"
            alt="Hero Image"
            style={{ width: "100%", height: "auto", borderRadius: "40px" }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
