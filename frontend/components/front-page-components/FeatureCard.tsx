import React from "react";
import { Grid, Box, Typography, Paper } from "@mui/material";

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
        elevation={1}
        sx={{
          padding: "40px",
          backgroundColor: "rgb(20,86,57)",
          height: "290px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "15px",
        }}>
        <feature.Icon color="white" size="2.25rem" />
        <Box>
          <Typography
            variant="h6"
            mb={1}
            sx={{
              color: "white",
              fontWeight: "medium",
              fontSize: "1.3rem",
            }}>
            {feature.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "white", fontSize: "1rem", fontWeight: "regular" }}>
            {feature.description}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default FeatureCard;
