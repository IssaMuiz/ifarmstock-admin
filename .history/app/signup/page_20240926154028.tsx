/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { signIn } from "next-auth/react";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [loading, setLoading] = useState(false);
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
    } catch (error: any) {
      console.log(error.response ? error.response.data : error.message);

      setError("Error registering user");
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
    <main>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col ">
                <h1 className="text-2xl font-bold mb-5 text-center">
                  Welcome to the iFarmStock Admin
                </h1>
                <p className="text-md font-semibold mb-5 text-center">
                  Only Admin can have access to this page
                </p>

                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit}
                  action=""
                >
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
                    type={"password"}
                    placeholder="Your Password"
                  />
                  <div className="text-center">
                    {error && <p className="text-red-500"> {error}</p>}
                  </div>
                  <div className="mx-auto">
                    <button
                      type="submit"
                      className="bg-green-600 w-max p-2 text-white text-lg rounded-md font-semibold mt-2 hover:bg-green-700"
                    >
                      {loading ? "Processing..." : "Register"}
                    </button>
                  </div>
                </form>
                <div className="flex justify-center items-center w-full gap-3 py-3">
                  <hr className="border border-gray-800 w-full"></hr>
                  <div className="">Or</div>
                  <hr className="border border-gray-800 w-full"></hr>
                </div>
                <button
                  onClick={() => signIn("google")}
                  className="bg-green-600 w-max p-2 text-white text-lg rounded-md font-semibold mx-auto mt-2 hover:bg-green-700 px-3 hover:shadow-lg"
                >
                  Sign up with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
