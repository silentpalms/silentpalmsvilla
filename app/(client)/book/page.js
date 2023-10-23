"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { BsPhone, BsCashStack } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import Image from "next/image";
import moment from "moment";
import axios from "axios";
import Loading from "../components/Loading";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [initialDate, setInitialDate] = useState("00");
  const [initialMonth, setInitialMonth] = useState("MON");
  const [finalDate, setFinalDate] = useState("O0");
  const [finalMonth, setFinalMonth] = useState("MON");
  const [reference, setReference] = useState("")

  const router = useRouter();
  const searchParams = useSearchParams();

  const queryString = searchParams.get("queryString");
  const results = JSON.parse(queryString);

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const checkHandler = () => {
    setChecked(!checked);
    
  };


  const handleForm = (e)=>{
   
    setReference(e.target.value)
    if(reference && checked){
      setDisabled(false)
    }
  }

  const fromDate = results?.fromDate;
  const toDate = results?.toDate;
  const fromDay = moment(fromDate, "DD-MM-YYYY").format("DD");

  const fromThisDay = moment(fromDate, "DD-MM-YYYY").format("DD-MM-YYYY");
  const fromMonth = moment(fromDate, "DD-MM-YYYY").format("MMM").toUpperCase();
  const toDay = moment(toDate, "DD-MM-YYYY").format("DD");
  const toThisDay = moment(toDate, "DD-MM-YYYY").format("DD-MM-YYYY");
  const toMonth = moment(toDate, "DD-MM-YYYY").format("MMM").toUpperCase();
  const noOfDays = Number(toDay) - Number(fromDay) + 1;

  // Parse the JSON string back to objects

  const values = results?.values;


  const parsedValues = values ? JSON.parse(values) : {};

  const amountTotals = parsedValues?.discount>0 || !null ?parsedValues?.discount * noOfDays:parsedValues?.houseAmount * noOfDays;
  const userDetails = {
    firstName: parsedValues.firstName,
    lastName: parsedValues.lastName,
    phoneNumber: parsedValues.phoneNumber,
    email: parsedValues.email,
    arrival: parsedValues.arrival,
    address: parsedValues.address,
    nationality: parsedValues.nationality,
  };

  const guests = results.guests;

  const handlePost = async () => {
    const bookingDetails = {
      fromDate: fromThisDay,
      toDate: toThisDay,
      user: userDetails,
      amount: amountTotals,
      totalDays: noOfDays,
      houseId: parsedValues.houseId,
      house: parsedValues.houseTitle,
      guests,
      reference
    };

    try {
      await axios.post("/api/client/bookings", bookingDetails).then(() => {
        setOpen(true);
      });
    } catch (error) {
      console.error(error);
    }
  };
  let formatter = new Intl.NumberFormat("en-us");

  const handleSuccess = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <>
      {open ? (
        <div className="absolute  bg-green-500 h-screen top-0 left-0 w-full z-[1500] ">
          <div className="flex flex-col rounded-2xl mx-4 md:mx-0 md:h-[500px] p-5 md:p-8 md:w-[700px] md:justify-between text-center bg-white space-y-8 md:space-y-4 absolute top-1/2 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl md:text-4xl font-bold ">
              Congratulations Your Accomodation has been Booked Successfully
            </h1>

            <p className="text-6xl ">🥳</p>
            <p>You will receive an email shortly after payment is confirmed</p>
            <button
              onClick={handleSuccess}
              className="px-2 py-4 bg-green-700 text-white md:w-[200px] md:mx-auto"
            >
              OK
            </button>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className="mt-2 px-4">
              <div className=" py-8  border-b-[0.8px] border-yellow-400">
                <Heading title="Booking Details" />
              </div>
              <div className="grid md:grid-cols-2">
                <div className="py-8 ">
                  <div className="grid grid-cols-3 gap-y-8">
                    <div>
                      <h4 className="text-lg text-green-800 font-extrabold">
                        FirstName
                      </h4>
                      <p>{parsedValues.firstName}</p>
                    </div>
                    <div>
                      <h4 className="text-lg text-green-800 font-extrabold">
                        LastName
                      </h4>
                      <p>{parsedValues.lastName}</p>
                    </div>
                    <div>
                      <h4 className="text-lg text-green-800 font-extrabold">
                        Contact
                      </h4>
                      <p>{parsedValues.phoneNumber}</p>
                    </div>
                    <div>
                      <h4 className="text-lg text-green-800 font-extrabold">
                        Arrival Time
                      </h4>
                      <p>{parsedValues.arrival}</p>
                    </div>

                    <div>
                      <h4 className="text-lg text-green-800 font-extrabold">
                        Address
                      </h4>
                      <p>{parsedValues.address}</p>
                    </div>
                    <div>
                      <h4 className="text-lg text-green-800 font-extrabold">
                        Nationality
                      </h4>
                      <p>{parsedValues.nationality}</p>
                    </div>
                    <div>
                      <h4 className="text-lg text-green-800 font-extrabold">
                        Special Requests
                      </h4>
                      <p>{parsedValues.request}</p>
                    </div>
                  </div>
                  <div className="mt-12">
                    <h4 className="text-lg text-green-800 font-extrabold">
                      Email
                    </h4>
                    <p>{parsedValues.email}</p>
                  </div>

                  <div className="mt-16 px-4 ">
                    <h4 className="text-2xl pb-[2px] text-green-800 font-extrabold text-center border-b-[0.8px] border-yellow-400 ">
                      Terms & Conditions
                    </h4>
                    <ul className="flex flex-col space-y-4  mt-4">
                      <li className="text-sm list-disc">
                        If you do not show up for your reservation and do not
                        notify us of a cancellation, you will be charged for the
                        full amount of the booking.
                      </li>
                      <li className="text-sm list-disc">
                        If you need to cancel your reservation, please do so at
                        least 48 hours before your scheduled arrival time to
                        receive a full refund. If you cancel within 48 hours of
                        your scheduled arrival time, your deposit will not be
                        refunded.
                      </li>
                      <li className="text-sm list-disc">
                        All rates are quoted and charged in the local currency,
                        and currency exchange rates may apply if paying with a
                        foreign currency.
                      </li>
                      <li className="text-sm list-disc">
                        Please note that additional charges may apply for any
                        extra services or amenities requested during your stay.
                      </li>
                      <li className="text-sm list-disc">
                        A deposit of 50% of the total booking cost is required
                        at the time of booking to secure your reservation.
                      </li>
                      <li className="text-sm list-disc">
                        We accept payment by bank deposit and MPESA We do not
                        accept cash and personal checks.
                      </li>
                      <li className="text-sm list-disc">
                        Local taxes may be applied to your booking and will be
                        included in the total price.
                      </li>
                      <li className="text-sm list-disc">
                        The remaining balance of your booking must be paid upon
                        arrival at the hotel.
                      </li>
                    </ul>
                  </div>

                  <div className="hidden md:inline-block mt-20">
                    <h4 className="text-lg text-green-800  font-extrabold ">
                      Support
                    </h4>
                    <div className="mt-3 md:flex items-center md:space-x-20">
                      <div className="flex items-center space-x-3">
                        <p className="text-3xl">
                          <BsPhone />
                        </p>
                        <p>+245798024710</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <p className="text-3xl">
                          <AiOutlineMail />
                        </p>
                        <p>silentpalmsvilla@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full py-8">
                  <div>
                    <div className="relative h-[320px] md:w-[450px] mx-auto">
                      <Image
                        src={parsedValues.houseImage}
                        fill
                        alt={parsedValues.houseTitle}
                        className="box object-cover"
                      />
                    </div>
                    <div className="py-6 w-full h-fit">
                      <p className="text-lg text-green-800 font-extrabold text-center">
                        {parsedValues.houseTitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 relative  mb-1 w-full md:w-[450px] md:mx-auto">
                      <div className="bg-green-400 h-[130px] relative">
                        <p className="text-7xl text-white font-bold mb-0 absolute  top-2 left-1/2 -translate-x-1/2">
                          {fromDay}
                        </p>
                        <p className="text-2xl text-white absolute mb-0 bottom-0 left-1/2 -translate-x-1/2">
                          {fromMonth}
                        </p>
                      </div>
                      <div className="bg-green-400 h-[130px] relative">
                        <p className="text-7xl text-white font-bold mb-0 absolute top-2 left-1/2 -translate-x-1/2">
                          {toDay}
                        </p>
                        <p className="text-2xl text-white absolute mb-0 bottom-0  left-1/2 -translate-x-1/2">
                          {toMonth}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 relative md:w-[450px] md:mx-auto">
                      <div className="bg-green-400 h-[130px] relative">
                        <p className="text-7xl text-white absolute mb-0  font-bold top-2 left-1/2 -translate-x-1/2">
                          <FaUsers />
                        </p>

                        <p className="text-2xl text-white absolute mb-0 bottom-0  left-1/2 -translate-x-1/2">
                          {guests > 1 ? (
                            <>
                              <span>{guests} Guests</span>
                            </>
                          ) : (
                            <>
                              <span>{guests} Guest</span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="bg-green-400 h-[130px] relative">
                        <p className="text-7xl text-white font-bold mb-0 absolute top-2 left-1/2 -translate-x-1/2">
                          <BsCashStack />
                        </p>
                        <p className="text-2xl text-white absolute mb-0 bottom-0 left-1/2 -translate-x-1/2">
                          <span> {formatter.format(amountTotals)} </span>
                        </p>
                      </div>
                    </div>
                    <div className="py-6 md:w-[450px] mx-auto">
                      <p className="font-extrabold mb-0">
                        You are required to pay an initial deposit of KES{" "}
                        {formatter.format(amountTotals / 2)} or a full payment of
                        KES {formatter.format(amountTotals)} via lipa na mpesa
                        paybill no below then click confirm payment.
                      </p>
                      <div className="mt-6 text-center">
                        <p className="text-lg">PAYBILL</p>
                        <p className="text-3xl font-bold">4098459</p>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-lg">ACCOUNT</p>
                        <p className="text-xl font-semibold">YOUR NAME</p>
                      </div>
                      <div className="mt-6 mb-6 space-x-3 md:space-x-3  flex items-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={checkHandler}
                        />
                        <p className="text-sm md:text-base  ">
                          I acknowledge the payment terms and conditions.
                        </p>
                      </div>
                      <div className="w-full text-center mb-6">
                        <p className="mb-2">Enter Reference Number</p>
                       <input className="border border-gray-400 px-2 py-2 outline-none" required type="text" value={reference} onChange={handleForm}/>
                      </div>
                      <div className=" text-center">
                        <button
                          onClick={handlePost}
                          disabled={disabled}
                          className={`px-4 py-3 border-none ${
                            disabled
                              ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                              : "bg-green-800 text-white cursor-pointer "
                          }`}
                        >
                          CONFIRM PAYMENT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:hidden ">
                  <h4 className="text-lg text-green-800  font-extrabold ">
                    Support
                  </h4>
                  <div className="mt-3 md:flex items-center md:space-x-20">
                    <div className="flex items-center space-x-3">
                      <p className="text-3xl">
                        <BsPhone />
                      </p>
                      <p>+245798024710</p>
                    </div>
                    <div className="flex items-center mt-3 mb-16 space-x-3">
                      <p className="text-3xl">
                        <AiOutlineMail />
                      </p>
                      <p>silentpalmsvilla@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default page;
