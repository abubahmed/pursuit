import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQPanel = ({
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
        borderTop: top ? "1px solid white" : "none",
        width: "500px",
      }}>
      <AccordionSummary
        sx={{
          px: 0,
        }}
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography
          sx={{
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "medium",
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
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "regular",
          }}>
          {faq.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FAQPanel;
