import clsx from "clsx";

export default function Status({ eventDate }: { eventDate: string }) {
  const currentDate = new Date();
  const targetDate = new Date(eventDate);
  const status = targetDate > currentDate ? "UPCOMING" : "PAST";

  return (
    <div>
      <div className="border-0 rounded-3xl px-2 py-1 border-black inline-block bg-white mb-3">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-2 h-2 rounded-full animate-pulse", {
              "bg-green-500": status === "UPCOMING",
              "bg-red-500": status === "PAST",
            })}
          />
          <p className="text-sm font-bold">{status}</p>
        </div>
      </div>
    </div>
  );
}
