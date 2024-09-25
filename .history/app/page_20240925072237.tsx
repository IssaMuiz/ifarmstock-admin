"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(user);
  };
  return (
    <main className="flex flex-col md:mx-80 sm:mx-10 items-center mt-60">
      <h1 className="text-3xl font-bold">Welcome to the iFarmStock Admin</h1>
      <p className="text-lg font-semibold">
        Only Admin can have access to this page
      </p>

      <form onSubmit={handleSubmit} action="">
        <input
          name="name"
          value={user.name}
          onChange={handleInputChange}
          type="text"
          placeholder="Your full name"
        />
        <input
          onChange={handleInputChange}
          name="email"
          value={user.email}
          type="email"
          placeholder="Your Email address"
        />
        <input
          onChange={handleInputChange}
          name="password"
          value={user.password}
          type="password"
          placeholder="Your Password"
        />
        <button type="submit">Register</button>
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
