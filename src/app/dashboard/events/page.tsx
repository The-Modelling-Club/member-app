import { Suspense } from "react";
import EventList from "./_components/event-list";
import { client } from "@/client";
import { findEvents } from "@/utils/sanity-queries";

export default async function EventsPage() {
  const data = await client.fetch(findEvents);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventList data={data} />
    </Suspense>
  );
}
