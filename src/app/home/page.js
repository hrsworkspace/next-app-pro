/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { CardDiv, Main } from "./styles";
import Toastify from "@/components/toastContainer";
import { useCallback, useEffect, useState } from "react";
import { isEmpty } from "@/helper/helper";
import Image from "next/image";
import addToCart from "../../../public/assets/images/addToCart.svg";
import Navbar from "@/components/navbar";
import { Badge, Button, Card, Carousel, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from "react-redux";
import { setProductList } from "@/actions/productActions";

export default function HomePage({ details }) {
  const productSelector = useSelector((state) => state.product);
  const { productList } = productSelector;
  const [isLogein, setisLogin] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const cartCounter = productList.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.cart;
  }, 0);

  const loadData = useCallback(async () => {
    const auth = JSON.parse(localStorage.getItem("current_user")) ?? {};
    const product = JSON.parse(localStorage.getItem("productList")) ?? [];
    dispatch(setProductList(product));
    if (isEmpty(auth?.email)) {
      setisLogin(false);
      router.push("/login");
    } else {
      setisLogin(true);
    }
  }, [dispatch, router]);

  useEffect(() => {
    loadData();
    setSearchResult(productList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData]);

  const onClickDelete = useCallback((e, item) => {
    e.stopPropagation();
    setIsDeleteModel(true);
    setProduct(item);
  }, []);

  const onClickOk = useCallback(() => {
    setLoading(true);
    try {
      const currentindex = productList?.findIndex((x) => x.id === product?.id);
      let listData;
      if (currentindex !== -1) {
        const ref = JSON.parse(JSON.stringify(productList));
        ref.splice(currentindex, 1);
        listData = ref;
      }
      localStorage.setItem("productList", JSON.stringify(listData));
      dispatch(setProductList(listData));
      setIsDeleteModel(false);
      localStorage.setItem("cartCounter", cartCounter - product?.cart);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [cartCounter, dispatch, product?.cart, product?.id, productList]);

  const onClickCancel = () => {
    setIsDeleteModel(false);
  };

  const onClickEditItem = useCallback(
    (e, id) => {
      e.stopPropagation();
      router.push(`addItem?id=${id}`);
    },
    [router]
  );

  const onClickAddToCart = useCallback(
    async (e, index) => {
      e.stopPropagation();
      const productList = JSON.parse(localStorage.getItem("productList")) ?? [];
      const updatedProduct = {
        ...productList[index],
        cart: (productList[index]?.cart || 0) + 1,
      };
      productList[index] = updatedProduct;
      dispatch(setProductList(productList));
      localStorage.setItem("productList", JSON.stringify(productList));
      localStorage.setItem("cartCounter", cartCounter + 1);
    },
    [cartCounter, dispatch]
  );

  const searchQuery = useCallback(
    (value) => {
      const result = productList?.filter((item) =>
        item?.productName.toLowerCase().includes(value?.toLowerCase())
      );
      if (isEmpty(value)) setSearchResult(productList);
      else setSearchResult(result);
      return null;
    },
    [productList]
  );

  const onChangeSearch = useCallback(
    (value) => {
      let timeout;
      if (!isEmpty(value)) {
        if (!isSearch) setIsSearch(true);
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          searchQuery(value);
        }, 300);
      } else {
        if (isSearch) setIsSearch(false);
        searchQuery(value);
      }
    },
    [isSearch, searchQuery]
  );

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
                }
                actions={[
                  <Button
                    key="button1"
                    onClick={(e) => onClickEditItem(e, item?.id)}>
                    Edit
                  </Button>,
                  <Button key="button2" onClick={(e) => onClickDelete(e, item)}>
                    Delete
                  </Button>,
                ]}>
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
                    <div onClick={(e) => onClickAddToCart(e, index, item)}>
                      <Badge count={item?.cart} size="2" color="#ff66ff">
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
            {/* <Container key={`product_${index}`}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#CC99FF",
                  height: "100%",
                }}>
                <div
                  style={{
                    marginLeft: "150px",
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                  onClick={onClickAddToCart}>
                  <Image src={addToCart} alt="image" width={32} height={32} />
                </div>
                <div>
                  <h2>Product - {item?.productName}</h2>
                  <h3>Category - {item?.category}</h3>
                  <h4>Price - {item?.price}</h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 15,
                  }}>
                  <ButtonDiv
                    style={{ cursor: "pointer" }}
                    onClick={() => onClickEditItem(index)}>
                    Edit
                  </ButtonDiv>
                  <ButtonDiv
                    style={{ cursor: "pointer" }}
                    onClick={() => onClickDelete(item?.productName)}>
                    Delete
                  </ButtonDiv>
                </div>
              </div>
            </Container> */}
          </>
        );
      });
    },
    [onClickAddToCart, onClickDelete, onClickEditItem, onClickProduct]
  );

  return (
    <>
      {isLogein && (
        <>
          <Main>
            <Navbar
              cartCounter={cartCounter}
              onChangeSearch={(value) => onChangeSearch(value)}
              isCart={false}
              isProfile={true}
              isAddItem={true}
              isSearch={true}
            />
            <Carousel
              autoplay
              fade
              dotPosition={"bottom"}
              style={{ marginTop: "70px" }}>
              {details?.map((item) => {
                return (
                  <>
                    <div>
                      <Image
                        src={item?.sliderUrl}
                        alt="image1"
                        height={300}
                        width={2000}></Image>
                    </div>
                  </>
                );
              })}
            </Carousel>

            <CardDiv>
              {productList?.length > 0 ? (
                isSearch ? (
                  searchResult?.length > 0 ? (
                    renderData(searchResult)
                  ) : (
                    <p className="empty-state">
                      There is no searched product available
                    </p>
                  )
                ) : (
                  renderData(productList)
                )
              ) : (
                <p className="empty-state">There is no product available</p>
              )}
            </CardDiv>
            <Toastify />
            <Modal
              title="Delete Product"
              width={400}
              height={200}
              centered
              confirmLoading={loading}
              open={isDeleteModel}
              onOk={onClickOk}
              onCancel={onClickCancel}>
              <p>
                Are You Sure! You want to delete {product?.productName} item!
              </p>
            </Modal>
          </Main>
        </>
      )}
    </>
  );
}
