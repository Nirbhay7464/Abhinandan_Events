import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: Props) {
  return (
    <div className="bg-white rounded-2xl px-6 py-5 flex items-center gap-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon size={26} strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 font-medium">
          {title}
        </span>
        <span className="text-2xl font-semibold text-gray-900 leading-tight">
          {value}
        </span>
      </div>
    </div>
  );
}
