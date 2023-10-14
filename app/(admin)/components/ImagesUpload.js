import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import ImageModal from "./ImageModal";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const ImagesUpload = ({ name, images, cloudname, uploadpreset }) => {
  console.log(images);
  let imageList;

  imageList = images?.map((image, index) => {
    return {
      uid: index,
      name: "image.png",
      status: "done",
      url: image,
    };
  });

  console.log(imageList);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(imageList);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageDetails, setImageDetails] = useState([
    {
      name,
      imageUrls: [],
    },
  ]);

  const cloudName = cloudname;
  const uploadPreset = uploadpreset;

  const resetDetails = () => {
    setImageDetails((prevImageDetails) => [
      {
        ...prevImageDetails[0],
        imageUrls: [],
      },
    ]);
  };

  const showImageModal = () => {
    setOpenImageModal(true);
  };

  const hideImageModal = () => {
    setOpenImageModal(false);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  // Define the custom request function
  const handlePostImage = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);

    // Include the Cloudinary upload preset in the form data
    formData.append("upload_preset", uploadPreset); // Replace with your actual upload preset name

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImageDetails((prevImageDetails) => [
        {
          ...prevImageDetails[0],
          imageUrls: [...prevImageDetails[0].imageUrls, data.secure_url],
        },
      ]);

      try {
        showImageModal();
      } catch (error) {
        console.log(error);
      }
      // Notify Ant Design Upload component of the successful upload
      onSuccess(response, file);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Notify Ant Design Upload component of the error
      onError(error, file);
    }
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        customRequest={handlePostImage}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
      <ImageModal
        openModal={openImageModal}
        hideImageModal={hideImageModal}
        imageDetails={imageDetails}
        resetDetails={resetDetails}
      />
    </>
  );
};
export default ImagesUpload;
