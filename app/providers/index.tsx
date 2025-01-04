"use client";

import { AppProgressBar } from "next-nprogress-bar";
import React from "react";
import { Toaster } from "sonner";
import { AOS } from "../components/global";
import { ThemeProvider } from "./theme-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster richColors theme="dark" position="top-center" />
      <AppProgressBar
        height="4px"
        color="#3b82f6"
        options={{ showSpinner: true }}
      />
      <AOS />
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}

export default Providers;
