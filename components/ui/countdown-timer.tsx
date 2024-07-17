export default function CountdownDisplay({
  countdown,
  nextPrayer,
}: {
  countdown: String;
  nextPrayer: String;
}) {
  return (
    <div className="flex justify-between w-full text-md font-medium text-white">
      <p>{nextPrayer}</p>
      <p className="">{countdown}</p>
    </div>
  );
}
