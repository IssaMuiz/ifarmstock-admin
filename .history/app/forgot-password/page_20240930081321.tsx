"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";

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
    <div className="flex flex-col justify-center border mt-20">
      <h2>Reset Password</h2>
      <form className="" onSubmit={handleSubmit}>
        <input
          className="border"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="border bg-green-600 hover:bg-green-700 w-28 text-white text-lg text-semibold"
          type="submit"
        >
          {loading ? "Sending...." : "Send Reset Link"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
