"use client"

import { useState, useEffect } from "react";
import { useSession} from "next-auth/react";
import axios from "axios";
import DataTable from "react-data-table-component";
import localFont from "next/font/local";



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
  const { data: session, status } = useSession();

  const [bookings, setBookings] = useState([]);
  const [amount, setAmount] = useState(null);
  const [handleConfirmTriggered, setHandleConfirmTriggered] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [toggle, setToggle] = useState(true);

  const user = session?.user?.validateUser?.username;



  const handleEdit = (row) => {
    setEditedRow(row);
    setIsEditMode(true);
    setToggle(false);
  };

  const columns = [
    {
      name: "Booking ID",
      cell: (row) => {
        return <span>BK00{row.bookingId}</span>;
      },
      minWidth: "50px",
    },
    {
      name: "Reference No",
      selector: (row) => row.referenceNumber,   
      minWidth: "120px",
    },
    {
      name: "House",
      selector: (row) => row.house,
      sortable: true,
      minWidth: "300px",
    },
    {
      name: "House ID",
      selector: (row) => row.houseId,
      minWidth: "220px",
    },

    {
      name: "Names",
      selector: (row) => `${row.user.firstName} ${row.user.lastName}`,
    },
    {
      name: "Phone No.",
      selector: (row) => row.user.phoneNumber,
      minWidth: "150px",
    },

    {
      name: "Days",
      selector: (row) => row.totalDays,
      sortable: true,
      width: "80px",
     
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      cell: (row) =>
        isEditMode && editedRow?._id === row._id ? (
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border py-1 border-black px-1 min-w-[80px]"
          />
        ) : (
          row.amount
        ),
      minWidth: "100px",
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
      minWidth: "250px",
    },
    {
      name: "Booking Status",
      selector: (row) => row.bookingStatus,
    },
    {
      name: "Action",
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <div>
            {toggle ? (
              <span
                className="text-green-500 font-bold underline cursor-pointer"
                onClick={() => handleEdit(row)}
                id={row._id}
              >
                Edit
              </span>
            ) : (
              <span
                className="text-green-500 font-bold underline cursor-pointer"
                onClick={() => handleConfirm(row)}
                id={row._id}
              >
                Approve
              </span>
            )}
          </div>
        );
      },
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
    async function fetchBookings() {
      try {
        const response = await axios.get(`/api/admin/bookings`);

        const pendings = response.data.bookings;

        const filteredPending = pendings.filter(
          (pending) => pending.bookingStatus === "pending"
        );

        setBookings(filteredPending);
      } catch (error) {
        console.log(error);
      }
    }
    if (handleConfirmTriggered) {
      setHandleConfirmTriggered(false);
    }
    fetchBookings();
  }, [handleConfirmTriggered]);

  const handleConfirm = async (row) => {
    setEditedRow(row);
    setIsEditMode(false);
    setToggle(true);
    const price = parseInt(amount);
    const bookingId = row._id;
    const bookingStatus = "Confirmed"
    const houseId = row.houseId;
    const bookingDetails = {
      amount: price,
      _id:bookingId,
      bookingStatus,
      ApprovedBy:user

    };
    
    try {
      // Make the API call to update the booking status
      const booking = await axios.put(`/api/admin/bookings`, bookingDetails);
      const house = await axios.get(`/api/admin/houses?_id=${houseId}`); 
    
     const houseData = house.data.house
        
      const monthsArray = houseData.months;
      const title = houseData.title;
      const houseAmount = houseData.amount
      const description = houseData.description
      const imageUrls = houseData.imageUrls
      const noOfGuests = houseData.noOfGuests
      const roomType = houseData.roomTYpe
      const images = houseData.images
      const currentBookings = houseData.currentBookings
     
     
   
   
   
      for (const month of monthsArray) {
        const monthId = month._id;

        


        const details = {
          id:houseId,
          monthId,
          newAmount:price,
          bookingStatus,
          title,
          amount:houseAmount,
          description,
          imageUrls,
          noOfGuests,
          roomType,
          currentBookings,
          months:monthsArray,
          bookingId
        }

   


        const houseDetails ={
          details,
          images
        }

        

       

        try {
          const newBookingStatus = await axios.put(
            `/api/admin/houses`,houseDetails
          );

         
        } catch (error) {
          console.log("Error updating booking status", error);
        }
      }
      // Set handleConfirmTriggered to true to trigger the useEffect
      setHandleConfirmTriggered(true);
      // Handle the response or perform any necessary actions
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };
  return (
    <div>
      {!open && (
        <div
          className={`${poppins.className} md:py-14 md:pl-[230px] md:pr-[30px] bg-gray-50 md:h-screen h-screen px-4 py-6 w-screen md:-ml-[200px] `}
        >
          <div className="">
            <DataTable
              title={`Pending Bookings - ${bookings.length} Total`}
              columns={columns}
              data={bookings}
              pagination
              customStyles={customStyles}
            />
          </div>
        </div>
      )}
    </div>
  )
};

export default page;
