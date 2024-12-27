import { Box, Container, Grid, Typography, Divider, Paper, Button } from "@mui/material";
import SmallButton from "../general-components/SmallButton";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import JobTransitionsModal from "../dashboard-components/JobForm";
import SeasonTransitionsModal from "../dashboard-components/SeasonForm";
import { useState } from "react";
import BasicPopover from "../dashboard-components/ConfirmationPopup";
import Popover from "@mui/material/Popover";

const paginationModel = { page: 0, pageSize: 10 };
const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Facebook",
    location: "Menlo Park, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "Amazon",
    location: "Seattle, WA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "Apple",
    location: "Cupertino, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 5,
    title: "Software Engineer",
    company: "Microsoft",
    location: "Redmond, WA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 6,
    title: "Software Engineer",
    company: "Netflix",
    location: "Los Gatos, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 7,
    title: "Software Engineer",
    company: "Twitter",
    location: "San Francisco, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 8,
    title: "Software Engineer",
    company: "LinkedIn",
    location: "Sunnyvale, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 9,
    title: "Software Engineer",
    company: "Uber",
    location: "San Francisco, CA",
    date: "2021-10-01",
    status: "Applied",
  },
  {
    id: 10,
    title: "Software Engineer",
    company: "Lyft",
    location: "San Francisco, CA",
    date: "2021-10-01",
    status: "Applied",
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", headerClassName: "custom-header", flex: 1 },
  { field: "title", headerName: "Job Title", flex: 1, headerClassName: "custom-header" },
  { field: "company", headerName: "Company", flex: 1, headerClassName: "custom-header" },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    headerClassName: "custom-header",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    headerClassName: "custom-header",
  },
  {
    field: "actions",
    headerClassName: "custom-header",
    headerName: "Actions",
    width: 140,
    renderCell: (params) => <ActionCenter />,
  },
];

const ActionCenter = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [popupContent, setPopupContent] = useState<string>("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = event.currentTarget.getAttribute("data-key");
    switch (key) {
      case "1":
        setPopupContent("delete");
        setAnchorEl(event.currentTarget);
        break;
      case "2":
        setPopupContent("edit");
        break;
      case "3":
        setPopupContent("hide");
        setAnchorEl(event.currentTarget);
        break;
      case "4":
        setPopupContent("show");
        break;
      default:
        setPopupContent("");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopupContent("");
  };

  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
      }}>
      <Box
        data-key="1"
        onClick={handleClick}
        sx={{
          padding: 0.5,
          border: "1px solid rgb(0,0,0,0.2)",
          borderRadius: "6px",
          backgroundColor: "white",
        }}>
        <FaTrash />
      </Box>
      <Box
        data-key="2"
        onClick={handleClick}
        sx={{
          padding: 0.5,
          border: "1px solid rgb(0,0,0,0.2)",
          borderRadius: "6px",
          backgroundColor: "white",
        }}>
        <RiEdit2Fill />
      </Box>
      <Box
        data-key="3"
        onClick={handleClick}
        sx={{
          padding: 0.5,
          border: "1px solid rgb(0,0,0,0.2)",
          borderRadius: "6px",
          backgroundColor: "white",
        }}>
        <BiSolidHide />
      </Box>
      <Box
        data-key="4"
        onClick={handleClick}
        sx={{
          padding: 0.5,
          border: "1px solid rgb(0,0,0,0.2)",
          borderRadius: "6px",
          backgroundColor: "white",
        }}>
        <BiSolidShow />
      </Box>
      <Popover
        id={popoverId}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "15px",
            fontWeight: "regular",
            fontSize: "1rem",
            p: 3,
            boxShadow: 2,
          },
        }}>
        {popupContent && popupContent === "delete" && (
          <Box>
            <Typography sx={{ mb: 2 }}>Are you sure you want<br/> to delete this job?</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <SmallButton type="contained">Yes</SmallButton>
              <SmallButton type="outlined" onClick={handleClose}>
                No
              </SmallButton>
            </Box>
          </Box>
        )}
        {popupContent && popupContent === "hide" && (
          <Box>
            <Typography sx={{ mb: 2 }}>Are you sure you want<br/> to hide this job?</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <SmallButton type="contained">Yes</SmallButton>
              <SmallButton type="outlined" onClick={handleClose}>
                No
              </SmallButton>
            </Box>
          </Box>
        )}
      </Popover>
    </Box>
  );
};

function DataTable() {
  return (
    <Paper elevation={0} sx={{ width: "100%", border: 0, borderRadius: "15px" }}>
      <DataGrid
        rows={jobs}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          border: 0,
          fontWeight: "regular",
          fontSize: "1rem",
          color: "black",
          borderRadius: "15px",
        }}
      />
    </Paper>
  );
}

const JobContainer = () => {
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [seasonModalOpen, setSeasonModalOpen] = useState(false);

  return (
    <Paper
      elevation={2}
      sx={{
        m: 2.5,
        backgroundColor: "white",
        borderRadius: "15px",
      }}>
      <JobTransitionsModal open={jobModalOpen} setOpen={setJobModalOpen} />
      <SeasonTransitionsModal open={seasonModalOpen} setOpen={setSeasonModalOpen} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          px: 4,
        }}>
        <Typography variant="h5" sx={{ color: "black", fontWeight: "medium" }}>
          Job Applications
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <SmallButton
            type="contained"
            onClick={() => {
              setJobModalOpen(true);
            }}>
            Add Job
          </SmallButton>
          <SmallButton
            type="contained"
            onClick={() => {
              setSeasonModalOpen(true);
            }}>
            Create Season
          </SmallButton>
          <SmallButton type="outlined">Export Data</SmallButton>
        </Box>
      </Box>
      <Box
        sx={{
          px: 1,
        }}>
        <DataTable />
      </Box>
    </Paper>
  );
};

export default JobContainer;
