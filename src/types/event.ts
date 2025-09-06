export type EventStatus = "upcoming" | "ongoing" | "ended";

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  event_img: string; // URL
  date: string; // ISO string or human-readable date
  location: string;
  status: EventStatus;
  slug: string;
}
