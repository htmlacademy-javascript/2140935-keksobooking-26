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

// алерты

const successAlert = () => {
  const tplSuccess = document.querySelector('#success').content.querySelector('.success');
  const successElement = tplSuccess.cloneNode(true);
  document.body.append(successElement);

  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      successElement.remove();
    }
  });

  window.onclick = function() {
    successElement.remove();
  };
};

const errorAlert = () => {
  const tplError = document.querySelector('#error').content.querySelector('.error');
  const tplMessage = document.querySelector('#error').content.querySelector('.error__message');
  const tplBtn = document.querySelector('#error').content.querySelector('.error__button');

  const errorElement = tplError.cloneNode(false);
  const errorMessage = tplMessage.cloneNode(true);
  const btn = tplBtn.cloneNode(true);
  document.body.append(errorElement);
  errorElement.appendChild(errorMessage);
  errorElement.appendChild(btn);

  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      errorElement.remove();
    }
  });

  btn.onclick = function() {
    errorElement.remove();
  };

  window.onclick = function() {
    errorElement.remove();
  };
};

const blockSubmitButton = (button) => {
  button.disabled = true;
  button.textContent = 'Публикую...';
};

const unblockSubmitButton = (button) => {
  button.disabled = false;
  button.textContent = 'Опубликовать';
};

export {getRandomPositiveInteger, getRandomPositiveFloat, compare, booleanRandomArray, successAlert, errorAlert, blockSubmitButton, unblockSubmitButton};
