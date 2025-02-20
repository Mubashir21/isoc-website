import { fetchEventById } from "@/lib/data";
import EventDetails from "@/components/ui/event-details";
import EventPictures from "@/components/ui/event-pictures";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const event = await fetchEventById(id);
  const eventDate = new Date(event.datetime);
  const currentDate = new Date();
  const eventsHref =
    eventDate < currentDate ? "/events/past" : "/events/future";

  return (
    <main className="bg-gray-200 p-5 rounded-xl lg:px-28 md:px-16 2xl:px-64 flex flex-col gap-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={eventsHref}>Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{event.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <EventDetails event={event} />

      {/* {new Date(event.datetime) <
        new Date(Date.now() - 24 * 60 * 60 * 1000) && <EventPictures id={id} />} */}
    </main>
  );
}
