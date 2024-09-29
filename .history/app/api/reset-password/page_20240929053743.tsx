"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/reset-password", {
        token,
        password,
      });

      setMessage(res.data.message);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Errro resetting password. Please try again");
    }
  };
  return (
    <div>
      <h2>Reset Password</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit"> Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
