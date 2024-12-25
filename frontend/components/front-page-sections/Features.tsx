import React from "react";
import { Container, Grid, Box, Typography, Paper } from "@mui/material";
import FeatureCard from "../front-page-components/FeatureCard";
import { FaChartArea } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { RiNotification2Fill } from "react-icons/ri";
import { FaListAlt } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      title: "Sort Jobs Into Seasons",
      description:
        "Separate your job applications by application season to keep track of every job you apply to.",
      Icon: FaBox,
    },
    {
      title: "Priority Job Applications",
      description: "Mark jobs as high priority to keep track of the jobs you love the most.",
      Icon: FaExclamationCircle,
    },
    {
      title: "Get Job Analytics",
      description: "Get insights on your job application progress and see how you can improve.",
      Icon: FaChartArea,
    },
    {
      title: "See Job Characteristics",
      description: "See detailed information about the jobs you applied right in the app.",
      Icon: BsFillInfoSquareFill,
    },
    {
      title: "Get Follow-up Reminders",
      description: "Get reminders for follow-ups and interviews to never miss an opportunity.",
      Icon: RiNotification2Fill,
    },
    {
      title: "Track Your Offers",
      description: "Track the offers you receive and compare them to make the best decision.",
      Icon: FaListAlt,
    },
  ];

  return (
    <Box sx={{
      backgroundColor: "#05472A"
    }}>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          mb={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: "bold",
            }}>
            Our Key Features
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
