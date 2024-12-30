"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

interface ExpirationPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExpirationPicker({ value, onChange }: ExpirationPickerProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [customHours, setCustomHours] = useState("");
  const [customMinutes, setCustomMinutes] = useState("");

  const handleCustomChange = (hours: string, minutes: string) => {
    const totalHours = Number(hours) + Number(minutes) / 60;
    onChange(totalHours.toFixed(2));
  };

  return (
    <div className="space-y-3">
      {!isCustom ? (
        <select
          value={value}
          onChange={(e) => {
            if (e.target.value === "custom") {
              setIsCustom(true);
            } else {
              onChange(e.target.value);
            }
          }}
          className="w-full bg-navy-light border border-navy-light rounded-lg px-3 py-2 text-slate-lighter focus:outline-none focus:border-teal"
        >
          <option value="1">1 hour</option>
          <option value="24">24 hours</option>
          <option value="48">48 hours</option>
          <option value="168">1 week</option>
          <option value="custom">Custom time</option>
        </select>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="168"
              value={customHours}
              onChange={(e) => {
                setCustomHours(e.target.value);
                handleCustomChange(e.target.value, customMinutes);
              }}
              placeholder="Hours"
              className="w-24 bg-navy-light border border-navy-light rounded-lg px-3 py-2 text-slate-lighter focus:outline-none focus:border-teal"
            />
            <span className="text-slate">hours</span>
            <input
              type="number"
              min="0"
              max="59"
              value={customMinutes}
              onChange={(e) => {
                setCustomMinutes(e.target.value);
                handleCustomChange(customHours, e.target.value);
              }}
              placeholder="Minutes"
              className="w-24 bg-navy-light border border-navy-light rounded-lg px-3 py-2 text-slate-lighter focus:outline-none focus:border-teal"
            />
            <span className="text-slate">minutes</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsCustom(false);
              onChange("24");
            }}
            className="text-sm text-teal hover:underline"
          >
            Use preset times
          </button>
        </div>
      )}
    </div>
  );
}
