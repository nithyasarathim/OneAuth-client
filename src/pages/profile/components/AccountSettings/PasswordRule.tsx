import { CheckCircle, Circle } from "lucide-react";

type Props = {
  ok: boolean;
  label: string;
};

const PasswordRule = ({ ok, label }: Props) => (
  <div className="flex items-center gap-2 text-sm">
    {ok ? (
      <CheckCircle size={16} className="text-emerald-500" />
    ) : (
      <Circle size={16} className="text-gray-400" />
    )}
    <span className={ok ? "text-gray-900" : "text-gray-400"}>{label}</span>
  </div>
);

export default PasswordRule;
