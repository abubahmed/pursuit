import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SmallButton from "../general-components/SmallButton";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%", borderRadius: "15px" }}>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
          }}>
          Create New Season
        </Typography>
        <TextField label="Enter New Season Name" variant="outlined" fullWidth />
        <TextField
          label="Enter New Season Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          sx={{
            mt: 2,
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
          <SmallButton type="contained">Submit</SmallButton>
          <SmallButton type="outlined">Cancel</SmallButton>
        </Box>
      </TabPanel>
    </Box>
  );
}

export default function SeasonTransitionsModal({ open, setOpen }: { open: boolean; setOpen: any }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={open}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            borderRadius: "15px",
            border: "none",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
          }}
          elevation={2}>
          <FullWidthTabs />
        </Paper>
      </Fade>
    </Modal>
  );
}
