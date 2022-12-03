import Preview from "../../element/Preview";
import { useEffect, useState } from "react";
import React from "react";
import { IconButton } from "./CustomStyles";

export default function PreviewPage() {
  const [images, setImages] = useState([]);
  const previewContainerStyles = {
    width: "399px",
    height: "100vh",
    overflow: "hidden",
    alignSelf: "flex-end",
    border: "solid 0px",
    borderLeftWidth: "1px",
    borderColor: "#303030",
  };

  useEffect(() => {
    window.electronAPI.onChangeSelectedImage((_event, images) => {
      setImages(images);
    });
    return window.electronAPI.removeAllListeners;
  }, []);

  return (
    <Preview
      style={previewContainerStyles}
      images={images}
      button={
        <IconButton
          onClick={(event) => {
            window.electronAPI.hideSideBar();
          }}
        />
      }
    />
  );
}
