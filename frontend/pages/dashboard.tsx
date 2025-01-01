import { useSession } from "next-auth/react";
import { Box, CircularProgress } from "@mui/material";
import Navbar from "@/components/dashboard-sections/Navbar";
import JobContainer from "@/components/dashboard-sections/JobContainer";
import MiniDrawer from "@/components/dashboard-sections/PermanentDrawer";
import { useState, useEffect } from "react";
import useApi from "@/util/apiClient";
import { fetchProfile, fetchSeasons } from "@/util/apiRequests";
import { useRouter } from "next/router";
import CreateSeasonForm from "@/components/dashboard-components/CreateSeasonForm";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profileDetails, setProfileDetails] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasonFormOpen, setSeasonFormOpen] = useState(false);
  const [loading, setLoading] = useState({
    profileDetails: true,
    seasons: true,
  });
  const apiClient = useApi({ useToken: true });

  useEffect(() => {
    if (session && status === "authenticated") {
      if (profileDetails) setLoading((prevLoading) => ({ ...prevLoading, profileDetails: false }));
      if (seasons) setLoading((prevLoading) => ({ ...prevLoading, seasons: false }));

      if (!profileDetails) {
        fetchProfile({ apiClient }).then((data) => {
          setProfileDetails(data.profileDetails);
          setLoading((prevLoading) => ({ ...prevLoading, profileDetails: false }));
          console.log(data.profileDetails);
        });
      }

      if (!seasons) {
        fetchSeasons({ apiClient }).then((data) => {
          setSeasons(data.seasons);
          setSelectedSeason(data?.seasons[0]?.id);
          setLoading((prevLoading) => ({ ...prevLoading, seasons: false }));
          console.log(data.seasons);
        });
      }
    }

    if (status === "unauthenticated") {
      setProfileDetails(null);
      setSeasons(null);
      setSelectedSeason(null);
      router.push("/");
    }
  }, [session, status]);

  const refetchSeasons = async () => {
    try {
      const response = await fetchSeasons({ apiClient });
      setSeasons(response.seasons);
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading" || loading.profileDetails || loading.seasons) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
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
    <Box display="flex" height="100vh">
      <MiniDrawer
        seasons={seasons}
        setSelectedSeason={setSelectedSeason}
        selectedSeason={selectedSeason}
        setSeasonFormOpen={setSeasonFormOpen}
      />
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "rgb(240, 240, 240, 0.3)",
          overflow: "auto",
        }}>
        <CreateSeasonForm
          open={seasonFormOpen}
          setOpen={setSeasonFormOpen}
          refetchSeasons={refetchSeasons}
        />
        <Navbar profileDetails={profileDetails} />
        <JobContainer currentSeason={selectedSeason} refetchSeasons={refetchSeasons} />
      </Box>
    </Box>
  );
}
