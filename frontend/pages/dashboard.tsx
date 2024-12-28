import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Navbar from "@/components/dashboard-sections/Navbar";
import JobContainer from "@/components/dashboard-sections/JobContainer";
import MiniDrawer from "@/components/dashboard-sections/PermanentDrawer";
import { useState } from "react";

export default function Dashboard() {
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
