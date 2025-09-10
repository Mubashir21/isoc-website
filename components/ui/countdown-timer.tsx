interface CountdownDisplayProps {
  countdown: string;
  targetPrayer: string;
  isIqamah: boolean;
}

export function CountdownDisplay({
  countdown,
  targetPrayer,
  isIqamah,
}: CountdownDisplayProps) {
  return (
    <div className="w-full text-center flex justify-between items-center">
      <div className="text-2xl font-bold font-mono tracking-wider mb-1">
        {countdown}
      </div>
      <div className="text-sm font-medium">
        {isIqamah
          ? `until ${targetPrayer} Iqamah`
          : `until ${targetPrayer} Adhan`}
      </div>
    </div>
  );
}
