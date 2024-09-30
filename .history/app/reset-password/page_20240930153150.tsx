/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/spinner";

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/reset-password", {
        token,
        newPassword,
        confirmPassword,
      });
      if (res.status === 200) {
        router.push("/");
      }
    } catch (error: any) {
      setError(error.res?.data?.error || "An error occured. Please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
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
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold mb-3">
                    Reset Password
                  </h1>
                  <p>Enter your new password</p>
                  <form
                    className="flex flex-col gap-3 mt-5"
                    onSubmit={handleReset}
                  >
                    <input
                      className="border p-2"
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <input
                      className="border p-2"
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {error && (
                      <p className="text-red-600 font-semibold">{error}</p>
                    )}

                    <button
                      type="submit"
                      className="border mt-3 rounded-md h-11 bg-green-600 hover:bg-green-700 w-40 text-white text-lg text-semibold"
                    >
                      {loading ? <Spinner /> : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
