import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
  -webkit-app-region: drag;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  border-radius: 30px;
  padding: 0px 20px;
  transform: translateX(-50%);
  -webkit-app-region: no-drag;
`;
