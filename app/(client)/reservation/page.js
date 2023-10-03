"use client"

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "antd/dist/reset.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { AiOutlineWifi,AiOutlineUser,AiOutlineCloseCircle } from "react-icons/ai";
import { FaSwimmingPool } from "react-icons/fa";
import {
  MdKitchen,
  MdKingBed,
  MdScreenshotMonitor,
  MdStarRate,
} from "react-icons/md";
import { format, isWithinInterval, parse } from "date-fns";
import { HiUsers } from "react-icons/hi";
import { DatePicker } from "antd";

import { Collapse } from "react-collapse";
import { BsHouse } from "react-icons/bs";
import moment from "moment";

import { useFormik } from "formik";
import LoadingHouse from "../components/LoadingHouse";


const page = () => {

  const router = useRouter();
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { RangePicker } = DatePicker;
  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);
  const [guests, setGuests] = useState(0);
  const [roomType, setRoomType] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [opend, setIsOpend] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [duplicateHouses, setDuplicateHouses] = useState([]);
  const [disableEnterDetails, setDisableEnterDetails] = useState(true);
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [chosenDates, setChosenDates] = useState([null, null]);
 


  console.log(filteredHouses);

  

 

  let formatter = new Intl.NumberFormat("en-us");
  
  const timeOptions = [
    { label: "10:00 am", value: "10:00 am" },
    { label: "11:00 am", value: "11:00 am" },
    { label: "12:00 noon", value: "12:00 noon" },
    { label: "1:00 pm", value: "1:00 pm" },
    { label: "2:00 pm", value: "2:00 pm" },
    { label: "3:00 pm", value: "3:00 pm" },
    { label: "4:00 pm", value: "4:00 pm" },
  ];
  const nationalityOptions = [
    { label: "Kenyan", value: "kenyan" },
    { label: "Foreigner", value: "foreigner" },
  ];

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get("/api/client/houses");

        setDuplicateHouses(response.data.houses);
        setFilteredHouses(response.data.houses);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchHouses();
  }, []);

  useEffect(() => {
    const createGuests = () => {
      let guestList;
      guestList = Number(adults) + Number(child);
      setGuests(guestList);
    };
    createGuests();
  },[]);

  useEffect(() => {
    if (fromDate !== null && toDate !== null) {
      setDisableEnterDetails(false);
    }
  }, [fromDate, toDate]);

  const handleFirstDateChange = (date) => {
    const lastDate = chosenDates[1];
    const updatedDates = [date, lastDate];
    setSelectedDates(updatedDates);
    handleSelect(updatedDates);
  };

  const handleLastDateChange = (date) => {
    const firstDate = selectedDates[0];
    const updatedDates = [firstDate, date];
    setSelectedDates(updatedDates);
    handleSelect(updatedDates);
  };

  const handleSelect = (dates) => {
   
    if (!dates || dates.includes(null)) {
      setDisableEnterDetails(true);
      setIsOpen(false);
      return;
    }
    setSelectedDates(dates);

    // Example usage of filterByDates
    const startDate = dates[0].toDate();
  
    const formattedStartDate = format(dates[0].toDate(), "dd-MM-yyyy");
   
    setFromDate(formattedStartDate);
    const endDate = dates[1].toDate();
    
    const formattedEndDate = format(dates[1].toDate(), "dd-MM-yyyy");
    
    setToDate(formattedEndDate);

    const filteredHouses = filterByDates(duplicateHouses, startDate, endDate);

    setFilteredHouses(filteredHouses);
  };

  const filterByDates = (duplicateHouses, startDate, endDate) => {
   
    const tempRooms = [];

    for (const house of duplicateHouses) {
      let availability = true;

      for (const booking of house.currentBookings) {

        try {

            const formattedFromDate = format(
                parse(booking.fromDate, "dd-MM-yyyy", new Date()),
                "dd-MM-yyyy"
              );
      
            
      
              const formattedToDate = format(
                parse(booking.toDate, "dd-MM-yyyy", new Date()),
                "dd-MM-yyyy"
              );
      
          
      
              const isOverlap =
                isWithinInterval(startDate, {
                  start: parse(formattedFromDate, "dd-MM-yyyy", new Date()),
                  end: parse(formattedToDate, "dd-MM-yyyy", new Date()),
                }) ||
                isWithinInterval(endDate, {
                  start: parse(formattedFromDate, "dd-MM-yyyy", new Date()),
                  end: parse(formattedToDate, "dd-MM-yyyy", new Date()),
                }) ||
                isWithinInterval(parse(booking.fromDate, "dd-MM-yyyy", new Date()), {
                  start: startDate,
                  end: endDate,
                }) ||
                isWithinInterval(parse(booking.toDate, "dd-MM-yyyy", new Date()), {
                  start: startDate,
                  end: endDate,
                });
      
              if (isOverlap) {
                availability = false;
                break;
              }
            
        } catch (error) {
           console.error("Error", error) 
        }
        
        
      
      }

      

      if (availability) {
        tempRooms.push(house);
      }

      
    }

    return tempRooms;
  };

  const filterByType = (e) => {
    setRoomType(e);

    // Filter by room type
    let tempRooms = duplicateHouses.filter((house) => house.roomType === e);

    // Filter by date range
    if (fromDate && toDate) {
      tempRooms = tempRooms.filter((house) => {
        const bookings = house.currentBookings;
        if (bookings?.length === 0) {
          return;
        }
        for (const booking of bookings) {
          const bookingFromDate = moment(booking.fromDate, "DD-MM-YYYY");
          const bookingToDate = moment(booking.toDate, "DD-MM-YYYY");
          if (
            moment(fromDate, "DD-MM-YYYY").isBetween(
              bookingFromDate,
              bookingToDate
            ) ||
            moment(toDate, "DD-MM-YYYY").isBetween(
              bookingFromDate,
              bookingToDate
            ) ||
            moment(fromDate, "DD-MM-YYYY").isSame(bookingFromDate) ||
            moment(toDate, "DD-MM-YYYY").isSame(bookingToDate)
          ) {
            return false;
          }
        }
        return true;
      });
    }

    setFilteredHouses(tempRooms);
  };

  const handleOpen = (event, houseId) => {
    event.preventDefault();
    setIsOpen((prevOpen) => (prevOpen === houseId ? false : houseId));
  };
  
  return (
    <div className="bg-gray-100  h-fit py-12">
    <div className="h-full hidden md:flex w-[1000px] mx-auto relative">
      <div className="relative  h-fit w-full">
        <form className="w-full bg-white h-full px-6 py-4 rounded-full flex shadow-lg relative">
          <div className="flex items-center space-x-6 w-full">
            <div
              className="flex items-center space-x-4 mt-1"
              onClick={() => setIsOpend(!opend)}
            >
              <RangePicker
                className="border-b-[0.8px] border-black"
                onChange={handleSelect}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex flex-col border-b-[0.8px] border-black">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-bold text-green-800">
                    ADULTS
                  </label>
                  <AiOutlineUser />
                </div>

                <input
                  type="number"
                  max="6"
                  className="pt-1 text-sm"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                />
              </div>
              <div className="flex flex-col border-b-[0.8px] border-black">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-bold text-green-800">
                    KIDS
                  </label>
                  <AiOutlineUser />
                </div>
                <input
                  type="number"
                  className="pt-1 text-sm"
                  value={child}
                  onChange={(e) => setChild(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col border-b-[0.8px] grow border-black">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-bold text-green-800">
                  ROOM TYPE
                </label>
                <BsHouse />
              </div>

              <select
                className="text-sm  outline-none pt-1"
                value={roomType}
                onChange={(e) => filterByType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="All">All</option>
                <option value="Executive">Executive</option>
                <option value="Standard">Standard</option>
                <option value="Studio">Studio</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div className="mx-4 py-6 px-6 md:hidden bg-white mb-12">
      <div>
        <div className="flex flex-col">
          <div className="flex flex-col border-b-[0.8px] border-black">
            <div className="flex items-center justify-between w-full">
              <label className="text-[12px] font-bold text-green-800">
                ADULTS
              </label>
              <AiOutlineUser />
            </div>

            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
            />
          </div>
          <div className="flex flex-col border-b-[0.8px] border-black my-6">
            <div className="flex items-center justify-between w-full">
              <label className="text-[12px] font-bold text-green-800">
                KIDS
              </label>
              <AiOutlineUser />
            </div>
            <input
              type="number"
              value={child}
              onChange={(e) => setChild(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col border-b-[0.8px] grow border-black">
        <div className="flex items-center justify-between">
          <label className="text-[12px] font-bold text-green-800">
            ROOM TYPE
          </label>
          <BsHouse />
        </div>

        <select
          className="text-sm  outline-none"
          value={roomType}
          onChange={(e) => filterByType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="All">All</option>
          <option value="Executive">Executive</option>
          <option value="Standard">Standard</option>
          <option value="Studio">Studio</option>
        </select>
      </div>
      <div className="max-w-full">
        <div className="mt-8 w-full grid grid-cols-2 gap-1">
          <DatePicker
            format="YYYY-MM-DD"
            value={selectedDates[0]}
            onChange={handleFirstDateChange}
            placeholder="Start Date"
            inputReadOnly
            popupStyle={{ zIndex: 9999 }}
            className="border border-black rounded-none"
          />
          <DatePicker
            format="YYYY-MM-DD"
            value={selectedDates[1]}
            onChange={handleLastDateChange}
            placeholder="End Date"
            inputReadOnly
            popupStyle={{ zIndex: 9999 }}
            className="border border-black rounded-none"
          />
        </div>
      </div>
    </div>

    <div className="md:w-[1000px] h-full md:mx-auto md:my-8">
      <p className="text-[12px] px-4 text-black">
        Showing available accomodations
      </p>

      {loading ? (
        <div className="px-4 h-full">
          <LoadingHouse />
        </div>
      ) : (
        <div className="h-full">
          {filteredHouses?.length > 0 ? (
            <div>
              {filteredHouses.map((house, index) => {
                return (
                  <div key={house._id}>
                    <div className="h-full">
                      <div className="mt-10 w-full">
                        <div
                          className={`shadow-2xl mx-2 px-4 py-4 ${
                            open ? "h-full" : "md:h-[330px]"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:space-x-8  ">
                            <div className="relative h-[300px] md:min-w-[400px]">
                              <Image
                                src={house.imageUrls[0]}
                                alt={house.title}
                                fill
                                className="object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex flex-col ">
                              <div className="text-center space-y-1">
                                <h1 className="text-xl md:text-xl text-center md:text-left font-bold">
                                  {house.title}
                                </h1>
                                <span className="flex mt-4 md:-mt-1 w-full justify-center md:justify-normal">
                                  <p className="text-yellow-500 text-sm">
                                    <MdStarRate />
                                  </p>
                                  <p className="text-yellow-500 text-sm">
                                    <MdStarRate />
                                  </p>
                                  <p className="text-yellow-500 text-sm">
                                    <MdStarRate />
                                  </p>
                                  <p className="text-yellow-500 text-sm">
                                    <MdStarRate />
                                  </p>
                                  <p className="text-yellow-500 text-sm">
                                    <MdStarRate />
                                  </p>
                                </span>
                              </div>
                              <div className="flex items-center space-x-5 w-full justify-center mt-3 md:justify-normal md:mt-0">
                                <div className="flex items-center space-x-2">
                                  <p className=" text-gray-500 text-[15px]">
                                    <HiUsers />
                                  </p>
                                  <p className="text-gray-500 text-[15px]">
                                    {house.noOfGuests} pax
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <p className=" text-gray-500 text-[15px]">
                                    <MdKingBed />
                                  </p>
                                  <p className="text-gray-500 text-[15px]">
                                    {house.rooms} beds
                                  </p>
                                </div>
                              </div>
                              <div>
                                <span className="flex items-center md:space-x-3 mt-3 w-full justify-between max-w-[200px] mx-auto md:w-full md:mx-0 md:mt-0">
                                  <p className="text-[24px] text-green-900">
                                    <AiOutlineWifi />
                                  </p>
                                  <p className="text-[24px] text-green-900">
                                    <MdKitchen />
                                  </p>
                                  <p className="text-[24px] text-green-900">
                                    <MdScreenshotMonitor />
                                  </p>
                                  <p className="text-[24px] text-green-900">
                                    <FaSwimmingPool />
                                  </p>
                                </span>
                              </div>
                              <div>
                                <p className="line-clamp-4 text-center mt-3 md:text-left md:-mt-2 text-sm">
                                  {house.description}
                                </p>
                              </div>
                              <div>
                                <div className="flex flex-col md:flex-row  items-center justify-between">
                                  <div>
                                    <span className="text-xs text-yellow-500">
                                      FROM
                                    </span>
                                    <p className="text-2xl  font-bold">
                                      KES {formatter.format(house.amount)}
                                      <span className="text-sm font-thin">
                                        /PER NIGHT
                                      </span>
                                    </p>
                                  </div>
                                  <button
                                    disabled={disableEnterDetails}
                                    onClick={(event) =>
                                      handleOpen(event, house._id)
                                    }
                                    className={`text-white px-3 py-2 md:-mt-4 ${
                                      disableEnterDetails
                                        ? "bg-gray-300"
                                        : "bg-green-800"
                                    }`}
                                  >
                                    ENTER DETAILS
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Collapse isOpened={open === house._id}>
                              <div className={open ? "active" : "inactive"}>
                                <div className="border-gray-400 border-t mt-9  pt-9">
                                  <HouseForm
                                    key={index}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    adults={adults}
                                    child={child}
                                    timeOptions={timeOptions}
                                    nationalityOptions={nationalityOptions}
                                    houseId={house._id}
                                    houseTitle={house.title}
                                    houseAmount={house.amount}
                                    houseImage={house.imageUrls[0]}
                                    open={open}
                                    setIsOpen={setIsOpen}
                                    onSubmit={(values) =>
                                      handleSubmit(values, index)
                                    }
                                  />
                                </div>
                              </div>
                            </Collapse>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-screen mt-8 px-4 md:px-0 ">
              <p className="text-center text-xl">
                No available rooms on this date. Choose a different date
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
  )
}

function HouseForm({
    houseId,
    onSubmit,
    toDate,
    fromDate,
    adults,
    child,
    timeOptions,
    nationalityOptions,
    houseTitle,
    houseAmount,
    houseImage,
    setIsOpen,
  }) {

    const guests = adults+child

   
    const validate = (values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = "Required";
      } else if (values.firstName.length > 15) {
        errors.firstName = "Must be 15 characters or less";
      }
      if (!values.lastName) {
        errors.lastName = "Required";
      } else if (values.lastName.length > 15) {
        errors.lastName = "Must be 15 characters or less";
      }
  
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = "Required";
      } else if (
        !/^(\+254|0)([7][0-9]|[1][0-1])[0-9]{7}$/.test(values.phoneNumber)
      ) {
        errors.phoneNumber = "Invalid phone number";
      }
      if (values.arrival === "") {
        errors.arrival = "Please Select time";
      }
      if (values.nationality === "") {
        errors.nationality = "Please Select nationality";
      }
      if (!values.address) {
        errors.address = "Required";
      } else if (values.address.length > 15) {
        errors.address = "Must be 15 characters or less";
      }
      if (values.request.length > 300) {
        errors.request = "Must be 300 characters or less";
      }
  
      return errors;
    };
    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        arrival: "",
        address: "",
        nationality: "",
        request: "",
        houseId: houseId,
        houseTitle: houseTitle,
        houseAmount: houseAmount,
        houseImage: houseImage,
        
      },
      validate,
      onSubmit,
    });

    const queryString={
      values: JSON.stringify(formik.values),
      toDate,
      fromDate,
      guests,
    }

   
  
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full flex flex-row-reverse">
          <p
            className="text-3xl md:hidden bg-red-500 rounded-full text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <AiOutlineCloseCircle />
          </p>
        </div>
        <div className="flex items-center w-full justify-between">
          <p className="font-bold text-center">
            Your Booking Information -{" "}
            <span>
              {" "}
              {fromDate} - {toDate}{" "}
            </span>
          </p>
          <p
            className="text-3xl hidden md:flex bg-red-500 rounded-full text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <AiOutlineCloseCircle />
          </p>
        </div>
  
        <p className="my-3">
          You have selected {adults} Adult(s) and {child} Kid(s)
        </p>
        <div>
          <p>Personal Information</p>
          <p>Enter your details below</p>
          <div className="grid md:grid-cols-3  gap-6 mt-6">
            <div className="flex flex-col">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                className={`border ${
                  formik.errors.firstName ? "border-red-500" : "border-black"
                } px-2 py-3`}
                id="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.errors.firstName ? (
                <div className="text-red-500 -mb-2 text-sm">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                className={`border ${
                  formik.errors.lastName ? "border-red-500" : "border-black"
                } px-2 py-3`}
                id="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.errors.lastName ? (
                <div className="text-red-500 -mb-2 text-sm">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>
            <div>
              <div className="flex flex-col row-span-2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className={`border ${
                    formik.errors.email ? "border-red-500" : "border-black"
                  } px-2 py-3`}
                  id="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email ? (
                  <div className="text-red-500 -mb-2 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            </div>
  
            <div className="flex flex-col">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                className={`border ${
                  formik.errors.phoneNumber ? "border-red-500" : "border-black"
                } px-2 py-3`}
                id="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.errors.phoneNumber ? (
                <div className="text-red-500 -mb-2 text-sm">
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label htmlFor="selectValue">Arrival Time</label>
  
              <select
                id="arrival"
                name="arrival"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.arrival}
                className={`border ${
                  formik.errors.address ? "border-red-500" : "border-black"
                } px-2 py-[10px]`}
              >
                <option value="">Select...</option>
                {timeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formik.touched.arrival && formik.errors.arrival && (
                <div>{formik.errors.arrival}</div>
              )}
            </div>
            <div className="flex flex-col">
              <label>Special Requests</label>
              <textarea
                type="text"
                name="request"
                className={`border ${
                  formik.errors.request ? "border-red-500" : "border-black"
                } px-2 py-3`}
                id="request"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.request}
              />
              {formik.errors.request ? (
                <div className="text-red-500 -mb-2 text-sm">
                  {formik.errors.request}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className={`border ${
                  formik.errors.address ? "border-red-500" : "border-black"
                } px-2 py-3`}
                id="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.errors.address ? (
                <div className="text-red-500 -mb-2 text-sm">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label>Nationality</label>
              <select
                id="nationality"
                name="nationality"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nationality}
                className={`border ${
                  formik.errors.address ? "border-red-500" : "border-black"
                } px-2 py-[10px]`}
              >
                <option value="">Select...</option>
                {nationalityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formik.touched.nationality && formik.errors.nationality && (
                <div>{formik.errors.nationality}</div>
              )}
            </div>
          </div>
  
          <div className="w-full flex justify-between flex-row-reverse">

          <Link href={{
             
             pathname:"/book",
             query:{queryString:JSON.stringify(queryString)}
           }} className="px-6 py-3 my-3  bg-green-800 text-white">CONFIRM</Link>
          </div>
        </div>
      </form>
    );
  }

export default page