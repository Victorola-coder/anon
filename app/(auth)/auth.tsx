"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui";
import Input from "@/app/components/ui/input";
import { useAuth } from "@/app/hooks/useAuth";
import { validations } from "@/app/lib/validations";
import { PasswordStrength } from "@/app/components/password-strength";

interface FormData {
  age: number;
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  age?: string;
}

interface AuthFormProps {
  route: "sign-in" | "sign-up";
}

export default function AuthForm({ route }: AuthFormProps) {
  const { signIn, signUp } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    age: 18,
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    const validation = validations[field as keyof typeof validations]?.(
      value as never
    );
    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } else if (validation && !validation.isValid) {
      setErrors((prev) => ({ ...prev, [field]: validation.message }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (route === "sign-in") {
        await signIn(formData.username, formData.password);
      } else {
        await signUp(formData.username, formData.password, formData.age);
      }
    } catch (error) {
      // Error handling is done in useAuth hook
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const usernameValid = validations.username(formData.username).isValid;
    const passwordValid = validations.password(formData.password).isValid;
    const ageValid =
      route === "sign-up" ? validations.age(formData.age).isValid : true;

    return usernameValid && passwordValid && ageValid;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {route === "sign-in" ? "Welcome back" : "Create an account"}
        </h2>
        <p className="mt-2 text-sm text-slate">
          {route === "sign-in"
            ? "Enter your credentials to access your account"
            : "Start your anonymous journey today"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="username"
          name="username"
          type="text"
          label="Username"
          className="mt-1"
          placeholder={
            route === "sign-in"
              ? "enter your username e.g femzy"
              : "create your username"
          }
          value={formData.username}
          error={route === "sign-up" ? errors.username : undefined}
          onChange={(e) => handleInputChange("username", e.target.value)}
        />

        {route === "sign-up" && (
          <Input
            id="age"
            label="Age"
            type="number"
            className="mt-1"
            error={errors.age}
            value={formData.age.toString()}
            placeholder="must be 18 or older"
            onChange={(e) => handleInputChange("age", Number(e.target.value))}
          />
        )}

        <Input
          required
          id="password"
          type="password"
          label="Password"
          className="mt-1"
          value={formData.password}
          error={route === "sign-up" ? errors.password : undefined}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder={
            route === "sign-up"
              ? "lowercase, uppercase, number, special char, min 8 chars"
              : "Enter your password"
          }
        />

        {route === "sign-up" && (
          <PasswordStrength password={formData.password} />
        )}

        <Button
          type="submit"
          loading={isLoading}
          className="w-full"
          disabled={
            route === "sign-up" ? !isFormValid() || isLoading : undefined
          }
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {route === "sign-in" ? "Signing in..." : "Creating account..."}
            </span>
          ) : route === "sign-in" ? (
            "Sign in"
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="text-left text-sm">
        {route === "sign-in" ? (
          <>
            Don't have an account?{" "}
            <Link href="/signup" className="text-teal hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/signin" className="text-teal hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </motion.div>
  );
}
