import { Box, Typography, Paper, Popover, CircularProgress } from "@mui/material";
import SmallButton from "../general-components/SmallButton";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { IoIosStar } from "react-icons/io";
import AddJobForm from "../dashboard-components/AddJobForm";
import EditJobForm from "../dashboard-components/EditJobForm";
import JobInfoModal from "../dashboard-components/JobInfoModal";
import SeasonForm from "../dashboard-components/SeasonForm";
import { useState, useEffect } from "react";
import { fetchJobs, fetchJobsExport, deleteJob, editJob } from "@/util/apiRequests";
import useApi from "@/util/apiClient";

const paginationModel = { page: 0, pageSize: 10 };
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

const PopoverContent = ({
  content,
  handleClose,
  handleSubmit,
}: {
  content: string;
  handleClose: any;
  handleSubmit: any;
}) => {
  return (
    <Box>
      <Typography sx={{ mb: 2 }}>{content}</Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <SmallButton type="contained" onClick={handleSubmit}>
          Yes
        </SmallButton>
        <SmallButton type="outlined" onClick={handleClose}>
          No
        </SmallButton>
      </Box>
    </Box>
  );
};

const ActionCenter = ({
  jobId,
  job,
  setEditJobFormOpen,
  setJobInfoOpen,
  setInfoJobId,
  setEditJobId,
}: {
  jobId: number | null;
  job: any;
  setEditJobFormOpen: any;
  setJobInfoOpen: any;
  setInfoJobId: any;
  setEditJobId: any;
}) => {
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [popupContent, setPopupContent] = useState<string>("");
  const apiClient = useApi({ useToken: true });

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

  const handleDeleteJob = async ({ jobId, apiClient }: { jobId: any; apiClient: any }) => {
    try {
      console.log("Job ID " + jobId);
      const { message } = await deleteJob({ jobId, apiClient });
      console.log(message);
    } catch (error) {
      console.error(error);
    } finally {
      setAnchorEl(null);
      setPopupContent("");
    }
  };

  const handleHideJob = async ({ apiClient, jobId }: { apiClient: any; jobId: number | null }) => {
    try {
      const { message } = await editJob({
        jobId,
        apiClient,
        hidden: "True",
        status: null,
        starred: null,
      });
      console.log(message);
    } catch (error) {
      console.error(error);
    } finally {
      setAnchorEl(null);
      setPopupContent("");
    }
  };

  const handleStarJob = async ({
    starred,
    jobId,
    apiClient,
  }: {
    starred: any;
    jobId: number | null;
    apiClient: any;
  }) => {
    try {
      const { message } = await editJob({
        jobId,
        apiClient,
        starred: starred,
        status: null,
        hidden: null,
      });
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
      }}>
      <IconBox dataKey="1" onClick={handleClick}>
        <FaTrash />
      </IconBox>
      <IconBox
        dataKey="2"
        onClick={() => {
          setEditJobFormOpen(true);
          setEditJobId(jobId);
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
          setInfoJobId(jobId);
        }}>
        <BiSolidShow />
      </IconBox>
      <IconBox
        dataKey="5"
        onClick={async () => {
          const starred = job.starred ? "False" : "True";
          await handleStarJob({ starred, jobId, apiClient });
        }}>
        <IoIosStar color={job.starred ? "gold" : "black"} />
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
            handleSubmit={async () => {
              await handleDeleteJob({ jobId, apiClient });
            }}
          />
        )}
        {popupContent && popupContent === "hide" && (
          <PopoverContent
            content="Are you sure you want to hide this job?"
            handleClose={handleClose}
            handleSubmit={async () => {
              await handleHideJob({ apiClient, jobId });
            }}
          />
        )}
      </Popover>
    </Box>
  );
};

const DataTable = ({
  data,
  setJobInfoOpen,
  setEditJobFormOpen,
  setInfoJobId,
  setEditJobId,
}: {
  data: any;
  setJobInfoOpen: any;
  setEditJobFormOpen: any;
  setInfoJobId: any;
  setEditJobId: any;
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        border: 0,
        borderRadius: "15px",
        [`.${gridClasses.cell}`]: {
          display: "flex",
          alignItems: "center",
        },
      }}>
      {data && (
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                description: false,
                url: false,
                during: false,
                type: false,
                mode: false,
                level: false,
                contact: false,
              },
            },
            pagination: { paginationModel },
          }}
          rows={data}
          columns={[
            {
              field: "title",
              headerName: "Job Title",
              headerClassName: "custom-header",
              width: 200,
            },
            {
              field: "company",
              headerName: "Company",
              headerClassName: "custom-header",
              width: 200,
            },
            {
              field: "location",
              headerName: "Location",
              headerClassName: "custom-header",
              width: 150,
            },
            {
              field: "description",
              headerName: "Description",
              headerClassName: "custom-header",
              width: 300,
            },
            {
              field: "during",
              headerName: "During",
              headerClassName: "custom-header",
              width: 150,
            },
            {
              field: "level",
              headerName: "Level",
              headerClassName: "custom-header",
              width: 150,
            },
            {
              field: "mode",
              headerName: "Mode",
              headerClassName: "custom-header",
              width: 150,
            },
            {
              field: "salary",
              headerName: "Salary",
              headerClassName: "custom-header",
              width: 200,
            },
            {
              field: "skills",
              headerName: "Skills",
              headerClassName: "custom-header",
              width: 200,
            },
            {
              field: "type",
              headerName: "Type",
              headerClassName: "custom-header",
              width: 150,
            },
            {
              field: "url",
              headerName: "Link",
              headerClassName: "custom-header",
              width: 200,
            },
            {
              field: "contact",
              headerName: "Contact",
              headerClassName: "custom-header",
              width: 200,
            },
            {
              field: "created_at",
              headerName: "Added On",
              headerClassName: "custom-header",
              width: 150,
            },
            {
              field: "status",
              headerName: "Status",
              headerClassName: "custom-header",
              width: 150,
            },
            {
              field: "actions",
              headerClassName: "custom-header",
              headerName: "Actions",
              width: 180,
              renderCell: (params) => (
                <ActionCenter
                  jobId={params.row.id}
                  setEditJobFormOpen={setEditJobFormOpen}
                  setJobInfoOpen={setJobInfoOpen}
                  setInfoJobId={setInfoJobId}
                  setEditJobId={setEditJobId}
                  job={params.row}
                />
              ),
            },
          ]}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            border: 0,
            fontWeight: "regular",
            fontSize: "0.95rem",
            color: "black",
            borderRadius: "15px",
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "regular",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "regular",
            },
            "& .MuiDataGrid-cell": {
              py: "10px",
            },
          }}
          getRowHeight={() => "auto"}
        />
      )}
    </Paper>
  );
};

const JobContainer = ({
  currentSeason,
  refetchSeasons,
}: {
  currentSeason: number | null;
  refetchSeasons: any;
}) => {
  const [addJobFormOpen, setAddJobFormOpen] = useState(false);
  const [seasonFormOpen, setSeasonFormOpen] = useState(false);
  const [editJobFormOpen, setEditJobFormOpen] = useState(false);
  const [jobInfoOpen, setJobInfoOpen] = useState(false);
  const [infoJobId, setInfoJobId] = useState(null);
  const [editJobId, setEditJobId] = useState(null);
  const [infoJob, setInfoJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiClient = useApi({ useToken: true });

  useEffect(() => {
    if (currentSeason) {
      fetchJobs({ apiClient, seasonId: currentSeason }).then((data) => {
        const notHiddenJobs = data.jobs.filter((job: any) => job.hidden === false);
        setJobs(notHiddenJobs);
        console.log(notHiddenJobs);
        setLoading(false);
      });
    }
  }, [currentSeason]);

  const refetchJobs = async () => {
    try {
      const response = await fetchJobs({ apiClient, seasonId: currentSeason });
      if (response.message === "successful get" && response.jobs) {
        const notHiddenJobs = response.jobs.filter((job: any) => job.hidden === false);
        setJobs(notHiddenJobs);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (infoJobId && jobs) {
      const job = jobs.find((job: any) => job.id === infoJobId);
      if (job) {
        setInfoJob(job);
      }
    }
  }, [infoJobId, jobs]);

  const getJobsExport = async () => {
    try {
      const response = await fetchJobsExport({
        apiClient,
        seasonId: currentSeason,
      });
      if (response.message === "successful get" && response.jobs) {
        function download(filename: string, text: string) {
          var element = document.createElement("a");
          element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
          element.setAttribute("download", filename);
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }
        const fileName = "Pursuit_job-applications-export.csv";
        download(fileName, response.jobs);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <AddJobForm
        open={addJobFormOpen}
        setOpen={setAddJobFormOpen}
        currentSeason={currentSeason}
        refetchJobs={refetchJobs}
      />
      <SeasonForm
        open={seasonFormOpen}
        setOpen={setSeasonFormOpen}
        refetchSeasons={refetchSeasons}
      />
      <EditJobForm
        open={editJobFormOpen}
        setOpen={setEditJobFormOpen}
        jobId={editJobId}
        refetchJobs={refetchJobs}
      />
      <JobInfoModal open={jobInfoOpen} setOpen={setJobInfoOpen} job={infoJob} />
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
            gap: "20px",
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
          <SmallButton type="outlined" onClick={getJobsExport}>
            Export Data
          </SmallButton>
        </Box>
      </Box>
      {jobs && (
        <DataTable
          data={jobs}
          setEditJobFormOpen={setEditJobFormOpen}
          setJobInfoOpen={setJobInfoOpen}
          setInfoJobId={setInfoJobId}
          setEditJobId={setEditJobId}
        />
      )}
    </Paper>
  );
};

export default JobContainer;
