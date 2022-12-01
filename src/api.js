import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:3001" });

API.interceptors.request.use(async (req) => {
  const { token } = await window.electronAPI.getUser();
  req.headers.authorization = `Bearer ${token}`;
  return req;
});

export const signIn = (formData) => API.post("/user/signIn", formData);
export const signUp = (formData) => API.post("/user/signUp", formData);
export const signOut = () => API.post("/user/signOut");

export const ping = (token) =>
  API.get("/ping", { headers: { Authorization: `Bearer ${token}` } });

export const getImages = () => API.get("/image");
export const uploadImage = (formData) =>
  API.post("/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteImage = (id) => API.delete(`/image/${id}`);
export const setIsFavourite = (id, isFavourite) =>
  API.patch(`/image/${id}`, { isFavourite });

export default API;
