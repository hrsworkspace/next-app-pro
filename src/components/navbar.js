import React from "react";
import { useRouter } from "next/navigation";
import { Main } from "./componentStyles";
import { useCallback } from "react";
import { Badge, Button, Input, Tooltip } from "antd";
import Image from "next/image";
import arrow from "../../public/assets/images/right_arrow.svg";
import addToCart from "../../public/assets/images/addToCart.svg";
import profile from "../../public/assets/images/profile.png";

export default function Navbar(props) {
  const { Search } = Input;
  const router = useRouter();

  const onClickLogout = useCallback(() => {
    localStorage.clear();
    router.push("/login");
  }, [router]);

  return (
    <Main>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 50,
          alignItems: "center",
        }}>
        <p style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Next-App
        </p>

        {props.isAddItem && (
          <Button type="primary" onClick={() => router.push("/addItem")}>
            Add Item
          </Button>
        )}
        {props.isSearch && (
          <Search
            placeholder="search"
            style={{ width: 500 }}
            onChange={(e) => props.onChangeSearch(e.target.value)}
          />
        )}
      </div>
      {props.isCart && <h2>Cart</h2>}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 30,
          alignItems: "center",
          padding: "32px",
        }}>
        {props.isProfile && (
          <Tooltip placement="bottom" title={"profile"}>
            <Image
              src={profile}
              alt="image"
              width={27}
              height={27}
              onClick={() => router.push("/profile")}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        )}
        {!props.isCart && (
          <Tooltip placement="bottom" title={"Cart"}>
            <div
              style={{
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateX(5px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateX(0)";
              }}
              onClick={() => router.push("/cart")}>
              <h3
                style={{
                  marginLeft: "10px",
                  borderRadius: "50%",
                  borderColor: "black",
                }}>
                <Badge count={props.cartCounter} size="2" color="#ff66ff">
                  <Image src={addToCart} alt="image" width={25} height={25} />
                </Badge>
                <Image src={arrow} alt="arrow" width={12} height={12} />
              </h3>
            </div>
          </Tooltip>
        )}
        <div
          style={{
            backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "25px",
            cursor: "pointer",
            borderRadius: "50%",
            height: "50px",
            width: "70px",
          }}
          onClick={onClickLogout}>
          Logout
        </div>
      </div>
    </Main>
  );
}
