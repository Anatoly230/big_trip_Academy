import dayjs from 'dayjs';
import uniqid from 'uniqid';

function getId(preFix) {
  return !preFix ? uniqid() : `${preFix}-${uniqid()}`;
}

function getRandomPrice(max = 1000, min = 5) {

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

function getHumanazeDueDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getPointDate(date) {

  function getDepartureDate() {
    return getHumanazeDueDate(date, 'MMM D');
  }
  function getForCodeDate() {
    return getHumanazeDueDate(date, 'YYYY-MM-DDTHH:mm');
  }

  function getDeportureTime() {
    return getHumanazeDueDate(date, 'hh:mm');
  }

  function getFullDate() {
    return getHumanazeDueDate(date, 'DD/MM/YY HH:mm');
  }
  return function getDate(k) {
    if (k === 'sd') { /*ключ start date месяц и число*/
      return getDepartureDate();
    }
    if (k === 'hd') { /*ключ hours date только часы*/
      return getDeportureTime();
    }
    if (k === 'fd') { /*ключ full date полная дата*/
      return getFullDate();
    }
    if (k === 'cd') { /*ключ full date полная дата*/
      return getForCodeDate();
    }
    const date2 = dayjs(k);

    if (!date2.date() !== date2.date()) {
      return Math.abs(date2.diff(date, 'm'));
    }

  };
}

/*test function*/
function getDateInfo(date) {
  const dObj = new Date(date)
  if (dObj.toJSON() === null) {
    return 'неверная дата передана в getDateInfo';
  }
  const regParser = /^(\d{4})[-\s]?(\d{1,2})[-\s]?(\d{1,2})[Tt]?(\d{1,2}):(\d{1,2}):(\d{1,2})/gm;
  const [, y, mh, d, h, mt, s] = regParser.exec(dObj.toJSON());
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  function getHumanazeDate() {
    return `${+d} ${months[+mh - 1]}`;
  }
  function getYear() {
    return y;
  }

  function getMonth() {
    return mh;
  }
  function getDay() {
    return d;
  }
  function getHours() {
    return h;
  }
  function getMinuts() {
    return mt;
  }
  function getSeconds() {
    return s;
  }

  function getDateObect() {
    return dObj;
  }

  const methods = {
    getYear: getYear,
    getMonth: getMonth,
    getDay: getDay,
    getHours: getHours,
    getMinuts: getMinuts,
    getSeconds: getSeconds,
    getDateObect: getDateObect,
    getHumanazeDate: getHumanazeDate,
  };

  return Object.create(methods);
}

/*test function*/
export { getRandomFromArray, getRandomNum, getHumanazeDueDate, getId, getRandomPrice, cutRandomFromArray, getDateInfo, getPointDate };
