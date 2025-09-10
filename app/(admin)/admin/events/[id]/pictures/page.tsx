// // import Form from "@/components/ui/add-images-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { notFound } from "next/navigation";

import { fetchAdmins, fetchEventById } from "@/lib/data";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [admins, event] = await Promise.all([
    fetchAdmins(),
    fetchEventById(id),
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
            <BreadcrumbPage>Edit Event</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* <Form admins={admins} event={event} /> */}
    </main>
  );
}
