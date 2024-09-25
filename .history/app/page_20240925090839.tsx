/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(user);

    try {
      if (!user.name || !user.email || !user.password) {
        setError("Please fill the required fields");
        return;
      }

      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setError("Invalid email id");
        return;
      }

      const res = await axios.post("/api/register", user);
      console.log(res.data);
      if (res.status == 200 || res.status == 201) {
        console.log("user added successfuly");
        setError("");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setError("");
    } finally {
      setLoading(false);
      setUser({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <main className="flex flex-col md:mx-80 sm:mx-10 items-center mt-60">
      <h1 className="text-3xl font-bold">Welcome to the iFarmStock Admin</h1>
      <p className="text-lg font-semibold">
        Only Admin can have access to this page
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit} action="">
        <input
          className="border p-3 w-full"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          type="text"
          placeholder="Your full name"
        />
        <input
          className="border p-3 w-full"
          onChange={handleInputChange}
          name="email"
          value={user.email}
          type="email"
          placeholder="Your Email address"
        />
        <input
          className="border p-3 w-full"
          onChange={handleInputChange}
          name="password"
          value={user.password}
          type="password"
          placeholder="Your Password"
        />
        <button type="submit">{loading ? "Processing..." : "Register"}</button>
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
