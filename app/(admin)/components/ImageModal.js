"use client";
import { useState } from "react";
import { Button, Modal, Divider, Row, Col } from "antd";
import localFont from "next/font/local";
import axios from "axios";

const poppins = localFont({
  src: [
    {
      path: "../../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "100",
      style: "normal",
    },
  ],
});

const ImageModal = ({
  hideImageModal,
  openModal,
  resetDetails,
  imageDetails,
}) => {
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [imageName, setImageName] = useState("");

  const handleOk = async () => {
    setLoading(true);
    try {
      let details = {
        name: imageDetails[0].name,
        imageUrls: [
          {
            imageName: imageName,
            url: imageDetails[0].imageUrls,
          },
        ],
      };

      const data = await axios.post("/api/admin/images", details);
      if (data.statusText === "OK") {
        resetDetails();
        setLoading(false);
        hideImageModal();
        setInputValue("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePreventSubmit = () => {
    console.log("Cant Submit");
    return null;
  };

  const handleCancel = () => {
    setLoading(false);
    hideImageModal();
  };

  const handleChange = (e) => {
    setInputValue(e?.target?.value);
    const confirmInput = e.target.value;
    if (!confirmInput) {
      setDisabledBtn(true);
    } else {
      setImageName(confirmInput);
      setDisabledBtn(false);
    }
  };

  return (
    <>
      <Modal
        open={openModal}
        centered
        onOk={handleOk}
        onCancel={hideImageModal}
        footer={[
          <div>
            <Row>
              <Col span={12}>
                <Row>
                  <Button
                    className="bg-transparent border border-gray-400 rounded-none text-black w-[100px]"
                    key="back"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Row>
              </Col>
              <Col span={12}>
                <Button
                  className={`bg-red-500 border-none rounded-none text-white w-[100px] ${
                    disabledBtn
                      ? "disabled cursor-not-allowed bg-slate-400"
                      : ""
                  }`}
                  key="submit"
                  loading={loading}
                  onClick={disabledBtn ? handlePreventSubmit : handleOk}
                >
                  Upload
                </Button>
              </Col>
            </Row>
          </div>,
        ]}
      >
        <div className={`${poppins.className}`}>
          <h4 className="font-bold text-[20px] mb-3 text-green-500">
            Upload Image
          </h4>
          <p className={`text-[16px]`}>This Image will be uploaded</p>
          <p className="my-2 bg-red-400 px-2 py-3 rounded-sm bg-opacity-40 text-red-800">
            You are about to upload an image to the database
          </p>
          <Divider className="bg-green-500 " />
          <div className="mb-6">
            <div className="flex flex-col space-y-1">
              <label className="text-[16px]">
                Enter the name of the image e.g{" "}
                <span className="font-light italic">Kitchen</span> below to
                confirm
              </label>
              <input
                type="text"
                className="py-2 px-2 border border-gray-300 rounded-sm outline-none"
                value={inputValue}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
