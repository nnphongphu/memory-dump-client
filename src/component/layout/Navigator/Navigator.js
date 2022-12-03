import React from "react";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../../action/user.action";
import { Button, Container, SwitchContainer, SwitchItem } from "./CustomStyles";

const TAB = {
  ALL: "all",
  FAVOURITE: "favourite",
};

export default function Navigator({ tab, setTab, handleUploadFile }) {
  const dispatch = useDispatch();
  return (
    <Container>
      <Button onClick={handleUploadFile}>Upload</Button>
      <SwitchContainer>
        <SwitchItem
          isSelected={!tab || tab == TAB.ALL}
          onClick={() => setTab(TAB.ALL)}
        >
          All
        </SwitchItem>
        <SwitchItem
          isSelected={tab == TAB.FAVOURITE}
          onClick={() => setTab(TAB.FAVOURITE)}
        >
          Favourite
        </SwitchItem>
      </SwitchContainer>
      <Button onClick={() => dispatch(signOutAction())}>Sign out</Button>
    </Container>
  );
}
