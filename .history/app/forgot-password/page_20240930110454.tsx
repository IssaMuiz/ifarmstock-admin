"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import Spinner from "@/components/spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/forgot-password", { email });
      if (res.status == 200 || res.status == 201) {
        console.log("link sent successfuly");
        setMessage("Password link has been sent to your email");
        setEmail("");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage(error.res?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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
                <div className="flex flex-col gap-3 items-center">
                  <h2 className="text-2xl font-semibold">Forgot password</h2>
                  <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input
                      className="border p-2 rounded-md"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {message && (
                      <p className="text-red-600 font-semibold">{message}</p>
                    )}

                    <button
                      className="border rounded-md h-11 bg-green-600 hover:bg-green-700 w-40 text-white text-lg text-semibold"
                      type="submit"
                    >
                      {loading ? <Spinner /> : "Send Reset Link"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
