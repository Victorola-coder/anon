"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  MessageCircle,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageCircle,
  },
  {
    name: "Polls",
    href: "/polls",
    icon: BarChart2,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-navy-light bg-navy p-4">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-teal">Anon</h1>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative",
                  pathname === item.href
                    ? "bg-teal/10 text-teal"
                    : "text-slate hover:bg-navy-light"
                )}
              >
                <Icon size={18} strokeWidth={2} />
                <span>{item.name}</span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="active"
                    className="absolute left-0 w-1 h-8 bg-teal rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <button className="w-full px-3 py-2 text-slate hover:text-teal transition-colors flex items-center gap-3 rounded-lg">
            <LogOut size={18} strokeWidth={2} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
