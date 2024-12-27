import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import "../styles/globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/themes/theme";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppCacheProvider {...pageProps}>
          <Component {...pageProps} />
        </AppCacheProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
