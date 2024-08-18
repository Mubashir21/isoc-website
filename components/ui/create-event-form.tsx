"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createEvent, State } from "@/lib/actions";
import { useFormState } from "react-dom";
import { AdminField } from "@/lib/definitions";

export default function Form({ admins }: { admins: AdminField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(createEvent, initialState);
  console.log(state);

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
              defaultValue=""
              aria-describedby="admin-error"
            >
              <option value="" disabled>
                Select a admin
              </option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </select>
            {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
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
          <input
            id="datetime"
            name="datetime"
            type="datetime-local"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="datetime-error"
          />
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
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Enter event location"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="location-error"
          />
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

        {/* Event Image URL */}
        <div className="mb-4">
          <label htmlFor="pic_url" className="mb-2 block text-sm font-medium">
            Image URL
          </label>
          <input
            id="pic_url"
            name="pic_url"
            type="url"
            placeholder="Enter event image URL"
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
        <Button type="submit">Create Event</Button>
      </div>
    </form>

    // <form action={formAction}>
    //   <div className="rounded-md bg-gray-50 p-4 md:p-6">
    //     {/* Customer Name */}
    //     <div className="mb-4">
    //       <label htmlFor="customer" className="mb-2 block text-sm font-medium">
    //         Choose customer
    //       </label>
    //       <div className="relative">
    //         <select
    //           id="customer"
    //           name="customerId"
    //           className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
    //           defaultValue=""
    //           aria-describedby="customer-error"
    //         >
    //           <option value="" disabled>
    //             Select a customer
    //           </option>
    //           {admins.map((admin) => (
    //             <option key={admin.id} value={admin.id}>
    //               {admin.name}
    //             </option>
    //           ))}
    //         </select>
    //         <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
    //       </div>
    //       <div id="customer-error" aria-live="polite" aria-atomic="true">
    //         {state.errors?.created_by &&
    //           state.errors.created_by.map((error: string) => (
    //             <p className="mt-2 text-sm text-red-500" key={error}>
    //               {error}
    //             </p>
    //           ))}
    //       </div>
    //     </div>

    //     {/* Invoice Amount */}
    //     <div className="mb-4">
    //       <label htmlFor="amount" className="mb-2 block text-sm font-medium">
    //         Choose an amount
    //       </label>
    //       <div className="relative mt-2 rounded-md">
    //         <div className="relative">
    //           <input
    //             id="amount"
    //             name="amount"
    //             type="number"
    //             step="0.01"
    //             placeholder="Enter USD amount"
    //             className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
    //           />
    //           <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    //         </div>
    //         <div id="amount-error" aria-live="polite" aria-atomic="true">
    //           {state.errors?.amount &&
    //             state.errors.amount.map((error: string) => (
    //               <p className="mt-2 text-sm text-red-500" key={error}>
    //                 {error}
    //               </p>
    //             ))}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Invoice Status */}
    //     <fieldset>
    //       <legend className="mb-2 block text-sm font-medium">
    //         Set the invoice status
    //       </legend>
    //       <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
    //         <div className="flex gap-4">
    //           <div className="flex items-center">
    //             <input
    //               id="pending"
    //               name="status"
    //               type="radio"
    //               value="pending"
    //               className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
    //             />
    //             <label
    //               htmlFor="pending"
    //               className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
    //             >
    //               Pending <ClockIcon className="h-4 w-4" />
    //             </label>
    //           </div>
    //           <div className="flex items-center">
    //             <input
    //               id="paid"
    //               name="status"
    //               type="radio"
    //               value="paid"
    //               className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
    //             />
    //             <label
    //               htmlFor="paid"
    //               className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
    //             >
    //               Paid <CheckIcon className="h-4 w-4" />
    //             </label>
    //           </div>
    //         </div>
    //       </div>
    //       <div id="invoice-error" aria-live="polite" aria-atomic="true">
    //         {state.errors?.status &&
    //           state.errors.status.map((error: string) => (
    //             <p className="mt-2 text-sm text-red-500" key={error}>
    //               {error}
    //             </p>
    //           ))}
    //       </div>
    //     </fieldset>
    //     <div id="fields-error" aria-live="polite" aria-atomic="true">
    //       {state.message && (
    //         <p className="mt-2 text-sm text-red-500" key={state.message}>
    //           {state.message}
    //         </p>
    //       )}
    //     </div>
    //   </div>
    //   <div className="mt-6 flex justify-end gap-4">
    //     <Link
    //       href="/dashboard/invoices"
    //       className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
    //     >
    //       Cancel
    //     </Link>
    //     <Button type="submit">Create Invoice</Button>
    //   </div>
    // </form>
  );
}
