"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui";
import Input from "@/app/components/ui/input";
import { useRouter } from "next-nprogress-bar";
import { ANON_SERVER_URL } from "@/app/constants";
import { useAuthStore } from "@/app/store/useAuth";
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

export default function AuthForm({ route }: AuthFormProps) {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    age: 18,
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const usernameValidation = validations.username(formData.username);
    const passwordValidation = validations.password(formData.password);
    const ageValidation =
      route === "sign-up" ? validations.age(formData.age) : { isValid: true };

    const isValid =
      usernameValidation.isValid &&
      passwordValidation.isValid &&
      ageValidation.isValid &&
      formData.username.trim() !== "" &&
      formData.password.trim() !== "" &&
      (route !== "sign-up" || formData.age >= 18);

    return isValid;
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | number | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // @ts-ignore
    const validation = validations[field as keyof typeof validations](value);
    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } else if (!validation.isValid) {
      setErrors((prev) => ({ ...prev, [field]: validation.message }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestBody =
        route === "sign-up"
          ? {
              username: formData.username,
              password: formData.password,
              age: Number(formData.age),
            }
          : {
              username: formData.username,
              password: formData.password,
            };

      const response = await fetch(`${ANON_SERVER_URL}/api/user/${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Auth Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      if (route === "sign-in") {
        setUser(data.user);
        setToken(data.token);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Signed in successfully!");
        router.push("/dashboard");
      } else {
        toast.success("Account created successfully!");
        router.push("/signin");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // const isDisabled =
  //   !validations.username(formData.username).isValid ||
  //   !validations.password(formData.password).isValid ||
  // (route === "sign-up" && !validations.age(formData.age).isValid);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8"
    >
      <div className="">
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
        <fieldset>
          <Input
            id="username"
            name="username"
            type="text"
            label="Username"
            value={formData.username}
            error={errors.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className="mt-1"
            placeholder="femzy"
          />
        </fieldset>

        {route === "sign-up" && (
          <fieldset>
            <Input
              id="age"
              type="number"
              label="Age"
              value={formData.age.toString()}
              error={errors.age}
              onChange={(e) => handleInputChange("age", Number(e.target.value))}
              className="mt-1"
              placeholder="must be 18 or older"
            />
          </fieldset>
        )}

        <fieldset>
          <Input
            required
            id="password"
            type="password"
            label="Password"
            value={formData.password}
            error={errors.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="mt-1"
            placeholder="lowercase, uppercase, number, special char, min 8 chars"
          />
          <PasswordStrength password={formData.password} />
        </fieldset>

        <Button
          type="submit"
          loading={loading}
          className="w-full"
          disabled={loading || !validateForm()}
        >
          {loading ? (
            <span className="flex items-center gap-2">
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
            </span>
          ) : route === "sign-in" ? (
            "Sign in"
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="text-center text-sm">
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
