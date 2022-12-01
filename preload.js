const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setUser: (token) => ipcRenderer.send("set-user", token),
  getUser: () => ipcRenderer.invoke("get-user"),
  onOpenUploadDialog: (callback) =>
    ipcRenderer.on("open-upload-dialog", callback),
  removeOpenUploadDialogListener: () =>
    ipcRenderer.removeAllListeners("open-upload-dialog"),
});
