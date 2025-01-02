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
  const { data: session, status } = useSession() as any;
  const [profileDetails, setProfileDetails] = useState(null);
  const [seasons, setSeasons] = useState(null) as any;
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasonFormOpen, setSeasonFormOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState({
    profileDetails: true,
    seasons: true,
  });
  const apiClient = useApi({ useToken: true });

  useEffect(() => {
    const fetchData = async () => {
      if (session === null || status === "unauthenticated") {
        setProfileDetails(null);
        setSeasons(null);
        setSelectedSeason(null);
        router.push("/");
      }

      if (session && status === "authenticated") {
        if (profileDetails) {
          setLoading((prevLoading) => ({ ...prevLoading, profileDetails: false }));
        }
        if (seasons) {
          setLoading((prevLoading) => ({ ...prevLoading, seasons: false }));
        }
        if (seasons && profileDetails) {
          return;
        }

        if (!profileDetails) {
          try {
            const response = await fetchProfile({ apiClient });
            console.log(response.message);
            if (response?.profileDetails) console.log(response.profileDetails);
            setProfileDetails(response?.profileDetails || null);
            setLoading((prevLoading) => ({ ...prevLoading, profileDetails: false }));
          } catch (error) {
            console.error(error);
            setProfileDetails(null);
            setError(true);
            setLoading((prevLoading) => ({ ...prevLoading, profileDetails: false }));
          }
        }

        if (!seasons) {
          try {
            const response = await fetchSeasons({ apiClient });
            console.log(response.message);
            console.log(response?.seasons);
            setSeasons(response?.seasons || null);
            setSelectedSeason(response?.seasons[0]?.id);
            setLoading((prevLoading) => ({ ...prevLoading, seasons: false }));
          } catch (error) {
            console.error(error);
            setSeasons(null);
            setSelectedSeason(null);
            setError(true);
            setLoading((prevLoading) => ({ ...prevLoading, seasons: false }));
          }
        }
      }
    };

    fetchData();
  }, [session, status]);

  const refetchSeasons = async () => {
    try {
      const response = await fetchSeasons({ apiClient });
      console.log(response.message);
      console.log(response?.seasons);
      setSeasons(response?.seasons || null);
    } catch (error) {
      console.error(error);
      setSeasons(null);
      setError(true);
    }
  };

  if (session === null || status === "unauthenticated") {
    router.push("/");
    return;
  }

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
        <JobContainer
          currentSeason={selectedSeason}
          refetchSeasons={refetchSeasons}
          error={error}
          setError={setError}
        />
      </Box>
    </Box>
  );
}
