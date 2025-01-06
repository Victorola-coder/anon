"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { useAuthStore } from "@/app/store/useAuth";
import { getRandomColor } from "@/app/lib/randomColor";

export function Header({ username }: { username?: string }) {
  const { user } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="border-b border-navy-light bg-navy p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-slate-lighter capitalize">
          Welcome, {user?.username || "User"}
        </h1>

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
              <div className="absolute right-0 mt-2 w-80 z-[100] bg-navy-dark border border-navy-light rounded-lg shadow-lg p-4">
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

          <div
            className="rounded-full size-[40px]"
            style={{ backgroundColor: getRandomColor() }}
          >
            <p className="text-[20px] font-re leading-[32px] font-semibold text-white py-[6px] px-[9px] text-center">
              {user?.username?.substring(0, 1).toUpperCase() || "V"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
