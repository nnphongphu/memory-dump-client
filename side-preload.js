const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onChangeSelectedImage: (callback) =>
    ipcRenderer.on("change-selected-images", callback),
  export: (b64) => ipcRenderer.send("export", b64),
  showPreview: () => ipcRenderer.send("show-preview"),
});
