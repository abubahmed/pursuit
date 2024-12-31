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
} from "@mui/material";
import SmallButton from "../general-components/SmallButton";
import useApi from "@/util/apiClient";
import { addJobUrl, addJobText } from "@/util/apiRequests";
import { useState } from "react";

const TabPanel = (props: {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}) => {
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
};

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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
      const response = await addJobUrl({ apiClient, seasonId: currentSeason, jobUrl });
      console.log(response);
      await refetchJobs();
    } catch (error) {
      console.error(error);
    } finally {
      setJobUrl("");
      setOpen(false);
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
      const response = await addJobText({ apiClient, seasonId: currentSeason, jobText });
      console.log(response);
      await refetchJobs();
    } catch (error) {
      console.error(error);
    } finally {
      setJobText("");
      setOpen(false);
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
            mb: 2,
          }}>
          Add Job by URL
        </Typography>
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
          <SmallButton
            type="contained"
            onClick={async () => {
              await handleAddJobUrl({ apiClient, currentSeason, jobUrl, refetchJobs });
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
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
          }}>
          Add Job by Text
        </Typography>
        <TextField
          label="Enter Job Description"
          variant="outlined"
          fullWidth
          multiline
          rows={6}
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
          <SmallButton
            type="contained"
            onClick={async () => {
              await handleAddJobText({ apiClient, currentSeason, jobText, refetchJobs });
            }}>
            Submit
          </SmallButton>
          <SmallButton
            type="outlined"
            onClick={() => {
              setOpen(false);
              setJobText("");
              setJobUrl("");
              setJobFile(null);
            }}>
            Cancel
          </SmallButton>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Add Job by File
        </Typography>
        <SmallButton type="outlined">
          Upload File
          <input type="file" hidden accept="image/*,.pdf,.doc,.docx" />
        </SmallButton>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
          <SmallButton type="contained">Submit</SmallButton>
          <SmallButton
            type="outlined"
            onClick={() => {
              setOpen(false);
              setJobText("");
              setJobUrl("");
              setJobFile(null);
            }}>
            Cancel
          </SmallButton>
        </Box>
      </TabPanel>
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
