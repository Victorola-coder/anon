import clsx from "clsx";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../svgs";

interface InputFieldProps extends InputProps {
  label?: string;
  id: string;
}

export default function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="font-semibold capitalize text-sm block text-slate"
        >
          {label}
        </label>
      )}
      <div
        className={clsx(
          className,
          "transition-all duration-300",
          "border border-white  rounded-xl px-3 py-4 bg-transparent flex items-center justify-between"
        )}
      >
        <input
          {...props}
          id={id}
          name={id}
          type={isPasswordType ? (showPassword ? "text" : "password") : type}
          value={value}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            "flex-1 h-full bg-transparent",
            "text-sm placeholder:text-[#a3a3a3] text-slate-lighter",
            "outline-none",
            className
          )}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[#999] hover:text-teal transition-colors"
          >
            {showPassword ? (
              <EyeSlashIcon className={showPassword ? "" : ""} />
            ) : (
              <EyeIcon className={showPassword ? "" : ""} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
