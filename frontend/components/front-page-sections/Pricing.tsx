import React from "react";
import { Container, Box, Typography, Grid, Button, Paper } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import PricingCard from "../front-page-components/PricingCard";

const Pricing = () => {
  const pricing: any = [
    {
      level: "Free",
      description: "Lorem ipsum dolor sit amet lorem adipisicing elit. Exercitationem officiis.",
      price: "$0",
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem adipiscing elit",
        "Sed do eiusmod tempor",
        "Ut enim ad minim veniam",
      ],
    },
    {
      level: "Basic",
      description: "Lorem ipsum dolor sit amet lorem adipisicing elit. Exercitationem officiis.",
      price: "$30",
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem adipiscing elit",
        "Sed do eiusmod tempor",
        "Ut enim ad minim veniam",
      ],
    },
    {
      level: "Premium",
      description: "Lorem ipsum dolor sit amet lorem adipisicing elit. Exercitationem, officiis.",
      price: "$10",
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem adipiscing elit",
        "Sed do eiusmod tempor",
        "Ut enim ad minim veniam",
      ],
    },
  ];
  return (
    <Container maxWidth="lg">
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
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}>
        {pricing.map((plan: {
          level: string;
          description: string;
          price: string;
          features: string[];
        }, index: number) => {
          return (
            <PricingCard
              key={index}
              plan={plan}
            />
          );
        })}
      </Grid>
      <Box
        mt={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
        <Typography
          variant="body1"
          sx={{
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "regular",
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit? Exercitationem, officiis at{" "}
          <a href="#">
            <span
              style={{
                color: "blue",
                fontWeight: "bold",
              }}>
              email@email.com
            </span>
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Pricing;
