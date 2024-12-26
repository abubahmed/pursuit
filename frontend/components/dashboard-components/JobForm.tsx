import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%", borderRadius: "15px" }}>
      <AppBar
        position="static"
        sx={{
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          backgroundColor: "white",
          color: "black",
          boxShadow: 2,
        }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          sx={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            backgroundColor: "white",
            color: "black",
            "& .Mui-selected": {
              color: "#05472A",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#05472A",
            },
            fontWeight: "regular",
            fontSize: "1rem",
          }}
          aria-label="full width tabs example">
          <Tab
            label="Add by URL"
            {...a11yProps(0)}
            sx={{
              color: "black",
              fontSize: "1rem",
              fontWeight: "medium",
              textTransform: "none",
            }}
          />
          <Tab
            label="Add by Text"
            {...a11yProps(1)}
            sx={{
              color: "black",
              fontSize: "1rem",
              fontWeight: "medium",
              textTransform: "none",
            }}
          />
          <Tab
            label="Add by File"
            {...a11yProps(2)}
            sx={{
              color: "black",
              fontSize: "1rem",
              fontWeight: "medium",
              textTransform: "none",
            }}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            my: 1,
          }}>
          Add Job by URL
        </Typography>
        <TextField label="Enter URL" variant="outlined" fullWidth />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
          <SmallButton type="contained">Submit</SmallButton>
          <SmallButton type="outlined">Cancel</SmallButton>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            my: 1,
          }}>
          Add Job by Text
        </Typography>
        <TextField label="Enter Job Description" variant="outlined" fullWidth multiline rows={8} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
          <SmallButton type="contained">Submit</SmallButton>
          <SmallButton type="outlined">Cancel</SmallButton>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
          Add Job by File
        </Typography>
        <SmallButton type="outlined">
          Upload File
          <input type="file" hidden accept="image/*,.pdf,.doc,.docx" />
        </SmallButton>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
          <SmallButton type="contained">Submit</SmallButton>
          <SmallButton type="outlined">Cancel</SmallButton>
        </Box>
      </TabPanel>
    </Box>
  );
}

export default function TransitionsModal({ open, setOpen }: { open: boolean; setOpen: any }) {
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
