"use client";

import { useEffect } from "react";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token, router]);

  if (!token) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-navy-dark">
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
