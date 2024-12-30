"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui";
import Input from "@/app/components/ui/input";

interface AuthFormProps {
  route: "sign-in" | "sign-up";
}

interface FormData {
  email: string;
  password: string;
}

export default function AuthForm({ route }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      //  authentication logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        `${route === "sign-in" ? "Signed in" : "Account created"} successfully!`
      );
      router.push("/dashboard");
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isDisabled = !validEmail(formData.email);

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
            id="email"
            type="email"
            required
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="mt-1"
            placeholder="you@example.com"
          />
        </fieldset>

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
            placeholder="valid password"
          />
        </fieldset>

        <Button type="submit" className="w-full" disabled={loading}>
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
