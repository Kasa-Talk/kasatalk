import getBaseURL from "@/libs/getBaseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toast";
import { useState } from "react";

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  const infoError = info.includes(
    "Forgot Password success, please check your email"
  ) ? (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-400"
      role="alert">
      <span className="font-medium">Success !</span> Periksa Email Anda
    </div>
  ) : info.includes("User not found") ? (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
      role="alert">
      <span className="font-medium">Failed !</span> Email tidak ditemukan.
    </div>
  ) : null;

  const handlerEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handlerModal = () => {
    setIsOpen(!isOpen);
    setEmail("");
    setInfo("");
  };

  const submitForgotPassword = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch(getBaseURL("/users/forgot-password"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setInfo(data.message);
      } else {
        setInfo(data.errors);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <span
        onClick={handlerModal}
        className="font-semibold text-primary-600 hover:underline text-primary cursor-pointer">
        Klik Disini
      </span>
      <div
        className={`w-full h-full flex justify-center items-center bg-black bg-opacity-80 left-0 top-0 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        } transition-all absolute duration-400`}>
        <div className="max-w-xl bg white bg-white w-full rounded-md p-4 space-y-4">
          <ToastContainer delay={5000} />
          <h1 className="text-center text-lg font-medium">
            Masukan email anda untuk mendapatkan password baru
          </h1>
          <input
            value={email}
            onChange={handlerEmail}
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 w-full p-2.5 focus:outline-red-600 rounded-lg"
            placeholder="JhonDoe@gmail.com"
          />
          {infoError}
          <div className="flex justify-end space-x-4 font-medium">
            <button
              type="button"
              onClick={handlerModal}
              className="border-primary border py-2 px-6 rounded text-primary">
              Cancel
            </button>
            <button
              type="submit"
              onClick={submitForgotPassword}
              className="px-6 rounded bg-primary text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
