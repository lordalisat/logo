import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import React from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <React.StrictMode>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </React.StrictMode>
  );
};

export default MyApp;
