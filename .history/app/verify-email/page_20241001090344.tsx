/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          const response = await axios.get(`/api/verify-email?token=${token}`);

          setMessage(response.data.message);
        } catch (error: any) {
          setMessage(error.response?.data?.message || "Failed to verify email");
        }
      }
    };

    verifyEmail();
  }, [token]);
  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
