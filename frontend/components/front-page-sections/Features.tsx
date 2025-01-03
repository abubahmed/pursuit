import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import FeatureCard from "../front-page-components/FeatureCard";
import { features } from "@/util/pageContent";

const Features = () => {
  return (
    <Box
      id="features"
      sx={{
        backgroundColor: "#05472A",
      }}>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          mb={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "2rem",
            }}>
            Key Features
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
