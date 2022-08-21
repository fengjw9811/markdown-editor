// 将数组转化为对象的形式
export const flattenArr = (arr) => {
  return arr.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});
};

// 将对象转化为数组的形式
export const objToArr = (obj) => {
  return Object.keys(obj).map((key) => obj[key]);
};

export const timestampToString = (timestamp) => {
  console.log(timestamp);
  const date = new Date(timestamp);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};
