// функция вывода случайного целого из диапазона включительно
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// функция возврата случайного числа с плавающей точкой из диапазона включительно
function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

// функция проверки, есть ли число в массиве, если есть false
const compare = function(item, array) {
  for (let j = 0; j < array.length; j++) {
    if (item === array[j]) {
      return false;
    }
  }
  return true;
};

// функция генерации булева массива случайных ключей
const booleanRandomArray = function (quantity) {
  const array = [];
  for (let j = 0; j < quantity; j++) {
    array[j] = getRandomPositiveInteger(0, 1);
  }
  return array;
};

export {getRandomPositiveInteger, getRandomPositiveFloat, compare, booleanRandomArray};
