"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";

export default function BackgroundBoxes({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative w-full overflow-hidden bg-white flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
