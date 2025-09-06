import { groq } from "next-sanity";

export const findEvents = groq`*[_type == 'events']{
    _id,
    title,
    "slug": slug.current,
    "event_img": event_image.asset->url,
    status,
    start_time,
    end_time,
    location,
    body,  
    date,
    description,
    created_at,
} | order(created_at) `;

export const findEvent = groq`*[_type == 'events' && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "event_img": event_image.asset->url,
    status,
    start_time,
    end_time,
    location,
    body,  
    date,
    description,
    created_at,
} `;
