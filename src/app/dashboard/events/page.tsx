"use client";

import { useState } from "react";
import { EventItem } from "@/types/event";
import { EventCard } from "./_components/event-card";
import { EventDrawer } from "./_components/event-drawer";

const mockEvents: EventItem[] = [
  {
    _id: "1",
    title: "Tech Career Fair 2025",
    description:
      "Join industry leaders and peers for a day of networking and opportunities.",
    event_image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1600&auto=format&fit=crop",
    date: "2025-10-12",
    location: "Accra, Ghana",
    status: "upcoming",
    slug: "tech-career-fair-2025",
  },
  {
    _id: "2",
    title: "AI in Industry Workshop",
    description:
      "Hands-on sessions exploring practical AI applications and best practices.",
    event_image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop",
    date: "2025-07-02",
    location: "Kumasi, Ghana",
    status: "ongoing",
    slug: "ai-in-industry-workshop",
  },
  {
    _id: "3",
    title: "Alumni Networking Night",
    description:
      "Reconnect and create new connections with alumni across cohorts.",
    event_image:
      "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1600&auto=format&fit=crop",
    date: "2025-03-18",
    location: "Online",
    status: "ended",
    slug: "alumni-networking-night",
  },
];

export default function EventsPage() {
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
        {mockEvents.map((ev) => (
          <EventCard key={ev._id} event={ev} onClick={handleOpen} />
        ))}
      </div>

      <EventDrawer open={open} onOpenChange={setOpen} event={selected} />
    </div>
  );
}
