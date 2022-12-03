import { MinusOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const IconButton = styled(MinusOutlined)`
  position: absolute;
  top: 20px;
  right: 10px;
  color: red;
  &:hover {
    color: #1677ff;
  }
  -webkit-app-region: no-drag;
`;
