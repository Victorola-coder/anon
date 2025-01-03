"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui";
import Input from "@/app/components/ui/input";
import { ANON_SERVER_URL } from "@/app/constants";
import { useRouter } from "next-nprogress-bar";

interface AuthFormProps {
  route: "sign-in" | "sign-up";
}

interface FormData {
  age: number;
  username: string;
  password: string;
}

export default function AuthForm({ route }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    age: 18,
    password: "",
  });

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

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      toast.success(
        route === "sign-up"
          ? "Account created successfully!"
          : "Signed in successfully!"
      );

      if (route === "sign-in") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      }
      localStorage.setItem("token", data.token);
      router.push(route === "sign-up" ? "/sign-in" : "/dashboard");
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

  const validUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return usernameRegex.test(username);
  };

  const validPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isDisabled =
    !validUsername(formData.username) ||
    !validPassword(formData.password) ||
    (route === "sign-up" && formData.age < 18);

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset>
          <Input
            id="username"
            type="text"
            required
            label="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            className="mt-1"
            placeholder="femzy"
          />
        </fieldset>

        {route === "sign-up" && (
          <fieldset>
            <Input
              required
              id="age"
              type="number"
              label="Age"
              value={formData.age.toString()}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  age: Number(e.target.value),
                }))
              }
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
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="mt-1"
            placeholder="lowercase, uppercase, number, special char, min 8 chars"
          />
        </fieldset>

        <Button
          type="submit"
          loading={loading}
          className="w-full"
          // disabled={isDisabled}
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
