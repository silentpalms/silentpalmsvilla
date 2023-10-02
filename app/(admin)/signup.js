import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { signIn } from "next-auth/react";
const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/admin/login");
    }
  };

  return (
    <div className="bg-green-700 h-screen relative px-6  w-full">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2">
        <div className="relative h-24 w-24 rounded-full shadow-2xl">
          <Image
            src="/images/logo.jpeg"
            fill
            alt="logo"
            className="rounded-full"
            priority
          />
        </div>
      </div>

      <div className="bg-green-700 flex flex-col h-full justify-center text-white">
        {error && <p className="text-red-500">{error}</p>}
        <h1 className="text-2xl text-center underline uppercase font-bold">
          Sign Up
        </h1>
        <form onSubmit={handleSignup} className="">
          <div className="flex flex-col mt-2 space-y-3">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="px-3 py-3 text-black outline-none border border-slate-400"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="px-3 py-3 text-black outline-none border border-slate-400"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            className="bg-black text-white px-3 py-3 mt-7 w-full"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
