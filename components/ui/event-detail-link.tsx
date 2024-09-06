import Link from "next/link";

export default function AboutEvents({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <Link href={`/events/${id}`} className="p-0 m-0 hover:underline font-bold">
      {title}
    </Link>
  );
}
