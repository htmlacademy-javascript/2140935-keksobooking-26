/*formInactive
1. Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
2. Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута
disabled, добавленного на них или на их родительские блоки fieldset. Слайдер также должен
быть заблокирован;
3. Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму
добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
*/

const formInactive = function() {

  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');

  const inputAll = adForm.querySelectorAll('input');
  for (const inputElement of inputAll) {
    inputElement.setAttribute('disabled', 'disabled');
  }

  const adFormFieldsetAll = adForm.querySelectorAll('fieldset');
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

export {formInactive, formActive};
