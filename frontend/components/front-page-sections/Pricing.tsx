import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import PricingCard from "../front-page-components/PricingCard";
import { pricing } from "@/data/data";

const Pricing = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 8,
      }}>
      <Box
        mb={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
        <Typography
          variant="h4"
          sx={{
            color: "black",
            fontSize: "1.8rem",
            fontWeight: "bold",
          }}>
          Our Pricing Plans
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}>
        {pricing.map(
          (
            plan: {
              level: string;
              description: string;
              price: string;
              features: string[];
            },
            index: number
          ) => {
            return <PricingCard key={index} plan={plan} />;
          }
        )}
      </Grid>
    </Container>
  );
};

export default Pricing;
