"use client";

import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
