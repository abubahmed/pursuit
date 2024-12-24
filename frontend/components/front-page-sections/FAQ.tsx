import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  const FAQs = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    },
  ];

  const [expanded, setExpanded] = useState<string | boolean>(false);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
      }}>
      <Box
        mb={3}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
        }}>
        <Box>
          {FAQs.map((faq, index) => {
            if (index % 2 !== 0) {
              return (
                <AccordianPanel
                  key={index}
                  index={index}
                  faq={faq}
                  top={index == 0 || index == 1 ? false : true}
                  onChange={handleChange(`panel${index}`)}
                  expanded={expanded}
                />
              );
            }
          })}
        </Box>
        <Box>
          {FAQs.map((faq, index) => {
            if (index % 2 === 0) {
              return (
                <AccordianPanel
                  key={index}
                  index={index}
                  faq={faq}
                  top={index == 0 || index == 1 ? false : true}
                  onChange={handleChange(`panel${index}`)}
                  expanded={expanded}
                />
              );
            }
          })}
        </Box>
      </Box>
      <Box
        mt={4}
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit? Exercitationem, officiis at{" "}
          <a href="#">
            <span
              style={{
                color: "blue",
                fontWeight: "bold",
              }}>
              email@email.com
            </span>
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

const AccordianPanel = ({
  expanded,
  index,
  faq,
  top,
  onChange,
}: {
  expanded: string | boolean;
  faq: { question: string; answer: string };
  top: boolean;
  onChange?: any;
  index: number;
}) => {
  return (
    <Accordion
      disableGutters
      onChange={onChange}
      expanded={expanded === `panel${index}` ? true : false}
      sx={{
        py: "16px",
        "&:before": {
          display: "none",
        },
        px: 0,
        boxShadow: 0,
        borderRadius: 0,
        backgroundColor: "transparent",
        borderTop: top ? "1px solid gray" : "none",
        width: "500px",
      }}>
      <AccordionSummary
        sx={{
          px: 0,
        }}
        expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography
          sx={{
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "regular",
          }}>
          {faq.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          px: 0,
        }}>
        <Typography
          sx={{
            color: "black",
            fontSize: "1.1rem",
            fontWeight: "light",
          }}>
          {faq.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FAQ;
