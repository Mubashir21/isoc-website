import Image from "next/image";
import {
  UpdateEvent,
  DeleteEvent,
  UpdateAnnouncement,
  DeleteAnnouncement,
} from "@/components/ui/events-edit";
import { formatDateToLocal, formatTimeTo24Hour } from "@/lib/utils";
import { fetchFilteredAnnouncements, fetchFilteredEvents } from "@/lib/data";

export async function EventsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const events = await fetchFilteredEvents(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {events?.map((event) => (
              <div
                key={event.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={event.pic_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${event.title}'s poster picture`}
                      />
                      <p>{event.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{event.speaker}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{event.location}</p>
                    <p>{formatDateToLocal(event.datetime)}</p>
                    <p>{formatTimeTo24Hour(event.datetime)}</p>
                    <p>{event.created_by}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateEvent id={event.id} />
                    <DeleteEvent id={event.id} pic_url={event.pic_url} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Speaker
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Location
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Time
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Admin
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Updated
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {events?.map((event) => (
                <tr
                  key={event.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={event.pic_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${event.title}'s poster picture`}
                      />
                      <p>{event.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {event.speaker}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {event.location}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatTimeTo24Hour(event.datetime)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(event.datetime)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {event.created_by}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(event.updated_at)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateEvent id={event.id} />
                      <DeleteEvent id={event.id} pic_url={event.pic_url} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export async function AnnouncementsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const announcements = await fetchFilteredAnnouncements(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {announcements?.map((announcement) => (
              <div
                key={announcement.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center text-xl font-medium">
                      <p>{announcement.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {announcement.created_by}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-lg mb-5">{announcement.content}</p>
                    <p>{formatDateToLocal(announcement.updated_at)}</p>
                    <p>{formatTimeTo24Hour(announcement.updated_at)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateAnnouncement id={announcement.id} />
                    <DeleteAnnouncement id={announcement.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Content
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Admin
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Updated
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {announcements?.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{announcement.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {announcement.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {announcement.content}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {announcement.created_by}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(announcement.updated_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(announcement.created_at)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateAnnouncement id={announcement.id} />
                      <DeleteAnnouncement id={announcement.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
