import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
// import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import Navbar from "@/components/templates/Navbar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import "../styles/globals.css";

// export const theme = extendTheme({});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppCacheProvider {...pageProps}>
        {/* <ChakraProvider theme={theme}> */}
        {/* <Navbar /> */}
        <Component {...pageProps} />
        {/* </ChakraProvider> */}
      </AppCacheProvider>
    </SessionProvider>
  );
}
