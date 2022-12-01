import * as api from "../api";
import toast from "react-hot-toast";
import React from "react";
import { removeImage, setImages, setFavourite } from "../reducer/image.reducer";

export const fetchImagesAction = () => async (dispatch) => {
  toast.promise(
    (async () => {
      const { data } = await api.getImages();
      dispatch(setImages(data));
    })(),
    {
      loading: "Fetching images...",
      success: <b>Fetched successfully!</b>,
      error: (error) =>
        error && error?.message ? (
          <b>{error.message}</b>
        ) : (
          <b>Fetching failed.</b>
        ),
    }
  );
};

export const deleteImageAction = (id) => async (dispatch) => {
  toast.promise(
    (async () => {
      await api.deleteImage(id);
      dispatch(removeImage(id));
    })(),
    {
      loading: "Deleting image...",
      success: <b>Deleted successfully!</b>,
      error: (error) =>
        error && error?.message ? (
          <b>{error.message}</b>
        ) : (
          <b>Deletion failed.</b>
        ),
    }
  );
};

export const setFavouriteAction = (id, value) => async (dispatch) => {
  toast.promise(
    (async () => {
      await api.setIsFavourite(id, value);
      dispatch(setFavourite({ id, value }));
    })(),
    {
      loading: "Set favourite image...",
      success: <b>Set successfully!</b>,
      error: (error) =>
        error && error?.message ? <b>{error.message}</b> : <b>Set failed.</b>,
    }
  );
};
