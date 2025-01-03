import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  Paper,
  AppBar,
  Tabs,
  Tab,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import SmallButton from "../general-components/SmallButton";
import useApi from "@/util/apiClient";
import { addJobUrl, addJobText } from "@/util/apiRequests";
import { useState } from "react";

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const FullWidthTabs = ({
  currentSeason,
  setOpen,
  refetchJobs,
  loading,
  setLoading,
}: {
  currentSeason: number | null;
  setOpen: any;
  refetchJobs: any;
  loading: boolean;
  setLoading: any;
}) => {
  const theme = useTheme();
  const [jobUrl, setJobUrl] = useState("");
  const [jobText, setJobText] = useState("");
  const [jobFile, setJobFile] = useState(null);
  const [value, setValue] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setJobFile(null);
    setJobUrl("");
    setJobText("");
    setAlertOpen(false);
    setAlertText("");
    setValue(newValue);
  };
  const apiClient = useApi({ useToken: true });

  const handleAddJobUrl = async ({
    apiClient,
    currentSeason,
    jobUrl,
    refetchJobs,
  }: {
    apiClient: any;
    currentSeason: number | null;
    jobUrl: string;
    refetchJobs: any;
  }) => {
    if (loading) return;
    setLoading(true);
    try {
      const { message, job, code } = await addJobUrl({
        apiClient,
        seasonId: currentSeason,
        jobUrl,
      });
      if (code && code.includes("ERR")) {
        setAlertOpen(true);
        setAlertText(message);
      }
      if (code && code === "SUCCESS_ADD_JOB_URL") {
        await refetchJobs();
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setJobUrl("");
      setLoading(false);
    }
  };

  const handleAddJobText = async ({
    apiClient,
    currentSeason,
    jobText,
    refetchJobs,
  }: {
    apiClient: any;
    currentSeason: number | null;
    jobText: string;
    refetchJobs: any;
  }) => {
    if (loading) return;
    setLoading(true);
    try {
      const { message, code, job } = await addJobText({
        apiClient,
        seasonId: currentSeason,
        jobText,
      });
      if (code && code.includes("ERR")) {
        setAlertOpen(true);
        setAlertText(message);
      }
      if (code && code === "SUCCESS_ADD_JOB_TEXT") {
        await refetchJobs();
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setJobText("");
      setLoading(false);
    }
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
            "& .Mui-selected": { color: "#05472A" },
            "& .MuiTabs-indicator": { backgroundColor: "#05472A" },
            fontWeight: "regular",
            fontSize: "1rem",
          }}
          aria-label="full width tabs example">
          {["Add by URL", "Add by Text"].map((label, index) => (
            <Tab
              key={index}
              label={label}
              {...a11yProps(index)}
              sx={{
                color: "black",
                fontSize: "1rem",
                fontWeight: "medium",
                textTransform: "none",
              }}
            />
          ))}
        </Tabs>
      </AppBar>
      <Box
        sx={{
          p: 3,
        }}
        dir={theme.direction}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
          }}>
          Add Job by {value === 0 ? "URL" : value === 1 ? "Text" : "File"}
        </Typography>
        {value === 0 ? (
          <TextField
            label="Enter URL"
            variant="outlined"
            fullWidth
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
          />
        ) : value === 1 ? (
          <TextField
            label="Enter Job Description"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
          />
        ) : (
          <SmallButton type="outlined">
            Upload File
            <input type="file" hidden accept="image/*,.pdf,.doc,.docx" />
          </SmallButton>
        )}
        {alertOpen && (
          <Alert
            severity="error"
            sx={{
              fontWeight: "regular",
              fontSize: "0.95rem",
              py: 1,
              mt: 2,
            }}>
            {alertText}
          </Alert>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
          <SmallButton
            type="contained"
            onClick={async () => {
              if (value === 0) {
                await handleAddJobUrl({ apiClient, currentSeason, jobUrl, refetchJobs });
              } else if (value === 1) {
                await handleAddJobText({ apiClient, currentSeason, jobText, refetchJobs });
              }
            }}>
            Submit
          </SmallButton>
          <SmallButton
            type="outlined"
            onClick={() => {
              setOpen(false);
              setJobUrl("");
              setLoading(false);
            }}>
            Cancel
          </SmallButton>
        </Box>
      </Box>
    </Box>
  );
};

const AddJobForm = ({
  open,
  setOpen,
  currentSeason,
  refetchJobs,
}: {
  open: boolean;
  setOpen: any;
  currentSeason: number | null;
  refetchJobs: any;
}) => {
  const [loading, setLoading] = useState(false);

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
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                zIndex: 2,
                borderRadius: "15px",
              }}>
              <CircularProgress
                size="3rem"
                sx={{
                  color: "rgb(20,86,57)",
                }}
              />
            </Box>
          )}
          <FullWidthTabs
            currentSeason={currentSeason}
            setOpen={setOpen}
            refetchJobs={refetchJobs}
            loading={loading}
            setLoading={setLoading}
          />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default AddJobForm;
