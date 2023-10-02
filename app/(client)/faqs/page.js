"use client"

import Accordion from "../components/Accordion"
import { useState } from "react";


const page = () => {
    const [open, setIsOpen] = useState(true);
  return (
    <div>
        <div className="w-full bg-green-50 -mt-2 p-6 md:p-12  ">
          <div className="  md:w-1/2">
            <Accordion open={open} />
          </div>
        </div>
    </div>
  )
}

export default page