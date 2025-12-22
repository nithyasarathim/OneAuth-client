const IconInput = ({
  icon,
  ...props
}: {
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </span>
    <input
      {...props}
      className="w-full rounded-xl border border-gray-300 pl-11 pr-4 py-3 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
    />
  </div>
);

export default IconInput;
