import { useState, useEffect } from "react";

import axios from "axios";
import AdminLayout from "./AdminLayout";
import DataTable from "react-data-table-component";
import localFont from "next/font/local";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins/Poppins-Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Thin.ttf",
      weight: "200",
      style: "normal",
    },
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

const GetBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [open, setIsOpen] = useState(false);
  const [price, setPrice] = useState(null);

  const columns = [
    {
      name: "Booking ID",
      cell: (row) => {
        return <span>BK00{row.bookingId}</span>;
      },
      sortable: true,
      minWidth: "50px",
    },
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
      name: "Days",
      selector: (row) => row.totalDays,
      sortable: true,
      maxWidth: "10px",
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "From",
      selector: (row) => row.fromDate,
      sortable: true,
    },
    {
      name: "To",
      selector: (row) => row.toDate,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.user.email,
    },
    {
      name: "Booking Status",
      selector: (row) => row.bookingStatus,
    },
    {
      name: "Action",
      ignoreRowClick: true,
      cell: (row) => {
        if (row.bookingStatus === "Confirmed") {
          return (
            <span
              className="text-red-500 font-bold underline cursor-pointer"
              onClick={() => handleAction(row)}
              id={row._id}
            >
              Cancel Booking
            </span>
          );
        } else if (row.bookingStatus === "pending") {
          return (
            <span
              className="text-green-500 font-bold underline cursor-pointer"
              onClick={() => handleAction(row)}
              id={row._id}
            >
              Approve
            </span>
          );
        }
      },

      button: true,
      minWidth: "150px",
    },
    {
      name: "Approved By",
      selector: (row) => row.ApprovedBy,
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

  const handleAction = async (row) => {
    const bookingId = row._id;
    const houseId = row.houseId;
    const total = row.amount;
    const bookingStatus = row.bookingStatus;

    const amount = parseInt(total);

    const details = {
      amount,
      bookingStatus,
    };

    try {
      // Make the API call to update the booking status
      const booking = await axios.put(`/api/allBookings/${bookingId}`, details);
      const house = await axios.get(`/api/getHouses?id=${houseId}`);
      const monthsArray = house.data.months;
      for (const month of monthsArray) {
        const monthId = month._id;

        try {
          const newBookingStatus = await axios.put(
            `/api/getHouses?id=${houseId}&monthId=${monthId}`,
            details
          );
        } catch (error) {
          console.log("Error updating booking status", error);
        }
      }
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get(`/api/admin/bookings`);

        setBookings(response.data.bookings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBookings();
  }, []);

  return (
    <AdminLayout open={open} setIsOpen={setIsOpen}>
      {!open && (
        <div
          className={`${poppins.className} pt-6  px-4 md:py-14 md:pl-[230px] md:pr-[30px]  h-full md:w-screen md:-ml-[200px] bg-gray-50 `}
        >
          <div className="">
            <DataTable
              title={`Bookings - ${bookings.length} Total`}
              columns={columns}
              data={bookings}
              pagination
              customStyles={customStyles}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default GetBookings;
