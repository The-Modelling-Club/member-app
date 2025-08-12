import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Placeholder static fetch; replace with Sanity fetch by slug
async function getEventBySlug(slug: string) {
  return null as any; // TODO: fetch from Sanity
}

export default async function EventDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug);
  if (!event) return notFound();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-72 w-full overflow-hidden rounded-lg">
            <Image
              src={event.event_image}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {event.location} • {event.date}
          </div>
          <div className="text-sm whitespace-pre-wrap">{event.description}</div>
        </CardContent>
      </Card>
    </div>
  );
}
