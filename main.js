const { app, BrowserWindow, ipcMain } = require("electron");
const Store = require("electron-store");
const path = require("path");

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
    resizable: false,
    fullscreenable: false,
  });
  child.setAlwaysOnTop(true);
  child.setPosition(win.getPosition()[0] + 800, win.getPosition()[1]);

  child.loadFile("side.html");
  win.loadFile("index.html");

  win.on("move", function () {
    let position = win.getPosition();
    child.setPosition(position[0] + 800, position[1]);
  });
}

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

app.whenReady().then(() => {
  ipcMain.on("set-user", (event, arg) => {
    store.set("token", arg ? arg.token : null);
    store.set("email", arg ? arg.email : null);
  });

  ipcMain.handle("get-user", () => {
    return { token: store.get("token", null), email: store.get("email", null) };
  });

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
