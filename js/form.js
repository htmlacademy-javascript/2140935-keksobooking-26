import {sendData} from './api.js';
import {successAlert, errorAlert, blockSubmitButton, unblockSubmitButton} from './utils.js';

const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const roomField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const sliderElement = adForm.querySelector('.ad-form__slider');
const valueElement = adForm.querySelector('#price');

const MIN_AMOUNT = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Отель': 3000,
  'Дом': 5000,
  'Дворец': 10000
};
const ROOM_OPTION_SELECT = {
  '1 комната': '1',
  '2 комнаты': '2',
  '3 комнаты': '3',
  '100 комнат': '0'
};
const ROOM_OPTION = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};

// Валидация тайтла
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__label',
});

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

// Меняем плейсхолдер цены
typeField.addEventListener('change', () => {
  const type = typeField[typeField.selectedIndex].textContent;
  priceField.placeholder = MIN_AMOUNT[type];
});

// Валидация цены
function validatePrice (value) {
  const type = adForm.querySelector('#type')[typeField.selectedIndex];
  return value.length && parseInt(value, 10) >= MIN_AMOUNT[type.textContent];
}

function getPriceErrorMessage () {
  const type = adForm.querySelector('#type')[typeField.selectedIndex];
  return `Минимальная цена для данного типа жилья ${MIN_AMOUNT[type.textContent]}`;
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);


// Валидация к-ва комнат
// сначала синхронизируем переключение вместимости при изменении комнат
roomField.addEventListener('change', () => {
  const room = roomField[roomField.selectedIndex].textContent;
  capacityField.value = ROOM_OPTION_SELECT[room];
});

// валидируем
function validateCapacity () {
  return ROOM_OPTION[roomField[roomField.selectedIndex].textContent].includes(capacityField[capacityField.selectedIndex].textContent);
}

function getRoomErrorMessage () {
  return `
    ${roomField[roomField.selectedIndex].textContent}
    ${capacityField[capacityField.selectedIndex].textContent.toLowerCase()}
    ${roomField[roomField.selectedIndex].textContent === '1 комната' ? 'невозможно  ' : 'невозможно'}
  `;
}

pristine.addValidator(capacityField, validateCapacity, getRoomErrorMessage);

// Синхронизация заезда / выезда
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

// noUiSlider
// Валидация слайдера
noUiSlider.create(sliderElement,{
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

valueElement.addEventListener('input', (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
  pristine.validate(sliderElement );
});

// submit
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton(submitButton);
    sendData(
      //тут функция onSuccess
      () => {
        successAlert();
        unblockSubmitButton(submitButton);
        evt.target.reset();
      },
      //тут у нас функция onFail
      () => {
        errorAlert();
        unblockSubmitButton(submitButton);
      },
      new FormData(evt.target),
    );
  }

});
