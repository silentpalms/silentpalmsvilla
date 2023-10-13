"use client";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import ImagesUpload from "../../components/ImagesUpload";
import axios from "axios";

import { useState, useEffect } from "react";

const page = () => {
  const [coverImages, setCoverImages] = useState([]);
  const [accomodationImages, setAccomodationImages] = useState([]);

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
            coverImageArrays.push(image.imageUrls[0].url.toString());
          });

          setCoverImages(coverImageArrays);
        }
        const response = await axios.get("/api/admin/images");

        let accomodationImages = response.data.images.filter(
          (image) => image.imageDetails[0].name === "Accomodations"
        );

        if (accomodationImages.length > 0) {
          let imageUrls = accomodationImages[0].imageDetails[0].imageUrls;
          let accomodationImageArrays = [];
          imageUrls.forEach((image) => {
            accomodationImageArrays.push(image.imageUrls[0].url.toString());
          });

          setAccomodationImages(accomodationImageArrays);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchImages();
  }, []);
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
            <div className="mt-8 -ml-2">
              <ImagesUpload
                name="Accomodations"
                images={accomodationImages}
                cloudname="silentpalms"
                uploadpreset="accomodations"
              />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
