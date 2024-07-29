/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Main } from "./styles";
import { Divider, Image, Tooltip } from "antd";
import moment from "moment/moment";

export default function ProductDetail() {
  const params = useSearchParams();
  const paramsId = params.get("id");
  const [product, setProduct] = useState();

  const loadData = useCallback(() => {
    const productList = JSON.parse(localStorage.getItem("productList")) || [];
    const individualItem = productList?.filter((item) => item?.id === paramsId);
    setProduct({ ...individualItem[0] });
  }, [paramsId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <Main>
        <Image width={500} height={500} src={product?.image[0]?.thumbUrl} />
        <p>Product : {product?.productName}</p>
        <Divider style={{ margin: "5px 0" }} />
        <p>Category : {product?.category}</p>
        <Divider style={{ margin: "5px 0" }} />
        <p>Price : ₹ {product?.price}</p> 
        <Divider style={{ margin: "5px 0" }} />
        <Tooltip
          placement="bottom"
          title={moment(product?.created_at).format("DD MMMM YYYY, h:mm:ss A")}>
          <p>Created At : {moment(product?.created_at).format("DD/MM/YYYY")}</p>
        </Tooltip>
      </Main>
    </>
  );
}
