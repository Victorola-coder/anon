import { clsx } from "clsx";

interface CardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon?: React.ElementType;
}

export function Card({ title, value, change, trend, icon }: CardProps) {
  return (
    <div className="p-6 rounded-xl bg-navy border border-navy-light">
      <h3 className="text-sm font-medium text-slate">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-slate-lighter">
          {value}
        </span>

        <span
          className={clsx(
            "text-sm",
            trend === "up" ? "text-teal" : "text-red-500"
          )}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
