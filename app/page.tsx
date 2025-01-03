"use client";

import Link from "next/link";
import { Button } from "./components/ui";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Anon</h1>
          <div className="space-x-4">
            <Link href="/signin">
              <Button>Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary-100 bg-clip-text text-transparent">
            Share Your Thoughts
            <br />
            Anonymously
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400">
            Express yourself freely without revealing your identity. Create
            polls, share messages, and connect authentically.
          </p>
          <div onClick={() => router.push("/signup")} className="mt-10">
            <Button>Start Messaging</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Why Anon?
          </h2>
          <p className="max-w-2xl mx-auto text-center text-gray-500 mt-2">
            We keep your identity completely hidden so you can speak your mind
            without fear.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-6 bg-navy-light rounded-md shadow">
              <h3 className="text-xl font-semibold mb-2">Anonymity</h3>
              <p className="text-sm text-gray-600">
                Share freely while keeping your identity under wraps.
              </p>
            </div>
            <div className="p-6 bg-white rounded-md shadow">
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-sm text-gray-600">
                Your data is backed by modern encryption and privacy standards.
              </p>
            </div>
            <div className="p-6 bg-white rounded-md shadow">
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-sm text-gray-600">
                Connect with a global network of like-minded individuals while
                staying private.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className=" py-16">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="max-w-xl mx-auto mt-3 text-gray-500">
            Create your free account and begin sharing your ideas and stories
            anonymously.
          </p>
          <div className="mt-8">
            <Link href="/signup">
              <Button size="lg">Join Anon</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-main py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Anon. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
