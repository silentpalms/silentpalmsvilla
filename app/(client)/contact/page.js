"use client"

import { useRef } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Cormorant } from "next/font/google";
import dynamic from "next/dynamic";

const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const Map = dynamic(() => import("../components/Map"), { ssr: false });

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
    <div className="h-full md:h-full w-full mb-32 px-4">
    <div
      className={`${cormorant.className} text-[30px] text-center md:text-left md:text-[40px]  pt-4 font-bold text-green-800 my-12`}
    >
      <h1>GET</h1>
      <h1 className="-mt-2 md:-mt-5"> IN TOUCH</h1>
    </div>
    <div className="">
      <div className="flex flex-col md:flex-row md:space-x-4 justify-between md:items-center">
        <div className="mt-4 md:w-1/2 md:mr-16">
          <h2
            className={`${cormorant.className} text-black text-[25px] text-center font-extrabold`}
          >
            CONTACT US
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            ref={form}
            className="w-full"
          >
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col ">
                <label>Name</label>
                <input
                  type="text"
                  className={`border ${
                    formik.errors.user_name
                      ? "border-red-500"
                      : "border-black"
                  } px-2 py-3`}
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
                  className={`border ${
                    formik.errors.user_name
                      ? "border-red-500"
                      : "border-black"
                  } px-2 py-3`}
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
              <div className="flex flex-col">
                <label>Email Address</label>
                <input
                  type="email"
                  className={`border ${
                    formik.errors.user_email
                      ? "border-red-500"
                      : "border-black"
                  }  px-2 py-3`}
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
                  className={`border ${
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

        <div className="mt-12 md:w-1/2 md:-mt-2">
          <Map />
        </div>
      </div>
    </div>
  </div>
  )
}

export default page