"use client";

export const useUrl = () => {
  if (typeof window === "undefined") return "";
  return window.location.href;
};
