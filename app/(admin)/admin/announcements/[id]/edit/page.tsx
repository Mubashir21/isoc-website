import Form from "@/components/ui/edit-announcement-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { notFound } from "next/navigation";

import { fetchAdmins, fetchAnnouncementById } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [admins, announcement] = await Promise.all([
    fetchAdmins(),
    fetchAnnouncementById(id),
  ]);

  if (!announcement) {
    notFound();
  }

  return (
    <main>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/announcements">
              Announcements
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Announcement</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Form admins={admins} announcement={announcement} />
    </main>
  );
}
