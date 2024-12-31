import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Navbar from "@/components/front-page-sections/Navbar";
import Hero from "@/components/front-page-sections/Hero";
import Features from "@/components/front-page-sections/Features";
import Pricing from "@/components/front-page-sections/Pricing";
import Reviews from "@/components/front-page-sections/Reviews";
import Footer from "@/components/front-page-sections/Footer";
import FAQ from "@/components/front-page-sections/FAQ";
import { Box, CircularProgress } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status == "loading") {
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

  if (session) {
    router.push("dashboard");
    return;
  }

  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Reviews />
      <Footer />
    </div>
  );
}
