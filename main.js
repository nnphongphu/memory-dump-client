const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const Store = require("electron-store");
const path = require("path");
const fs = require("fs");

let store = new Store();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const child = new BrowserWindow({
    width: 400,
    height: 600,
    parent: win,
    frame: false,
    show: false,
    resizable: false,
    fullscreenable: false,
    backgroundColor: "#000000",
    webPreferences: {
      preload: path.join(__dirname, "side-preload.js"),
    },
  });

  child.setPosition(win.getPosition()[0] + 800, win.getPosition()[1]);

  child.loadFile("side.html");
  win.loadFile("index.html");

  // win.on("move", function () {
  //   let position = win.getPosition();
  //   if (child) child.setPosition(position[0] + 800, position[1]);
  // });

  child.on("move", () => {
    let winPosition = win.getPosition();
    let childPosititon = child.getPosition();
    if (
      childPosititon[0] >= winPosition[0] + 50 &&
      childPosititon[0] + 400 <= winPosition[0] + 750 &&
      childPosititon[1] >= winPosition[1] + 50 &&
      childPosititon[1] <= winPosition[1] + 300
    ) {
      child.hide();
      win.webContents.send("show-preview");
    }
  });

  ipcMain.on("show-side-bar", () => {
    if (child) {
      let position = win.getPosition();
      child.setPosition(position[0] + 800, position[1]);
      child.show();
    }
  });

  ipcMain.on("hide-side-bar", () => {
    if (child) child.hide();
  });

  ipcMain.on("show-preview", () => {
    if (child) child.hide();
    win.webContents.send("show-preview");
  });

  ipcMain.on("change-selected-images", (event, arg) => {
    child.webContents.send("change-selected-images", arg);
  });

  ipcMain.on("export", (event, arg) => {
    const path = dialog.showSaveDialogSync({
      filters: [{ name: "Images", extensions: ["jpg", "png"] }],
    });
    const base64ImageStripped = arg.split(";base64,").pop();
    if (path)
      fs.writeFile(path, base64ImageStripped, { encoding: "base64" }, () => {
        win.webContents.send("finish-export");
      });
  });

  ipcMain.on("set-user", (event, arg) => {
    store.set("token", arg ? arg.token : null);
    store.set("email", arg ? arg.email : null);
  });

  ipcMain.handle("get-user", () => {
    return { token: store.get("token", null), email: store.get("email", null) };
  });
}

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
