"use client";

import Link from "next/link";
import { Button } from "./components/ui";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Shield,
  Users,
  BarChart2,
  Lock,
  Globe,
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen  text-slate-lighter">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 backdrop-blur-lg border-b border-navy-light ">
        <nav className="flex items-center justify-between max-w-7xl mx-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold text-teal">Anon</h1>
          <div className="space-x-2 md:space-x-4">
            <Link href="/signin">
              <Button variant="secondary" size="sm" className="md:text-base">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="md:text-base">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center pt-24 md:pt-32">
        <div className="max-w-6xl mx-auto text-center px-4 space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
          >
            Share Your Thoughts
            <br />
            <span className="bg-gradient-to-r from-teal to-teal/60 bg-clip-text text-transparent">
              Anonymously
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate"
          >
            Express yourself freely without revealing your identity. Create
            polls, share messages, and connect authentically.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => router.push("/signup")}
            className="pt-4"
          >
            <Button size="lg" className="px-8">
              Start Messaging
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 mt-10 bg-navy">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-teal">Anon</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Lock className="w-6 h-6 text-teal" />,
                title: "Complete Anonymity",
                description:
                  "Your identity remains private and protected at all times.",
              },
              {
                icon: <Shield className="w-6 h-6 text-teal" />,
                title: "End-to-End Security",
                description:
                  "Advanced encryption keeps your messages safe and secure.",
              },
              {
                icon: <BarChart2 className="w-6 h-6 text-teal" />,
                title: "Interactive Polls",
                description:
                  "Create engaging polls and gather anonymous feedback.",
              },
              {
                icon: <MessageCircle className="w-6 h-6 text-teal" />,
                title: "Instant Messaging",
                description:
                  "Send and receive messages instantly and securely.",
              },
              {
                icon: <Globe className="w-6 h-6 text-teal" />,
                title: "Global Reach",
                description:
                  "Connect with people from around the world anonymously.",
              },
              {
                icon: <Users className="w-6 h-6 text-teal" />,
                title: "Growing Community",
                description: "Join thousands of users sharing thoughts freely.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-navy-light rounded-xl border border-navy-light hover:border-teal/20 transition-colors"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-slate-lighter">
                    {feature.title}
                  </h3>
                  <p className="text-slate">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-slate mb-8">
            Join thousands of users who trust Anon for anonymous communication.
            Create your free account today.
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-8">
              Join Anon Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-light py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate">
            © {new Date().getFullYear()} Anon. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
