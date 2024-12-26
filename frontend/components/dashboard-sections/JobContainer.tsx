import { Box, Container, Grid, Typography, Divider, Paper, Button } from "@mui/material";
import SmallButton from "../general-components/SmallButton";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import TransitionsModal from "@/components/dashboard-components/JobForm";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Job Title", width: 200 },
  { field: "company", headerName: "Company", width: 200 },
  {
    field: "location",
    headerName: "Location",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
        }}>
        <Box sx={{ padding: 0.5, border: "1px solid rgb(0,0,0,0.2)", borderRadius: "6px" }}>
          <FaTrash />
        </Box>
        <Box sx={{ padding: 0.5, border: "1px solid rgb(0,0,0,0.2)", borderRadius: "6px" }}>
          <RiEdit2Fill />
        </Box>
        <Box sx={{ padding: 0.5, border: "1px solid rgb(0,0,0,0.2)", borderRadius: "6px" }}>
          <BiSolidHide />
        </Box>
        <Box sx={{ padding: 0.5, border: "1px solid rgb(0,0,0,0.2)", borderRadius: "6px" }}>
          <BiSolidShow />
        </Box>
      </Box>
    ),
  },
];

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
          fontSize: "0.95rem",
          color: "rgb(60,60,60)",
          borderRadius: "15px",
        }}
      />
    </Paper>
  );
}

const JobContainer = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        m: 2.5,
        backgroundColor: "white",
        borderRadius: "15px",
      }}>
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
          <SmallButton type="contained">Add Job</SmallButton>
          <SmallButton type="outlined">Filter</SmallButton>
          <SmallButton type="outlined">Toggle Attributes</SmallButton>
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
