import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { FaCircleCheck } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import heroImage from "@/public/images/people-working-as-team-company (1).jpg";

const Hero = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 16,
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
            Lorem, ipsum dolor sit amet adipisicing.
          </Typography>
          <Typography
            variant="body1"
            mb={4}
            sx={{
              color: "black",
              fontWeight: "regular",
              fontSize: "1.2rem",
            }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ratione ducimus,
            labore quo laudantium aperiam.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "14px",
              my: 1.5,
            }}>
            <FaCircleCheck size="1rem" color="black" />
            <Typography
              variant="body1"
              sx={{
                color: "black",
                fontWeight: "regular",
                fontSize: "1.1rem",
                textTransform: "uppercase",
              }}>
              Lorem ipsum dolor sit amet consectetur elit
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "14px",
              my: 1.5,
            }}>
            <FaCircleCheck size="1rem" color="black" />
            <Typography
              variant="body1"
              sx={{
                color: "black",
                fontWeight: "regular",
                fontSize: "1.1rem",
                textTransform: "uppercase",
              }}>
              Sit amet consectetur elit lorem ipsum dolor
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "14px",
              my: 1.5,
            }}>
            <FaCircleCheck size="1rem" color="black" />
            <Typography
              variant="body1"
              sx={{
                color: "black",
                fontWeight: "regular",
                fontSize: "1.1rem",
                textTransform: "uppercase",
              }}>
              Lorem dolor sit amet consectetur dolor elit
            </Typography>
          </Box>
          <Box mt={5}>
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
                fontSize: "1.1rem",
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
                fontSize: "1.1rem",
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
