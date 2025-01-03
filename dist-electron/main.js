import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
let defaultPlayerStates = [
  {
    player: 1,
    word: void 0,
    score: 0
  },
  {
    player: 2,
    word: void 0,
    score: 0
  }
];
let defaultRoundState = {
  round: 1,
  timer: 30
};
let defaultCountdownTime = 2;
function createWindow() {
  win = new BrowserWindow({
    width: 720,
    height: 1280,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.removeMenu();
  win.resizable = false;
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  ipcMain.handle("onGetPlayerStates", handleGetPlayerStates);
  ipcMain.handle("onSignalStartRound", handleSignalStartRound);
  ipcMain.handle("onStartRound", handleStartRound);
  createWindow();
});
const handleGetPlayerStates = () => {
  return defaultPlayerStates;
};
const handleSignalStartRound = () => {
  defaultPlayerStates.forEach((playerState) => {
    playerState.word = void 0;
  });
  const returnState = {
    countdown: defaultCountdownTime,
    playerStates: defaultPlayerStates
  };
  return returnState;
};
const handleStartRound = () => {
  defaultPlayerStates.forEach((playerState) => {
    playerState.word = "test";
  });
  handleUpdatePlayerStates(defaultPlayerStates);
  return defaultRoundState;
};
const handleUpdatePlayerStates = (PlayerStates) => {
  win == null ? void 0 : win.webContents.send("onUpdatePlayerStates", PlayerStates);
};
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
