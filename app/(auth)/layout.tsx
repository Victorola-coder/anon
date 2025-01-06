"use client";

import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next-nprogress-bar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = Cookies.get("token");
  if (token) {
    router.push("/dashboard");
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Hero Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex flex-col justify-center p-12 bg-navy"
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold max-w-[800px] leading-tighter text-slate-lighter">
            Share Your Thoughts {""}
            <span className="text-teal">Anonymously</span>
          </h1>
          <p className="text-xl text-slate">
            Express yourself freely without revealing your identity.
          </p>
        </div>
      </motion.div>

      {/* Right Side - Auth Forms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center p-8"
      >
        {children}
      </motion.div>
    </div>
  );
}
