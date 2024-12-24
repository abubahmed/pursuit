import React from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import ReviewCard from "../front-page-components/ReviewCard";

const Reviews = () => {
  const reviews = [
    {
      name: "Lorem Ipsum",
      title: "Lorem Ipsum dolor sit",
      rating: 5,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Lorem Ipsum",
      title: "Lorem Ipsum dolor sit",
      rating: 4,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Lorem Ipsum",
      title: "Lorem Ipsum dolor sit",
      rating: 3,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Lorem Ipsum",
      title: "Lorem Ipsum dolor sit",
      rating: 2,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Lorem Ipsum",
      title: "Lorem Ipsum dolor sit",
      rating: 1,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Lorem Ipsum",
      title: "Lorem Ipsum dolor sit",
      rating: 5,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Lorem Ipsum",
      title: "Lorem Ipsum dolor sit",
      rating: 4,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Lorem Ipsum",
      title: "Lorem Ipsum dolor sit",
      rating: 3,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{
      py: 6,
      pb: 10
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
          Lorem ipsum dolor sit.
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
