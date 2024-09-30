/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Spinner from "@/components/spinner";
import Image from "next/image";

const errorMessages: { [key: string]: string } = {
  CredentialsSignin: "Invalid email or password",
  "User does not exist": "User does not exist",
  "Invalid password": "Invalid password",
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const authError = searchParams.get("error");
    if (authError) {
      setError(errorMessages[authError] || "Unknown error occured");
    }
  }, [searchParams]);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setError("");
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user.email || !user.password) {
        setError("Please fill the required fields");
        return;
      }

      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setError("Invalid email id");
        return;
      }

      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      setUser({
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
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
                    className="border p-3 w-full rounded-md"
                    onChange={handleInputChange}
                    name="email"
                    value={user.email}
                    type="email"
                    placeholder="Your Email address"
                  />
                  <div className="relative">
                    <input
                      className="border p-3 w-full rounded-md"
                      onChange={handleInputChange}
                      name="password"
                      value={user.password}
                      type={showPassword ? "text" : "password"}
                      placeholder="Your Password"
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-2 top-4"
                    >
                      {" "}
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                  <div className="text-center">
                    {error && <p className="text-red-500"> {error}</p>}
                  </div>
                  <div className="mx-auto">
                    <button
                      type="submit"
                      className="bg-green-600 w-28 h-11 text-white text-lg rounded-md font-semibold mt-2 hover:bg-green-700  px-3 hover:shadow-lg"
                    >
                      {loading ? <Spinner /> : "Login"}
                    </button>
                  </div>
                </form>
                <div className="flex justify-center items-center w-full gap-3 py-3">
                  <hr className="border border-gray-800 w-full"></hr>
                  <div className="">OR</div>
                  <hr className="border border-gray-800 w-full"></hr>
                </div>
                <div
                  onClick={() => signIn("google")}
                  className=" w-max p-2 text-black border text-lg rounded-md cursor-pointer flex gap-2 items-center font-semibold mx-auto mt-2 hover:bg-green-500 hover:text-white  px-3 hover:shadow-lg"
                >
                  <Image
                    src="/assets/images/google-image.png"
                    alt="google-image"
                    height={20}
                    width={20}
                  />
                  <span>Sign in with Google</span>
                </div>
                <div className="text-center font-semibold text-lg mt-5">
                  Yet to have an account? sign up
                  <Link
                    href="/signup"
                    className="text-blue-600 ml-2 hover:underline"
                  >
                    here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
