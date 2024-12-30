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
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import SmallButton from "../general-components/SmallButton";

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

const FullWidthTabs = ({ setOpen }: { setOpen: any }) => {
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
            {[
              "Research",
              "Applied",
              "Interview",
              "Assessment",
              "Offer",
              "Rejection",
              "Waitlisted",
              "Other",
              "Withdrawn",
            ].map((status) => (
              <MenuItem key={status} value={status.toLowerCase()}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
          <SmallButton type="contained">Submit</SmallButton>
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
}: {
  open: boolean;
  setOpen: any;
  jobId: number | null;
}) => {
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
          <FullWidthTabs setOpen={setOpen} />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default EditJobForm;
