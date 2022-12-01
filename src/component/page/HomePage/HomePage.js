import React, { useEffect, useState, useRef, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchImagesAction } from "../../../action/image.action";
import * as api from "../../../api";
import { selectImage } from "../../../reducer/image.reducer";
import { selectUser } from "../../../reducer/user.reducer";
import Card from "../../element/Card/Card";
import Navigator from "../../element/Navigator/Navigator";

export default function HomePage() {
  const [tab, setTab] = useState("all");
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const images = useSelector(selectImage);

  const selectedCount = useMemo(() => {
    let count = 0;
    images.forEach((image) => (count += !!image.isSelected));
    return count;
  }, [images]);

  const fileSelected = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", file.name);
    await api.uploadImage(formData);
    dispatch(fetchImagesAction());
  };

  useEffect(() => {
    dispatch(fetchImagesAction());
  }, [user]);

  const handleUploadFile = () => {
    if (buttonRef) {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    let selectedImages = [];
    images.forEach((image) => {
      if (image.isSelected) {
        selectedImages.push(image);
      }
    });
    window.electronAPI.changeSelectedImages(selectedImages);
  }, [images]);

  useEffect(() => {
    window.electronAPI.onFinishExport((_event, value) => {
      toast.success("Finished export file!");
    });
    return window.electronAPI.removeFinishExportListener;
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
          margin: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 30px",
          marginBottom: 30,
        }}
      >
        <h4
          style={{
            color: "white",
            fontWeight: "normal",
            margin: 0,
          }}
        >
          Welcome{" "}
          <span style={{ textDecorationLine: "underline" }}>{user}</span>!
        </h4>
        <h4
          style={{
            color: "white",
            fontWeight: "normal",
            margin: 0,
          }}
        >
          Selected {selectedCount} image{"(s)"}
        </h4>
      </div>
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
            return (
              <Card
                image={image}
                key={image.url}
                selectedCount={selectedCount}
              />
            );
          })}
      </div>
    </div>
  );
}
