const path = require('path');
const {app, Menu, ipcMain} = require('electron');
const isDev = require('electron-is-dev');
const menuTemplate = require('./src/menuTemplate');
const AppWindow = require('./src/AppWindow');
const Store = require('electron-store');
const settingsStore = new Store({name: 'Settings'});
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

  // menu设置
  let menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

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
    settingsWindow.removeMenu();
    remote.enable(settingsWindow.webContents);
    settingsWindow.on('closed', () => {
      settingsWindow = null;
    });
    // 当config被修改时，主进程应该修改菜单栏
    ipcMain.on('config-is-saved', () => {
      // mac和windows的menu是不一样的
      let qiniuMenu = process.platform === 'darwin' ?
      menu.items[3] : menu.items[2];
      const switchItems = (toggle) => {
        [1, 2, 3].forEach((number) => {
          qiniuMenu.submenu.items[number].enabled = toggle;
        });
      };
      const qiniuIsConfiged = ['accessKey', 'secretKey', 'bucketName']
          .every((key) => !!settingsStore.get(key));
      if (qiniuIsConfiged) {
        switchItems(true);
      } else {
        switchItems(false);
      }
    });
  });
});
