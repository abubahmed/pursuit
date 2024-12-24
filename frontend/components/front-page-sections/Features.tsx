import React from "react";
import { Container, Grid, Box, Typography, Paper } from "@mui/material";
import { FaChartArea } from "react-icons/fa";
import FeatureCard from "../front-page-components/FeatureCard";

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
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        mb={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography
          variant="h4"
          sx={{
            color: "black",
            fontWeight: "bold",
          }}>
          Lorem ipsum dolor sit.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
