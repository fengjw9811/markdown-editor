const path = require('path');
const {app, Menu, ipcMain} = require('electron');
const isDev = require('electron-is-dev');
const menuTemplate = require('./src/menuTemplate');
const AppWindow = require('./src/AppWindow');
let mainWindow;
let settingsWindow;

app.on('ready', () => {
  // Store初始化
  const Store = require('electron-store');
  Store.initRenderer();

  // 窗口初始化
  const urlLocation = isDev ? 'http://localhost:3000' : 'null';
  const mainWindowConfig = {
    width: 1440,
    height: 768,
  };
  mainWindow = new AppWindow(mainWindowConfig, urlLocation);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // remote初始化
  const remote = require('@electron/remote/main');
  remote.initialize();
  remote.enable(mainWindow.webContents);

  // ipcMain
  ipcMain.on('open-settings-window', () => {
    const settingsWindowConfig = {
      width: 500,
      height: 400,
      parent: mainWindow,
    };
    const settingsFileLocation = `file://${path.join(__dirname, './settings/settings.html')}`;
    settingsWindow = new AppWindow(settingsWindowConfig, settingsFileLocation);
    remote.enable(settingsWindow.webContents);
    settingsWindow.on('closed', () => {
      settingsWindow = null;
    });
  });

  // menu设置
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});
