import {generateAds} from './data.js';
const offers = generateAds();

// Типы жилья
const popupTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel:  'Отель'
};

const similarTemplateFunction = function(adNumber) {
  adNumber = adNumber - 1;
  const mapCanvas = document.querySelector('.map__canvas');
  const similarTemplate = document.querySelector('#card').content;
  //Выведите заголовок объявления offer.title в заголовок .popup__title
  similarTemplate.querySelector('.popup__title').textContent = offers[adNumber].offer.title;
  //Выведите адрес offer.address в блок .popup__text--address
  similarTemplate.querySelector('.popup__text--address').textContent = offers[adNumber].offer.address;
  //Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь»
  similarTemplate.querySelector('.popup__text--price').innerHTML = `${offers[adNumber].offer.price} <span>₽/ночь</span>`;
  //В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями...
  similarTemplate.querySelector('.popup__type').textContent = popupTypes[offers[adNumber].offer.type];
  //Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты
  //для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей»
  similarTemplate.querySelector('.popup__text--capacity').textContent = `${offers[adNumber].offer.rooms} комнаты для ${offers[adNumber].offer.guests} гостей`;
  //Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида
  //Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00»
  similarTemplate.querySelector('.popup__text--time').textContent = `Заезд после ${offers[adNumber].offer.checkin}, выезд до ${offers[adNumber].offer.checkout}`;
  //В список .popup__features выведите все доступные удобства в объявлении
  const popupFeatures = offers[adNumber].offer.features;
  const featuresContainer = similarTemplate.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    const isNecessary = popupFeatures.some(
      (popupFeature) => featuresListItem.classList.contains(`popup__feature--${popupFeature}`),
    );

    if (!isNecessary) {
      featuresListItem.remove();
    }
  });
  //В блок .popup__description выведите описание объекта недвижимости offer.description.
  const popupDescription = similarTemplate.querySelector('.popup__description');
  popupDescription.textContent = offers[adNumber].offer.description;
  if (!popupDescription.textContent) {
    popupDescription.remove();
  }
  //В блок .popup__photos выведите все фотографии из списка offer.photos.
  //Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
  const popupPhoto = similarTemplate.querySelector('.popup__photo');
  popupPhoto.src = offers[adNumber].offer.photos[0];
  const popupPhotos = similarTemplate.querySelector('.popup__photos');
  for (let j = 1; j < offers[adNumber].offer.photos.length; j++) {
    const clonedPhoto = popupPhoto.cloneNode(true);
    clonedPhoto.src = offers[adNumber].offer.photos[j];
    popupPhotos.appendChild(clonedPhoto);
  }
  // Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar
  similarTemplate.querySelector('img').src = offers[adNumber].author.avatar;

  mapCanvas.appendChild(similarTemplate);
};
similarTemplateFunction(1); //порядковый номер объявления, выводимого в шаблоне
