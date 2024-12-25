import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Sidebar from "@/components/dashboard-sections/Sidebar";
import Navbar from "@/components/dashboard-sections/Navbar";

export default function Dashboard() {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "rgb(240, 240, 240, 0.4)"
        }}>
        <Navbar />
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
