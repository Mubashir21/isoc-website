"use client";

import { AdminField, EventsForm } from "@/lib/definitions";
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SubmitButton from "@/components/ui/form-submit-button";
import { updateEvent, EventState } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { formatDateTime } from "@/lib/utils";
import { useState } from "react";

export default function EditEventForm({
  event,
  admins,
}: {
  event: EventsForm;
  admins: AdminField[];
}) {
  const initialState: EventState = { message: null, errors: {} };
  const updateEventWithId = updateEvent.bind(null, event.id, event.pic_url);
  const [state, formAction] = useFormState(updateEventWithId, initialState);
  const { pending } = useFormStatus();
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  // const handleSubmit = async (formData: FormData) => {
  //   if (newImage) {
  //     // If there's a new image, upload it to Cloudinary first
  //     const imageData = new FormData();
  //     imageData.append("file", newImage);
  //     imageData.append("upload_preset", "your_cloudinary_upload_preset");

  //     try {
  //       const res = await fetch(
  //         "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
  //         {
  //           method: "POST",
  //           body: imageData,
  //         },
  //       );
  //       const data = await res.json();
  //       formData.set("pic_url", data.secure_url);
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       // Handle error (e.g., show error message to user)
  //       return;
  //     }
  //   } else {
  //     // If no new image, keep the existing pic_url
  //     formData.set("pic_url", event.pic_url);
  //   }

  //   // Now submit the form with potentially updated pic_url
  //   formAction(formData);
  // };

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Event Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Event Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={event.title}
            placeholder="Enter event title"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Admin Name */}
        <div className="mb-4">
          <label htmlFor="admin" className="mb-2 block text-sm font-medium">
            Choose admin
          </label>
          <div className="relative">
            <select
              id="admin"
              name="created_by"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={event.created_by}
              aria-describedby="admin-error"
            >
              <option value="" disabled>
                Select an admin
              </option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="admin-error" aria-live="polite" aria-atomic="true">
            {state.errors?.created_by &&
              state.errors.created_by.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Event Date and Time */}
        <div className="mb-4">
          <label htmlFor="datetime" className="mb-2 block text-sm font-medium">
            Date and Time
          </label>
          <div className="relative">
            <input
              id="datetime"
              name="datetime"
              type="datetime-local"
              defaultValue={formatDateTime(event.datetime)}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="datetime-error"
            />
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="datetime-error" aria-live="polite" aria-atomic="true">
            {state.errors?.datetime &&
              state.errors.datetime.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
            Location
          </label>
          <div className="relative">
            <input
              id="location"
              name="location"
              type="text"
              defaultValue={event.location}
              placeholder="Enter event location"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="location-error"
            />
          </div>
          <div id="location-error" aria-live="polite" aria-atomic="true">
            {state.errors?.location &&
              state.errors.location.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Speaker */}
        <div className="mb-4">
          <label htmlFor="speaker" className="mb-2 block text-sm font-medium">
            Speaker
          </label>
          <input
            id="speaker"
            name="speaker"
            type="text"
            defaultValue={event.speaker}
            placeholder="Enter speaker's name"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="speaker-error"
          />
          <div id="speaker-error" aria-live="polite" aria-atomic="true">
            {state.errors?.speaker &&
              state.errors.speaker.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Event Image Uploader */}
        <div className="mb-4">
          <label htmlFor="pic_url" className="mb-2 block text-sm font-medium">
            Upload Image
          </label>
          {event.pic_url && (
            <img
              src={event.pic_url}
              alt="Current event image"
              className="mb-2 h-40 w-auto"
            />
          )}
          <input
            id="pic_url"
            name="pic_url"
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="pic_url-error"
          />
          <div id="pic_url-error" aria-live="polite" aria-atomic="true">
            {state.errors?.pic_url &&
              state.errors.pic_url.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={event.description}
            placeholder="Enter event description"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="description-error"
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Submit Button */}
        <div id="fields-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/events"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
