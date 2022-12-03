import { ExpandAltOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const IconButton = styled(ExpandAltOutlined)`
  position: absolute;
  top: 20px;
  right: 10px;
  color: #ffffff;
  &:hover {
    color: #1677ff;
  }
`;

export const Text = styled.h4`
  color: white;
  font-weight: normal;
  margin: 0;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${({ showSideBar }) => (showSideBar ? "0px 50px" : "0px 30px")};
  justify-content: flex-start;
  column-gap: 40px;
  row-gap: 30px;
  margin-bottom: 30px;
`;

export const Container = styled.div`
  background-color: #000000;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  height: calc(100vh - 80px);
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  max-height: 100vh;
  overflow-y: hidden;
  height: 100vh;
`;
