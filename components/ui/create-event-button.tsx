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
import CreateEventForm from "./create-event-form";

export function CreateEventButton() {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false); // Close the dialog
    // Optionally add a success toast/notification here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Regular Event</DialogTitle>
          <DialogDescription>
            Set up a one-time event with specific date, time, and details.
          </DialogDescription>
        </DialogHeader>
        <CreateEventForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
