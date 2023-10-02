"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import localFont from "next/font/local";
import HorizontalAccordion from "../../components/HorizontalAccordion";
const poppins = localFont({
  src: [
    {
      path: "../../../../public/fonts/poppins/Poppins-Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/poppins/Poppins-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const page = () => {
  const [houses, setHouses] = useState([]);


  useEffect(() => {
    const fetchHouses = async () => {
      try {
        await axios.get(`/api/admin/houses`).then((res) => {
        
          setHouses(res.data.houses);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchHouses();
  }, []);
  return (
    <div className="h-full bg-white">
      <div>
            {houses?.map((house) => {
              return (
                <div key={house._id} className="bg-white">
                  <HorizontalAccordion
                    title={house.title}
                    description={house.description}
                    price={house.amount}
                    guests={house.noOfGuests}
                    rooms={house.rooms}
                    image={house.imageUrls[0]}
                    id={house._id}
                  />
                </div>
              );
            })}
          </div>
    </div>
  );
};

export default page;
