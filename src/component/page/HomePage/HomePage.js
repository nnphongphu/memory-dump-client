import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImagesAction } from "../../../action/image.action";
import * as api from "../../../api";
import { selectImage } from "../../../reducer/image.reducer";
import Card from "../../element/Card/Card";
import Navigator from "../../element/Navigator/Navigator";

export default function HomePage() {
  const [tab, setTab] = useState("all");
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const images = useSelector(selectImage);

  const fileSelected = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", file.name);
    await api.uploadImage(formData);
    dispatch(fetchImagesAction());
  };

  const handleUploadFile = () => {
    if (buttonRef) {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    dispatch(fetchImagesAction());
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000000",
        width: "100%",
        overflowX: "hidden",
        minHeight: "calc(100vh - 80px)",
        paddingTop: 80,
      }}
    >
      <input
        ref={buttonRef}
        style={{ display: "none" }}
        onChange={fileSelected}
        type="file"
        accept="image/*"
      ></input>
      <Navigator
        tab={tab}
        setTab={setTab}
        handleUploadFile={handleUploadFile}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "0px 30px",
          justifyContent: "flex-start",
          columnGap: 40,
          rowGap: 30,
          marginBottom: 30,
        }}
      >
        {images &&
          images.map((image) => {
            if (tab == "favourite" && image.isFavourite == false) return null;
            return <Card image={image} key={image.url} />;
          })}
      </div>
    </div>
  );
}
