const QiniuManager = require('./src/utils/QiniuManager');
const path = require('path');

const accessKey = 'MHbuTjlhbGbFqAx52w0JTstKUydlaM_vDJJt00z-';
const secretKey = 'NvHMIPNzOEOrMbwFKr5n0ce8HRrAUe-cdYHuqFx7';
const localFile = '/Users/mac/Documents/name1.md';
const key='hello11.md';
const downloadPath = path.join(__dirname, key);

const manager = new QiniuManager(accessKey, secretKey, 'fengjw-markdown');
// manager.uploadFile(key, localFile).then((data) => {
//   console.log('上传成功', data);
//   return manager.deleteFile(key);
// }).then((data) => {
//   console.log('删除成功', data);
// });
// const publicBucketDomain = 'http://rgy560lzq.hd-bkt.clouddn.com';
// manager.deleteFile(key).then((data) => console.log(data));
// manager.generateDownloadLink(key).then((data) => {
//   console.log(data);
//   return manager.generateDownloadLink('hello11.md');
// }).then((data) => {
//   console.log(data);
// }).catch((err) => console.log(err));
manager.downloadFile(key, downloadPath).then(() => {
  console.log('下载写入文件完毕');
});
