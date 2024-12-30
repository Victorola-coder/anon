import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  noDefault?: boolean;
  variant?: "default" | "secondary" | "danger";
  size?: "default" | "sm" | "lg";
}

export default function Button({
  loading,
  noDefault,
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "transition-all duration-300 active:scale-[0.97] rounded-[10px] font-medium disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-none",
        {
          "px-[21px] py-[12.5px] text-[18px]": size === "default",
          "px-3 py-2 text-sm": size === "sm",
          "px-6 py-3 text-lg": size === "lg",
          "bg-primary hover:bg-primary-100 active:bg-primary-200 text-white":
            variant === "default",
          "bg-navy-light hover:bg-navy-light/80 text-slate-lighter":
            variant === "secondary",
          "bg-red-500/10 hover:bg-red-500/20 text-red-500":
            variant === "danger",
        },
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center">
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          children
        )}
      </div>
    </button>
  );
}
