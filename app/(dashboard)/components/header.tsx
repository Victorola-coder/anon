"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/app/components/ui/button";
import { useAuthStore } from "@/app/store/useAuth";
import { useRouter } from "next/navigation";

export function Header({ username }: { username?: string }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const { clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/signin");
  };

  return (
    <header className="border-b border-navy-light bg-navy p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-slate-lighter">Welcome, {username || "User"}</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-navy-light rounded-full relative"
            >
              <Bell className="text-slate-lighter w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-teal rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-navy-dark border border-navy-light rounded-lg shadow-lg p-4">
                <h3 className="text-slate-lighter font-semibold mb-2">
                  Notifications
                </h3>
                <div className="space-y-2">
                  {/* Add notifications here */}
                  <p className="text-slate text-sm">No new notifications</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="text-slate hover:text-teal transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
