/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
        console.log(res);
        setError("error");
      }

      setError("");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("");
    } finally {
      setLoading(false);
      setUser({
        email: "",
        password: "",
      });
    }
  };

  return (

<divclassName="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
  <divclassName="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></divclassNa=>

  <divclassName="fixed inset-0 z-10 w-screen overflow-y-auto">
    <divclassName="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <divclassName="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <divclassName="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <divclassName="sm:flex sm:items-start">
            <divclassName="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svgclassName="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svgclassNa=>
            </div>
            <divclassName="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Deactivate account</h3classNa=>
              <divclassName="mt-2">
                <pclassName="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</pclassNa=>
              </div>
            </div>
          </div>
        </div>
        <divclassName="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button"className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
          <button type="button"className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </divclassNa=>
      </div>
    </div>
  </div>
</div>




   /*  <main className="flex flex-col md:mx-80 sm:mx-10 items-center mt-40">
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
            {loading ? "Processing..." : "Login"}
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
        className="bg-green-600 w-max p-2 text-white text-lg rounded-md font-semibold mt-2 hover:bg-green-700"
      >
        Sign in with Google
      </button>
    </main> */
  );
};

export default Login;
