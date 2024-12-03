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
  ];

  const [expanded, setExpanded] = useState<string | boolean>(false);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg">
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
            color: "rgb(230,230,230)",
            fontWeight: "bold",
          }}>
          Lorem ipsum dolor sit.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
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
        py: "20px",
        "&:before": {
          display: "none",
        },
        boxShadow: 0,
        borderRadius: 0,
        backgroundColor: "transparent",
        borderTop: top ? "1px solid rgb(240,240,240)" : "none",
      }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "rgb(240,240,240)" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography
          sx={{
            color: "rgb(240,240,240)",
            fontSize: "1.1rem",
            fontWeight: "regular",
          }}>
          {faq.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          sx={{
            color: "rgb(240,240,240)",
            fontSize: "1.1rem",
            fontWeight: "regular",
          }}>
          {faq.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FAQ;
