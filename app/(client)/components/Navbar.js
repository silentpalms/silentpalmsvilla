"use client"

import { useState } from "react";
import Link from "next/link";
import { SlPhone } from "react-icons/sl";
import { BsWhatsapp } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import Image from "next/image";
import { HiBars3BottomLeft } from "react-icons/hi2";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const Links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Accomodations",
      link: "/accomodations",
    },

    {
      title: "Activities",
      link: "/activities",
    },

    {
      title: "Gallery",
      link: "/gallery",
    },
    {
      title: "Contact",
      link: "/contact",
    },
    {
      title: "Gallery",
      link: "/gallery",
    },

    {
      title: "FAQS",
      link: "/faqs",
    },
  ];
  return (
    <div className="relative">
      <div className="border-b-[0.8px] py-2 px-4 w-full  text-[12px] flex justify-between items-center">
        <div className="flex items-center space-x-2 text-sm">
          <SlPhone className="text-sm" />
          <p className="text-xs">
            <Link href="tel:+254798024710">+254 798024710</Link>
          </p>
        </div>
        <div className="flex space-x-8 items-center text-xl ">
          <Link href="https://wa.me/254798024710">
            <BsWhatsapp />
          </Link>
          <Link href="https://www.facebook.com/people/Silent-Palms-Villa-Diani/100076528548033/?paipv=0&eav=AfZ2qpQWze9YsfK4n8GGA2wxyhBYChxAlsA5wsmjTSBJQJvS8Ow2S-9umeKDgu1SG7s&_rdr">
            <BsFacebook />
          </Link>
          <Link href="http://instagram.com/_u/silentpalmsvillas/">
            <BsInstagram />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center space-x-3">
          <div className="relative h-16 w-16 rounded-full">
            <Image
              src="/images/logo.jpeg"
              alt="logo"
              fill
              className="rounded-full"
            />
          </div>
          <div className="max-w-[200px]">
            <h5 className="md:text-[18px] font-extrabold leading-none text-green-800 max-w-[180px]">
              SILENT PALMS VILLAS DIANI
            </h5>
          </div>
        </div>

        <div className="flex items-center space-x-12">
          <ul className="text-[14px] items-center space-x-10 hidden md:flex">
            {Links.splice(0, 5).map(({ title, link }, index) => {
              return (
                <li key={index}>
                  <Link
                    href={link}
                    className={` text-[15px] text-green-800 capitalize`}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="hidden md:flex">
            <Link
              href="/reservation"
              className=" text-white bg-green-800 px-4 py-3"
            >
              RESERVATION
            </Link>
          </div>
          <div className="text-3xl md:hidden" onClick={() => setShow(!show)}>
            <HiBars3BottomLeft />
          </div>
        </div>
      </div>

      {show && (
        <div className="absolute h-screen z-10 bg-green-800 w-screen left-0 px-4 py-10">
          <div className="flex flex-col mb-5 text-white text-4xl space-y-8 uppercase font-bold">
            <Link href="/" onClick={() => setShow(false)}>
              HOME
            </Link>
            <Link href="/accomodations" onClick={() => setShow(false)}>
              ACCOMODATION
            </Link>
            <Link href="/activities" onClick={() => setShow(false)}>
              ACTIVITIES
            </Link>

            <Link href="/gallery" onClick={() => setShow(false)}>
              GALLERY
            </Link>

            <Link href="/contact" onClick={() => setShow(false)}>
              CONTACT
            </Link>
          </div>

          <div className="mt-12">
            <Link
              href="/reservation" onClick={() => setShow(false)}
              className=" text-green-800 bg-white px-4 py-3"
            >
              RESERVATION
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
