import { useState } from "react";
import { Button, Modal, Row, Col } from "antd";
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

const ApproveReviewModal = ({
  hideModal,
  openModal,
  reviewId,
  reviewStatus,
}) => {
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [disabledBtn, setDisabledBtn] = useState(true);

  const handleOk = async () => {
    setLoading(true);

    const details = {
      reviewStatus,
    };
    try {
      await axios.put(`/api/reviews?id=${reviewId}`, details);
      setLoading(false);
      hideModal();
      setDisabledBtn(true);
      setIsChecked(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePreventSubmit = () => {
    console.log("Cant Submit");
    return null;
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    setDisabledBtn(isChecked);
  };

  const handleCancel = () => {
    setIsChecked(false);
    setDisabledBtn(true);
    hideModal();
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
                  className={`bg-green-500 border-none rounded-none text-white ${
                    disabledBtn
                      ? "disabled cursor-not-allowed bg-slate-400"
                      : ""
                  }`}
                  key="submit"
                  loading={loading}
                  onClick={disabledBtn ? handlePreventSubmit : handleOk}
                >
                  {reviewStatus === "Approved" ? (
                    <>Mark as Pending</>
                  ) : (
                    <>Approve</>
                  )}
                </Button>
              </Col>
            </Row>
          </div>,
        ]}
      >
        <div className={`${poppins.className}`}>
          <h4 className="font-bold text-[20px] mb-3 text-green-500">
            {reviewStatus === "Pending" ? (
              <>Approve Review</>
            ) : (
              <>Mark Review as Pending</>
            )}
          </h4>
          <p
            className={`text-[16px] pb-3 mb-3 border-b-[0.8px] border-green-500`}
          >
            {reviewStatus === "Pending" ? (
              <>
                This Review will be approved and sent to the frontend as a
                testimonial
              </>
            ) : (
              <>
                This Review will no longer appear on the frontend as a
                testimonial
              </>
            )}
          </p>

          <div className="mb-6">
            <div className="flex space-x-2 items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label>
                {reviewStatus === "Pending" ? (
                  <>I acknowledge that this review should be approved</>
                ) : (
                  <>
                    I acknowledge that this review should be marked as pending
                  </>
                )}
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ApproveReviewModal;
