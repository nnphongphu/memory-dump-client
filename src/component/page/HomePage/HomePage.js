import React, { useEffect, useState, useRef, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchImagesAction } from "../../../action/image.action";
import * as api from "../../../api";
import { selectImage } from "../../../reducer/image.reducer";
import { selectUser } from "../../../reducer/user.reducer";
import Card from "../../element/Card/Card";
import Navigator from "../../element/Navigator/Navigator";
import Preview from "../../element/Preview/Preview";

export default function HomePage() {
  const [tab, setTab] = useState("all");
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const images = useSelector(selectImage);
  const [showSideBar, setShowSideBar] = useState(true);

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

  useEffect(() => {
    window.electronAPI.onShowPreview((_event, value) => {
      setShowSideBar(true);
    });
    return window.electronAPI.removeShowPreviewListensers;
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000000",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        height: "calc(100vh - 80px)",
      }}
    >
      <input
        ref={buttonRef}
        style={{ display: "none" }}
        onChange={fileSelected}
        type="file"
        accept="image/*"
      ></input>
      <div style={{ width: "100%", overflowY: "hidden" }}>
        <Navigator
          tab={tab}
          setTab={setTab}
          handleUploadFile={handleUploadFile}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            maxHeight: "100vh",
            overflowY: "hidden",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "100%",
              maxHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                margin: 0,
                display: "flex",
                justifyContent: "space-between",
                padding: "0px 30px",
                marginTop: 80,
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
                padding: showSideBar ? "0px 50px" : "0px 30px",
                justifyContent: "flex-start",
                columnGap: 40,
                rowGap: 30,
                marginBottom: 30,
              }}
            >
              {images &&
                images.map((image) => {
                  if (tab == "favourite" && image.isFavourite == false)
                    return null;
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
          <Preview
            style={{
              display: showSideBar ? "flex" : "none",
              width: "500px",
              height: "calc(100% - 55px)",
              alignSelf: "flex-end",
              border: "solid 0px",
              borderLeftWidth: "1px",
              borderColor: "#303030",
            }}
            setShowSideBar={setShowSideBar}
          />
        </div>
      </div>
    </div>
  );
}
