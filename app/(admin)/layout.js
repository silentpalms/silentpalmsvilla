"use client";

import Image from "next/image";
import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Badge } from "antd";

import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  HomeModernIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  ChatBubbleLeftIcon,
  ArrowRightOnRectangleIcon,
  InboxArrowDownIcon,
} from "@heroicons/react/24/solid";
import { AiOutlineClose } from "react-icons/ai";
import { HiBars3BottomRight } from "react-icons/hi2";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import axios from "axios";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins/Poppins-Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const Links = [
  {
    title: "Overview",
    link: "/admin",
    icon: <HomeIcon />,
  },

  {
    title: "Bookings",
    link: "/admin/bookings",
    icon: <ClipboardDocumentCheckIcon />,
  },

  {
    title: "Houses",
    link: "/admin/houses",
    icon: <HomeModernIcon />,
  },

  {
    title: "Calendar",
    link: "/admin/calendar",
    icon: <CalendarDaysIcon />,
  },

  {
    title: "Users",
    link: "/admin/users",
    icon: <UsersIcon />,
  },
  {
    title: "Messages",
    link: "/admin/messages",
    icon: <ChatBubbleLeftIcon />,
  },
  {
    title: "Reviews",
    link: "/admin/reviews",
    icon: <InboxArrowDownIcon />,
    badge: true,
  },
];

export default function AdminLayout({ children, open, setIsOpen }) {
  // const { data: session, status } = useSession();

  const session = true;
  const router = useRouter();
  const [reviews, setReviews] = useState(null);

  const handleLogOut = async () => {
    // await signOut({ callbackUrl: "/admin/login" });
  };

  // useEffect(() => {
  //   const getReviews = async () => {
  //     try {
  //       if (session) {
  //         let res = await axios.get(
  //           `${process.env.NEXT_PUBLIC_API}/api/review`
  //         );
  //         const allReviews = res.data;
  //         const unreadReviews = allReviews.filter(
  //           (review) => review.readStatus === false
  //         );

  //         setReviews(unreadReviews.length);
  //       } else {
  //         router.push("/admin/login");
  //       }
  //     } catch (error) {
  //       console.log("Error in getting reviews");
  //       return;
  //     }
  //   };
  //   getReviews();
  // }, []);

  // if (status === "loading") {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center">
  //       <div className="relative h-20 w-20 rounded-full animate-pulse">
  //         <Image
  //           src="/images/logo.jpeg"
  //           alt="logo"
  //           fill
  //           className="rounded-full"
  //         />
  //       </div>
  //     </div>
  //   );
  // } else {
  return (
    <div className={`flex ${poppins.className}`}>
      {open && (
        <div
          className={`${poppins.className} pt-8 pb-4 px-4 absolute z-50 bg-green-700 h-screen w-full md:hidden`}
        >
          <div className="flex items-center justify-between md:hidden">
            <div className="h-24 w-24 rounded-full relative">
              <Image
                src="/images/logo.jpeg"
                fill
                alt="logo"
                className="rounded-full"
              />
            </div>
            <p
              className="text-4xl text-white font-bold"
              onClick={() => setIsOpen(!open)}
            >
              <AiOutlineClose />
            </p>
          </div>
          <ul className="uppercase text-white  pt-16 flex flex-col space-y-6 font-bold">
            {Links.slice(0, 6).map((link, index) => {
              return (
                <li key={index} className="" onClick={() => setIsOpen(!open)}>
                  <Link
                    href={link.link}
                    className="xs:text-xl text-[45px] flex items-center"
                  >
                    <span className="text-yellow-400 text-sm ">
                      <p className="h-[35px] w-[35px] mr-3">{link.icon}</p>
                    </span>
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className=" w-fit mt-9 flex justify-center">
            <button
              type="button"
              className="bg-black  py-3 w-[180px] flex items-center justify-center text-white text-sm font-semibold"
              onClick={handleLogOut}
            >
              Log Out
              <span className="ml-2">
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      )}

      <aside className="fixed z-10 py-8 h-screen bg-white w-[200px] md:flex flex-col items-center text-center text-black hidden">
        <div className="relative rounded-full h-20 w-20 border border-green-800">
          <Image
            src="/images/logo.jpeg"
            fill
            alt="logo"
            className="rounded-full"
          />
        </div>

        <div className="mt-8 relative">
          <nav>
            <ul className="cursor-pointer text-sm">
              {Links.slice(0, 1).map((link) => {
                return (
                  <li key={link.title}>
                    <Link href={link.link} className={`flex`}>
                      <span className="flex items-center space-x-4 w-full">
                        <p className="h-[20px] text-green-700 w-[20px] mr-1">
                          {link.icon}
                        </p>
                        {link.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className=" mt-16 flex flex-col space-y-5">
              <p className="text-sm underline mb-2 shadow-lg">MANAGEMENT</p>
              {Links.slice(1, 5).map((link) => {
                return (
                  <li key={link.title}>
                    <Link
                      href={link.link}
                      className={`flex text-sm cursor-pointer`}
                    >
                      <span className="flex items-center space-x-4 w-full ">
                        <p className="h-[20px] text-green-700 w-[20px] mr-1 ">
                          {link.icon}
                        </p>
                        {link.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className=" mt-16 flex flex-col space-y-5">
              <p className="text-sm underline mb-2 shadow-lg">ORGANISATION</p>
              {Links.slice(5, 9).map((link) => {
                return (
                  <li key={link.title}>
                    <Link
                      href={link.link}
                      className={`flex text-sm cursor-pointer relative`}
                    >
                      <span className="flex items-center space-x-4 w-full ">
                        <p className="h-[20px] w-[20px] text-green-700 mr-1 ">
                          {link.icon}
                        </p>
                        {link.title}
                      </span>

                      <div className="absolute right-[3px] -top-[11px]">
                        {link.badge ? (
                          <Badge count={reviews} overflowCount={10} />
                        ) : (
                          <></>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className=" w-full mt-24 flex justify-center">
          <button
            type="button"
            className="bg-green-400 py-2 w-[150px] flex items-center justify-center text-black font-semibold text-sm"
            onClick={handleLogOut}
          >
            Log Out
            <span className="ml-2">
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
            </span>
          </button>
        </div>
      </aside>
      <div className="md:ml-[200px] bg-gray-200  w-full">
        <div className=" flex items-center justify-between px-4 py-6 bg-green-700 md:hidden">
          <div className="h-24 w-24 rounded-full relative">
            <Image
              src="/images/logo.jpeg"
              fill
              alt="logo"
              className="rounded-full"
            />
          </div>
          <p
            className="text-4xl text-white font-bold"
            onClick={() => setIsOpen(!open)}
          >
            <HiBars3BottomRight />
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
