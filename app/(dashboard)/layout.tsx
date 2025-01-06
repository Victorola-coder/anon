"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { useAuthStore } from "@/app/store/useAuth";
import Cookies from "js-cookie";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoading } = useAuthStore();
  const token = Cookies.get("token");
  // console.log(token);
  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/signin");
    }
  }, [isLoading, router, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return null;
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
