import { CheckCircle, Circle } from "lucide-react";

interface RuleChipProps {
  ok: boolean;
  label: string;
}

const RuleChip = ({ ok, label }: RuleChipProps) => {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition
        ${
          ok
            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
            : "border-gray-300 text-gray-400"
        }`}
    >
      {ok ? (
        <CheckCircle size={14} className="text-emerald-500" />
      ) : (
        <Circle size={14} />
      )}
      {label}
    </div>
  );
};

export default RuleChip;
