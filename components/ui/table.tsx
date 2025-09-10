import Image from "next/image";
import {
  UpdateEvent,
  DeleteEvent,
  UpdateAnnouncement,
  DeleteAnnouncement,
  AddPictures,
} from "@/components/ui/events-edit";
import { formatDateToLocal, formatTimeTo24Hour } from "@/lib/utils";
import { LocalTimeDisplay, LocalDateDisplay } from "../date-time-display";
import { fetchFilteredAnnouncements, fetchFilteredEvents } from "@/lib/data";

export async function RegularEventsTable({
  query,
  currentPage,
  category,
}: {
  query: string;
  currentPage: number;
  category?: string;
}) {
  const events = await fetchFilteredEvents(query, currentPage, "regular", category);

  return (
    <div className="flow-root">
      <div className="inline-block w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View - Cards */}
          <div className="block md:hidden space-y-3">
            {events?.map((event) => (
              <div
                key={event.id}
                className="w-full rounded-md bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={event.pic_url}
                      className="rounded-full"
                      width={28}
                      height={28}
                      alt={`${event.title}'s poster picture`}
                    />
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.speaker}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Location:</span>{" "}
                    {event.location}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Date:</span>{" "}
                    <LocalDateDisplay datetime={event.datetime} />
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Time:</span>{" "}
                    <LocalTimeDisplay datetime={event.datetime} />
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Admin:</span>{" "}
                    {event.created_by}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Updated:</span>{" "}
                    <LocalDateDisplay datetime={event.updated_at} />
                  </p>
                  <div className="flex justify-end gap-2 pt-2">
                    <UpdateEvent id={event.id} />
                    <AddPictures id={event.id} />
                    <DeleteEvent
                      id={event.id}
                      pic_file_id={event.pic_file_id}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-gray-900">
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
                      <LocalTimeDisplay datetime={event.datetime} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <LocalDateDisplay datetime={event.datetime} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {event.created_by}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <LocalDateDisplay datetime={event.updated_at} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateEvent id={event.id} />
                        <AddPictures id={event.id} />
                        <DeleteEvent
                          id={event.id}
                          pic_file_id={event.pic_file_id}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
      <div className="inline-block w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View - Cards */}
          <div className="block md:hidden space-y-3">
            {announcements?.map((announcement) => (
              <div
                key={announcement.id}
                className="w-full rounded-md bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {announcement.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {announcement.created_by}
                    </p>
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <p className="text-sm text-gray-700">
                    {announcement.content}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Updated:</span>{" "}
                    <LocalDateDisplay datetime={announcement.updated_at} />
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Time:</span>{" "}
                    <LocalTimeDisplay datetime={announcement.updated_at} />
                  </p>
                  <div className="flex justify-end gap-2 pt-2">
                    <UpdateAnnouncement id={announcement.id} />
                    <DeleteAnnouncement id={announcement.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-gray-900">
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
                    Last Updated Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Last Updated Time
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
                    <td className="px-3 py-3 max-w-xs">
                      <p className="truncate">{announcement.content}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {announcement.created_by}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <LocalDateDisplay datetime={announcement.updated_at} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <LocalTimeDisplay datetime={announcement.updated_at} />
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
    </div>
  );
}
