import dayjs from "dayjs";
import uniqid from 'uniqid';

function getId(preFix) {
  return !preFix ? uniqid() : `${preFix}-${uniqid()}`;
}

function getRandomPrice() {
  const min = 5;
  const max = 1000;

  function lastCharToZeroOrFive(v, i, a) {
    if (i === a.length - 1) {
      return +v < 5 ? '0' : '5';
    }
    return v;
  }

  const num = getRandomNum(max, min);
  return num > max ? max : +String(num)
    .split('')
    .map(lastCharToZeroOrFive)
    .join('');
}

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];

}

function cutRandomFromArray(arr) {
  return arr.splice(getRandomNum(arr.length - 1), 1)[0];
}

function getRandomNum(max = 1000, min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}

function humanazeDueDate(date, format) {
  return date ? dayjs(date).format : '';
}

export { getRandomFromArray, getRandomNum, humanazeDueDate, getId, getRandomPrice, cutRandomFromArray };
