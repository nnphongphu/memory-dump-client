import styled from "styled-components";

export const Image = styled.div`
  border-radius: 5px;
  width: 150px;
  height: 230px;
  background-image: url(${({ url }) => url});
  background-size: cover;
  display: flex;
  align-items: flex-end;
  box-shadow: ${({ isSelected }) =>
    isSelected ? "inset 0px 0px 0px 2px blue" : "none"};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const Caption = styled.div`
  color: #ffffff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 150px;
  height: 20px;
  margin-top: 10px;
`;

export const ButtonContainer = styled.div`
  border-radius: 0px 0px 5px 5px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 50px;
  display: flex;
  padding: 0px 10px;
  align-items: center;
  justify-content: space-between;
`;
