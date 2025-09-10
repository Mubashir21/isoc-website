"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createEvent } from "@/lib/actions";
import { AdminField } from "@/lib/definitions";
import { eventSchema, type EventFormValues } from "@/lib/schemas";
import { toMalaysiaTime } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Calendar,
  Repeat,
  BookOpen,
  Trophy,
  Building,
  Users,
} from "lucide-react";

const eventTypeConfig = {
  lecture: {
    label: "Lecture",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  sports: {
    label: "Sports",
    icon: Trophy,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  masjid: {
    label: "Masjid",
    icon: Building,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  major: {
    label: "Major Event",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
};

interface EventFormProps {
  admins: AdminField[];
  onSuccess?: () => void;
}

export default function EventForm({ admins, onSuccess }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("regular");

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      speaker: "",
      type: "lecture",
      gender: "all",
      datetime: "",
      end_datetime: "",
      duration_minutes: 120,
      is_recurring: false,
      recurrence_type: "weekly",
      interval_value: 1,
      days_of_week: [],
      day_of_month: 1,
      month_of_year: 1,
      recurrence_end: "",
      created_by: "",
    },
  });

  const watchRecurrenceType = form.watch("recurrence_type");

  // Update is_recurring when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    form.setValue("is_recurring", value === "recurring");
  };

  const onSubmit = async (values: EventFormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "days_of_week") {
            formData.append(key, JSON.stringify(value));
          } else if (typeof value === "boolean") {
            formData.append(key, value.toString());
          } else if (key === "pic_url" && value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      formData.append("id", crypto.randomUUID());
      formData.append("status", "active");
      formData.append("is_exception", "false");
      formData.append("parent_event_id", "");

      const result = await createEvent(null, formData);

      if (!result.errors) {
        form.reset();
        onSuccess?.();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="regular" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Regular Event
          </TabsTrigger>
          <TabsTrigger value="recurring" className="flex items-center gap-2">
            <Repeat className="h-4 w-4" />
            Recurring Event
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="regular" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Create Regular Event
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <EventFormFields
                    form={form}
                    admins={admins}
                    isRecurring={false}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recurring" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Repeat className="h-5 w-5" />
                    Create Recurring Event
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <EventFormFields
                    form={form}
                    admins={admins}
                    isRecurring={true}
                  />

                  <Separator />

                  <RecurringSettings
                    form={form}
                    recurrenceType={watchRecurrenceType || "daily"}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : `Create ${activeTab} Event`}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}

// Shared form fields component
function EventFormFields({
  form,
  admins,
  isRecurring,
}: {
  form: any;
  admins: AdminField[];
  isRecurring: boolean;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Event Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter event title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Category</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(eventTypeConfig).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <Button
                    key={key}
                    type="button"
                    variant={field.value === key ? "default" : "outline"}
                    onClick={() => field.onChange(key)}
                    className="flex items-center gap-2 h-auto p-3"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{config.label}</span>
                  </Button>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="brothers">Brothers</SelectItem>
                <SelectItem value="sisters">Sisters</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="Enter event location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="speaker"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Speaker (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter speaker name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter event description"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pic_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Image</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    // Check file size (5MB limit)
                    if (file.size > 5 * 1024 * 1024) {
                      alert("File size must be less than 5MB");
                      e.target.value = ""; // Clear the input
                      return;
                    }

                    // Check file type
                    if (!file.type.startsWith("image/")) {
                      alert("Please select an image file");
                      e.target.value = "";
                      return;
                    }
                  }

                  field.onChange(file);
                }}
              />
            </FormControl>
            <FormDescription>
              Upload an image (max 5MB, JPG/PNG)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="created_by"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Created by</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an admin" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {admins.map((admin) => (
                  <SelectItem key={admin.id} value={admin.id}>
                    {admin.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="datetime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {isRecurring ? "Start Date & Time" : "Date & Time"} <span className="text-gray-500 text-xs">(Malaysia Time - GMT+8)</span>
            </FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="duration_minutes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duration (minutes)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

// Recurring settings component
function RecurringSettings({
  form,
  recurrenceType,
}: {
  form: any;
  recurrenceType: string;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Repeat className="h-5 w-5" />
        Recurrence Settings
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="recurrence_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interval_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Every</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  max="365"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {recurrenceType === "weekly" && (
          <FormField
            control={form.control}
            name="days_of_week"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Days of Week</FormLabel>
                <FormControl>
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
                      <Button
                        key={day.value}
                        type="button"
                        variant={
                          field.value.includes(day.value)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          const newDays = field.value.includes(day.value)
                            ? field.value.filter((d: number) => d !== day.value)
                            : [...field.value, day.value];
                          field.onChange(newDays);
                        }}
                      >
                        {day.label}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="recurrence_end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date <span className="text-gray-500 text-xs">(Malaysia Time - Optional)</span></FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Leave blank to continue indefinitely
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
