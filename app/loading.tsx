import React from "react";
import { Spinner } from "./components/global";

export default function Loading() {
  return (
    <div className="w-screen h-screen bg-body flex items-center justify-center">
      <Spinner />
    </div>
  );
}
