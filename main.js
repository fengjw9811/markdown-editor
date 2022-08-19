const {app, BrowserWindow} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const remote = require('@electron/remote/main');
  remote.initialize();
  remote.enable(mainWindow.webContents);

  const Store = require('electron-store');
  Store.initRenderer();
  const urlLocation = isDev ? 'http://localhost:3000' : 'null';
  mainWindow.loadURL(urlLocation);
});
