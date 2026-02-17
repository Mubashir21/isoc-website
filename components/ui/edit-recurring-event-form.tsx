"use client";

import { EventForm } from "@/lib/definitions";
import SubmitButton from "@/components/ui/form-submit-button";
import { updateEvent, EventState } from "@/lib/actions";
import { useActionState } from "react";
import { formatDateTime, formatDateTimeForMalaysia, toMalaysiaTime } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Badge } from "./badge";
import { Calendar, Clock, MapPin, User, Type, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditRecurringEventForm({
  event,
}: {
  event: EventForm;
}) {
  const initialState: EventState = { message: null, errors: {} };
  const updateEventWithId = updateEvent.bind(
    null,
    event.id,
    event.pic_url,
    event.pic_file_id,
  );
  const [state, formAction] = useActionState(updateEventWithId, initialState);
  const router = useRouter();

  // Parse days_of_week from database
  const parseDaysOfWeek = (daysString: string | null) => {
    if (!daysString) return [];
    try {
      if (typeof daysString === 'string') {
        // Handle PostgreSQL array format {1,2,3} or JSON format [1,2,3]
        const cleaned = daysString.replace(/[{}]/g, '').replace(/[\[\]]/g, '');
        return cleaned.split(',').map(d => parseInt(d.trim())).filter(d => !isNaN(d));
      }
      return Array.isArray(daysString) ? daysString : [];
    } catch {
      return [];
    }
  };

  const [selectedDays, setSelectedDays] = useState<number[]>(() => 
    parseDaysOfWeek(event.days_of_week as any)
  );

  // Redirect to events page after successful update
  useEffect(() => {
    if (state.message === "Event updated successfully") {
      router.push("/admin/events");
    }
  }, [state.message, router]);

  useEffect(() => {
    const isRecurringCheckbox = document.getElementById('is_recurring') as HTMLInputElement;
    const recurrenceFields = document.getElementById('recurrence-fields');

    const toggleFields = () => {
      if (isRecurringCheckbox?.checked) {
        recurrenceFields!.style.display = 'block';
      } else {
        recurrenceFields!.style.display = 'none';
      }
    };

    if (isRecurringCheckbox) {
      isRecurringCheckbox.addEventListener('change', toggleFields);
      toggleFields(); // Initial state
    }

    return () => {
      if (isRecurringCheckbox) {
        isRecurringCheckbox.removeEventListener('change', toggleFields);
      }
    };
  }, []);

  const handleDayToggle = (dayValue: number) => {
    setSelectedDays(prev => 
      prev.includes(dayValue) 
        ? prev.filter(d => d !== dayValue)
        : [...prev, dayValue]
    );
  };

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden field for days_of_week as JSON array */}
      <input 
        type="hidden" 
        name="days_of_week" 
        value={JSON.stringify(selectedDays)} 
      />
      
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium flex items-center gap-2">
            <Type className="h-4 w-4" />
            Event Title
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter event title"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={event.title}
              required
              aria-describedby="title-error"
            />
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              placeholder="Enter event description (optional)"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              rows={3}
              defaultValue={event.description}
              aria-describedby="description-error"
            />
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </label>
          <div className="relative">
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter event location"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={event.location}
              required
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
          <label htmlFor="speaker" className="mb-2 block text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Speaker <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <div className="relative">
            <input
              id="speaker"
              name="speaker"
              type="text"
              placeholder="Enter speaker name (optional)"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={event.speaker}
              aria-describedby="speaker-error"
            />
          </div>
          <div id="speaker-error" aria-live="polite" aria-atomic="true">
            {state.errors?.speaker &&
              state.errors.speaker.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            Event Type
          </label>
          <div className="relative">
            <select
              id="type"
              name="type"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              defaultValue={event.type}
              aria-describedby="type-error"
            >
              <option value="" disabled>
                Select event type
              </option>
              <option value="lecture">Lecture</option>
              <option value="sports">Sports</option>
              <option value="masjid">Masjid</option>
              <option value="major">Major</option>
            </select>
          </div>
          <div id="type-error" aria-live="polite" aria-atomic="true">
            {state.errors?.type &&
              state.errors.type.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label htmlFor="gender" className="mb-2 block text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Audience
          </label>
          <div className="relative">
            <select
              id="gender"
              name="gender"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              defaultValue={event.gender}
              aria-describedby="gender-error"
            >
              <option value="" disabled>
                Select audience
              </option>
              <option value="all">All (Mixed)</option>
              <option value="brothers">Brothers Only</option>
              <option value="sisters">Sisters Only</option>
            </select>
          </div>
          <div id="gender-error" aria-live="polite" aria-atomic="true">
            {state.errors?.gender &&
              state.errors.gender.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* DateTime */}
        <div className="mb-4">
          <label htmlFor="datetime" className="mb-2 block text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Start Date & Time <span className="text-gray-500 text-xs">(Malaysia Time - GMT+8)</span>
          </label>
          <div className="relative">
            <input
              id="datetime"
              name="datetime"
              type="datetime-local"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={formatDateTime(event.datetime)}
              required
              aria-describedby="datetime-error"
            />
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

        {/* End DateTime (Optional) */}
        <div className="mb-4">
          <label htmlFor="end_datetime" className="mb-2 block text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            End Date & Time <span className="text-gray-500 text-xs">(Malaysia Time - Optional)</span>
          </label>
          <div className="relative">
            <input
              id="end_datetime"
              name="end_datetime"
              type="datetime-local"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={event.end_datetime ? formatDateTime(event.end_datetime) : ""}
              aria-describedby="end-datetime-error"
            />
          </div>
          <div id="end-datetime-error" aria-live="polite" aria-atomic="true">
            {state.errors?.end_datetime &&
              state.errors.end_datetime.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label htmlFor="duration_minutes" className="mb-2 block text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Duration (minutes)
          </label>
          <div className="relative">
            <input
              id="duration_minutes"
              name="duration_minutes"
              type="number"
              min="15"
              step="15"
              placeholder="120"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={event.duration_minutes || 120}
              aria-describedby="duration-error"
            />
          </div>
          <div id="duration-error" aria-live="polite" aria-atomic="true">
            {state.errors?.duration_minutes &&
              state.errors.duration_minutes.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Recurring Event Checkbox */}
        <div className="mb-4">
          <div className="flex items-center">
            <input
              id="is_recurring"
              name="is_recurring"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              defaultChecked={event.is_recurring || false}
            />
            <label htmlFor="is_recurring" className="ml-2 block text-sm font-medium">
              This is a recurring event
            </label>
          </div>
        </div>

        {/* Recurrence Fields */}
        <div id="recurrence-fields" className="space-y-4" style={{ display: event.is_recurring ? 'block' : 'none' }}>
          {/* Recurrence Type */}
          <div>
            <label htmlFor="recurrence_type" className="mb-2 block text-sm font-medium">
              Recurrence Pattern
            </label>
            <select
              id="recurrence_type"
              name="recurrence_type"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              defaultValue={event.recurrence_type || ""}
            >
              <option value="">Select pattern</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Interval */}
          <div>
            <label htmlFor="interval_value" className="mb-2 block text-sm font-medium">
              Repeat Every
            </label>
            <input
              id="interval_value"
              name="interval_value"
              type="number"
              min="1"
              placeholder="1"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              defaultValue={event.interval_value || 1}
            />
          </div>

          {/* Days of Week Selection */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Days of Week (for weekly events)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 1, label: "Mon" },
                { value: 2, label: "Tue" },
                { value: 3, label: "Wed" },
                { value: 4, label: "Thu" },
                { value: 5, label: "Fri" },
                { value: 6, label: "Sat" },
                { value: 7, label: "Sun" },
              ].map((day) => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => handleDayToggle(day.value)}
                  className={`px-3 py-1 text-sm rounded border transition-colors ${
                    selectedDays.includes(day.value)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Select the days when this event occurs (for weekly events)
            </p>
          </div>

          {/* Day of Month */}
          <div>
            <label htmlFor="day_of_month" className="mb-2 block text-sm font-medium">
              Day of Month (for monthly/yearly events)
            </label>
            <input
              id="day_of_month"
              name="day_of_month"
              type="number"
              min="1"
              max="31"
              placeholder="1"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              defaultValue={event.day_of_month || 1}
            />
          </div>

          {/* Month of Year */}
          <div>
            <label htmlFor="month_of_year" className="mb-2 block text-sm font-medium">
              Month (for yearly events)
            </label>
            <select
              id="month_of_year"
              name="month_of_year"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              defaultValue={event.month_of_year || 1}
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>



          {/* Recurrence End Date */}
          <div>
            <label htmlFor="recurrence_end" className="mb-2 block text-sm font-medium">
              End Date <span className="text-gray-500 text-xs">(Malaysia Time - Optional)</span>
            </label>
            <input
              id="recurrence_end"
              name="recurrence_end"
              type="date"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              defaultValue={event.recurrence_end ? 
                toMalaysiaTime(new Date(event.recurrence_end)).toISOString().split('T')[0]
                : ""}
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty for events that repeat indefinitely
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Status
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              defaultValue={event.status || "active"}
              aria-describedby="status-error"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

      </div>

      <div className="mt-6 flex justify-end gap-4">
        <SubmitButton />
      </div>

      {/* Display form state messages */}
      <div id="form-error" aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className={`mt-2 text-sm ${state.message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}