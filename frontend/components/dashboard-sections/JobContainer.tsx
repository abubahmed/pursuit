import { Box, Typography, Paper, Popover } from "@mui/material";
import SmallButton from "../general-components/SmallButton";
import { DataGrid, GridColDef, GridCellParams, gridClasses } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { IoIosStar } from "react-icons/io";
import AddJobForm from "../dashboard-components/AddJobForm";
import EditJobForm from "../dashboard-components/EditJobForm";
import SeasonForm from "../dashboard-components/SeasonForm";
import { useState } from "react";
import { jobs } from "@/data/data";

const paginationModel = { page: 0, pageSize: 10 };
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
      <IconBox dataKey="1" onClick={handleClick}>
        <FaTrash />
      </IconBox>
      <IconBox dataKey="2" onClick={handleClick}>
        <RiEdit2Fill />
      </IconBox>
      <IconBox dataKey="3" onClick={handleClick}>
        <BiSolidHide />
      </IconBox>
      <IconBox dataKey="4" onClick={handleClick}>
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

const DataTable = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        border: 0,
        borderRadius: "15px",
        [`.${gridClasses.cell}.applied`]: {},
      }}>
      <DataGrid
        rows={jobs}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
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
    </Paper>
  );
};

const JobContainer = () => {
  const [addJobFormOpen, setAddJobFormOpen] = useState(false);
  const [seasonFormOpen, setSeasonFormOpen] = useState(false);

  return (
    <Paper
      elevation={2}
      sx={{
        m: 3,
        backgroundColor: "white",
        borderRadius: "15px",
      }}>
      <AddJobForm open={addJobFormOpen} setOpen={setAddJobFormOpen} />
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
      <DataTable />
    </Paper>
  );
};

export default JobContainer;
