import { useState } from "react";

import Link from "next/link";
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  HomeModernIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const Links = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <HomeIcon />,
  },
  {
    title: "Users",
    link: "/admin/users",
    icon: <UsersIcon />,
  },
  {
    title: "Bookings",
    link: "/admin/getBookings",
    icon: <ClipboardDocumentCheckIcon />,
  },
  {
    title: "Houses",
    link: "/admin/getHouses",
    icon: <HomeModernIcon />,
  },
  {
    title: "Settings",
    link: "/admin/settings",
    icon: <CogIcon />,
  },
];

const Nav = ({ path }) => {
  const inActiveLink = "flex items-center space-x-4 uppercase";
  const activeLink =
    inActiveLink +
    " bg-white text-black rounded-l-full pl-4 py-3 transition duration-750";

  const match = Links.find((obj) => obj.link === path);

  const [active, setActive] = useState(match?.link);

  const handleLinkClick = (link) => {
    setActive(link);
  };
  return (
    <div className="text-black p-6">
      <div className="pb-3 border-b-[0.8px] flex items-center justify-between">
        <div className="relative h-20 w-20  rounded-full">
          <Image
            src="/images/logo.jpeg"
            alt="logo"
            fill
            className="rounded-full"
          />
        </div>
        <nav>
          <ul className="flex space-x-6">
            {Links.map(({ title, link, icon }) => (
              <li key={title}>
                <Link
                  href={link}
                  className={`${
                    link === active ? activeLink : inActiveLink
                  } cursor-pointer text-sm `}
                  onClick={() => handleLinkClick(link)}
                >
                  <span>{title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
