import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import mergeImages from "merge-images";
import { selectImage } from "../../../reducer/image.reducer";
import { Button } from "antd";
import { ExpandAltOutlined } from "@ant-design/icons";
import styled from "styled-components";

export default function Preview({ setShowSideBar, style }) {
  const images = useSelector(selectImage);
  const [previewB64, setPreviewB64] = useState(null);

  useEffect(() => {
    let imageObject = [];
    let curIndex = 0;

    images.forEach((image, index) => {
      if (image.isSelected) {
        imageObject.push({
          src: image.url,
          width: 200,
          height: 200,
          x: 200 * (curIndex % 2),
          y: Math.floor(curIndex / 2) * 200,
        });
        curIndex += 1;
      }
    });
    mergeImages(imageObject, {
      width: 400,
      height: 600,
    }).then((b64) => {
      setPreviewB64(b64);
    });
  }, [images]);

  return (
    <div style={{ ...style, position: "relative" }}>
      <img src={previewB64} />
      <Button
        type="primary"
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          borderRadius: 30,
          padding: "0px 20px",
          transform: "translateX(-50%)",
        }}
        onClick={() => {
          if (previewB64) window.electronAPI.export(previewB64);
        }}
      >
        Export
      </Button>
      <IconButton
        onClick={(event) => {
          setShowSideBar(false);
          window.electronAPI.showSideBar();
        }}
      />
    </div>
  );
}

const IconButton = styled(ExpandAltOutlined)`
  position: absolute;
  top: 20px;
  right: 10px;
  color: #ffffff;
  font-size: 30px;
  &:hover {
    color: #1677ff;
  }
`;
