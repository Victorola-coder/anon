"use client";

import React from "react";
import { AOS } from "../components/global";
import { ThemeProvider } from "./theme-provider";
import { AppProgressBar } from "next-nprogress-bar";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppProgressBar
        height="4px"
        color="#3b82f6"
        // options={{ showSpinner: true }}
      />
      <AOS />
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}

export default Providers;
