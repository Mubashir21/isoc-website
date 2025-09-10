"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CreateRecurringEventForm from "./create-recurring-event-form";
import { AdminField } from "@/lib/definitions";

interface CreateRecurringEventProps {
  admins: AdminField[];
}

export function CreateRecurringEvent({ admins }: CreateRecurringEventProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700">
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Recurring Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Recurring Event</DialogTitle>
          <DialogDescription>
            Set up a recurring event with custom recurrence patterns, timing, and settings.
          </DialogDescription>
        </DialogHeader>
        <CreateRecurringEventForm admins={admins} />
      </DialogContent>
    </Dialog>
  );
}


