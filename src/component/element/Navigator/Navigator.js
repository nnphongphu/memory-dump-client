import React from "react";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../../action/user.action";

export default function Navigator({ tab, setTab, handleUploadFile }) {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backdropFilter: "blur(10px) brightness(30%)",
        border: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "#303030",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 30px",
      }}
    >
      <h4
        style={{
          color: "blue",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={handleUploadFile}
      >
        Upload
      </h4>
      <div
        style={{
          backgroundColor: "#636363",
          width: 150,
          height: 30,
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 3px",
        }}
      >
        <button
          style={{
            backgroundColor: tab == "all" ? "#B5B5B5" : "transparent",
            outline: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            color: "white",
            height: 24,
            width: 73,
            borderRadius: 5,
            transition: "all 0.1s ease-in-out",
          }}
          onClick={() => setTab("all")}
        >
          All
        </button>
        <button
          style={{
            backgroundColor: tab == "favourite" ? "#B5B5B5" : "transparent",
            outline: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            color: "white",
            height: 24,
            width: 73,
            borderRadius: 5,
            transition: "all 0.1s ease-in-out",
          }}
          onClick={() => setTab("favourite")}
        >
          Favourite
        </button>
      </div>
      <h4
        style={{
          color: "blue",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => dispatch(signOutAction())}
      >
        Sign out
      </h4>
    </div>
  );
}
