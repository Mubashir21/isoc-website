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

  return (
    <main>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/events/future">Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{event.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <EventDetails event={event} />
      <EventPictures id={id} />
    </main>
  );
}
