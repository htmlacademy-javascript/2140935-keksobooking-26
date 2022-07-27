const getData = (onSuccess, onFail, onFailInactive) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    //На этом файле открываем форму
    })
    .catch(() => {
      onFail('ошибка загрузки');
      onFailInactive();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {sendData, getData};
