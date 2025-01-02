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
import {
  statusChoices,
  typeChoices,
  modeChoices,
  levelChoices,
  duringChoices,
} from "@/util/pageContent";

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
  setColumnSelection,
  columnSelection,
  setStarredSelection,
  starredSelection,
}: {
  setOpen: any;
  columnVisibility: any;
  setColumnVisibility: any;
  initialColumnVisibilityState: any;
  setColumnSelection: any;
  columnSelection: any;
  setStarredSelection: any;
  starredSelection: any;
}) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("");
  const handleChange = (event: any) => {
    setStatus(event.target.value as string);
  };
  const maxFormHeight = 400;

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
        <FormControl
          fullWidth
          sx={{
            maxHeight: maxFormHeight,
            overflowY: "auto",
          }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={starredSelection}
                name="starred"
                onChange={() => {
                  setStarredSelection((prev: any) => !prev);
                }}
              />
            }
            label="Starred"
          />
          {Object.keys(initialColumnVisibilityState).map((value: any, index: any) => {
            const checked = columnVisibility[value];
            let valueName = value.charAt(0).toUpperCase() + value.slice(1);
            if (value === "url") valueName = "Link";
            if (value === "created_at") valueName = "Added On";
            return (
              <Box key={value} display="flex" alignItems="center" mr={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={columnVisibility[value]}
                      name={value}
                      onChange={() => {
                        setColumnVisibility((prev: any) => {
                          return { ...prev, [value]: !checked };
                        });
                        setColumnSelection((prev: any) => {
                          return { ...prev, [value]: "" };
                        });
                      }}
                    />
                  }
                  label={valueName}
                />
                {checked && value in columnSelection && (
                  <FormControl sx={{ ml: 2, my: 1 }} fullWidth>
                    <InputLabel id={`select-${value}-label`}>Select {valueName}</InputLabel>
                    <Select
                      labelId={`select-${value}-label`}
                      id={`select-${value}`}
                      variant="outlined"
                      value={columnSelection[value]}
                      label={valueName}>
                      {(() => {
                        if (value === "status") {
                          return statusChoices;
                        } else if (value === "type") {
                          return typeChoices;
                        } else if (value === "mode") {
                          return modeChoices;
                        } else if (value === "level") {
                          return levelChoices;
                        } else if (value === "during") {
                          return duringChoices;
                        } else {
                          return [];
                        }
                      })().map((item) => (
                        <MenuItem
                          key={item}
                          value={item}
                          onClick={() => {
                            setColumnSelection((prev: any) => {
                              return { ...prev, [value]: item };
                            });
                          }}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>
            );
          })}
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
          <SmallButton
            type="contained"
            onClick={() => {
              setColumnVisibility(initialColumnVisibilityState);
              setColumnSelection({
                status: "",
                type: "",
                mode: "",
                level: "",
                during: "",
              });
              setStarredSelection(false);
              setOpen(false);
            }}>
            Reset
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

const FilterDataForm = ({
  open,
  setOpen,
  setColumnVisibility,
  columnVisibility,
  initialColumnVisibilityState,
  setColumnSelection,
  columnSelection,
  setStarredSelection,
  starredSelection,
}: {
  open: boolean;
  setOpen: any;
  setColumnVisibility: any;
  columnVisibility: any;
  initialColumnVisibilityState: any;
  setColumnSelection: any;
  columnSelection: any;
  setStarredSelection: any;
  starredSelection: any;
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
            setColumnSelection={setColumnSelection}
            columnSelection={columnSelection}
            setStarredSelection={setStarredSelection}
            starredSelection={starredSelection}
          />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default FilterDataForm;
