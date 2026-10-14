"use client";
import { useEffect, useState } from "react";
import { salonConfig, launchState } from "@/data/salon";
export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const first = setTimeout(() => setNow(Date.now()), 0);
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);
  if (!salonConfig.launchDate || !now || !launchState(now).showCountdown)
    return null;
  const difference = Date.parse(salonConfig.launchDate) - now;
  return (
    <div
      className="countdown"
      aria-label="Time until the confirmed opening date"
    >
      {[
        ["Days", Math.floor(difference / 86400000)],
        ["Hours", Math.floor(difference / 3600000) % 24],
        ["Minutes", Math.floor(difference / 60000) % 60],
      ].map(([unit, value]) => (
        <div key={unit}>
          <b>{String(value).padStart(2, "0")}</b>
          <span>{unit}</span>
        </div>
      ))}
    </div>
  );
}
