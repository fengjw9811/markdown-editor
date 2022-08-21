const path = require('path');
const {app, Menu, ipcMain, dialog} = require('electron');
const isDev = require('electron-is-dev');
const QiniuManager = require('./src/utils/QiniuManager');
const menuTemplate = require('./src/menuTemplate');
const AppWindow = require('./src/AppWindow');
const Store = require('electron-store');
const settingsStore = new Store({name: 'Settings'});
const fileStore = new Store({name: 'File Data'});
let mainWindow;
let settingsWindow;

const createManager = () => {
  const accessKey = settingsStore.get('accessKey');
  const secretKey = settingsStore.get('secretKey');
  const bucketName = settingsStore.get('bucketName');
  return new QiniuManager(accessKey, secretKey, bucketName);
};

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

  // ipcMain打开设置菜单
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
  });
  // 保存文件时，触发上传文件
  ipcMain.on('upload-file', (event, data) => {
    const manager = createManager();
    manager.uploadFile(data.key, data.path).then((data) => {
      mainWindow.webContents.send('active-file-uploaded');
    }).catch((err) => {
      dialog.showErrorBox('同步失败', '请检查七牛云参数是否正确');
    });
  });
  // 下载文件
  ipcMain.on('download-file', (event, data) => {
    const manager = createManager();
    const filesObj = fileStore.get('files');
    const {key, path, id} = data;
    manager.getStat(data.key).then((res) => {
      const serverUpdatedTime = Math.round(res.putTime / 10000);
      const localUpdatedTime = filesObj[id].updatedTime;
      if (serverUpdatedTime > localUpdatedTime || !localUpdatedTime) {
        manager.downloadFile(key, path).then(() => {
          mainWindow.webContents.send(
              'file-downloaded',
              {status: 'download-success', id},
          );
        });
      } else {
        mainWindow.webContents.send(
            'file-downloaded',
            {status: 'no-new-file', id},
        );
      }
    }, (err) => {
      if (err.statusCode === 612) {
        mainWindow.webContents.send('file-downloaded', {status: 'no-file', id});
      }
    });
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
