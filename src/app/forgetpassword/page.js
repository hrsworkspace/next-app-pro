"use client";
import Button from "@/components/Button";
import Input from "@/components/input";
import Toastify from "@/components/toastContainer";
import { NOTIFICATION, isEmail, isEmpty, tostify } from "@/helper/helper";
import { sendforgetPasswordLink } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (isEmpty(email)) {
          tostify(NOTIFICATION.ERROR, "Please enter email!");
          return;
        } else if (!isEmail(email)) {
          tostify(NOTIFICATION.ERROR, "Please enter valid email!");
          return;
        }
        const result = await sendforgetPasswordLink(email);
        if (result) {
          tostify(NOTIFICATION.SUCCESS, "Password reset email sent");
          setEmail("");
          setTimeout(() => {
            router.push("/login");
          }, 4000);
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    [email, router]
  );

  return (
    <>
      <div
        style={{
          backgroundColor: "#FFD580",
          maxWidth: "100%",
          width: "100%  ",
          overflow: "auto",
          minHeight: "98vh",
        }}>
        <h1
          style={{
            marginTop: "200px",
            display: "flex",
            justifyContent: "center",
          }}>
          Forget password
        </h1>
        <form
          style={{
            display: "grid",
            justifyContent: "center",
            marginTop: "50px",
          }}
          onSubmit={onSubmit}>
          <Input
            label="Email"
            placeholder="Enter Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ marginLeft: "70px", gap: "40px", display: "flex" }}>
            <Button title="Login" onClick={() => router.push("/login")} />
            <Button title="Reset" type="submit" />
          </div>
        </form>
        <Toastify />
      </div>
    </>
  );
};

export default ForgetPassword;
