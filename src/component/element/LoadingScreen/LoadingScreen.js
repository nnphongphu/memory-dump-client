import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const LoadingScreen = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Spin indicator={antIcon} />
  </div>
);

export default LoadingScreen;
