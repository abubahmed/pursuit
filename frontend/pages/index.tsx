import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
// import { Box, Button, Spinner, Text, VStack, Container } from "@chakra-ui/react";
// import Hero from "@/components/templates/Hero";
import Navbar from "@/components/front-page-sections/Navbar";
import Hero from "@/components/front-page-sections/Hero";
import Features from "@/components/front-page-sections/Features";
import Pricing from "@/components/front-page-sections/Pricing";
import Reviews from "@/components/front-page-sections/Reviews";
import Footer from "@/components/front-page-sections/Footer";
import { Box } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // if (status == "loading") {
  //   return <Spinner size="lg" />;
  // }

  if (session) {
    router.push("profile");
    return;
  }

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          my: 16,
        }}>
        <Hero />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          my: 12,
        }}>
        <Features />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          my: 12,
        }}>
        <Pricing />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          my: 12,
          mb: 6,
        }}>
        <Reviews />
      </Box>
      <Footer />
    </div>
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
