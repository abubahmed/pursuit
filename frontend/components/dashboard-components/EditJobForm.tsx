import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import SmallButton from "../general-components/SmallButton";
import { editJob } from "@/util/apiRequests";
import useApi from "@/util/apiClient";
import { statusChoices } from "@/util/pageContent";

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

const FullWidthTabs = ({ setOpen, handleEditJob }: { setOpen: any; handleEditJob: any }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("");
  const handleChange = (event: any) => {
    setStatus(event.target.value as string);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%", borderRadius: "15px" }}>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
          }}>
          Edit Application Status
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Application Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Age"
            onChange={handleChange}>
            {statusChoices.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
          <SmallButton
            type="contained"
            onClick={async () => {
              console.log(status);
              await handleEditJob({ status });
            }}>
            Submit
          </SmallButton>
          <SmallButton
            type="outlined"
            onClick={() => {
              setOpen(false);
            }}>
            Cancel
          </SmallButton>
        </Box>
      </TabPanel>
    </Box>
  );
};

const EditJobForm = ({
  open,
  setOpen,
  jobId,
  refetchJobs,
}: {
  open: boolean;
  setOpen: any;
  jobId: number | null;
  refetchJobs: any;
}) => {
  const [loading, setLoading] = useState(false);
  const apiClient = useApi({ useToken: true });
  const handleEditJob = async ({ status }: { status: string | null }) => {
    if (loading) return;
    try {
      const { message } = await editJob({ apiClient, jobId, status, starred: null, hidden: null });
      console.log(message);
      await refetchJobs();
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

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
          <FullWidthTabs setOpen={setOpen} handleEditJob={handleEditJob} />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default EditJobForm;
