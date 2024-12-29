import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Box, CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";
import Navbar from "@/components/dashboard-sections/Navbar";
import JobContainer from "@/components/dashboard-sections/JobContainer";
import MiniDrawer from "@/components/dashboard-sections/PermanentDrawer";
import { useState, useEffect } from "react";
import useApi from "@/util/apiClient";
import { fetchUser, fetchProfile } from "@/util/apiRequests";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState({});
  const apiClient = useApi({ useToken: true });

  useEffect(() => {
    if (session && status === "authenticated") {
      fetchProfile({ apiClient }).then((data) => {
        setUserDetails(data);
        console.log(data);
      });
    }
  }, [session]);

  if (status === "loading") {
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
      <MiniDrawer />
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "rgb(240, 240, 240, 0.5)",
          overflow: "auto",
        }}>
        <Navbar />
        <JobContainer />
      </Box>
    </Box>
  );

  // return (
  //   <Box m={8}>
  //     <VStack>
  //       <Text>You are not authenticated.</Text>
  //       <Button colorScheme="blue" onClick={() => signIn(undefined, { callbackUrl: "/profile" })}>
  //         Sign in
  //       </Button>
  //     </VStack>
  //   </Box>
  // );
}
