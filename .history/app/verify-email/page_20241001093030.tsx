/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          const response = await axios.get(`/api/verify-email?token=${token}`);

          setMessage(response.data.message);

          setTimeout(() => {
            router.push("/");
          }, 3000);
        } catch (error: any) {
          setMessage(error.response?.data?.message || "Failed to verify email");
        }
      }
    };

    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
