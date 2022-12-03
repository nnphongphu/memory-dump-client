import React, { useEffect, useState } from "react";
import mergeImages from "merge-images";
import { Container, StyledButton } from "./CustomStyles";

export default function Preview({ style, button, images }) {
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
    <Container style={{ ...style, position: "relative" }}>
      <img src={previewB64} />
      <StyledButton
        type="primary"
        onClick={() => {
          if (previewB64) window.electronAPI.export(previewB64);
        }}
      >
        Export
      </StyledButton>
      {button}
    </Container>
  );
}
