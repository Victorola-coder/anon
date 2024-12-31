"use client";

import { useState } from "react";
import { useTheme } from "@/app/providers/theme-provider";
import Button from "@/app/components/ui/button";
import { Paintbrush, Check, Plus } from "lucide-react";

const presets = [
  {
    name: "Ocean",
    colors: { primary: "#14b8a6", secondary: "#0ea5e9", accent: "#6366f1" },
  },
  {
    name: "Sunset",
    colors: { primary: "#f43f5e", secondary: "#f59e0b", accent: "#8b5cf6" },
  },
  {
    name: "Forest",
    colors: { primary: "#22c55e", secondary: "#14b8a6", accent: "#84cc16" },
  },
  {
    name: "Monochrome",
    colors: { primary: "#94a3b8", secondary: "#64748b", accent: "#475569" },
  },
] as const;

export function ThemePresets() {
  const { themeColor, setThemeColor } = useTheme();
  const [showCustomizer, setShowCustomizer] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => setThemeColor(preset.colors.primary as any)}
            className="p-4 rounded-xl border border-navy-light hover:border-slate-lighter transition-all group"
          >
            <div className="flex gap-2 mb-3">
              {Object.values(preset.colors).map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-sm text-slate group-hover:text-slate-lighter">
              {preset.name}
            </span>
          </button>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={() => setShowCustomizer(!showCustomizer)}
        className="w-full flex items-center justify-center gap-2"
      >
        {showCustomizer ? (
          <>
            <Check size={16} />
            Done
          </>
        ) : (
          <>
            <Paintbrush size={16} />
            Customize Colors
          </>
        )}
      </Button>

      {showCustomizer && (
        <div className="p-4 rounded-xl border border-navy-light space-y-4">
          <div>
            <label className="block text-sm text-slate mb-2">
              Primary Color
            </label>
            <input
              type="color"
              className="w-full h-10 rounded cursor-pointer"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value as any)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
