"use client";
import { OverviewBars } from "./bar";
import LabOverviewChart from "./pie";

export default function AnalyticsGraph() {
  return (
    <div className="mt-6 grid h-fit gap-4 md:grid-cols-2">
      <OverviewBars />
      <LabOverviewChart />
    </div>
  );
}
