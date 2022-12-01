const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setUser: (token) => ipcRenderer.send("set-user", token),
  getUser: () => ipcRenderer.invoke("get-user"),
  onFinishExport: (callback) => ipcRenderer.on("finish-export", callback),
  removeFinishExportListener: () =>
    ipcRenderer.removeAllListeners("finish-export"),
  removeOpenUploadDialogListener: () =>
    ipcRenderer.removeAllListeners("open-upload-dialog"),
  changeSelectedImages: (images) =>
    ipcRenderer.send("change-selected-images", images),
  signIn: () => ipcRenderer.send("signIn"),
  signOut: () => ipcRenderer.send("signOut"),
});
