"use client";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i < strength ? "bg-teal-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-gray-500">
        {strength === 0 && "Very weak"}
        {strength === 1 && "Weak"}
        {strength === 2 && "Fair"}
        {strength === 3 && "Good"}
        {strength === 4 && "Strong"}
        {strength === 5 && "Very strong"}
      </p>
    </div>
  );
}
