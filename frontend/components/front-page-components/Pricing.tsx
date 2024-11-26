import React from "react";
import { Container, Box, Typography, Grid, Button, Paper } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";

const Pricing = () => {
  const pricing: any = [
    {
      level: "Premium",
      description: "Lorem ipsum dolor sit amet lorem adipisicing elit. Exercitationem officiis.",
      price: "$30",
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem adipiscing elit",
        "Sed do eiusmod tempor",
        "Ut enim ad minim veniam",
      ],
    },
    {
      level: "Basic",
      description: "Lorem ipsum dolor sit amet lorem adipisicing elit. Exercitationem, officiis.",
      price: "$10",
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem adipiscing elit",
        "Sed do eiusmod tempor",
        "Ut enim ad minim veniam",
      ],
    },
  ];
  return (
    <Container maxWidth="lg">
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
          mb={1.5}
          sx={{
            color: "black",
            fontWeight: "bold",
          }}>
          Lorem ipsum dolor sit.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "regular",
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, officiis.
        </Typography>
      </Box>
      <Grid
        container
        spacing={6}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}>
        {pricing.map((plan: any, index: any) => {
          return (
            <Grid item xs={12} md={5} key={index}>
              <Paper
                elevation={1}
                sx={{
                  textAlign: "center",
                  borderRadius: "15px",
                  padding: "50px",
                }}>
                <Typography
                  variant="h5"
                  mb={3}
                  sx={{ color: "black", fontWeight: "medium", textAlign: "left" }}>
                  {plan.level}
                </Typography>
                <Typography sx={{ color: "black", textAlign: "left", fontSize: "1.1rem" }} mb={3}>
                  {plan.description}
                </Typography>
                <Typography
                  sx={{ color: "black", textAlign: "left", fontSize: "1.6rem" }}
                  variant="h5"
                  mb={3}>
                  {plan.price}
                  <span style={{ fontSize: "1.1rem" }}>/mo or</span> $
                  {Number(plan.price.replace("$", "")) * 12}
                  <span style={{ fontSize: "1.1rem" }}>/yr</span>
                </Typography>
                <Button
                  sx={{
                    width: "100%",
                    color: "white",
                    textTransform: "none",
                    fontWeight: "regular",
                    fontSize: "1rem",
                    borderRadius: "100px",
                    backgroundColor: "black",
                  }}>
                  Subscribe
                </Button>
                <Box
                  mt={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}>
                  <Box
                    sx={{
                      flex: 1,
                      height: "1px",
                      backgroundColor: "darkgray",
                    }}
                  />
                  <Typography
                    mx={2}
                    sx={{
                      color: "black",
                      fontSize: "1.1rem",
                    }}>
                    Features
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      height: "1px",
                      backgroundColor: "darkgray",
                    }}
                  />
                </Box>
                <Box mt={3} sx={{ textAlign: "left" }}>
                  {plan.features.map((feature: any, index: any) => {
                    return (
                      <Typography
                        mt={1}
                        pl={2}
                        key={index}
                        sx={{
                          color: "black",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "1.1rem",
                          gap: 1.5,
                        }}>
                        <FaCheckCircle /> {feature}
                      </Typography>
                    );
                  })}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Box
        mt={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
        <Typography
          variant="body1"
          sx={{
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "regular",
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit? Exercitationem, officiis at <a href="#"><span style={{
            color: "blue",
            fontWeight: "bold",
          }}>email@email.com</span></a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Pricing;
