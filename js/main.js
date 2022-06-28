// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function randomInteger(min,max) {
  if (min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return 'Некорректные вводные';
  }
}
randomInteger(0,5);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

function randomNonInteger(min,max,symbols) {
  if (min < max) {
    return +(Math.random() * (max - min) + min).toFixed(symbols);
  } else {
    return 'Некорректные вводные';
  }
}
randomNonInteger(0.1,5,3);
