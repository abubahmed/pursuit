import React from "react";
import { Container, Grid, Box, Typography, Paper } from "@mui/material";
import { FaChartArea } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
  ];

  return (
    <Container>
      <Box
      mb={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography
          variant="h4"
          mb={1.5}
          sx={{
            color: "black",
            fontWeight: "bold",
          }}>
          Lorem ipsum dolor sit.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "regular",
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, officiis.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
            elevation={1}
              sx={{
                padding: "50px",
                py: "40px",
                borderRadius: "15px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}>
              <FaChartArea color="black" size="3rem" />
              <Typography
                variant="h6"
                mb={1.5}
                mt={4}
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                }}>
                {feature.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "black", fontSize: "1.1rem", fontWeight: "regular" }}>
                {feature.description}
              </Typography>
              <Box mt={3}>
                <a href="#" style={{ color: "blue", textDecoration: "none", fontWeight: "bold" }}>
                  Learn More
                </a>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
