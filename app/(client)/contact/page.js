"use client";

import { useRef } from "react";
import { useFormik } from "formik";
import axios from "axios";

import Image from "next/image";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

const validate = (values) => {
  const errors = {};
  if (!values.user_name) {
    errors.user_name = "Required";
  } else if (values.user_name.length > 15) {
    errors.user_name = "Must be 15 characters or less";
  }
  if (!values.user_message) {
    errors.user_message = "Required";
  } else if (values.user_message.length > 150) {
    errors.user_message = "Must be 150 characters or less";
  }

  if (!values.user_email) {
    errors.user_email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.user_email)
  ) {
    errors.user_email = "Invalid email address";
  }
  if (!values.user_phone) {
    errors.user_phone = "Required";
  } else if (
    !/^(\+254|0)([7][0-9]|[1][0-1])[0-9]{7}$/.test(values.user_phone)
  ) {
    errors.user_phone = "Invalid phone number";
  }

  return errors;
};

const page = () => {
  const form = useRef();
  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_email: "",
      user_phone: "",
      user_message: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);
        const response = await axios.post("/api/client/messages", values);

        resetForm({
          values: {
            user_name: "",
            user_email: "",
            user_phone: "",
            user_message: "",
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-screen -mt-3 py-6">
      <div className="h-full px-4 py-10 text-green-800">
        <h1 className="font-bold text-5xl">CONTACT US </h1>

        <div className="pt-12 w-full grid grid-cols-2 gap-4 md:grid-cols-3 ">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <MapPinIcon className="h-6 w-6" />
              <p className="text-black font-semibold">Address</p>
            </div>
            <p className="text-[14px] text-black">Diani, Ukunda Kenya</p>
          </div>
          <div className="">
            <div className="flex items-center space-x-2 mb-1">
              <PhoneIcon className="h-6 w-6" />
              <p className="text-black font-semibold">Telephone</p>
            </div>
            <p className="text-[14px] text-black">+254 798024710</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <EnvelopeIcon className="h-6 w-6" />
              <p className="text-black font-semibold">Email</p>
            </div>
            <p className="text-[14px] text-black">silentpalmsvilla@gmail.com</p>
          </div>
        </div>

        <div className=" mt-12 md:mt-32">
          <form onSubmit={formik.handleSubmit} ref={form} className="w-full">
            <div className="flex flex-col space-y-5">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col ">
                  <label>Name</label>
                  <input
                    type="text"
                    className={`border-b outline-none ${
                      formik.errors.user_name
                        ? "border-red-500"
                        : "border-b-black"
                    } px-2 py-2`}
                    name="user_name"
                    id="user_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.user_name}
                  />
                  {formik.errors.user_name ? (
                    <div className="text-red-500 -mb-2 text-sm">
                      {formik.errors.user_name}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className={`border-b outline-none ${
                      formik.errors.user_name
                        ? "border-red-500"
                        : "border-black"
                    } px-2 py-2`}
                    name="user_phone"
                    id="user_phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.user_phone}
                  />
                  {formik.errors.user_phone ? (
                    <div className="text-red-500 -mb-2 text-sm">
                      {formik.errors.user_phone}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col">
                <label>Email Address</label>
                <input
                  type="email"
                  className={`border-b outline-none ${
                    formik.errors.user_email ? "border-red-500" : "border-black"
                  }  px-2 py-2`}
                  name="user_email"
                  id="user_email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.user_email}
                />
                {formik.errors.user_email ? (
                  <div className="text-red-500 -mb-2 text-sm">
                    {formik.errors.user_email}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <label>Message</label>
                <textarea
                  type="text"
                  className={`border-b outline-none ${
                    formik.errors.user_message
                      ? "border-red-500"
                      : "border-black"
                  }  px-2 py-3`}
                  cols={10}
                  rows="5"
                  name="user_message"
                  id="user_message"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.user_message}
                />
                {formik.errors.user_message ? (
                  <div className="text-red-500 -mb-2 text-sm">
                    {formik.errors.user_message}
                  </div>
                ) : null}
              </div>
              <input
                type="submit"
                value="Send"
                className="bg-green-800 text-white py-4"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="relative h-[500px] md:h-[730px] px-4">
        <Image src="/images/location.png" fill className="object-cover" />
      </div>
    </div>
  );
};

export default page;
