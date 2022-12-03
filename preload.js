const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setUser: (token) => ipcRenderer.send("set-user", token),
  getUser: () => ipcRenderer.invoke("get-user"),
  onFinishExport: (callback) => ipcRenderer.on("finish-export", callback),
  removeFinishExportListener: () =>
    ipcRenderer.removeAllListeners("finish-export"),
  changeSelectedImages: (images) =>
    ipcRenderer.send("change-selected-images", images),
  removeChangeSelectedImagesListeners: () => {
    ipcRenderer.removeAllListeners("change-selected-images");
  },
  showSideBar: () => ipcRenderer.send("show-side-bar"),
  hideSideBar: () => ipcRenderer.send("hide-side-bar"),
  export: (b64) => ipcRenderer.send("export", b64),
  onShowPreview: (callback) => ipcRenderer.on("show-preview", callback),
  removeShowPreviewListensers: (callback) =>
    ipcRenderer.removeAllListeners("show-preview"),
  onChangeSelectedImage: (callback) =>
    ipcRenderer.on("change-selected-images", callback),
  export: (b64) => ipcRenderer.send("export", b64),
});
