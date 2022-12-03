import { Routes, Route } from "react-router-dom";
import PreviewPage from "../component/page/PreviewPage/PreviewPage";
import React from "react";

export default function PreviewRouter() {
  return (
    <Routes>
      <Route exact path="/" element={<PreviewPage />} />
    </Routes>
  );
}
