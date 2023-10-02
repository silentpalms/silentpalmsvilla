import { useEffect, useState } from "react";
import { Badge, Calendar } from "antd";
import localFont from "next/font/local";
import { parse, eachDayOfInterval } from "date-fns";
import axios from "axios";


const poppins = localFont({
  src: [
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

const CalendarComponent = () => {
  const [bookingData, setBookingData] = useState([]);
  console.log(bookingData);

  const [open, setIsOpen] = useState(false);

  const getDatesBetween = (fromDate, toDate) => {
    let parsedFromDate = parse(fromDate, "dd-MM-yyyy", new Date());

    let parsedToDate = parse(toDate, "dd-MM-yyyy", new Date());
    // Ensure parsedFromDate is earlier than parsedToDate
    if (parsedFromDate > parsedToDate) {
      const temp = parsedFromDate;
      parsedFromDate = parsedToDate;
      parsedToDate = temp;
    }
    return eachDayOfInterval({ start: parsedFromDate, end: parsedToDate });
  };

  const getListData = (value) => {
    const selectedDate = value.toDate();
    const selectedDateWithoutTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    let listData = [];

    bookingData.forEach((booking) => {
      const datesBetween = getDatesBetween(booking.fromDate, booking.toDate);
      if (
        datesBetween.some(
          (date) => date.getTime() === selectedDateWithoutTime.getTime()
        )
      ) {
        const houseWords = booking.house.split(" ");
        const houseName =
          houseWords[2] + " " + houseWords[houseWords.length - 1].slice(-2);
        listData.push({
          type: "success",
          content: houseName,
        });
      }
    });

    return listData;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);

    const handleBadgeClick = () => {
      if (listData.length > 0) {
        const houseNames = listData.map((house) => {
          return <p>{house.content}</p>;
        });

        let allHouseNames = [];

        houseNames.forEach((newHouse) => {
          const { props } = newHouse;
          const allHouses = props.children;

          if (Array.isArray(allHouses)) {
            allHouses.forEach((house) => {
              allHouseNames.push(house);
            });
          } else {
            allHouseNames.push(allHouses);
          }
        });
      }
    };

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type}
              text={item.content}
              onClick={handleBadgeClick}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);

    return info.originNode;
  };

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get("/api/admin/bookings");

        setBookingData(response.data.bookings);
      } catch (error) {
        console.log(error, "Error getting files");
      }
    };
    getBookings();
  }, []);

  return (
    <AdminLayout open={open} setIsOpen={setIsOpen}>
      {!open && (
        <div className="px-6 bg-gray-50 h-full text-black md:h-screen">
          <h1
            className={`${poppins.className} md:pt-14 pt-6 uppercase w-full text-xl font-bold `}
          >
            Daily Availability
          </h1>
          <div className={`${poppins.className} pt-6 w-full `}>
            <Calendar cellRender={cellRender} />
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default CalendarComponent;
