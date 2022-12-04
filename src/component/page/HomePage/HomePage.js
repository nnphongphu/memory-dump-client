import React, { useEffect, useState, useRef, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchImagesAction,
  setSelectedImageAction,
  deleteImageAction,
  setFavouriteAction,
  uploadFileAction,
} from "../../../action/image.action";
import * as api from "../../../api";
import { selectImage } from "../../../reducer/image.reducer";
import { selectUser } from "../../../reducer/user.reducer";
import Card from "../../element/Card";
import Navigator from "../../layout/Navigator";
import Preview from "../../element/Preview";
import {
  CardContainer,
  Container,
  ContentContainer,
  IconButton,
  Text,
} from "./CustomStyles";

export default function HomePage() {
  const [tab, setTab] = useState(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const images = useSelector(selectImage);
  const [showSideBar, setShowSideBar] = useState(true);

  const selectedCount = useMemo(() => {
    let count = 0;
    images.forEach((image) => (count += !!image.isSelected));
    return count;
  }, [images]);

  const fileSelected = async (event) => {
    const file = event.target.files[0];
    dispatch(uploadFileAction(file));
  };

  const handleCardClick = (image) => {
    if (selectedCount == 6 && !image.isSelected) {
      toast.error("You can only select maximum 6 images!");
    } else {
      const newImageState = images.map((newImage) =>
        image.imageId == newImage.imageId
          ? { ...newImage, isSelected: !image.isSelected }
          : newImage
      );
      dispatch(
        setSelectedImageAction(image.imageId, !image.isSelected, newImageState)
      );
    }
  };

  const handleUploadFile = () => {
    if (buttonRef) {
      buttonRef.current.click();
    }
  };

  const handleDownload = (url) => {
    window.electronAPI.downloadImage(url);
  };

  useEffect(() => {
    dispatch(fetchImagesAction());
  }, [user]);

  useEffect(() => {
    window.electronAPI.onShowPreview((_event, value) => {
      setShowSideBar(true);
    });
    window.electronAPI.onFinishExport((_event, value) => {
      toast.success("Finished export file!");
    });
    window.electronAPI.onFinishDownload((_event, value) => {
      toast.success("Finished download!");
    });
    return () => {
      window.electronAPI.removeShowPreviewListensers();
      window.electronAPI.removeFinishExportListener();
      window.electronAPI.removeFinishDownloadListeners();
    };
  }, []);

  return (
    <>
      <Container>
        <div style={{ width: "100%", overflowY: "hidden" }}>
          <Navigator
            tab={tab}
            setTab={setTab}
            handleUploadFile={handleUploadFile}
          />
          <ContentContainer>
            <div
              style={{
                width: "100%",
                maxHeight: "100vh",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  margin: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 30px",
                  marginTop: 80,
                  marginBottom: 30,
                }}
              >
                <Text>
                  Welcome{" "}
                  <span style={{ textDecorationLine: "underline" }}>
                    {user}
                  </span>
                  !
                </Text>
                <Text>
                  Selected {selectedCount} image{"(s)"}
                </Text>
              </div>
              <CardContainer showSideBar={showSideBar}>
                {images &&
                  images.map((image) => {
                    if (tab == "favourite" && image.isFavourite == false)
                      return null;
                    return (
                      <Card
                        image={image}
                        key={image.url}
                        selectedCount={selectedCount}
                        handleClick={() => handleCardClick(image)}
                        handleDownload={() => handleDownload(image.url)}
                      >
                        <Card.HeartButton
                          isFilled={image.isFavourite}
                          handleFilledClick={() =>
                            dispatch(setFavouriteAction(image.imageId, false))
                          }
                          handleOutlineClick={() =>
                            dispatch(setFavouriteAction(image.imageId, true))
                          }
                        />
                        <Card.DeleteButton
                          handleClick={() =>
                            dispatch(deleteImageAction(image.imageId))
                          }
                        />
                      </Card>
                    );
                  })}
              </CardContainer>
            </div>
            <Preview
              style={{
                display: showSideBar ? "flex" : "none",
                width: "500px",
                height: "calc(100% - 55px)",
                alignSelf: "flex-end",
                border: "solid 0px",
                borderLeftWidth: "1px",
                borderColor: "#303030",
              }}
              images={images}
              button={
                <IconButton
                  onClick={(event) => {
                    setShowSideBar(false);
                    window.electronAPI.showSideBar();
                  }}
                />
              }
            />
          </ContentContainer>
        </div>
      </Container>
      <input
        ref={buttonRef}
        style={{ display: "none" }}
        onChange={fileSelected}
        type="file"
        accept="image/*"
      />
    </>
  );
}
