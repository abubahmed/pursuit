import React from "react";
import { Container, Grid, Box, Typography, Paper } from "@mui/material";
import { FaChartArea } from "react-icons/fa";

const FeatureCard = ({
  feature,
}: {
  feature: {
    title: string;
    description: string;
  };
}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        elevation={0}
        sx={{
          padding: "50px",
          py: "40px",
          borderRadius: "15px",
          backgroundColor: "rgb(20, 70, 54)",
        }}>
        <FaChartArea color="rgb(240,240,240)" size="2.5rem" />
        <Typography
          variant="h6"
          mb={2}
          mt={4}
          sx={{
            color: "rgb(240,240,240)",
            fontWeight: "bold",
            fontSize: "1.3rem",
          }}>
          {feature.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "rgb(240,240,240)", fontSize: "1.1rem", fontWeight: "regular" }}>
          {feature.description}
        </Typography>
        <Box mt={3}>
          <a href="#" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
            Learn More
          </a>
        </Box>
      </Paper>
    </Grid>
  );
};

export default FeatureCard;
