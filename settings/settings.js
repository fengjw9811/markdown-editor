const remote = require('@electron/remote');
const Store = require('electron-store');
const settingsStore = new Store({name: 'Settings'});

const $ = (id) => {
  return document.getElementById(id);
};

document.addEventListener('DOMContentLoaded', () => {
  let savedLocation = settingsStore.get('savedFileLocation') || '';
  if (savedLocation) {
    $('savedFileLocation').value = savedLocation;
  }
  $('select-new-location').addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
      message: '选择文件的存储路径',
    }).then((res) => {
      const {conceled, filePaths} = res;
      if (filePaths.length > 0 && !conceled) {
        const fileDirectory = filePaths[0];
        $('savedFileLocation').value = fileDirectory;
        savedLocation = fileDirectory;
      }
    });
  });
  $('settings-form').addEventListener('submit', () => {
    console.log('submit');
    settingsStore.set('savedFileLocation', savedLocation);
    remote.getCurrentWindow().close();
  });
});
