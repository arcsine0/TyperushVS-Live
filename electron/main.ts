import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { PlayerState, PreRoundState, RoundState } from "../src/lib/utils";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ["ENV_NAME"] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;

let win: BrowserWindow | null;

let defaultPlayerStates: PlayerState[] = [
	{
		player: 1,
		word: undefined,
		score: 0,
	},
	{
		player: 2,
		word: undefined,
		score: 0,
	},
];
let defaultRoundState: RoundState = {
	round: 1,
	timer: 30,
}
let defaultCountdownTime = 2;

function createWindow() {
	win = new BrowserWindow({
        width: 720,
        height: 1280,
        icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
        webPreferences: {
            preload: path.join(__dirname, "preload.mjs"),
        },
    })

    win.removeMenu();
    win.resizable = false;

	// Test active push message to Renderer-process.
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", (new Date).toLocaleString())
	})

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL)
	} else {
		// win.loadFile("dist/index.html")
		win.loadFile(path.join(RENDERER_DIST, "index.html"))
	}
};

// Quit when all windows are closed, except on macOS. There, it"s common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
		win = null
	}
});

app.on("activate", () => {
	// On OS X it"s common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
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
}

const handleSignalStartRound = () => {
	defaultPlayerStates.forEach(playerState => {
		playerState.word = undefined;
	});

	const returnState: PreRoundState = {
		countdown: defaultCountdownTime,
		playerStates: defaultPlayerStates,
	}

	return returnState;
}

const handleStartRound = () => {
	defaultPlayerStates.forEach(playerState => {
		playerState.word = "test";
	});

	handleUpdatePlayerStates(defaultPlayerStates);

	return defaultRoundState;
}

const handleUpdatePlayerStates = (PlayerStates: PlayerState[]) => {
	win?.webContents.send("onUpdatePlayerStates", PlayerStates);
}