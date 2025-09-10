"use client";

import { Button } from "@/components/ui/button";
import { Pencil, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteEvent } from "@/lib/actions";

export function UpdateRecurringEvent({ id }: { id: string }) {
  return (
    <Link href={`/admin/recurring-events/${id}/edit`}>
      <Button variant="outline" size="sm">
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Edit recurring event</span>
      </Button>
    </Link>
  );
}

export function DeleteRecurringEvent({ 
  id, 
  pic_file_id 
}: { 
  id: string; 
  pic_file_id: string; 
}) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEvent(id, pic_file_id);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete recurring event:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">Delete recurring event</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Recurring Event</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this recurring event? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


