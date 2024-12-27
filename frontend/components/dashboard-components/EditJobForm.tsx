import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SmallButton from "../general-components/SmallButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
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
            <MenuItem value="research">Research</MenuItem>
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="interview">Interview</MenuItem>
            <MenuItem value="assessment">Assessment</MenuItem>
            <MenuItem value="offer">Offer</MenuItem>
            <MenuItem value="rejection">Rejection</MenuItem>
            <MenuItem value="waitlist">Waitlist</MenuItem>
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

const EditJobForm = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
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
