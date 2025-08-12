"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { EventItem } from "@/types/event";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EventDrawer({
  open,
  onOpenChange,
  event,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: EventItem | null;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[28rem]">
        {event && (
          <div className="flex h-full flex-col overflow-hidden">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={event.event_image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 space-y-2 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{event.title}</SheetTitle>
                <SheetDescription>
                  {event.location} • {event.date}
                </SheetDescription>
              </SheetHeader>

              <div className="text-sm p-4 leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {event.description}
              </div>
            </div>
            <div className="mt-auto py-4 px-4">
              <Link href={`/dashboard/events/${event.slug}`}>
                <Button className="w-full">Read details</Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
