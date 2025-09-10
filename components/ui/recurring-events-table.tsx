import Image from "next/image";
import { UpdateRecurringEvent, DeleteRecurringEvent } from "@/components/ui/recurring-events-edit";
import { formatDateToLocal, formatTimeTo24Hour } from "@/lib/utils";
import { LocalTimeDisplay, LocalDateDisplay } from "../date-time-display";
import { fetchFilteredRecurringEvents } from "@/lib/data";
import { Badge } from "./badge";
import { Calendar, Clock, MapPin, Repeat, Users } from "lucide-react";

export async function RecurringEventsTable({
  query,
  currentPage,
  category,

}: {
  query: string;
  currentPage: number;
  category?: string;
}) {
  const events = await fetchFilteredRecurringEvents(query, currentPage, category);
  console.log("brother" +  events);

  const getRecurrenceDescription = (event: any) => {
    switch (event.recurrence_type) {
      case "daily":
        return event.interval_value === 1 ? "Every day" : `Every ${event.interval_value} days`;
      case "weekly":
        if (event.days_of_week && event.days_of_week.length > 0) {
          const dayLabels = event.days_of_week.map((d: number) => {
            const days = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            return days[d] || "";
          }).filter(Boolean).join(", ");
          return event.interval_value === 1 ? `Every week on ${dayLabels}` : `Every ${event.interval_value} weeks on ${dayLabels}`;
        }
        return event.interval_value === 1 ? "Every week" : `Every ${event.interval_value} weeks`;
      case "monthly":
        return event.interval_value === 1 ? `Every month on day ${event.day_of_month}` : `Every ${event.interval_value} months on day ${event.day_of_month}`;
      case "yearly":
        const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthLabel = months[event.month_of_year] || "";
        return event.interval_value === 1 ? `Every year on ${monthLabel} ${event.day_of_month}` : `Every ${event.interval_value} years on ${monthLabel} ${event.day_of_month}`;
      default:
        return "Custom recurrence";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "lecture":
        return <Badge className="bg-blue-100 text-blue-800">Lecture</Badge>;
      case "sports":
        return <Badge className="bg-green-100 text-green-800">Sports</Badge>;
      case "masjid":
        return <Badge className="bg-purple-100 text-purple-800">Masjid</Badge>;
      case "major":
        return <Badge className="bg-orange-100 text-orange-800">Major</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{type}</Badge>;
    }
  };

  const getGenderBadge = (gender: string) => {
    switch (gender) {
      case "mixed":
        return <Badge className="bg-blue-100 text-blue-800">Mixed</Badge>;
      case "brothers":
        return <Badge className="bg-green-100 text-green-800">Brothers</Badge>;
      case "sisters":
        return <Badge className="bg-pink-100 text-pink-800">Sisters</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{gender}</Badge>;
    }
  };

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
                      src={event.pic_url || "/mosque.svg"}
                      className="rounded-full"
                      width={28}
                      height={28}
                      alt={`${event.title}'s poster picture`}
                    />
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {getTypeBadge(event.type)}
                        {getGenderBadge(event.gender)}
                        {getStatusBadge(event.status)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Location:</span>{" "}
                    {event.location}
                  </p>
                  <div className="text-sm">
                    <span className="font-medium">Recurrence:</span>{" "}
                    <div className="inline-flex items-center gap-1">
                      <Repeat className="h-4 w-4 text-gray-500" />
                      <span>{getRecurrenceDescription(event)}</span>
                    </div>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Start Date:</span>{" "}
                    <LocalDateDisplay datetime={event.datetime} />
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Start Time:</span>{" "}
                    <LocalTimeDisplay datetime={event.datetime} />
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Duration:</span>{" "}
                    {event.duration_minutes} min
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Admin:</span>{" "}
                    {event.created_by}
                  </p>
                  <div className="flex justify-end gap-2 pt-2">
                    <UpdateRecurringEvent id={event.id} />
                    <DeleteRecurringEvent
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
                    Type & Gender
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Location
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Recurrence
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Start Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Start Time
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Duration
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Admin
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Actions</span>
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
                          src={event.pic_url || "/mosque.svg"}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${event.title}'s poster picture`}
                        />
                        <div>
                          <p className="font-medium">{event.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <div className="flex flex-col gap-1">
                        {getTypeBadge(event.type)}
                        {getGenderBadge(event.gender)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {event.location}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <div className="flex items-center gap-1">
                        <Repeat className="h-4 w-4 text-gray-500" />
                        <span className="text-xs">
                          {getRecurrenceDescription(event)}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <LocalDateDisplay datetime={event.datetime} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                    <LocalTimeDisplay datetime={event.datetime} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {event.duration_minutes} min
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {getStatusBadge(event.status)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {event.created_by}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateRecurringEvent id={event.id} />
                        <DeleteRecurringEvent
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


