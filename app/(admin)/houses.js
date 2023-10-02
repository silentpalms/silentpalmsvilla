import axios from "axios";
import { useEffect, useState, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { Spin, notification } from "antd";

import HorizontalAccordion from "@/components/HorizontalAccordion";
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

const GetHouses = () => {
  const [houses, setHouses] = useState([]);
  const [open, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [noOfGuests, setnoOfGuests] = useState("");
  const [roomType, setRoomType] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const fileInputRef = useRef(null);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "Success",
      description: "House has been posted successfully",
      className: "custom-class",
      style: {
        width: 300,

        color: "green",
      },
    });
  };

  const handleImageChange = (event) => {
    const files = event.target.files;

    const imagesArray = Array.from(files);
    setSelectedImages(imagesArray);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!disabled) {
      setDisabled(true);
      setLoading(true);
      const cloudName = "isadia94";
      const uploadPreset = "silentpalms";

      const imageUrls = [];

      for (const image of selectedImages) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", uploadPreset);

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          imageUrls.push(data.secure_url);
        } catch (error) {
          console.error("Error uploading data:", error);
        }
      }

      console.log("Uploaded images:", imageUrls);

      try {
        const formDataWithImage = {
          imageUrls,
          title,
          amount,
          description,
          noOfGuests,
          roomType,
        };
        await axios.post("/api/addHouse", formDataWithImage);
        setLoading(false);
        setSuccess(true);

        openNotification();
        setTimeout(() => {
          setDisabled(false);
          setSuccess(false);
        }, 2000);
        setSelectedImages([]);
        fileInputRef.current.value = null;
        console.log("Posted succesfully");
      } catch (error) {
        alert("Error posting to database");
      }
    } else {
      console.log("cannot submit");
      return null;
    }
  };

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        await axios.get(`/api/getHouses`).then((res) => {
          setHouses(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchHouses();
  }, []);
  return (
    <AdminLayout open={open} setIsOpen={setIsOpen}>
      {contextHolder}
      {!open && (
        <div
          className={`${poppins.className} md:py-14 md:pl-[230px] md:pr-[30px] py-6 px-4 bg-gray-50 h-full w-screen md:-ml-[200px] `}
        >
          <div>
            <h1 className="font-bold text-xl  uppercase">Houses</h1>
          </div>

          <div>
            {houses.map((house) => {
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
      )}
    </AdminLayout>
  );
};

export default GetHouses;
