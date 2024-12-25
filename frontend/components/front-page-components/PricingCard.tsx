import React from "react";
import { Container, Box, Typography, Grid, Button, Paper } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import SmallButton from "../general-components/SmallButton";

const PricingCard = ({
  plan,
}: {
  plan: {
    level: string;
    description: string;
    price: string;
    features: string[];
  };
}) => {
  return (
    <Grid item xs={12} md={4}>
      <Paper
        elevation={2}
        sx={{
          textAlign: "center",
          padding: "50px",
          borderRadius: "15px",
        }}>
        <Typography
          variant="h6"
          mb={2}
          sx={{
            color: "black",
            fontWeight: "medium",
            textAlign: "left",
            fontSize: "1.5rem",
          }}>
          {plan.level}
        </Typography>
        <Typography sx={{ color: "black", textAlign: "left", fontSize: "1.1rem" }} mb={3}>
          {plan.description}
        </Typography>
        <Typography
          sx={{ color: "black", textAlign: "left", fontSize: "1.6rem" }}
          variant="h5"
          mb={3}>
          {plan.price}
          <span style={{ fontSize: "1.1rem" }}>/mo or</span> $
          {Number(plan.price.replace("$", "")) * 12}
          <span style={{ fontSize: "1.1rem" }}>/yr</span>
        </Typography>
        <Button
          sx={{
            width: "100%",
            color: "white",
            textTransform: "none",
            fontWeight: "regular",
            fontSize: "1rem",
            borderRadius: "100px",
            backgroundColor: "black",
          }}>
          Subscribe
        </Button>
        <Box
          mt={4}
          sx={{
            display: "flex",
            alignItems: "center",
          }}>
          <Box
            sx={{
              flex: 1,
              height: "1px",
              backgroundColor: "darkgray",
            }}
          />
          <Typography
            mx={2}
            sx={{
              color: "black",
              fontSize: "1.1rem",
            }}>
            Features
          </Typography>
          <Box
            sx={{
              flex: 1,
              height: "1px",
              backgroundColor: "darkgray",
            }}
          />
        </Box>
        <Box mt={3} sx={{ textAlign: "left" }}>
          {plan.features.map((feature: string, index: number) => {
            return (
              <Typography
                mt={1}
                pl={2}
                key={index}
                sx={{
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.1rem",
                  gap: 2,
                }}>
                <FaCheckCircle size="1rem" /> {feature}
              </Typography>
            );
          })}
        </Box>
      </Paper>
    </Grid>
  );
};

export default PricingCard;
