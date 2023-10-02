"use client";
import { useState, useEffect } from "react";
import {
  BsFillJournalBookmarkFill,
  BsBookmarkCheck,
  BsBookmarkDash,
  BsCashStack,
} from "react-icons/bs";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaBell } from "react-icons/fa";
import localFont from "next/font/local";
import Link from "next/link";
import PieComponent from "../components/PieComponent";
import SimpleCharts from "../components/SimpleCharts";

const poppins = localFont({
  src: [
    {
      path: "../../../public/fonts/poppins/Poppins-Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/poppins/Poppins-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});
const page = () => {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);
  const [confirmedBookingsCount, setConfirmedBookingsCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [houseAmounts, setHouseAmounts] = useState([]);
  const [housePrices, setHousePrices] = useState([]);
  const [houseNames, setHouseNames] = useState([]);
  const [open, setIsOpen] = useState(false);

  const columns = [
    {
      name: "House",
      selector: (row) => row.house,
      sortable: true,
      minWidth: "180px",
    },

    {
      name: "Names",
      selector: (row) => `${row.user.firstName} ${row.user.lastName}`,
    },
    {
      name: "Phone No.",
      selector: (row) => row.user.phoneNumber,
    },

    {
      name: "Total Days",
      selector: (row) => row.totalDays,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.user.email,
    },
  ];

  const customStyles = {
    text: {
      style: {
        color: "green",
      },
    },
    rows: {
      style: {
        minHeight: "72px", // override the row height
        backgroundColor: "rgb(255,255,255)",
        color: "black",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "rgb(44, 197, 44)",
        borderColor: "rgb(51,65,85)",
        color: "yellow",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  useEffect(() => {
    async function getAllBookings() {
      try {
        const response = await axios.get(`/api/admin/bookings`);
    

        setBookings(response.data.bookings);
        const pendingBookings = response.data.bookings.filter(
          (booking) => booking.bookingStatus === "pending"
        );
        setPendingBookingsCount(pendingBookings.length);

        const confirmedBookings = response.data.bookings.filter(
          (booking) => booking.bookingStatus === "Confirmed"
        );

        setConfirmedBookingsCount(confirmedBookings.length);

        // Calculate total amount
        const amountSum = confirmedBookings.reduce(
          (sum, booking) => sum + booking.amount,
          0
        );
        setTotalAmount(amountSum);

        // Calculate house-wise total amounts
        const houseTotals = {};
        confirmedBookings.forEach((booking) => {
          const { house, amount } = booking;

          if (houseTotals[house]) {
            houseTotals[house] += amount;
          } else {
            houseTotals[house] = amount;
          }
        });

        const totalAmountArrays = Object.values(houseTotals);

        const houseNamesArray = Object.keys(houseTotals);

        setHouseNames(houseNamesArray);
        setHousePrices(totalAmountArrays);

        // Convert houseTotals object into an array of objects
        const houseAmountsArray = Object.entries(houseTotals).map(
          ([house, amount]) => ({
            name: house,

            totalAmount: amount,
          })
        );

        const top3HouseAmounts = houseAmountsArray;

        setHouseAmounts(top3HouseAmounts);
      } catch (error) {
        console.log(error);
      }
    }

    getAllBookings();
  }, []);

  let formatter = new Intl.NumberFormat("en-us");

  useEffect(() => {
    async function getMessages() {
      try {
        const response = await axios.get("/api/admin/messages");
        setMessages(response.data.messages);
      } catch (error) {
        console.log("Error", error);
      }
    }
    getMessages();
  }, []);
  return (
    <div>
      {!open && (
        <div
          className={`${poppins.className} pt-12 px-4 bg-gray-50 h-full w-full`}
        >
          <h5 className="text-xl font-bold text-black">DASHBOARD</h5>
          <p className={` text-black`}>Welcome to your DashBoard</p>
          <div className="pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className=" shadow-xl p-4 bg-white md:hover:scale-110 text-black hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black ">
                <div className="flex items-center w-full justify-between md:border-b-[0.8px] md:pb-8 md:pl-2">
                  <p className="text-4xl text-[#2cc52c] hidden md:flex ">
                    <BsCashStack />
                  </p>
                  <div>
                    <div className="grid grid-cols-2 md:flex  w-full items-center">
                      <p className="font-bold text-sm ">TOTAL EARNINGS</p>
                      <p className="text-xl text-[#2cc52c] md:hidden grid justify-items-end">
                        <BsCashStack />
                      </p>
                    </div>

                    <p className="text-lg md:text-lg text-left mt-4 md:mt-0 md:text-center">
                      KES {formatter.format(totalAmount)}
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/admin/bookings"
                className=" shadow-xl p-4 bg-white md:hover:scale-110 text-black hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black "
              >
                <div className="flex md:items-center w-full justify-between md:border-b-[0.8px] md:pb-8 md:pl-2">
                  <p className="text-4xl text-[#2cc52c] hidden md:flex ">
                    <BsFillJournalBookmarkFill />
                  </p>
                  <div>
                    <div className="grid grid-cols-2 md:flex w-full items-center">
                      <p className="font-bold text-sm">TOTAL BOOKINGS</p>
                      <p className="text-xl text-[#2cc52c] md:hidden grid justify-items-end ">
                        <BsFillJournalBookmarkFill />
                      </p>
                    </div>

                    <p className="text-lg md:text-lg text-left mt-4 md:mt-0 md:text-center">
                      {bookings?.length}
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/admin/confirmed-bookings"
                className=" shadow-xl p-4 bg-white md:hover:scale-110 text-black hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black "
              >
                <div className="flex items-center w-full justify-between md:border-b-[0.8px] md:pb-8 md:pl-2">
                  <p className="text-4xl text-[#2cc52c] hidden md:flex ">
                    <BsBookmarkCheck />
                  </p>
                  <div>
                    <div className="grid grid-cols-2 md:flex w-full  items-center">
                      <p className="font-bold text-[14px]">VERIFIED BOOKINGS</p>
                      <p className="text-xl text-[#2cc52c] md:hidden grid justify-items-end ">
                        <BsBookmarkCheck />
                      </p>
                    </div>

                    <p className="text-lg md:text-lg text-left mt-4 md:mt-0 md:text-center">
                      {confirmedBookingsCount}
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/admin/pending-bookings"
                className=" shadow-xl p-4 bg-white md:hover:scale-110 text-black hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black "
              >
                <div className="flex items-center w-full justify-between md:border-b-[0.8px] md:pb-8 md:pl-2">
                  <p className="text-4xl text-[#2cc52c] hidden md:flex ">
                    <BsBookmarkDash />
                  </p>
                  <div>
                    <div className="grid grid-cols-2 md:flex w-full items-center">
                      <p className="font-bold text-[14px]">PENDING BOOKINGS</p>
                      <p className="text-xl text-[#2cc52c] md:hidden grid justify-items-end  ">
                        <BsBookmarkDash />
                      </p>
                    </div>

                    <p className="text-lg md:text-lg text-left mt-4 md:mt-0 md:text-center">
                      {pendingBookingsCount}
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/messages"
                className="bg-white md:hidden col-span-2 md:col-span-5 h-[150px] shadow-xl relative hover:scale-105 text-white hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black "
              >
                <div className="w-full flex flex-col items-center">
                  <h3 className=" text-black  py-2 text-sm  uppercase font-bold">
                    MESSAGES
                  </h3>
                  <div className="mt-5 relative">
                    <p className="md:text-[100px] text-[50px] text-[green]">
                      <FaBell />
                    </p>
                    <div className="w-full rounded-full absolute top-0 left-6">
                      <p className="font-semibold text-lg bg-yellow-400 h-3 w-3 px-3 py-3 rounded-full flex items-center justify-center text-black">
                        {messages.length}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-4 grid-cols-1 grid md:grid-cols-12 gap-4">
            <div
              className="bg-white md:col-span-7
          h-full shadow-2xl"
            >
              <SimpleCharts />
            </div>
            <div className="bg-white md:col-span-5 h-[420px] shadow-2xl">
              <div className="">
                <h3 className=" text-slate-700 p-6 font-medium uppercase">
                  AGGREGATE REVENUE / ACCOMODATION
                </h3>
                <PieComponent
                  houseNamesArray={houseNames}
                  houseTotalsArray={housePrices}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="bg-white md:col-span-7 shadow-2xl  md:w-full">
              <h3 className="text-center text-black py-2 text-sm  uppercase font-bold">
                LAST FIVE BOOKINGS
              </h3>

              <div className="">
                <DataTable
                  columns={columns}
                  data={bookings.slice(0, 5)}
                  dense
                  customStyles={customStyles}
                />
              </div>
            </div>
            <Link
              href="/admin/messages"
              className="bg-white md:col-span-5 hidden md:block h-[240px] shadow-2xl relative hover:scale-105 text-black hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black "
            >
              <div>
                <h3 className="text-center  py-2 text-sm  uppercase font-bold">
                  MESSAGES
                </h3>
                <div className="absolute top-[30%] left-[35%] md:left-[40%]">
                  <p className="text-[100px] text-[green]">
                    <FaBell />
                  </p>
                </div>

                <div className="absolute top-[30%] left-[52%] bg-yellow-500 rounded-full h-10 w-10 flex items-center justify-center">
                  <p className="font-semibold text-lg">{messages.length}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
