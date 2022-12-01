import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "image",
  initialState: {
    images: [],
  },
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
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
  },
});

export const { setImages, removeImage, setFavourite } = imageSlice.actions;

export const selectImage = (state) => state.image.images;

export default imageSlice.reducer;
