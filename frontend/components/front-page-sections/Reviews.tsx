import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import ReviewCard from "../front-page-components/ReviewCard";
import { reviews } from "@/util/pageContent";

const Reviews = () => {
  return (
    <Container
      id="reviews"
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
            fontWeight: "bold",
            fontSize: "2rem",
          }}>
          What Our Customers Have to Say
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}>
        {reviews.map((reviewObject, index) => (
          <ReviewCard key={index} reviewObject={reviewObject} />
        ))}
      </Grid>
    </Container>
  );
};

export default Reviews;
