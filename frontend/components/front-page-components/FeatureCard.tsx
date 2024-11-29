import React from "react";
import { Container, Grid, Box, Typography, Paper } from "@mui/material";
import { FaChartArea } from "react-icons/fa";

const Feature = ({
  key,
  feature,
}: {
  key: number;
  feature: {
    title: string;
    description: string;
  };
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} key={key}>
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
  );
};

export default Feature;
