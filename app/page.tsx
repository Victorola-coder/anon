import Link from "next/link";
import { Button } from "./components/ui";

export default function Home() {
  const navItems = [
    {
      name: "Sign In",
      path: "/sign-in",
    },
    {
      name: "Sign Up",
      path: "/sign-up",
    },
  ];
  // return (
  //   <main className="min-h-screen flex flex-col">
  //     <header className="p-6">
  //       <nav className="max-w-7xl mx-auto flex justify-between items-center">
  //         <h1 className="text-2xl font-bold">Anon</h1>
  //         <div className="space-x-4">
  //           <Link href="/sign-in">
  //             <Button>Login</Button>
  //           </Link>
  //           <Link href="/sign-up">
  //             <Button>Get Started</Button>
  //           </Link>
  //         </div>
  //       </nav>
  //     </header>

  //     <section className="flex-1 flex items-center justify-center">
  //       <div className="max-w-6xl mx-auto text-center px-4">
  //         <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary-100 bg-clip-text text-transparent">
  //           Share Your Thoughts
  //           <br />
  //           Anonymously
  //         </h1>
  //         <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400">
  //           Express yourself freely without revealing your identity. Create
  //           polls, share messages, and connect authentically.
  //         </p>
  //         <div className="mt-10">
  //           <Button>Start Messaging</Button>
  //         </div>
  //       </div>
  //     </section>
  //   </main>
  // );
  return (
    <div className="p-32 grid grid-cols-[1fr_1.5fr] gap-4 min-h-[100dvh]">
      <div className="relative w-[100%] overflow-hidden">
        <div className="sticky top-0 right-0 left-0 flex flex-col justify-between gap-16">
          {/* Top */}
          <div className="flex flex-col gap-12">
            {/* Details */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-extrabold">Share Your Thoughts</h1>
                <p className="text-xl font-semibold">Anonymously</p>
              </div>
              <p className="opacity-80 max-w-[30rem]">
                Express yourself freely without revealing your identity. Create
                polls, share messages, and connect authentically.
              </p>
            </div>
            {/* Nav */}
            <div className="flex gap-2">
              {navItems.map((navItem, index) => (
                <Link
                  href={navItem.path}
                  key={index}
                  className="flex items-center gap-2"
                >
                  {/* <div className="w-4 border-t border-white"></div> */}
                  <Button>{navItem.name}</Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolore,
          architecto id et error aspernatur nobis sequi in dolorum ad
          consequuntur culpa laborum. Odit voluptatem quos non. Illo tenetur
          obcaecati ab reprehenderit nam amet at natus ea neque. Impedit, quis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolore,
          architecto id et error aspernatur nobis sequi in dolorum ad
          consequuntur culpa laborum. Odit voluptatem quos non. Illo tenetur
          obcaecati ab reprehenderit nam amet at natus ea neque. Impedit, quis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolore,
          architecto id et error aspernatur nobis sequi in dolorum ad
          consequuntur culpa laborum. Odit voluptatem quos non. Illo tenetur
          obcaecati ab reprehenderit nam amet at natus ea neque. Impedit, quis.
        </p>
        <p>lorem400000</p>
      </div>
    </div>
  );
}
