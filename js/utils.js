const filterInactive = function() {

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

const successAlert = () => {
  const tplSuccess = document.querySelector('#success').content.querySelector('.success');
  const successElement = tplSuccess.cloneNode(true);
  document.body.append(successElement);

  document.addEventListener('keydown', (evt) => {
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

  document.addEventListener('keydown', (evt) => {
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

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {formInactive, formActive, successAlert, errorAlert, blockSubmitButton, unblockSubmitButton, debounce, filterInactive};
