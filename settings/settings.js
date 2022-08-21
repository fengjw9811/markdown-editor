const remote = require('@electron/remote');
const Store = require('electron-store');
const {ipcRenderer} = require('electron');
const settingsStore = new Store({name: 'Settings'});
const qiniuConfigArr = [
  '#savedFileLocation', '#accessKey', '#secretKey', '#bucketName',
];

const $ = (selector) => {
  const result = document.querySelectorAll(selector);
  return result.length > 1 ? result : result[0];
};

document.addEventListener('DOMContentLoaded', () => {
  const savedLocation = settingsStore.get('savedFileLocation') || '';
  if (savedLocation) {
    $('#savedFileLocation').value = savedLocation;
  }
  qiniuConfigArr.forEach((selector) => {
    const savedValue = settingsStore.get(selector.substr(1));
    if (savedValue) {
      $(selector).value = savedValue;
    }
  });
  $('#select-new-location').addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
      message: '选择文件的存储路径',
    }).then((res) => {
      const {conceled, filePaths} = res;
      if (filePaths.length > 0 && !conceled) {
        const fileDirectory = filePaths[0];
        $('#savedFileLocation').value = fileDirectory;
      }
    });
  });
  $('#settings-form').addEventListener('submit', (e) => {
    e.preventDefault();
    qiniuConfigArr.forEach((selector) => {
      if ($(selector)) {
        const {id, value} = $(selector);
        settingsStore.set(id, value ? value : '');
      }
    });
    // 修改config之后菜单应该立即生效
    ipcRenderer.send('config-is-saved');
    remote.getCurrentWindow().close();
  });
  $('.nav-tabs').addEventListener('click', (e) => {
    e.preventDefault();
    $('.nav-link').forEach((element) => {
      element.classList.remove('active');
    });
    e.target.classList.add('active');
    $('.config-area').forEach((element) => {
      element.style.display = 'none';
    });
    $(e.target.dataset.tab).style.display = 'block';
  });
});
