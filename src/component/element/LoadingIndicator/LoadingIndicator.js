import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import { Container } from "./CustomStyles";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const LoadingIndicator = ({ containerStyles }) => (
  <Container style={containerStyles}>
    <Spin indicator={antIcon} />
  </Container>
);

export default LoadingIndicator;
