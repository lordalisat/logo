import { type AppType } from "next/app";

import "../styles/globals.css";
import React from "react";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
};

export default MyApp;
