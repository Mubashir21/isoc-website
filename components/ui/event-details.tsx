import { EventCard } from "@/lib/definitions";
import { formatDateToLocal, formatTimeTo24Hour } from "@/lib/utils";
import Image from "next/image";
import Status from "@/components/ui/event-status";

export default function EventDetails({ event }: { event: EventCard }) {
  return (
    <div>
      <div className="hidden xl:block">
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <div className="aspect-w-4 aspect-h-5 max-w-[50%]">
            <Image
              src={event.pic_url}
              width={400}
              height={700}
              alt="Picture"
              className="rounded-xl w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 bg-gray-300 p-7 rounded-xl">
            <div className="flex flex-col my-5">
              <div className="flex flex-col gap-8">
                <div>
                  <Status eventDate={event.datetime} />
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-black text-5xl">{event.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Speaker</p>
                  <p className="text-xl text-gray-800 font-bold">
                    {event.speaker}
                  </p>
                </div>
                <div>
                  <div className="flex justify-between xl:w-3/4 md:w-full">
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="text-base text-gray-800 font-bold">
                        {formatDateToLocal(event.datetime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="text-base text-gray-800 font-bold">
                        {formatTimeTo24Hour(event.datetime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-base text-gray-800 font-bold">
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-justify text-sm">{event.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:hidden">
        <div className="flex-1">
          <div className="flex flex-col">
            <div className="flex flex-col gap-8">
              <div>
                <Status eventDate={event.datetime} />
                <p className="text-sm text-muted-foreground">Title</p>
                <p className="font-black text-5xl">{event.title}</p>
              </div>
              <Image
                src={event.pic_url}
                width={400}
                height={700}
                alt="Picture"
                className="rounded-xl w-full h-full object-cover"
              />
              <div>
                <p className="text-sm text-muted-foreground">Speaker</p>
                <p className="text-2xl text-gray-800 font-bold">
                  {event.speaker}
                </p>
              </div>
              <div>
                <div className="flex justify-between xl:w-3/4 md:w-full">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="text-base text-gray-800 font-bold">
                      {formatDateToLocal(event.datetime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="text-base text-gray-800 font-bold">
                      {formatTimeTo24Hour(event.datetime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-base text-gray-800 font-bold">
                      {event.location}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-justify text-sm font-medium">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
