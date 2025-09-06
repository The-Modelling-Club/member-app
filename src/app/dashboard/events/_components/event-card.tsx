"use client";

import Image from "next/image";
import { EventItem } from "@/types/event";
import { formatDate } from "@/utils/format-date";
export function EventCard({
  event,
  onClick,
}: Readonly<{
  event: EventItem;
  onClick: (event: EventItem) => void;
}>) {
  return (
    <button onClick={() => onClick(event)} className="block w-full text-left">
      <div className="relative h-64 w-full overflow-hidden rounded-lg">
        <Image
          src={event.event_img}
          alt={event.title}
          width={800}
          height={400}
          className="h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium text-white ${
            event.status === "upcoming"
              ? "bg-emerald-600"
              : event.status === "ongoing"
                ? "bg-blue-600"
                : "bg-gray-600"
          }`}>
          {event.status}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="!text-white font-semibold line-clamp-1">
            {event.title}
          </h3>
          <div className="mt-1 flex items-center justify-between text-xs text-white/70">
            <span className="truncate mr-2">{formatDate(event.date)}</span>
            <span className="truncate text-right">{event.location}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
