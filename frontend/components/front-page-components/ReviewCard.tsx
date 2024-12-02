import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({
  reviewObject,
}: {
  reviewObject: {
    name: string;
    title: string;
    rating: number;
    review: string;
    image: string;
  };
}) => {
  return (
    <Grid item xs={12} md={3}>
      <Paper
        elevation={0}
        sx={{
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "rgb(248, 248, 248)",
        }}>
        <Box
          sx={{
        display: "flex",
          }}>
          {[...Array(reviewObject.rating)].map((_, i) => (
        <FaStar key={i} color="gold" size="1rem" />
          ))}
        </Box>
        <Typography
          variant="body1"
          sx={{
        color: "black",
        fontWeight: "regular",
        fontSize: "1rem",
        mt: 2.5,
          }}>
          {reviewObject.review}
        </Typography>
        <Box
          sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 4,
          }}>
          <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
        <img
          src={reviewObject.image}
          alt="reviewer"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        />
          </Box>
          <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}>
        <Typography
          variant="body1"
          sx={{
            color: "black",
            fontWeight: "bold",
            fontSize: "1rem",
            textAlign: "right",
          }}>
          {reviewObject.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "black",
            fontWeight: "regular",
            fontSize: "1rem",
          }}>
          {reviewObject.title}
        </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ReviewCard;
