export default function DateDisplay({
  date,
  hijri,
  day,
}: {
  date: String;
  hijri: String;
  day: String;
}) {
  return (
    <div className="flex justify-between">
      <p className="text-md font-medium">{date}</p>
      <div className="text-right">
        <p className="text-md font-medium">{day}</p>
        <p className="text-sm text-muted-foreground">{hijri}</p>
      </div>
    </div>
  );
}
