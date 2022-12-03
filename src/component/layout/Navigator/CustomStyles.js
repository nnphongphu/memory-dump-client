import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  backdrop-filter: blur(10px) brightness(30%);
  border: solid;
  border-bottom-width: 1px;
  border-bottom-color: #303030;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
`;

export const Button = styled.h4`
  color: blue;
  font-weight: bold;
  cursor: pointer;
`;

export const SwitchContainer = styled.div`
  background-color: #636363;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 3px;
`;

export const SwitchItem = styled.button`
  background-color: ${({ isSelected }) =>
    isSelected ? "#B5B5B5" : "transparent"};
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: white;
  height: 24px;
  width: 73px;
  border-radius: 5px;
  transition: all 0.1s ease-in-out;
`;
