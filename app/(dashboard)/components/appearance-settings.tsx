"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/providers/theme-provider";
import Button from "@/app/components/ui/button";

const themeColors = [
  { name: "teal", class: "bg-teal", preview: "#14b8a6" },
  { name: "navy", class: "bg-navy-lighter", preview: "#334155" },
  { name: "slate", class: "bg-slate", preview: "#94a3b8" },
  { name: "purple", class: "bg-purple-500", preview: "#a855f7" },
  { name: "rose", class: "bg-rose-500", preview: "#f43f5e" },
  { name: "amber", class: "bg-amber-500", preview: "#f59e0b" },
] as const;

export function AppearanceSettings() {
  const { theme, themeColor, toggleTheme, setThemeColor } = useTheme();

  return (
    <div className="space-y-8">
      {/* Preview */}
      <div className="p-6 rounded-xl border border-navy-light">
        <h3 className="text-sm font-medium text-slate-lighter mb-4">Preview</h3>
        <div className={`p-4 rounded-lg bg-navy-light`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full bg-${themeColor}`} />
            <span className={`text-${themeColor}`}>
              Active Theme: {themeColor}
            </span>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-2/3 rounded bg-navy-lighter" />
            <div className="h-2 w-1/2 rounded bg-navy-lighter" />
          </div>
        </div>
      </div>

      {/* Theme Mode */}
      <div>
        <label className="block text-sm font-medium text-slate-lighter mb-3">
          Theme Mode
        </label>
        <div className="flex items-center gap-4">
          <Button
            variant={theme === "light" ? "primary" : "secondary"}
            onClick={toggleTheme}
            className="flex items-center gap-2"
          >
            <Sun size={16} />
            Light
          </Button>
          <Button
            variant={theme === "dark" ? "primary" : "secondary"}
            onClick={toggleTheme}
            className="flex items-center gap-2"
          >
            <Moon size={16} />
            Dark
          </Button>
        </div>
      </div>

      {/* Theme Colors */}
      <div>
        <label className="block text-sm font-medium text-slate-lighter mb-3">
          Accent Color
        </label>
        <div className="grid grid-cols-3 gap-3">
          {themeColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setThemeColor(color.name)}
              className={`group p-3 rounded-xl border transition-all ${
                themeColor === color.name
                  ? "border-slate-lighter bg-navy-light"
                  : "border-transparent hover:border-navy-light"
              }`}
            >
              <div
                className={`w-full h-12 rounded-lg ${color.class} mb-2 
                group-hover:scale-95 transition-transform
                ${themeColor === color.name ? "scale-95" : ""}`}
              />
              <span className="text-sm text-slate capitalize">
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
