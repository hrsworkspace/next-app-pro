/* eslint-disable @next/next/no-img-element */
"use client";
import {
  updateItemInputAction,
  clearItemInputAction,
  addItemInputAction,
} from "@/actions/productActions";
import Input from "@/components/input";
import Toastify from "@/components/toastContainer";
import { NOTIFICATION, getBase64, isEmpty, tostify } from "@/helper/helper";
import { addItemFormvalidation } from "@/validate/validate";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Div, Main } from "./styles";
import { Button, Image, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import Navbar from "@/components/navbar";

export default function AddItem() {
  const productSelector = useSelector((state) => state.product);
  const { addItemInput } = productSelector;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const params = useSearchParams();
  const [isUpdateImage, setIsupdateImage] = useState(false);
  const paramsId = params.get("id");
  const dispatch = useDispatch();
  const router = useRouter();
  const currentuser = localStorage.getItem("current_user");

  const loadData = useCallback(() => {
    if (isEmpty(paramsId)) setIsupdateImage(true);
    const productList = JSON.parse(localStorage.getItem("productList")) || [];
    if (!isEmpty(paramsId)) {
      if (productList?.length > 0) {
        const EditableItem = productList?.filter(
          (item) => item?.id === paramsId
        );
        dispatch(addItemInputAction({ ...EditableItem[0] }));
      }
    }
  }, [dispatch, paramsId]);

  useEffect(() => {
    loadData();
    return () => dispatch(clearItemInputAction());
  }, [dispatch, loadData]);

  const onChangeInputForm = useCallback(
    (propsName, value) => {
      const uniqueId = nanoid();
      dispatch(updateItemInputAction({ propsName, value }));
      dispatch(updateItemInputAction({ propsName: "id", value: uniqueId }));
    },
    [dispatch]
  );

  const onClickAddItem = useCallback(() => {
    const errorMessage = addItemFormvalidation(addItemInput);
    if (errorMessage) return;
    const dataArray = JSON.parse(localStorage.getItem("productList")) || [];
    if (dataArray?.length > 0) {
      let data = dataArray;
      data?.push({
        ...addItemInput,
        created_by: currentuser?.name,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem("productList", JSON.stringify(data));
    } else {
      localStorage.setItem(
        "productList",
        JSON.stringify([
          {
            ...addItemInput,
            created_by: currentuser?.name,
            created_at: new Date().toISOString(),
          },
        ])
      );
    }
    dispatch(clearItemInputAction());
    setFileList([]);
    tostify(NOTIFICATION.SUCCESS, "Added!");
  }, [addItemInput, currentuser?.name, dispatch]);

  const onClickUpdateItem = useCallback(async () => {
    const productList = JSON.parse(localStorage.getItem("productList")) || [];
    const updatedData = productList?.map((item) => {
      if (item?.id === paramsId) {
        return addItemInput;
      } else {
        return item;
      }
    });
    dispatch(clearItemInputAction());
    setIsupdateImage(true);
    setFileList([]);
    tostify(NOTIFICATION.SUCCESS, "Updated!");
    localStorage.setItem("productList", JSON.stringify(updatedData));
  }, [addItemInput, dispatch, paramsId]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    dispatch(
      updateItemInputAction({
        propsName: "image",
        value: fileList,
      })
    );
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

  const onClickImage = useCallback(() => {
    if (!isEmpty(paramsId)) {
      setIsupdateImage(true);
    } else setIsupdateImage(false);
  }, [paramsId]);

  return (
    <>
      <Main>
        <Navbar
          isProfile={true}
          isCart={false}
          cartCounter={JSON.parse(localStorage.getItem("cartCounter")) ?? 0}
        />
        <Div>
          <h1 style={{ marginLeft: "120px" }}>Add Item</h1>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100px",
              }}>
              {!isUpdateImage && (
                <img
                  src={addItemInput?.image[0]?.thumbUrl}
                  alt="image"
                  height={100}
                  width={100}
                  onClick={onClickImage}></img>
              )}
              {isUpdateImage && (
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}>
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              )}
            </div>
            {previewImage && (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>
          <br />
          <Input
            type="text"
            label="Product Name"
            value={addItemInput?.productName}
            onChange={(e) =>
              onChangeInputForm("productName", e.target.value)
            }></Input>
          <br />
          <Input
            type="text"
            label="Product Category"
            value={addItemInput?.category}
            onChange={(e) =>
              onChangeInputForm("category", e.target.value)
            }></Input>
          <br />
          <Input
            type="number"
            value={addItemInput?.price}
            label="Price"
            onChange={(e) =>
              onChangeInputForm("price", e.target.value)
            }></Input>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
            {!isEmpty(paramsId) ? (
              <Button
                title="Submit"
                type="primary"
                shape="round"
                onClick={onClickUpdateItem}>
                Update
              </Button>
            ) : (
              <Button
                title="Submit"
                type="primary"
                shape="round"
                onClick={onClickAddItem}>
                Add Item
              </Button>
            )}
            {/* <Button title="Home" onClick={onClickHome} /> */}
          </div>
          <Toastify isNavbar={true} />
        </Div>
      </Main>
    </>
  );
}
