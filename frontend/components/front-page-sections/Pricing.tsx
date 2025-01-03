import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import PricingCard from "../front-page-components/PricingCard";
import { pricing } from "@/util/pageContent";

const Pricing = () => {
  return (
    <Container
      id="pricing"
      maxWidth="lg"
      sx={{
        py: 10,
      }}>
      <Box
        mb={6}
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
            fontSize: "2rem",
            fontWeight: "bold",
          }}>
          Pricing Plans
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
