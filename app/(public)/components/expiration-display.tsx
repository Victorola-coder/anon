"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toZonedTime } from "date-fns-tz";

interface ExpirationDisplayProps {
  expiresAt: string;
  showIcon?: boolean;
}

export function ExpirationDisplay({
  expiresAt,
  showIcon = true,
}: ExpirationDisplayProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const expirationInUserTz = toZonedTime(new Date(expiresAt), userTimeZone);

      if (expirationInUserTz <= now) {
        setTimeLeft("Expired");
        return;
      }

      setTimeLeft(formatDistanceToNow(expirationInUserTz, { addSuffix: true }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="flex items-center gap-2 text-sm text-slate">
      {showIcon && <Clock size={14} />}
      <span>Expires {timeLeft}</span>
    </div>
  );
}
