import React from "react";
import { HeartOutlined, HeartFilled, DeleteFilled } from "@ant-design/icons";
import { Image, Container, Caption, ButtonContainer } from "./CustomStyles";

export default function Card({ image, handleClick, children }) {
  return (
    <Container>
      <Image
        url={image.url}
        isSelected={image.isSelected}
        onClick={handleClick}
      >
        {children ? <ButtonContainer>{children}</ButtonContainer> : null}
      </Image>
      <Caption>{image.caption}</Caption>
    </Container>
  );
}

Card.HeartButton = ({ isFilled, handleOutlineClick, handleFilledClick }) => {
  return isFilled ? (
    <HeartFilled
      style={{ color: "red", fontSize: 30 }}
      onClick={(e) => {
        e.stopPropagation();
        handleFilledClick();
      }}
    />
  ) : (
    <HeartOutlined
      style={{ color: "white", fontSize: 30 }}
      onClick={(e) => {
        e.stopPropagation();
        handleOutlineClick();
      }}
    />
  );
};

Card.DeleteButton = ({ handleClick }) => {
  return (
    <DeleteFilled
      style={{ color: "white", fontSize: 30 }}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    />
  );
};
