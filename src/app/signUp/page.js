"use client";
import Input from "@/components/input";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Form, Main, MainText } from "./styles";
import { NOTIFICATION, getBase64, tostify } from "@/helper/helper";
import Toastify from "@/components/toastContainer";
import SVGImage from "@/components/svgImage";
import { signinFormValidation } from "@/validate/validate";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSignupFormInputAction,
  updateSignupFormInputAction,
} from "@/actions/authActions";
import { firebaseSignupService } from "@/services/authService";
import { Button, Checkbox } from "antd";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const SugnUp = () => {
  const authSelector = useSelector((state) => state.auth);
  const { signinFormInput } = authSelector;
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const errorMessage = signinFormValidation(signinFormInput);
        if (errorMessage) return;
        const result = firebaseSignupService(signinFormInput);
        if (result) {
          dispatch(clearSignupFormInputAction());
          setFileList([]);
        }
      } catch (error) {
        console.log("Authentication Error : ", error);
        return tostify(NOTIFICATION.ERROR, "Authentication Error!");
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, signinFormInput]
  );

  const onChangeFormInput = useCallback(
    (propsName, value) => {
      dispatch(updateSignupFormInputAction({ propsName, value }));
    },
    [dispatch]
  );

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    dispatch(
      updateSignupFormInputAction({ propsName: "profile", value: fileList })
    );
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Main>
      <>
        <MainText>Sign up</MainText>
        <Form>
          <h3 style={{ marginLeft: "90px" }}>Create your account</h3>
          <div style={{ marginLeft: "120px", height: "110px" }}>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-circle"
              fileList={fileList}
              showUploadList={{
                showPreviewIcon: false,
              }}
              onChange={handleChange}>
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
          <Input
            label="First Name"
            type="text"
            placeholder="Enter first name"
            value={signinFormInput?.firstName}
            onChange={(e) => onChangeFormInput("firstName", e.target.value)}
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            value={signinFormInput?.lastName}
            onChange={(e) => onChangeFormInput("lastName", e.target.value)}
          />
          <Input
            label="Phone"
            type="number"
            placeholder="Enter phone no."
            value={signinFormInput?.phone}
            onChange={(e) => onChangeFormInput("phone", e.target.value)}
          />
          <Input
            label="Email"
            type="text"
            placeholder="Enter email"
            value={signinFormInput?.email}
            onChange={(e) => onChangeFormInput("email", e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={signinFormInput?.password}
            onChange={(e) => onChangeFormInput("password", e.target.value)}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Enter confirm password"
            value={signinFormInput?.confirmPassword}
            onChange={(e) =>
              onChangeFormInput("confirmPassword", e.target.value)
            }
          />
          <Checkbox
            onChange={(e) => onChangeFormInput("checkBox", e.target.checked)}
            value={signinFormInput?.checkBox}>
            I have read & agree to the Terms and conditions
          </Checkbox>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "-800px",
              marginTop: "15px"
            }}>
            <Button
              type="primary"
              shape="round"
              loading={isLoading}
              disabled={isLoading}
              onClick={onSubmitForm}>Submit
            </Button>
            <br />
          </div>
          <br />
        </Form>
        <div
          style={{
            marginLeft: "800px",
            display: "flex",
            marginTop: "-5px",
          }}>
          <div style={{ fontSize: 20 }}>Already have an account?</div>
          <div style={{ marginLeft: "10px", fontSize: "20px" }}>
            <Link href={"/login"}>Login</Link>
          </div>
        </div>
        <SVGImage />
      </>
      <Toastify />
    </Main>
  );
};

export default SugnUp;
