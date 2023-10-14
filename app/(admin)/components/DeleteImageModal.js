import { useState } from "react";
import { Button, Modal, Divider, Row, Col } from "antd";
import localFont from "next/font/local";
import axios from "axios";

const poppins = localFont({
  src: [
    {
      path: "../../../public/fonts/poppins/Poppins-Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/poppins/Poppins-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const DeleteImageModal = ({
  hideModal,
  openModal,
  id,
  name,
  triggerHandleConfirmed,
}) => {
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);

  const handleOk = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/admin/images?id=${id}&imageName=${name}`);
      setLoading(false);
      hideModal();
      triggerHandleConfirmed();
      setInputValue("");
      setDisabledBtn(true);
      setInputValue("");
    } catch (err) {
      console.error(err);
    }
  };
  const handleCancel = () => {
    setInputValue("");
    setDisabledBtn(true);
    hideModal();
  };

  const handlePreventSubmit = () => {
    console.log("Cant Submit");
    return null;
  };

  const handleChange = (e) => {
    setInputValue(e?.target?.value);
    const confirmInput = e.target.value;
    if (confirmInput === "delete-image") {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  return (
    <>
      <Modal
        open={openModal}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
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
                  Delete
                </Button>
              </Col>
            </Row>
          </div>,
        ]}
      >
        <div className={`${poppins.className}`}>
          <h4 className="font-bold text-[20px] mb-3 text-green-500">
            Delete Image
          </h4>
          <p className={`text-[16px]`}>
            Image <span className="font-bold">{name}</span> will be permanently
            deleted
          </p>
          <p className="my-2 bg-red-400 px-2 py-3 rounded-sm bg-opacity-40 text-red-800">
            <span className="text-red-800 font-bold">Warning:</span> This action
            is irreversible. Please be certain
          </p>
          <Divider className="bg-green-500 " />
          <div className="mb-6">
            <div className="flex flex-col space-y-1">
              <label className="text-[16px]">
                Enter <span className="font-bold italic">delete-image</span>{" "}
                below to confirm
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

export default DeleteImageModal;
