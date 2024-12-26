import React from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import ReviewCard from "../front-page-components/ReviewCard";

const Reviews = () => {
  const reviews = [
    {
      name: "John Doe",
      title: "Software Engineer",
      rating: 5,
      review:
        "This job tracker app is a game-changer. It has helped me keep track of all my job applications and stay organized throughout the job search process.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Jane Smith",
      title: "Product Manager",
      rating: 4,
      review:
        "I love the user-friendly interface and the ability to set reminders for follow-ups. It has made my job search much more manageable.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Alice Johnson",
      title: "UX Designer",
      rating: 5,
      review:
        "The job tracker app is fantastic! It allows me to track my applications, interviews, and offers all in one place. Highly recommended!",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Bob Brown",
      title: "Data Scientist",
      rating: 4,
      review:
        "A very useful tool for job seekers. The analytics feature gives me insights into my job search progress, which is very motivating.",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Charlie Davis",
      title: "Marketing Specialist",
      rating: 3,
      review:
        "The app is good, but I wish it had more customization options for the dashboard. Overall, it’s still a helpful tool.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Emily Wilson",
      title: "HR Manager",
      rating: 5,
      review:
        "As an HR professional, I find this app incredibly useful for managing my job applications and keeping track of my interactions with potential employers.",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "Frank Thomas",
      title: "Business Analyst",
      rating: 4,
      review:
        "The job tracker app has streamlined my job search process. The ability to store and organize all my job-related documents is a big plus.",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      name: "Grace Lee",
      title: "Sales Executive",
      rating: 5,
      review:
        "I highly recommend this app to anyone looking for a job. It’s easy to use and has all the features you need to stay on top of your job search.",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      name: "Hannah White",
      title: "Graphic Designer",
      rating: 5,
      review:
        "This app has been a lifesaver in keeping my job search organized. The design is intuitive and the features are exactly what I need.",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      name: "Ian Black",
      title: "Financial Analyst",
      rating: 4,
      review:
        "A very practical tool for job seekers. The reminders and tracking features have helped me stay on top of my applications.",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      name: "Jessica Green",
      title: "Content Writer",
      rating: 5,
      review:
        "I love how easy it is to use this app. It has made my job search process so much more efficient and less stressful.",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      name: "Kevin Brown",
      title: "Operations Manager",
      rating: 4,
      review:
        "The app is very helpful for managing job applications. The analytics feature is particularly useful for tracking my progress.",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 8,
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
            fontSize: "1.8rem"
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
