import {sendData} from './api.js';
import {successAlert, errorAlert, blockSubmitButton, unblockSubmitButton} from './utils.js';

const adFormElement = document.querySelector('.ad-form');
const submitButtonElement = adFormElement.querySelector('.ad-form__submit');
const typeFieldElement = adFormElement.querySelector('#type');
const priceFieldElement = adFormElement.querySelector('#price');
const roomFieldElement = adFormElement.querySelector('[name="rooms"]');
const capacityFieldElement = adFormElement.querySelector('[name="capacity"]');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const valueElement = adFormElement.querySelector('#price');

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
const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__label',
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  adFormElement.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

// Меняем плейсхолдер цены
typeFieldElement.addEventListener('change', () => {
  const type = typeFieldElement[typeFieldElement.selectedIndex].textContent;
  priceFieldElement.placeholder = MIN_AMOUNT[type];
});

// Валидация цены
const validatePrice = (value) => {
  const type = adFormElement.querySelector('#type')[typeFieldElement.selectedIndex];
  return value.length && parseInt(value, 10) >= MIN_AMOUNT[type.textContent];
};

const getPriceErrorMessage = () => {
  const type = adFormElement.querySelector('#type')[typeFieldElement.selectedIndex];
  return `Минимальная цена для данного типа жилья ${MIN_AMOUNT[type.textContent]}`;
};

pristine.addValidator(priceFieldElement, validatePrice, getPriceErrorMessage);

// Валидация к-ва комнат
// сначала синхронизируем переключение вместимости при изменении комнат
roomFieldElement.addEventListener('change', () => {
  const room = roomFieldElement[roomFieldElement.selectedIndex].textContent;
  capacityFieldElement.value = ROOM_OPTION_SELECT[room];
});

// валидируем
const validateCapacity = () => ROOM_OPTION[roomFieldElement[roomFieldElement.selectedIndex].textContent].includes(capacityFieldElement[capacityFieldElement.selectedIndex].textContent);

const getRoomErrorMessage = () => `
    ${roomFieldElement[roomFieldElement.selectedIndex].textContent}
    ${capacityFieldElement[capacityFieldElement.selectedIndex].textContent.toLowerCase()}
    ${roomFieldElement[roomFieldElement.selectedIndex].textContent === '1 комната' ? 'невозможно  ' : 'невозможно'}
  `;

pristine.addValidator(capacityFieldElement, validateCapacity, getRoomErrorMessage);

// Синхронизация заезда / выезда
timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
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
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
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
adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton(submitButtonElement);
    sendData(
      //тут функция onSuccess
      () => {
        successAlert();
        unblockSubmitButton(submitButtonElement);
        evt.target.reset();
      },
      //тут у нас функция onFail
      () => {
        errorAlert();
        unblockSubmitButton(submitButtonElement);
      },
      new FormData(evt.target),
    );
  }

});

export {adFormElement};
