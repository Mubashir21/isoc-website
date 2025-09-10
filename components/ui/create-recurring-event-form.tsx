"use client";

import Link from "next/link";
import SubmitButton from "@/components/ui/form-submit-button";
import { AdminField } from "@/lib/definitions";
import { useState, useEffect } from "react";
import { Badge } from "./badge";
import { Calendar, Clock, MapPin, FileImage, Type, Users, Repeat, CalendarDays } from "lucide-react";
import { createRecurringEvent, RecurringEventState } from "@/lib/actions";
import { useActionState } from "react";
import { toMalaysiaTime } from "@/lib/utils";

export default function CreateRecurringEventForm({ admins }: { admins: AdminField[] }) {
  const initialState: RecurringEventState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createRecurringEvent, initialState);
  
  const [recurrenceType, setRecurrenceType] = useState<"daily" | "weekly" | "monthly" | "yearly" | "custom">("weekly");
  const [intervalValue, setIntervalValue] = useState(1);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [monthOfYear, setMonthOfYear] = useState(1);
  const [duration, setDuration] = useState(120);

  const daysOfWeek = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 7, label: "Sunday" },
  ];

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const handleDayToggle = (dayValue: number) => {
    setSelectedDays(prev => 
      prev.includes(dayValue) 
        ? prev.filter(d => d !== dayValue)
        : [...prev, dayValue]
    );
  };

  const getRecurrenceDescription = () => {
    switch (recurrenceType) {
      case "daily":
        return intervalValue === 1 ? "Every day" : `Every ${intervalValue} days`;
      case "weekly":
        if (selectedDays.length === 0) {
          return intervalValue === 1 ? "Every week" : `Every ${intervalValue} weeks`;
        }
        const dayLabels = selectedDays.map(d => daysOfWeek.find(day => day.value === d)?.label).join(", ");
        return intervalValue === 1 ? `Every week on ${dayLabels}` : `Every ${intervalValue} weeks on ${dayLabels}`;
      case "monthly":
        return intervalValue === 1 ? `Every month on day ${dayOfMonth}` : `Every ${intervalValue} months on day ${dayOfMonth}`;
      case "yearly":
        const monthLabel = months.find(m => m.value === monthOfYear)?.label;
        return intervalValue === 1 ? `Every year on ${monthLabel} ${dayOfMonth}` : `Every ${intervalValue} years on ${monthLabel} ${dayOfMonth}`;
      default:
        return "Custom recurrence";
    }
  };

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 space-y-6">
        {/* Hidden fields for form data */}
        <input type="hidden" name="days_of_week" value={JSON.stringify(selectedDays)} />
        <input type="hidden" name="pic_file_id" value="" />
        
        {/* Basic Event Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Basic Event Information
          </h3>
          
          {/* Event Title */}
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Event Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter event title"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>

          {/* Admin Name */}
          <div>
            <label htmlFor="admin" className="mb-2 block text-sm font-medium">
              Choose admin
            </label>
            <select
              id="admin"
              name="created_by"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              required
            >
              <option value="" disabled>Select an admin</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="mb-2 block text-sm font-medium">
              Location
            </label>
            <div className="relative">
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Enter event location"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
                required
              />
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label htmlFor="type" className="mb-2 block text-sm font-medium">
              Event Type
            </label>
            <div className="relative">
              <select
                id="type"
                name="type"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
                defaultValue="lecture"
              >
                <option value="lecture">Lecture</option>
                <option value="sports">Sports</option>
                <option value="masjid">Masjid Event</option>
                <option value="major">Major Event</option>
              </select>
              <Type className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Gender Segregation */}
          <div>
            <label htmlFor="gender" className="mb-2 block text-sm font-medium">
              Gender
            </label>
            <div className="relative">
              <select
                id="gender"
                name="gender"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
                defaultValue="mixed"
              >
                <option value="mixed">Mixed (Brothers & Sisters)</option>
                <option value="brothers">Brothers Only</option>
                <option value="sisters">Sisters Only</option>
              </select>
              <Users className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Recurrence Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Repeat className="h-5 w-5" />
            Recurrence Settings
          </h3>

          {/* Recurrence Type */}
          <div>
            <label htmlFor="recurrence_type" className="mb-2 block text-sm font-medium">
              Recurrence Type
            </label>
            <select
              id="recurrence_type"
              name="recurrence_type"
              value={recurrenceType}
              onChange={(e) => setRecurrenceType(e.target.value as any)}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              required
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* Interval Value */}
          <div>
            <label htmlFor="interval_value" className="mb-2 block text-sm font-medium">
              Every {recurrenceType === "daily" ? "N days" : 
                     recurrenceType === "weekly" ? "N weeks" : 
                     recurrenceType === "monthly" ? "N months" : "N years"}
            </label>
            <input
              id="interval_value"
              name="interval_value"
              type="number"
              min="1"
              max="52"
              value={intervalValue}
              onChange={(e) => setIntervalValue(parseInt(e.target.value))}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              required
            />
          </div>

          {/* Days of Week (for weekly) */}
          {recurrenceType === "weekly" && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                Days of the Week
              </label>
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => handleDayToggle(day.value)}
                    className={`p-2 text-xs rounded-md border transition-colors ${
                      selectedDays.includes(day.value)
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {day.label.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Day of Month (for monthly) */}
          {recurrenceType === "monthly" && (
            <div>
              <label htmlFor="day_of_month" className="mb-2 block text-sm font-medium">
                Day of Month
              </label>
              <input
                id="day_of_month"
                name="day_of_month"
                type="number"
                min="1"
                max="31"
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(parseInt(e.target.value))}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
                required
              />
            </div>
          )}

          {/* Month and Day (for yearly) */}
          {recurrenceType === "yearly" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="month_of_year" className="mb-2 block text-sm font-medium">
                  Month
                </label>
                <select
                  id="month_of_year"
                  name="month_of_year"
                  value={monthOfYear}
                  onChange={(e) => setMonthOfYear(parseInt(e.target.value))}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
                  required
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="day_of_month_yearly" className="mb-2 block text-sm font-medium">
                  Day
                </label>
                <input
                  id="day_of_month_yearly"
                  name="day_of_month"
                  type="number"
                  min="1"
                  max="31"
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(parseInt(e.target.value))}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
                  required
                />
              </div>
            </div>
          )}

          {/* Recurrence Summary */}
          <div className="p-3 bg-blue-50 rounded-md">
            <div className="text-sm font-medium text-blue-900 mb-1">Recurrence Summary:</div>
            <div className="text-sm text-blue-700">{getRecurrenceDescription()}</div>
          </div>
        </div>

        {/* Time and Date Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time and Date Settings
          </h3>

          {/* Start Date */}
          <div>
            <label htmlFor="start_date" className="mb-2 block text-sm font-medium">
              Start Date <span className="text-gray-500 text-xs">(Malaysia Time)</span>
            </label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label htmlFor="start_time" className="mb-2 block text-sm font-medium">
              Start Time <span className="text-gray-500 text-xs">(Malaysia Time)</span>
            </label>
            <input
              id="start_time"
              name="start_time"
              type="time"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration_minutes" className="mb-2 block text-sm font-medium">
              Duration (minutes)
            </label>
            <input
              id="duration_minutes"
              name="duration_minutes"
              type="number"
              min="15"
              max="480"
              step="15"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              required
            />
          </div>

          {/* End Date (Optional) */}
          <div>
            <label htmlFor="end_date" className="mb-2 block text-sm font-medium">
              End Date <span className="text-gray-500 text-xs">(Malaysia Time - Optional)</span>
            </label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty for no end date</p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Additional Information
          </h3>

          {/* Description */}
          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Enter event description"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
            />
          </div>

          {/* Event Image Uploader */}
          <div>
            <label htmlFor="pic_url" className="mb-2 block text-sm font-medium">
              Upload Image
            </label>
            <div className="relative">
              <input
                id="pic_url"
                name="pic_url"
                type="file"
                accept="image/jpeg, image/png"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              />
              <FileImage className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              defaultValue="active"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Template Option */}
          <div className="flex items-center gap-2">
            <input
              id="is_template"
              name="is_template"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_template" className="text-sm font-medium">
              Save as template for future use
            </label>
          </div>
        </div>
      </div>

      {/* Error and Success Messages */}
      <div className="mt-6">
        {state.message && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{state.message}</p>
          </div>
        )}
        
        {Object.keys(state.errors).length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            {Object.entries(state.errors).map(([field, errors]) => (
              <div key={field}>
                {errors?.map((error: string) => (
                  <p key={error} className="text-sm text-red-700">
                    {field}: {error}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
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
