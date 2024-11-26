import { Head, Html, Main, NextScript } from "next/document";
// import { ColorModeScript } from "@chakra-ui/react";
// import { theme } from "./_app";
import { DocumentHeadTags, documentGetInitialProps } from "@mui/material-nextjs/v15-pagesRouter";

export default function Document(props: any) {
  return (
    <Html lang="en">
      <Head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /> */}
        <DocumentHeadTags {...props} />
      </Head>
      <body className="m-0 p-0">
        {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: any) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
