import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import SmallButton from "../general-components/SmallButton";

const BasicTable = ({ job }: { job: any }) => {
  const [rows, setRows] = useState([]) as any;
  const tableHeight = 500;

  useEffect(() => {
    if (!job) return;
    const rows = [];
    for (let [key, value] of Object.entries(job)) {
      const skipKeys = ["id", "updated_at", "season", "starred", "hidden", "number", "user"];
      if (skipKeys.includes(key)) continue;
      let name = key.charAt(0).toUpperCase() + key.slice(1);
      if (key === "url") name = "Link";
      if (key === "created_at") name = "Added On";
      rows.push({ feature: name, value });
    }
    setRows(rows);
  }, [job]);

  return (
    <TableContainer
      component={Box}
      sx={{
        maxHeight: tableHeight,
        overflowY: "scroll",
      }}>
      <Table
        aria-label="simple table"
        sx={{
          boxShadow: "none",
        }}>
        <TableBody>
          {rows.map((row: any) => {
            if (row.value === null || row.value === "") return null;
            return (
              <TableRow
                key={row.feature}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: "regular",
                    fontSize: "1rem",
                    color: "black",
                  }}>
                  {row.feature}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "regular",
                    fontSize: "1rem",
                    color: "black",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}>
                  {row.value}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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

const FullWidthTabs = ({ setOpen, job }: { setOpen: any; job: any }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%", borderRadius: "15px" }}>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
          }}>
          View Job Details
        </Typography>
        <BasicTable job={job} />
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

const JobInfoModal = ({ open, setOpen, job }: { open: boolean; setOpen: any; job: any }) => {
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
            bgcolor: "background.paper",
          }}
          elevation={2}>
          <FullWidthTabs setOpen={setOpen} job={job} />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default JobInfoModal;
