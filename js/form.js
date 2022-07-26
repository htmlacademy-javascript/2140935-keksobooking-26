import './preview.js';
import {sendData} from './data.js';
import {successAlert, errorAlert, blockSubmitButton, unblockSubmitButton} from './utils.js';
/*formInactive
1. Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
2. Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута
disabled, добавленного на них или на их родительские блоки fieldset. Слайдер также должен
быть заблокирован;
3. Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму
добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
*/

const formInactive = function() {

  const adFormActive = document.querySelector('.ad-form');
  adFormActive.classList.add('ad-form--disabled');

  const inputAll = adFormActive.querySelectorAll('input');
  for (const inputElement of inputAll) {
    inputElement.setAttribute('disabled', 'disabled');
  }

  const adFormFieldsetAll = adFormActive.querySelectorAll('fieldset');
  for (const fieldsetElement of adFormFieldsetAll) {
    fieldsetElement.setAttribute('disabled', 'disabled');
  }

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('map__filters--disabled');

  const selectAll = mapFilters.querySelectorAll('select');
  for (const selectElement of selectAll) {
    selectElement.setAttribute('disabled', 'disabled');
  }

  const mapFiltersFieldsetAll = mapFilters.querySelectorAll('fieldset');
  for (const mapFiltersFieldset of mapFiltersFieldsetAll) {
    mapFiltersFieldset.setAttribute('disabled', 'disabled');
  }

};

/*formActive
В активном состоянии страница позволяет:
1. Вносить изменения в форму и отправлять её на сервер;
2. После загрузки данных с сервера просматривать похожие объявления на карте, фильтровать их и уточнять
подробную информацию о них, показывая для каждого из объявлений карточку.
*/
const formActive = function() {

  const adFormDisabled = document.querySelector('.ad-form');
  adFormDisabled.classList.remove('ad-form--disabled');

  const inputDisabledAll = document.querySelectorAll('input[disabled]');
  for (const inputDisabled of inputDisabledAll) {
    inputDisabled.removeAttribute('disabled');
  }

  const fieldsetDisabledAll = document.querySelectorAll('fieldset[disabled]');
  for (const fieldsetDisabled of fieldsetDisabledAll) {
    fieldsetDisabled.removeAttribute('disabled');
  }

  const mapFiltersDisabled = document.querySelector('.map__filters');
  mapFiltersDisabled.classList.remove('map__filters--disabled');

  const selectDisabledAll = document.querySelectorAll('select[disabled]');
  for (const selectDisabled of selectDisabledAll) {
    selectDisabled.removeAttribute('disabled');
  }

};

// Валидация тайтла

const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');

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
const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');

const minAmount = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Отель': 3000,
  'Дом': 5000,
  'Дворец': 10000
};

typeField.addEventListener('change', () => {
  const type = typeField[typeField.selectedIndex].textContent;
  priceField.placeholder = minAmount[type];
});

// Валидация цены
function validatePrice (value) {
  const type = adForm.querySelector('#type')[typeField.selectedIndex];
  return value.length && parseInt(value, 10) >= minAmount[type.textContent];
}

function getPriceErrorMessage () {
  const type = adForm.querySelector('#type')[typeField.selectedIndex];
  return `Минимальная цена для данного типа жилья ${minAmount[type.textContent]}`;
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);


// Валидация к-ва комнат
/*3.6. Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат
вводятся ограничения на допустимые варианты выбора количества гостей:*/

const roomField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');

// сначала синхронизируем переключение вместимости при изменении комнат

const roomOptionSelect = {
  '1 комната': '1',
  '2 комнаты': '2',
  '3 комнаты': '3',
  '100 комнат': '0'
};

roomField.addEventListener('change', () => {
  const room = roomField[roomField.selectedIndex].textContent;
  capacityField.value = roomOptionSelect[room];
});

// валидируем, как умеем

const roomOption = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};

function validateCapacity () {
  return roomOption[roomField[roomField.selectedIndex].textContent].includes(capacityField[capacityField.selectedIndex].textContent);
}

function getRoomErrorMessage () {
  return `
    ${roomField[roomField.selectedIndex].textContent}
    ${capacityField[capacityField.selectedIndex].textContent.toLowerCase()}
    ${roomField[roomField.selectedIndex].textContent === '1 комната' ? 'невозможно  ' : 'невозможно'}
  `;
}

pristine.addValidator(capacityField, validateCapacity, getRoomErrorMessage);

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

// Синхронизация заезда / выезда
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

// noUiSlider
const sliderElement = adForm.querySelector('.ad-form__slider');
const valueElement = adForm.querySelector('#price');

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


export {formInactive, formActive};
