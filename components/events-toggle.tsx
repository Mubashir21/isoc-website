"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";

export function EventsToggle() {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = pathname.includes("/future") ? "future" : "past";

  const handleTabChange = (value: string) => {
    router.push(`/events/${value}`);
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleTabChange}
      className="w-full max-w-md"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="future"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          Future Events
        </TabsTrigger>
        <TabsTrigger
          value="past"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          Past Events
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
