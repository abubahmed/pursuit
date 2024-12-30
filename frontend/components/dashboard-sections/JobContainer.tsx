import { Box, Typography, Paper, Popover, CircularProgress } from "@mui/material";
import SmallButton from "../general-components/SmallButton";
import { DataGrid, GridColDef, GridCellParams, gridClasses } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { IoIosStar } from "react-icons/io";
import AddJobForm from "../dashboard-components/AddJobForm";
import EditJobForm from "../dashboard-components/EditJobForm";
import JobInfoModal from "../dashboard-components/JobInfoModal";
import SeasonForm from "../dashboard-components/SeasonForm";
import { useState, useEffect } from "react";
import { fetchJobs, addJobUrl } from "@/util/apiRequests";
import useApi from "@/util/apiClient";

const paginationModel = { page: 0, pageSize: 10 };
const columns: GridColDef[] = [
  { field: "number", headerName: "#", headerClassName: "custom-header", flex: 0.01 },
  { field: "title", headerName: "Job Title", headerClassName: "custom-header", flex: 1 },
  { field: "company", headerName: "Company", headerClassName: "custom-header", flex: 1 },
  {
    field: "location",
    headerName: "Location",
    headerClassName: "custom-header",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    headerClassName: "custom-header",
    flex: 1,
  },
  {
    field: "during",
    headerName: "During",
    headerClassName: "custom-header",
    flex: 1,
  },
  {
    field: "level",
    headerName: "Level",
    headerClassName: "custom-header",
    flex: 1,
  },
  {
    field: "mode",
    headerName: "Mode",
    headerClassName: "custom-header",
    flex: 1,
  },
  {
    field: "salary",
    headerName: "Salary",
    headerClassName: "custom-header",
    flex: 1,
  },
  {
    field: "skills",
    headerName: "Skills",
    headerClassName: "custom-header",
    flex: 1,
  },
  {
    field: "type",
    headerName: "Type",
    headerClassName: "custom-header",
    flex: 1,
  },
  {
    field: "url",
    headerName: "URL",
    headerClassName: "custom-header",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "custom-header",
    flex: 1,
  },
  {
    field: "actions",
    headerClassName: "custom-header",
    headerName: "Actions",
    width: 180,
    renderCell: (params) => <ActionCenter />,
  },
];

const IconBox = ({
  dataKey,
  onClick,
  children,
}: {
  dataKey: string;
  onClick: (event: any) => void;
  children: React.ReactNode;
}) => {
  return (
    <Box
      data-key={dataKey}
      onClick={onClick}
      sx={{
        padding: 0.5,
        border: "1px solid rgb(0,0,0,0.2)",
        borderRadius: "6px",
        backgroundColor: "white",
      }}>
      {children}
    </Box>
  );
};

const PopoverContent = ({ content, handleClose }: { content: string; handleClose: any }) => {
  return (
    <Box>
      <Typography sx={{ mb: 2 }}>{content}</Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <SmallButton type="contained">Yes</SmallButton>
        <SmallButton type="outlined" onClick={handleClose}>
          No
        </SmallButton>
      </Box>
    </Box>
  );
};

const ActionCenter = () => {
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [popupContent, setPopupContent] = useState<string>("");
  const [editJobFormOpen, setEditJobFormOpen] = useState(false);
  const [jobInfoOpen, setJobInfoOpen] = useState(false);

  const handleClick = (event: any) => {
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
      case "5":
        setPopupContent("star");
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
      <EditJobForm open={editJobFormOpen} setOpen={setEditJobFormOpen} />
      <JobInfoModal open={jobInfoOpen} setOpen={setJobInfoOpen} />
      <IconBox dataKey="1" onClick={handleClick}>
        <FaTrash />
      </IconBox>
      <IconBox
        dataKey="2"
        onClick={() => {
          setEditJobFormOpen(true);
        }}>
        <RiEdit2Fill />
      </IconBox>
      <IconBox dataKey="3" onClick={handleClick}>
        <BiSolidHide />
      </IconBox>
      <IconBox
        dataKey="4"
        onClick={() => {
          setJobInfoOpen(true);
        }}>
        <BiSolidShow />
      </IconBox>
      <IconBox dataKey="5" onClick={handleClick}>
        <IoIosStar />
      </IconBox>
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
            borderRadius: "10px",
            fontWeight: "regular",
            fontSize: "1rem",
            p: 3,
            boxShadow: 2,
          },
        }}>
        {popupContent && popupContent === "delete" && (
          <PopoverContent
            content="Are you sure you want to delete this job?"
            handleClose={handleClose}
          />
        )}
        {popupContent && popupContent === "hide" && (
          <PopoverContent
            content="Are you sure you want to hide this job?"
            handleClose={handleClose}
          />
        )}
      </Popover>
    </Box>
  );
};

const DataTable = ({ data }: { data: any }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        border: 0,
        borderRadius: "15px",
        [`.${gridClasses.cell}.applied`]: {},
      }}>
      {data && (
        <DataGrid
          columnVisibilityModel={{
            description: false,
            during: false,
            level: false,
            mode: false,
            type: false,
            skills: false,
            url: false,
          }}
          rows={data}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          getCellClassName={(params: GridCellParams<any, any, number>) => {
            if (params.field != "status") return "";
            return params.value === "Applied"
              ? "applied"
              : params.value === "Assessment"
              ? "assessment"
              : params.value === "Interview"
              ? "interview"
              : params.value === "Offer"
              ? "offer"
              : "rejected";
          }}
          sx={{
            border: 0,
            fontWeight: "regular",
            fontSize: "1rem",
            color: "black",
            borderRadius: "15px",
          }}
        />
      )}
    </Paper>
  );
};

const JobContainer = ({ currentSeason }: { currentSeason: number | null }) => {
  const [addJobFormOpen, setAddJobFormOpen] = useState(false);
  const [seasonFormOpen, setSeasonFormOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiClient = useApi({ useToken: true });

  useEffect(() => {
    if (currentSeason) {
      fetchJobs({ apiClient, seasonId: currentSeason }).then((data) => {
        setJobs(data.jobs);
        console.log(data.jobs);
        setLoading(false);
      });
    }
  }, [currentSeason]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "90vh",
        }}>
        <CircularProgress
          size="3rem"
          sx={{
            color: "rgb(20,86,57)",
          }}
        />
      </Box>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        m: 3,
        backgroundColor: "white",
        borderRadius: "15px",
      }}>
      <AddJobForm open={addJobFormOpen} setOpen={setAddJobFormOpen} currentSeason={currentSeason} />
      <SeasonForm open={seasonFormOpen} setOpen={setSeasonFormOpen} />
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
              setAddJobFormOpen(true);
            }}>
            Add Job
          </SmallButton>
          <SmallButton
            type="contained"
            onClick={() => {
              setSeasonFormOpen(true);
            }}>
            Create Season
          </SmallButton>
          <SmallButton type="outlined">Export Data</SmallButton>
        </Box>
      </Box>
      {jobs && <DataTable data={jobs} />}
    </Paper>
  );
};

export default JobContainer;
