"use client";


export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (pass: string): number => {
    let score = 0;
    if (!pass) return score;

    // Length check
    if (pass.length >= 8) score += 1;

    // Contains number
    if (/\d/.test(pass)) score += 1;

    // Contains lowercase
    if (/[a-z]/.test(pass)) score += 1;

    // Contains uppercase
    if (/[A-Z]/.test(pass)) score += 1;

    // Contains special char
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score += 1;

    return score;
  };

  const strength = getStrength(password);
  const getColor = () => {
    switch (strength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
      case 5:
        return "bg-green-500";
      default:
        return "bg-slate";
    }
  };

  const getMessage = () => {
    switch (strength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
      case 5:
        return "Strong";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-1 h-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-colors ${
              i < strength ? getColor() : "bg-navy-light"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-slate">
        Password strength:{" "}
        <span className="text-slate-lighter">{getMessage()}</span>
      </p>
    </div>
  );
}
