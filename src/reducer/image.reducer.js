import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "image",
  initialState: {
    images: [],
  },
  reducers: {
    setImages: (state, action) => {
      if (state.images.length == 0) state.images = action.payload;
      const newState = [];
      action.payload.map((newImage) => {
        const oldImage = state.images.find(
          (image) => image.imageId == newImage.imageId
        );
        if (oldImage) newState.push(oldImage);
        else newState.push(newImage);
      });
      state.images = newState;
    },
    removeImage: (state, action) => {
      state.images = state.images.filter(
        (image) => image.imageId !== action.payload
      );
    },
    setFavourite: (state, action) => {
      state.images = state.images.map((image) =>
        image.imageId !== action.payload.id
          ? image
          : { ...image, isFavourite: action.payload.value }
      );
    },
    setSelectedImage: (state, action) => {
      state.images = state.images.map((image) =>
        image.imageId !== action.payload.id
          ? image
          : { ...image, isSelected: action.payload.value }
      );
    },
    resetImageStore: (state, action) => {
      state.images = [];
    },
  },
});

export const {
  setImages,
  removeImage,
  setFavourite,
  setSelectedImage,
  resetImageStore,
} = imageSlice.actions;

export const selectImage = (state) => state.image.images;

export default imageSlice.reducer;
