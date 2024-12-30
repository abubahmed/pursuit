import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Box, CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";
import Navbar from "@/components/dashboard-sections/Navbar";
import JobContainer from "@/components/dashboard-sections/JobContainer";
import MiniDrawer from "@/components/dashboard-sections/PermanentDrawer";
import { useState, useEffect } from "react";
import useApi from "@/util/apiClient";
import { fetchUser, fetchProfile, fetchSeasons } from "@/util/apiRequests";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [profileDetails, setProfileDetails] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState({
    profileDetails: true,
    seasons: true,
  });
  const apiClient = useApi({ useToken: true });

  useEffect(() => {
    if (session && status === "authenticated") {
      fetchProfile({ apiClient }).then((data) => {
        setProfileDetails(data.profileDetails);
        setLoading((prevLoading) => ({ ...prevLoading, profileDetails: false }));
        console.log(data.profileDetails);
      });

      fetchSeasons({ apiClient }).then((data) => {
        setSeasons(data.seasons);
        setSelectedSeason(data.seasons[0].id);
        setLoading((prevLoading) => ({ ...prevLoading, seasons: false }));
        console.log(data.seasons);
      });
    }
  }, [session]);

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
      />
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "rgb(240, 240, 240, 0.3)",
          overflow: "auto",
        }}>
        <Navbar profileDetails={profileDetails} />
        <JobContainer currentSeason={selectedSeason} />
      </Box>
    </Box>
  );
}
