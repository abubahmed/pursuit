import React from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import Image from "next/image";
import heroImage from "@/public/images/people-working-as-team-company (9).jpg";

const Hero = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 18,
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
            mb={3}
            sx={{
              color: "black",
              fontWeight: "bold",
            }}>
            We'll Help You Land Your Dream Job
          </Typography>
          <Typography
            variant="body1"
            mb={6}
            sx={{
              color: "black",
              fontWeight: "regular",
              fontSize: "1.1rem",
            }}>
            Manage every step of your job search. Track jobs, set reminders, and get insights to
            land your dream job.
          </Typography>
          <Box mt={6}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#05472A",
                color: "white",
                textTransform: "none",
                borderRadius: "100px",
                padding: "10px 25px",
                fontSize: "1.1rem",
                mr: 3,
              }}>
              Request a Demo
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "black",
                textTransform: "none",
                border: "1px solid black",
                borderRadius: "100px",
                padding: "10px 25px",
                fontSize: "1.1rem",
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
          <Image
            src={heroImage}
            alt="Hero Image"
            style={{ height: "100%", width: "auto", borderRadius: "50px" }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
