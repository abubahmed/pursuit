import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
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
          padding: "25px",
          borderRadius: "15px",
          backgroundColor: "rgb(242, 242, 242)",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        <Box>
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
              fontSize: "0.95rem",
              mt: 2.5,
            }}>
            {reviewObject.review}
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
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
                  fontWeight: "regular",
                  fontSize: "0.95rem",
                  textAlign: "right",
                }}>
                {reviewObject.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "black",
                  fontWeight: "light",
                  fontSize: "0.95rem",
                }}>
                {reviewObject.title}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ReviewCard;
