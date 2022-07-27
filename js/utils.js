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

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {successAlert, errorAlert, blockSubmitButton, unblockSubmitButton};
