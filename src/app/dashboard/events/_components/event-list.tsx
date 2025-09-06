"use client";
import React, { useState } from "react";
import { EventDrawer } from "./event-drawer";
import { EventItem } from "@/types/event";
import { EventCard } from "./event-card";

type Props = {
  data: EventItem[];
};

export default function EventList({ data }: Readonly<Props>) {
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (event: EventItem) => {
    setSelected(event);
    setOpen(true);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((ev) => (
          <EventCard key={ev._id} event={ev} onClick={handleOpen} />
        ))}
      </div>

      <EventDrawer open={open} onOpenChange={setOpen} event={selected} />
    </div>
  );
}
