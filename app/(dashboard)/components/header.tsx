"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/app/components/ui/button";

export function Header() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="border-b border-navy-light bg-navy p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-slate-lighter">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative"
          >
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal rounded-full" />
            Notifications
          </Button>

          <div className="h-8 w-8 rounded-full bg-teal/10" />
        </div>
      </div>
    </header>
  );
}
