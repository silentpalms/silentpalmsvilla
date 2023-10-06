"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Cormorant } from "next/font/google";
import { Poppins } from "next/font/google";
import { HiArrowLongRight } from "react-icons/hi2";
import { Spin } from "antd";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";


const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  const handleForgot = () => {
    setForgot(true);
    setError("");
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //send reset link to user's registered mail id here
      // const response = await axios.post("/api/send-email", { email });

      setError("");

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User not found");
        setLoading(false);
        setSuccess(false);
      }
    }
  };
  const handleBackToSign = () => {
    setForgot(false);
    setLoading(false);
    setSuccess(false);
    setError(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setLoading(false);
      setSuccess(true);
      router.push("/admin");
    }
  };

  
 
  return (
    <div
    className={`${poppins.className} w-full relative font-bold  md:grid md:grid-cols-2 h-screen`}
  >
    <div className="bg-white h-screen relative px-6  w-full">
      <div className="absolute z-10 md:flex md:items-center top-[16%] md:top-6 left-1/2 md:left-6 -translate-x-1/2 md:-translate-x-0 md:space-x-2">
        <div className="relative h-20 w-20 md:h-16 md:w-16 rounded-full shadow-2xl md:border md:border-green-700">
          <Image
            src="/images/logo.jpeg"
            fill
            alt="logo"
            className="rounded-full"
            priority
          />
        </div>
        <div className="hidden md:block font-medium text-green-700">
          <p className="text-lg">Silent Palms</p>
          <p className="text-lg -mt-2">Villa</p>
        </div>
      </div>

      {!imagesLoaded && (
        <div className=" absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col md:h-full w-[400px] mx-auto px-7 justify-center text-white mt-4 md:mt-2">
          <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

            {/* For other variants, adjust the size with `width` and `height` */}

            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rounded" height={50} width={210} />
          </Stack>
        </div>
      )}

      {imagesLoaded && forgot ? (
        <div className=" absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col md:h-full w-full px-7 justify-center text-white mt-4 md:mt-2">
          <h1
            className={`${poppins.className} text-4xl text-green-700 md:text-green-700 text-center  uppercase font-black`}
          >
            Forgot Password ?
          </h1>
          <p className="text-green-700 md:text-black font-normal text-center my-2 md:mt-2">
            Enter your email address to reset your password
          </p>
          <form
            onSubmit={handlePasswordReset}
            className={`${cormorant.className} text-xl font-bold text-green-700 md:text-black w-full md:w-[450px] md:mt-4 mx-auto`}
          >
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col mt-2 space-y-3">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-green-700 md:text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  className={`${
                    error
                      ? "border border-red-500 text-red-500 "
                      : "border text-black border-slate-400"
                  } px-3 py-2 outline-none rounded-md`}
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              className="bg-green-500 shadow-2xl md:shadow-none text-green-700 px-3 py-3 mt-7 w-full grid grid-cols-3 items-center"
              type="submit"
            >
              <div></div>
              <div>
                {loading ? (
                  <Spin />
                ) : success ? (
                  <div className=" grid justify-items-center">
                    <CheckCircleIcon className="h-[28px] " />
                  </div>
                ) : (
                  <>Submit</>
                )}
              </div>
              {success ? (
                <></>
              ) : (
                <div className="grid justify-items-end ">
                  <HiArrowLongRight />
                </div>
              )}
            </button>
            <div
              className="w-full mt-3 md:mt-3 grid cursor-pointer justify-items-end"
              onClick={handleBackToSign}
            >
              <p
                className={`${poppins.className} text-white md:text-black font-semibold text-[15px]`}
              >
                Back to sign in
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div>
          {imagesLoaded && (
            <div className=" absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col md:h-full w-full px-7 justify-center text-white mt-4 md:mt-2">
              <h1
                className={`${poppins.className} text-4xl text-green-700 md:text-green-700 text-center  uppercase font-black`}
              >
                Welcome Back
              </h1>
              <p className="text-green-700 md:text-black font-normal text-center my-2 md:mt-2">
                Fill in your details, to view latest insights
              </p>
              <form
                onSubmit={handleLogin}
                className={`${cormorant.className} text-xl font-bold text-green-700 md:text-black w-full md:w-[450px] md:mt-4 mx-auto`}
              >
                {error && <p className="text-red-600">{error}</p>}
                <div className="flex flex-col mt-2 space-y-3">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className={`${
                        error
                          ? "border border-red-500 text-red-500 "
                          : "border text-black border-slate-400"
                      } px-3 py-2 outline-none rounded-md`}
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={`${
                        error
                          ? "border border-red-500 text-red-500 "
                          : "border text-black border-slate-400"
                      } px-3 py-2 outline-none rounded-md`}
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="bg-green-500 shadow-2xl md:shadow-none text-white px-3 py-3 mt-7 w-full grid grid-cols-3 items-center"
                  type="submit"
                >
                  <div></div>
                  <div>
                    {loading ? (
                      <Spin />
                    ) : success ? (
                      <div className=" grid justify-items-center">
                        <CheckCircleIcon className="h-[28px] " />
                      </div>
                    ) : (
                      <>Login</>
                    )}
                  </div>
                  {success ? (
                    <></>
                  ) : (
                    <div className="grid justify-items-end ">
                      <HiArrowLongRight />
                    </div>
                  )}
                </button>
                <div
                  className="w-full mt-3 md:mt-3 grid cursor-pointer justify-items-end"
                  onClick={handleForgot}
                >
                  <p
                    className={`${poppins.className} text-black md:text-black text-[15px]`}
                  >
                    Forgot Password ?
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
    <div className="h-screen w-full absolute top-0 left-0 md:relative">
      {/* <div className="relative  md:hidden h-screen w-full">
        <Image
          src="/images/land.webp"
          alt="diani-villa-resort"
          fill
          priority
          onLoad={handleImageLoad}
        />
      </div> */}
      <div className="relative hidden md:flex h-screen w-full">
        <Image
          src="/images/story.png"
          alt="diani-villa-resort"
          fill
          priority
          onLoad={handleImageLoad}
        />
      </div>
      <div
        className={`${cormorant.className} absolute z-10 text-white bottom-12  left-10`}
      >
        <h1 className="text-6xl hidden md:flex">Diani Awaits</h1>
        <p className="text-xl hidden md:flex">
          Experience Diani at the best villa
        </p>
      </div>
    </div>
  </div>
  );
};

export default page;
