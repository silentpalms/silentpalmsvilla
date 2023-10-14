"use client";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import ImagesUpload from "../../components/ImagesUpload";
import axios from "axios";
import { Image } from "antd";
import { useState, useEffect } from "react";
import { Space } from "antd";
import DeleteImageModal from "../../components/DeleteImageModal";

const page = () => {
  const [coverImages, setCoverImages] = useState([]);
  const [accomodationImages, setAccomodationImages] = useState([]);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [handleConfirmedTriggered, setHandleConfirmedTriggered] =
    useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleDeleteImage = (name, id) => {
    console.log(name, id);
    setOpenImageModal(true);
    setName(name);
    setId(id);
  };

  const hideModal = () => {
    setOpenImageModal(false);
    setName("");
    setId("");
  };

  const triggerHandleConfirmed = () => {
    setHandleConfirmedTriggered(true);
  };

  // const handleDeleteCover = async (name) => {
  //   const coverId = "6528b99742953e2832920fc5";
  //   try {
  //     const res = await axios.delete(
  //       `/api/admin/images?id=${coverId}&imageName=${name}`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleDeleteAccomodation = async (name) => {
  //   const accomodationId = "652968bb03e8325f2af1c141";
  //   try {
  //     const res = await axios.delete(
  //       `/api/admin/images?id=${accomodationId}&imageName=${name}`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("/api/admin/images");

        let coverImages = res.data.images.filter(
          (image) => image.imageDetails[0].name === "Cover"
        );

        if (coverImages.length > 0) {
          let imageUrls = coverImages[0].imageDetails[0].imageUrls;
          let coverImageArrays = [];
          imageUrls.forEach((image) => {
            coverImageArrays.push({
              name: image.imageUrls[0].imageName,
              url: image.imageUrls[0].url.toString(),
            });
          });

          setCoverImages(coverImageArrays);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (handleConfirmedTriggered) {
      setHandleConfirmedTriggered(false);
    }
    fetchImages();
  }, [handleConfirmedTriggered]);
  useEffect(() => {
    const fetchAccomodationImages = async () => {
      try {
        const response = await axios.get("/api/admin/images");

        let accomodationImages = response.data.images.filter(
          (image) => image.imageDetails[0].name === "Accomodations"
        );

        if (accomodationImages.length > 0) {
          let imageUrls = accomodationImages[0].imageDetails[0].imageUrls;
          let accomodationImageArrays = [];
          imageUrls.forEach((image) => {
            accomodationImageArrays.push({
              name: image.imageUrls[0].imageName,
              url: image.imageUrls[0].url.toString(),
            });
          });

          setAccomodationImages(accomodationImageArrays);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (handleConfirmedTriggered) {
      setHandleConfirmedTriggered(false);
    }
    fetchAccomodationImages();
  }, [handleConfirmedTriggered]);
  return (
    <div className="h-full bg-white px-4 py-8">
      <h1 className="font-bold text-lg md:text-3xl mb-3 md:mb-12">
        Edit Frontend Images
      </h1>
      <div>
        <Tabs
          aria-label="Image tabs"
          defaultValue={0}
          orientation="horizontal"
          size="sm"
        >
          <TabList>
            <Tab variant="outlined" color="success">
              HOME
            </Tab>
            <Tab variant="outlined" color="success">
              ACCOMODATIONS
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <div className="-ml-5 mt-8">
              <Image.PreviewGroup>
                {coverImages.map((image, index) => {
                  return (
                    <Space size={8} key={index}>
                      {" "}
                      <div className="flex flex-col gap-2 mb-5">
                        <Image
                          key={index}
                          width={180}
                          height={180}
                          src={image.url}
                          className=" mb-2 object-cover rounded-md "
                        />
                        <button
                          className="px-2 w-[100px] mx-auto py-2 bg-black text-white rounded-lg"
                          onClick={() =>
                            handleDeleteImage(
                              image.name,
                              "6528b99742953e2832920fc5"
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </Space>
                  );
                })}
              </Image.PreviewGroup>
            </div>
            <div className="mt-8 -ml-2">
              <ImagesUpload
                name="Cover"
                images={coverImages}
                cloudname="silentpalms"
                uploadpreset="silentpalms"
              />
            </div>
          </TabPanel>
          <TabPanel value={1}>
            <div className="-ml-5 mt-8">
              <Image.PreviewGroup>
                {accomodationImages.map((image, index) => {
                  return (
                    <Space size={8} key={index}>
                      {" "}
                      <div className="flex flex-col gap-2 mb-5">
                        <Image
                          key={index}
                          width={180}
                          height={180}
                          src={image.url}
                          className=" mb-2 object-cover rounded-md "
                        />
                        <button
                          className="px-2 w-[100px] mx-auto py-2 bg-black text-white rounded-lg"
                          onClick={() =>
                            handleDeleteImage(
                              image.name,
                              "652968bb03e8325f2af1c141"
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </Space>
                  );
                })}
              </Image.PreviewGroup>
            </div>
            <div className="mt-8 -ml-2">
              <ImagesUpload
                name="Accomodations"
                cloudname="silentpalms"
                uploadpreset="accomodations"
                images={accomodationImages}
              />
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <DeleteImageModal
        hideModal={hideModal}
        openModal={openImageModal}
        name={name}
        id={id}
        triggerHandleConfirmed={triggerHandleConfirmed}
      />
    </div>
  );
};

export default page;
