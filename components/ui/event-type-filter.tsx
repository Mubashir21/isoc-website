// components/ui/event-type-filter.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventTypeFilterProps {
  currentType: string;
  currentCategory: string;
}

export function EventTypeFilter({
  currentType,
  currentCategory,
}: EventTypeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page"); // Reset to first page
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      <Select
        value={currentType}
        onValueChange={(value) => updateFilter("type", value)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="regular">Regular</SelectItem>
          <SelectItem value="recurring">Recurring</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={currentCategory}
        onValueChange={(value) => updateFilter("category", value)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="lecture">Lectures</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
          <SelectItem value="masjid">Prayer</SelectItem>
          <SelectItem value="major">Community</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
