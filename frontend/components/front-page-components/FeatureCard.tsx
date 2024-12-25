import React from "react";
import { Container, Grid, Box, Typography, Paper } from "@mui/material";

const FeatureCard = ({
  feature,
}: {
  feature: {
    title: string;
    description: string;
    Icon: React.ReactNode | any;
  };
}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        elevation={0}
        sx={{
          padding: "40px",
          borderRadius: "10px",
          backgroundColor: "rgb(20,86,57)",
        }}>
        <feature.Icon color="white" size="2.5rem" />
        <Typography
          variant="h6"
          mb={1}
          mt={8}
          sx={{
            color: "white",
            fontWeight: "medium",
            fontSize: "1.5rem",
          }}>
          {feature.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "white", fontSize: "1.1rem", fontWeight: "regular" }}>
          {feature.description}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default FeatureCard;
