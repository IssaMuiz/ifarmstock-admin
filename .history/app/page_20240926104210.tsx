/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <main className="flex flex-col md:mx-80 sm:mx-10 items-center mt-40">
      <h1 className="text-3xl font-bold">Welcome to the iFarmStock Admin</h1>
      <p className="text-lg font-semibold">
        Only Admin can have access to this page
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit} action="">
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
          type={"password"}
          placeholder="Your Password"
        />
        <div>
          {error && <p> {error}</p>}

          <button
            type="submit"
            className="bg-green-600 w-max p-2 text-white text-lg rounded-md font-semibold mt-2 hover:bg-green-700"
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </div>
      </form>
      <div className="flex justify-center items-center w-full gap-3 py-3">
        <div className="border border-gray-800 py-2 w-full px-6"></div>
        <div className="">Or</div>
        <div className="border border-gray-800 py-2 w-full px-6"></div>
      </div>
      <button
        onClick={() => signIn("google")}
        className="bg-green-600 w-max p-2 text-white text-lg rounded-md font-semibold mt-2 hover:bg-green-700"
      >
        Sign in with Google
      </button>
    </main>
  );
};

export default Login;
