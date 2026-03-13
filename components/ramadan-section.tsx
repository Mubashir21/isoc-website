interface RamadanSectionProps {
  tahajjudTime: string;
  nightNumber: number;
}

export function RamadanSection({ tahajjudTime, nightNumber }: RamadanSectionProps) {
  const isOddNight = nightNumber % 2 !== 0;

  return (
    <div className="pt-4 border-t space-y-2">
      <div className="flex justify-between text-sm font-medium text-muted-foreground">
        <span>Last 10 Nights</span>
        <span>Night {nightNumber}{isOddNight ? " · Seek Laylatul Qadr" : ""}</span>
      </div>

      <div className="py-2 px-3 rounded-md text-sm font-medium bg-primary/10 text-primary border border-primary/20">
        <div className="flex justify-between items-center">
          <span>Qiyam ul Layl</span>
          <span>{tahajjudTime}</span>
        </div>
      </div>

      <div className="px-3 pt-1 space-y-1">
        <p className="text-sm text-right text-muted-foreground leading-relaxed">
          اللهم إنك عفو تحب العفو فاعف عني
        </p>
        <p className="text-xs text-muted-foreground">
          O Allah, You are Pardoning and You love to pardon, so pardon me.
        </p>
      </div>
    </div>
  );
}
