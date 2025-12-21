const IconButton = ({
  icon: Icon,
  label,
  disabled,
}: {
  icon: React.ElementType;
  label: string;
  disabled?: boolean;
}) => (
  <div className="relative group">
    <button
      disabled={disabled}
      className={`rounded-xl px-3 py-2 ${
        disabled ? "bg-gray-100 text-gray-400" : "bg-white hover:bg-gray-50"
      }`}
    >
      <Icon size={18} />
    </button>
    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100">
      {label}
    </span>
  </div>
);

export default IconButton;
