import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./reducer/image.reducer";
import userReducer from "./reducer/user.reducer";

export default configureStore({
  reducer: {
    user: userReducer,
    image: imageReducer,
  },
});
