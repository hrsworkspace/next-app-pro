"use client";
import Input from "@/components/input";
import React, { useCallback, useState } from "react";
import { Form, Main, MainText } from "./styles";
import Link from "next/link";
import Toastify from "@/components/toastContainer";
import { loginFormValidation } from "@/validate/validate";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLoginFormInputAction,
  updateLoginFormInputAction,
} from "@/actions/authActions";
import { firebaseLoginService } from "@/services/authService";
import { Button } from "antd";

const Login = () => {
  const authselector = useSelector((state) => state.auth);
  const { loginFormInput } = authselector;
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();
      setisLoading(true);
      try {
        const errorMessage = loginFormValidation(loginFormInput);
        if (errorMessage) return;
        const result = await firebaseLoginService(loginFormInput);
        if (result) {
          dispatch(clearLoginFormInputAction());
          setTimeout(() => {
            router.push("/");
            setisLoading(false);
          }, [4000]);
        }
      } catch (error) {
        console.log("error", error);
        setisLoading(false);
      }
    },
    [dispatch, loginFormInput, router]
  );

  const onChangeFormInput = useCallback(
    (propsName, value) => {
      dispatch(updateLoginFormInputAction({ propsName, value }));
    },
    [dispatch]
  );

  return (
    <Main>
      <MainText>Login</MainText>
      <Form>
        <Input
          label="Email"
          placeholder="Enter Email"
          type="text"
          value={loginFormInput?.email}
          onChange={(e) => onChangeFormInput("email", e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={loginFormInput?.password}
          onChange={(e) => onChangeFormInput("password", e.target.value)}
        />
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginLeft: "-700px",
            gap: "10px",
          }}>
          <Button
            title="Submit"
            type="primary"
            shape="round"
            loading={isLoading}
            disabled={isLoading}
            onClick={onSubmitForm}>
            Submit
          </Button>
          <br /> <br />
          <Link href={"/forgetpassword"}>Forget password?</Link>
        </div>
        <div style={{ marginLeft: "5px", display: "flex" }}>
          <div style={{ fontSize: 20 }}>Don’t have an account?</div>
          <div style={{ marginLeft: "10px", fontSize: "20px" }}>
            <Link href={"/signUp"}>Sign up</Link>
          </div>
        </div>
      </Form>
      <Toastify />
    </Main>
  );
};

export default Login;
