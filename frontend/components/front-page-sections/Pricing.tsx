import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import PricingCard from "../front-page-components/PricingCard";

const Pricing = () => {
  const pricing: any = [
    {
      level: "Free",
      description:
        "Free plan for early-careerists and casual job searchers to get started with job applications.",
      price: "$0",
      features: [
        "10 job applications/week",
        "1 job season",
        "Limited analytics",
        "Limited job characteristics",
      ],
    },
    {
      level: "Basic",
      description:
        "Basic plan for active job seekers to keep track of multiple, concurrent job applications.",
      price: "$10",
      features: [
        "100 job applications/week",
        "Unlimited job seasons",
        "Full analytics",
        "Full job characteristics",
      ],
    },
    {
      level: "Premium",
      description:
        "Premium plan for active job seekers who want to get the most out of their job search.",
      price: "$30",
      features: [
        "Unlimited job applications",
        "Unlimited job seasons",
        "Full analytics",
        "Full job characteristics",
      ],
    },
  ];
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 10,
      }}>
      <Box
        mb={5}
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
      <Box
        mt={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}></Box>
    </Container>
  );
};

export default Pricing;
