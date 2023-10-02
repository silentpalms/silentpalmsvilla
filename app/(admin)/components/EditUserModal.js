import { useEffect, useState } from "react";
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

const EditUserModal = ({
  hideModal,
  openModal,
  userId,
  formName,
  formEmail,
  roles,
}) => {
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState(formEmail);
  const [editedRoles, setEditedRoles] = useState(roles);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const handleOk = async () => {
    setLoading(true);

    try {
      const details = {
        userName: formName.length > 0 ? formName : editedName,
      };
      await axios.put(`/api/admin/users?id=${userId}`, details);
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
                  Edit User
                </Button>
              </Col>
            </Row>
          </div>,
        ]}
      >
        <div className={`${poppins.className}`}>
          <h4 className="font-bold text-[20px] mb-3 text-green-500">
            Edit User
          </h4>
          <p
            className={`text-[16px] pb-3 mb-3 border-b-[0.8px] border-green-500`}
          >
            The Details of this User will be Edited
          </p>

          <div className="mb-6">
            <div className="mb-2 flex flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <label>User Name</label>
                <p>{formName}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <label>Email</label>
                <p>{formEmail}</p>
              </div>
              <div className="flex flex-col space-y-1 pb-4 border-b-[0.8px] border-green-500">
                <h4>Roles</h4>
                <div className="flex items-center justify-between w-full">
                  <div className="flex space-x-2 items-center">
                    <input type="checkbox" />
                    <label>Admin</label>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <input type="checkbox" />
                    <label>Manager</label>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <input type="checkbox" />
                    <label>Moderator</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 items-center pt-3">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label>I acknowledge that this user should be edited</label>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditUserModal;
