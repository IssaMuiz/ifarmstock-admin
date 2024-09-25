"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="mt-28">
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <main className="flex flex-col md:mx-80 sm:mx-10 items-center mt-60">
      <h1 className="text-3xl font-bold">Welcome to the iFarmStock Admin</h1>
      <p className="text-lg font-semibold">
        Only Admin can have access to this page
      </p>

      <form action="">
        <input type="text" placeholder="Your full name" />
        <input type="email" placeholder="Your Email address" />
        <input type="password" placeholder="Your Password" />
      </form>

      <button
        onClick={() => signIn("google")}
        className="bg-green-600 w-max p-2 text-white text-lg rounded-md font-semibold mt-2 hover:bg-green-700"
      >
        Sign in with Google
      </button>
    </main>
  );
};

export default Home;
