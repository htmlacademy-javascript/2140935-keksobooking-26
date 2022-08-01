const filterInactive = () => {

  const mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.classList.add('map__filters--disabled');

  const selectAllElement = mapFiltersElement.querySelectorAll('select');
  for (const selectElement of selectAllElement) {
    selectElement.setAttribute('disabled', 'disabled');
  }

  const mapFiltersFieldsetElementAll = mapFiltersElement.querySelectorAll('fieldset');
  for (const mapFiltersFieldsetElement of mapFiltersFieldsetElementAll) {
    mapFiltersFieldsetElement.setAttribute('disabled', 'disabled');
  }

};

const allInactive = () => {

  const adFormActiveElement = document.querySelector('.ad-form');
  adFormActiveElement.classList.add('ad-form--disabled');

  const inputAllElement = adFormActiveElement.querySelectorAll('input');
  for (const inputElement of inputAllElement) {
    inputElement.setAttribute('disabled', 'disabled');
  }

  const adFormFieldsetAllElement = adFormActiveElement.querySelectorAll('fieldset');
  for (const fieldsetElement of adFormFieldsetAllElement) {
    fieldsetElement.setAttribute('disabled', 'disabled');
  }

  const mapFiltersElement = document.querySelector('.map__filters');
  mapFiltersElement.classList.add('map__filters--disabled');

  const selectAllElement = mapFiltersElement.querySelectorAll('select');
  for (const selectElement of selectAllElement) {
    selectElement.setAttribute('disabled', 'disabled');
  }

  const mapFiltersFieldsetElementAll = mapFiltersElement.querySelectorAll('fieldset');
  for (const mapFiltersFieldsetElement of mapFiltersFieldsetElementAll) {
    mapFiltersFieldsetElement.setAttribute('disabled', 'disabled');
  }

};

const formActive = () => {

  const adFormDisabledElement = document.querySelector('.ad-form');
  adFormDisabledElement.classList.remove('ad-form--disabled');

  const inputDisabledAllElement = adFormDisabledElement.querySelectorAll('input[disabled]');
  for (const inputDisabled of inputDisabledAllElement) {
    inputDisabled.removeAttribute('disabled');
  }

  const fieldsetDisabledAllElement = adFormDisabledElement.querySelectorAll('fieldset[disabled]');
  for (const fieldsetDisabledElement of fieldsetDisabledAllElement) {
    fieldsetDisabledElement.removeAttribute('disabled');
  }

  const selectDisabledAllElement = adFormDisabledElement.querySelectorAll('select[disabled]');
  for (const selectDisabledElement of selectDisabledAllElement) {
    selectDisabledElement.removeAttribute('disabled');
  }

};

const filterActive = () => {

  const mapFiltersDisabledElement = document.querySelector('.map__filters');
  mapFiltersDisabledElement.classList.remove('map__filters--disabled');

  const inputDisabledAllElement = mapFiltersDisabledElement.querySelectorAll('input[disabled]');
  for (const inputDisabledElement of inputDisabledAllElement) {
    inputDisabledElement.removeAttribute('disabled');
  }

  const fieldsetDisabledAllElement = mapFiltersDisabledElement.querySelectorAll('fieldset[disabled]');
  for (const fieldsetDisabledElement of fieldsetDisabledAllElement) {
    fieldsetDisabledElement.removeAttribute('disabled');
  }

  const selectDisabledAllElement = mapFiltersDisabledElement.querySelectorAll('select[disabled]');
  for (const selectDisabledElement of selectDisabledAllElement) {
    selectDisabledElement.removeAttribute('disabled');
  }

};

const successAlert = () => {
  const tplSuccessElement = document.querySelector('#success').content.querySelector('.success');
  const successElement = tplSuccessElement.cloneNode(true);
  document.body.append(successElement);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successElement.remove();
    }
  });

  window.onclick = () => {
    successElement.remove();
  };
};

const errorAlert = () => {
  const tplErrorElement = document.querySelector('#error').content.querySelector('.error');
  const tplMessageElement = document.querySelector('#error').content.querySelector('.error__message');
  const tplBtnElement = document.querySelector('#error').content.querySelector('.error__button');

  const errorElement = tplErrorElement.cloneNode(false);
  const errorMessage = tplMessageElement.cloneNode(true);
  const btn = tplBtnElement.cloneNode(true);
  document.body.append(errorElement);
  errorElement.appendChild(errorMessage);
  errorElement.appendChild(btn);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      errorElement.remove();
    }
  });

  btn.onclick = () => {
    errorElement.remove();
  };

  window.onclick = () => {
    errorElement.remove();
  };
};

const getDataErrorAlert = () => {
  const tplErrorElement = document.querySelector('#error').content.querySelector('.error');
  const tplMessageElement = document.querySelector('#error').content.querySelector('.error__message');
  const tplBtnElement = document.querySelector('#error').content.querySelector('.error__button');

  const errorElement = tplErrorElement.cloneNode(false);
  const errorMessage = tplMessageElement.cloneNode(true);
  const btn = tplBtnElement.cloneNode(true);
  document.body.append(errorElement);
  errorElement.appendChild(errorMessage);
  errorElement.appendChild(btn);
  errorMessage.textContent = 'Ошибка загрузки данных';
  btn.textContent = 'Закрыть';

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      errorElement.remove();
    }
  });

  btn.onclick = () => {
    errorElement.remove();
  };

  window.onclick = () => {
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

const debounce = (callback, timeoutDelay = 500) => {
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
};

export {allInactive, filterInactive, formActive, filterActive, successAlert, errorAlert, getDataErrorAlert, blockSubmitButton, unblockSubmitButton, debounce};
