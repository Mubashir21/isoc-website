interface RamadanSectionProps {
  tahajjudTime: string;
}

export function RamadanSection({ tahajjudTime }: RamadanSectionProps) {
  return (
    <div className="pt-4 border-t">
      <h4 className="text-sm font-medium text-muted-foreground mb-2">
        Ramadan
      </h4>
      <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3">
        <div className="flex justify-between items-center text-sm font-medium text-emerald-700">
          <span>Tahajjud</span>
          <span>{tahajjudTime}</span>
        </div>
      </div>
    </div>
  );
}
