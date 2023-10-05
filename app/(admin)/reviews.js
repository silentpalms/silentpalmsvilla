import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import DataTable from "react-data-table-component";
import localFont from "next/font/local";
import DeleteReviewModal from "./components/DeleteReviewModal";
import ApproveReviewModal from "./components/ApproveReviewModal";

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

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [open, setIsOpen] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const [handleDeleteTriggered, setHandleDeleteTriggered] = useState(false)
  const showReviewModal = () => {
    setOpenReviewModal(true);
  };
  const showApproveModal = () => {
    setOpenApproveModal(true);
  };

  const hideReviewModal = () => {
    setOpenReviewModal(false);
  };
  const hideApproveModal = () => {
    setOpenApproveModal(false);
  };

  const handleDelete = (data) => {
    showReviewModal(data._id);
    setReviewId(data._id);
  };

  const handleAction = (data) => {
    if (data.reviewStatus === "Approved") {
      showApproveModal(data._id);
      setReviewId(data._id);
      setReviewStatus("Approved");
    } else {
      showApproveModal(data._id);
      setReviewId(data._id);
      setReviewStatus("Pending");
    }
  };
  const ExpandableComponent = ({ data }) => {
    return (
      <div className="p-4 ">
        <p className="font-bold mb-4 text-lg">Review:</p>

        <p className="text-sm max-w-[300px] md:max-w-[800px]">{data.message}</p>
        <div className="mt-5">
          <h4 className="font-bold text-sm">Action</h4>
          <div className=" flex space-x-3">
            <button onClick={() => markedRead(data)}>
              <span className="text-xs underline">
                {data.readStatus === false ? (
                  <>Mark as Read</>
                ) : (
                  <>Mark as Unread</>
                )}
              </span>
            </button>
            <button onClick={() => handleAction(data)}>
              <span className="text-xs underline">
                {data.reviewStatus === "Approved" ? (
                  <>Mark as Pending</>
                ) : (
                  <>Approve</>
                )}
              </span>
            </button>
            <button onClick={() => handleDelete(data)}>
              <span className="text-xs underline text-red-500">Delete</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.user,
      maxWidth: "200px",
    },

    {
      name: "Message",
      selector: (row) => row.message,
      width: "650px",
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
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
        minHeight: "40px", // override the row height

        color: "black",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",

        borderColor: "rgb(51,65,85)",
        color: "black",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const markedRead = async (row) => {
    const reviewId = row._id;

    const readStatus = row.readStatus;

    const status = {
      readStatus,
    };

    try {
      await axios.put(`/api/reviews?id=${reviewId}`, status);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    async function getReviews() {
      try {
        const response = await axios.get("/api/reviews");

        setReviews(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    }
    getReviews();
  }, [reviews, handleDeleteTriggered]);
  return (
    <AdminLayout open={open} setIsOpen={setIsOpen}>
      {!open && (
        <div
          className={`${poppins.className} md:py-14 md:pl-[230px] md:pr-[30px] px-4 py-6 bg-gray-50 h-screen w-screen md:-ml-[200px] `}
        >
          <DataTable
            title="Reviews"
            columns={columns}
            data={reviews}
            customStyles={customStyles}
            expandableRows
            pagination
            expandableRowsComponent={ExpandableComponent}
          />
        </div>
      )}

      <DeleteReviewModal
        openModal={openReviewModal}
        showReviewModal={showReviewModal}
        hideModal={hideReviewModal}
        reviewId={reviewId}
        handleDeleteTriggered={handleDeleteTriggered}
        setHandleDeleteTriggered={()=>setHandleDeleteTriggered(false)}
      />
      <ApproveReviewModal
        openModal={openApproveModal}
        showModal={showApproveModal}
        hideModal={hideApproveModal}
        reviewId={reviewId}
        reviewStatus={reviewStatus}
      />
    </AdminLayout>
  );
};

export default Reviews;
