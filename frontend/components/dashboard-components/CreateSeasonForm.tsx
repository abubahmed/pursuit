import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import SmallButton from "../general-components/SmallButton";
import { createSeason } from "@/util/apiRequests";
import useApi from "@/util/apiClient";

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
  loading,
  setLoading,
  refetchSeasons,
}: {
  setOpen: any;
  loading: boolean;
  setLoading: any;
  refetchSeasons: any;
}) => {
  const theme = useTheme();
  const [seasonName, setSeasonName] = useState("");
  const [seasonDescription, setSeasonDescription] = useState("");
  const apiClient = useApi({ useToken: true });

  const handleCreateSeason = async ({
    apiClient,
    seasonName,
    seasonDescription,
  }: {
    apiClient: any;
    seasonName: string | null;
    seasonDescription: string | null;
  }) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await createSeason({ apiClient, seasonName, seasonDescription });
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setSeasonDescription("");
      setSeasonName("");
      setOpen(false);
      setLoading(false);
      refetchSeasons();
    }
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%", borderRadius: "15px" }}>
      <TabPanel value={0} index={0} dir={theme.direction}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
          }}>
          Create New Season
        </Typography>
        <TextField
          label="Enter New Season Name"
          variant="outlined"
          fullWidth
          value={seasonName}
          onChange={(e) => setSeasonName(e.target.value)}
        />
        <TextField
          label="Enter New Season Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          sx={{
            mt: 2,
          }}
          value={seasonDescription}
          onChange={(e) => setSeasonDescription(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
          <SmallButton
            type="contained"
            onClick={async () => {
              await handleCreateSeason({ apiClient, seasonName, seasonDescription });
            }}>
            Submit
          </SmallButton>
          <SmallButton
            type="outlined"
            onClick={() => {
              setOpen(false);
              setSeasonDescription("");
              setSeasonName("");
            }}>
            Cancel
          </SmallButton>
        </Box>
      </TabPanel>
    </Box>
  );
};

const CreateSeasonForm = ({
  open,
  setOpen,
  refetchSeasons,
}: {
  open: boolean;
  setOpen: any;
  refetchSeasons: any;
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
            setOpen={setOpen}
            loading={loading}
            setLoading={setLoading}
            refetchSeasons={refetchSeasons}
          />
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CreateSeasonForm;
