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
  FormControlLabel,
  Checkbox,
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

const FullWidthTabs = ({
  setOpen,
  columnVisibility,
  setColumnVisibility,
  initialColumnVisibilityState,
}: {
  setOpen: any;
  columnVisibility: any;
  setColumnVisibility: any;
  initialColumnVisibilityState: any;
}) => {
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
          Filter Job Data
        </Typography>
        <FormControl fullWidth>
          {/* <InputLabel id="demo-simple-select-label">Select Application Status</InputLabel>
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
              "Rejected",
              "Waitlisted",
              "Withdrawn",
              "Other",
            ].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select> */}
          {Object.keys(initialColumnVisibilityState).map((value: any, index: any) => {
            const checked = columnVisibility[value];
            let valueName = value.charAt(0).toUpperCase() + value.slice(1);
            if (value === "url") valueName = "Link";
            if (value === "created_at") valueName = "Added On";
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    name={value}
                    onChange={() => {
                      setColumnVisibility((prev: any) => {
                        return { ...prev, [value]: !checked };
                      });
                      console.log(columnVisibility);
                    }}
                  />
                }
                label={valueName}
              />
            );
          })}
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
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

const FilterDataForm = ({
  open,
  setOpen,
  setColumnVisibility,
  columnVisibility,
  initialColumnVisibilityState,
}: {
  open: boolean;
  setOpen: any;
  setColumnVisibility: any;
  columnVisibility: any;
  initialColumnVisibilityState: any;
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
          <FullWidthTabs
            setOpen={setOpen}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            initialColumnVisibilityState={initialColumnVisibilityState}
          />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default FilterDataForm;
