"use client";

import { AnnouncementsForm } from "@/lib/definitions";
import Link from "next/link";
import SubmitButton from "@/components/ui/form-submit-button";
import { updateAnnouncement, AnnouncementState } from "@/lib/actions";
import { useActionState } from "react";
import { formatDateTime } from "@/lib/utils";
import { useState } from "react";

export default function EditAnnouncementForm({
  announcement,
}: {
  announcement: AnnouncementsForm;
}) {
  const initialState: AnnouncementState = { message: null, errors: {} };
  const updateAnnouncementWithId = updateAnnouncement.bind(
    null,
    announcement.id,
  );
  const [state, formAction] = useActionState(
    updateAnnouncementWithId,
    initialState,
  );
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Event Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Announcement Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={announcement.title}
            placeholder="Enter announcement title"
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

        {/* content */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Content
          </label>
          <div className="relative">
            <input
              id="content"
              name="content"
              type="text"
              defaultValue={announcement.content}
              placeholder="Enter announcement content"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="content-error"
            />
          </div>
          <div id="content-error" aria-live="polite" aria-atomic="true">
            {state.errors?.content &&
              state.errors.content.map((error: string) => (
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
          href="/admin/announcements"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
