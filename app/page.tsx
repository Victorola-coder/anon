import Link from "next/link";
import { Button } from "./components/ui";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="p-6">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Anon</h1>
          <div className="space-x-4">
            <Link href="/sign-in">
              <Button>Login</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

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
          <div className="mt-10">
            <Button>Start Messaging</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
