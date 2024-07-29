/* eslint-disable @next/next/no-img-element */
"use client";
import Input from "@/components/input";
import { Form, Main, MainText } from "./styles";
import Toastify from "@/components/toastContainer";
import { useCallback, useEffect, useState } from "react";
import { getProfileData } from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  setProfileInputAction,
  updateProfileInputAction,
} from "@/actions/profileAction";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "@/firebase/firebaseConfig";
import { NOTIFICATION, getBase64, tostify } from "@/helper/helper";
import Navbar from "@/components/navbar";
import { Button, Image, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Profile = () => {
  const profileSelector = useSelector((state) => state.profile);
  const { profileInput } = profileSelector;
  const [isUpdateImage, setIsupdateImage] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setIsLoadData(true);
    try {
      const localFirebaseUserId = await localStorage.getItem("firebaseUserID");
      const profileData = await getProfileData(localFirebaseUserId);
      const { id, ...other } = profileData || {};
      await dispatch(setProfileInputAction(other));
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoadData(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onChangeFormInput = useCallback(
    (propsName, value) => {
      dispatch(updateProfileInputAction({ propsName, value }));
    },
    [dispatch]
  );

  const onClickImage = useCallback(() => {
    setIsupdateImage(true);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const localFirebaseUserId = localStorage.getItem("firebaseUserID");
        const profileRef = doc(database, "profile", localFirebaseUserId);
        await updateDoc(profileRef, profileInput);
        tostify(NOTIFICATION.SUCCESS, "Updated!");
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    },
    [profileInput]
  );

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    dispatch(
      updateProfileInputAction({
        propsName: "profile",
        value: fileList[0]?.thumbUrl || "",
      })
    );
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button">
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}>
        Upload Image
      </div>
    </button>
  );

  return (
    <>
      <Main>
        <Navbar
          isCart={false}
          isProfile={false}
          cartCounter={JSON.parse(localStorage.getItem("cartCounter")) ?? 0}
        />
        <>
          <MainText>Profile</MainText>
          {isLoadData && (
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginTop: "150px",
                marginLeft: "-75px",
                fontSize: 20,
              }}>
              Loading...
            </div>
          )}
          {!isLoadData && (
            <Form>
              <div style={{ marginLeft: "120px", height: "100px" }}>
                {!isUpdateImage && (
                  <img
                    src={profileInput?.profile}
                    style={{ cursor: "pointer" }}
                    alt="image"
                    className="profile"
                    height={100}
                    width={100}
                    onClick={onClickImage}></img>
                )}

                {isUpdateImage && (
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}>
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                )}
                {previewImage && (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
              <div style={{ marginTop: "30px" }}>
                <Input
                  label="First Name"
                  type="text"
                  placeholder="Enter first name"
                  value={profileInput?.firstName}
                  onChange={(e) =>
                    onChangeFormInput("firstName", e.target.value)
                  }
                />
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Enter last name"
                  value={profileInput?.lastName}
                  onChange={(e) =>
                    onChangeFormInput("lastName", e.target.value)
                  }
                />
                <Input
                  label="Phone"
                  type="number"
                  placeholder="Enter phone no."
                  value={profileInput?.phone}
                  onChange={(e) => onChangeFormInput("phone", e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "-800px",
                    marginTop: "20px",
                  }}>
                  <Button
                    title="Submit"
                    type="primary"
                    shape="round"
                    loading={isLoading}
                    disabled={isLoading}
                    onClick={onSubmit}>
                    Update
                  </Button>
                  <br />
                </div>
                <br />
              </div>
            </Form>
          )}
          <div
            style={{
              marginLeft: "800px",
              display: "flex",
              marginTop: "-1px",
            }}></div>
        </>
        <Toastify isNavbar={true} />
      </Main>
    </>
  );
};

export default Profile;
