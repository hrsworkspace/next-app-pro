"use client";
import { setProductList } from "@/actions/productActions";
import Navbar from "@/components/navbar";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardDiv, Main } from "./styles";
import { Badge, Card } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import addToCart from "../../../public/assets/images/addToCart.svg";
import Meta from "antd/es/card/Meta";

const Cart = () => {
  const productSelector = useSelector((state) => state.product);
  const { productList } = productSelector;
  const dispatch = useDispatch();
  const router = useRouter();

  const loadData = useCallback(() => {
    const products = JSON.parse(localStorage.getItem("productList")) ?? [];
    const cartProductList = products?.filter((item) => item?.cart > 0);
    dispatch(setProductList(cartProductList));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onClickProduct = useCallback(
    (id) => {
      router.push(`/productDetail?id=${id}`);
    },
    [router]
  );

  const renderData = useCallback(
    (data) => {
      return data?.map((item, index) => {
        return (
          <>
            <div
              key={`card_${index}`}
              style={{ marginBottom: "20px", padding: "10px" }}>
              <Card
                style={{
                  width: 295,
                  backgroundColor: "#E0E0E0",
                }}
                onClick={() => onClickProduct(item?.id)}
                hoverable
                cover={
                  <img
                    height={250}
                    alt="example"
                    src={item?.image[0]?.thumbUrl}
                  />
                }>
                <Meta
                  title={
                    <div style={{ textAlign: "center" }}>
                      {item?.productName}
                    </div>
                  }
                  description={
                    <div style={{ textAlign: "center" }}>{item?.category}</div>
                  }
                  avatar={
                    <div>
                      <Badge
                        count={item?.cart}
                        size="2"
                        color="#ff66ff"
                        onClick={(e) => e.stopPropagation()}>
                        <Image
                          src={addToCart}
                          alt="image"
                          width={32}
                          height={32}
                        />
                      </Badge>
                    </div>
                  }
                />
              </Card>
            </div>
          </>
        );
      });
    },
    [onClickProduct]
  );

  return (
    <>
      <Main>
        <Navbar
          isCart={true}
          isProfile={true}
          cartCounter={JSON.parse(localStorage.getItem("cartCounter")) ?? 0}
        />
        <CardDiv>
          {productList?.length > 0 ? (
            renderData(productList)
          ) : (
            <p className="empty-state">There is no product available</p>
          )}
        </CardDiv>
      </Main>
    </>
  );
};

export default Cart;
