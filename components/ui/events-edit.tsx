import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteEvent, deleteAnnouncement } from "@/lib/actions";

export function CreateEvent() {
  return (
    <Link
      href="/admin/events/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Event</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreateAnnouncement() {
  return (
    <Link
      href="/admin/announcements/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Announcement</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAnnouncement({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/announcements/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteAnnouncement({ id }: { id: string }) {
  const deleteAnnouncementWithId = deleteAnnouncement.bind(null, id);

  return (
    <form action={deleteAnnouncementWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function UpdateEvent({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/events/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function AddPictures({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/events/${id}/pictures`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PhotoIcon className="w-5" />
    </Link>
  );
}

export function DeleteEvent({
  id,
  pic_file_id,
}: {
  id: string;
  pic_file_id: string;
}) {
  const deleteEventeWithId = deleteEvent.bind(null, id, pic_file_id);

  return (
    <form action={deleteEventeWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
