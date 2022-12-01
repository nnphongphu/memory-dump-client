import React from "react";
import styled from "styled-components";
import { HeartOutlined, HeartFilled, DeleteFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  deleteImageAction,
  setFavouriteAction,
} from "../../../action/image.action";

export default function Card({ image }) {
  const dispatch = useDispatch();
  return (
    <Container>
      <Image url={image.url}>
        <div
          style={{
            borderRadius: "0 0 5 5",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: 50,
            display: "flex",
            padding: "0px 10px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {image.isFavourite ? (
            <HeartFilled
              style={{ color: "red", fontSize: 30 }}
              onClick={() => dispatch(setFavouriteAction(image.imageId, false))}
            />
          ) : (
            <HeartOutlined
              style={{ color: "white", fontSize: 30 }}
              onClick={() => dispatch(setFavouriteAction(image.imageId, true))}
            />
          )}
          <DeleteFilled
            style={{ color: "white", fontSize: 30 }}
            onClick={() => dispatch(deleteImageAction(image.imageId))}
          />
        </div>
      </Image>
      <div
        style={{
          color: "#FFFFFF",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: 150,
          height: 20,
          marginTop: 10,
        }}
      >
        {image.caption}
      </div>
    </Container>
  );
}

const Image = styled.div`
  border-radius: 5px;
  width: 150px;
  height: 230px;
  background-image: url(${({ url }) => url});
  background-size: cover;
  display: flex;
  align-items: flex-end;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
