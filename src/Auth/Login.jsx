import { Icon } from "@iconify/react";
import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/FireSdk";
import { useNavigate } from "react-router-dom";
import ToastAlert from "../Toast/ToastAlert";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState("Login Failed");
  const handleLogin = (e) => {
    e.preventDefault();
    setLoader(true);
    if (email !== null && password !== null) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoader(false);
          const user = userCredential.user;
          console.log(user);
          navigate("/");
        })
        .catch((error) => {
          setError("Invalid Email or Password");
          setAlert(true);
          setTimeout(function () {
            setLoader(false);
          }, 1000);
          setTimeout(function () {
            setAlert(false);
          }, 2000);
        });
    } else {
      setError("Missing Email or Password");
      setAlert(true);
      setTimeout(function () {
        setLoader(false);
      }, 1000);
      setTimeout(function () {
        setAlert(false);
      }, 2000);
    }
  };
  return (
    <>
      {alert ? <ToastAlert error={error} /> : null}
      <div className="h-screen w-screen grid place-content-center">
        <form className="max-w-[500px] w-full" onSubmit={handleLogin} method="post">
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Email
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Icon
                  icon="dashicons:email"
                  width={20}
                  className="text-gray-500 dark:text-gray-400"
                />
              </div>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                id="email"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
              />
            </div>
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Password
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Icon
                  icon="mdi:password"
                  width={20}
                  className="text-gray-500 dark:text-gray-400"
                />
              </div>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="********"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
            {loader ? (
              <Icon
                icon="lucide:loader"
                width={20}
                className="ml-3 animate-spin"
              />
            ) : (
              <Icon
                icon="fluent:arrow-right-12-regular"
                width={20}
                className="ml-3 animate-pulse"
              />
            )}
          </button>
        </form>
      </div>
    </>
  );
}
