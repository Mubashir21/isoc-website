import EditRecurringEventForm from "@/components/ui/edit-recurring-event-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { notFound } from "next/navigation";

import { fetchAdmins, fetchRecurringEventById } from "@/lib/data";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [admins, event] = await Promise.all([
    fetchAdmins(),
    fetchRecurringEventById(id),
  ]);

  if (!event) {
    notFound();
  }

  return (
    <main>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/events">Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Recurring Event</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <EditRecurringEventForm admins={admins} event={event} />
    </main>
  );
}

