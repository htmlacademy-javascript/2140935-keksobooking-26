import {formInactive, formActive} from './form.js';
import {generateAds} from './data.js';
const offers = generateAds();

formInactive();

const map = L.map('map-canvas')
  .on('load', () => {
    formActive();
  })
  .setView({
    lat: 35.677000,
    lng: 139.754000,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// главная метка
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68061,
    lng: 139.7541,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const addressField = document.querySelector('#address');

mainPinMarker.on('moveend', (evt) => {
  addressField.value = evt.target.getLatLng();
});

// остальные метки
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [26, 52],
});

// Типы жилья
const popupTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel:  'Отель'
};

const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('img').src = point.author.avatar;
  popupElement.querySelector('.popup__title').textContent = point.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = `Координаты: ${point.location.lat}, ${point.location.lng}`;
  popupElement.querySelector('.popup__text--price').innerHTML = `${point.offer.price} <span>₽/ночь</span>`;
  popupElement.querySelector('.popup__type').textContent = popupTypes[point.offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  //features
  const popupFeatures = point.offer.features;
  const featuresContainer = popupElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    const isNecessary = popupFeatures.some(
      (popupFeature) => featuresListItem.classList.contains(`popup__feature--${popupFeature}`),
    );

    if (!isNecessary) {
      featuresListItem.remove();
    }
  });
  //description
  const popupDescription = popupElement.querySelector('.popup__description');
  popupDescription.textContent = point.offer.description;
  if (!popupDescription.textContent) {
    popupDescription.remove();
  }
  //фотографии.
  const popupPhoto = popupElement.querySelector('.popup__photo');
  popupPhoto.src = point.offer.photos[0];
  const popupPhotos = popupElement.querySelector('.popup__photos');
  for (let j = 1; j < point.offer.photos.length; j++) {
    const clonedPhoto = popupPhoto.cloneNode(true);
    clonedPhoto.src = point.offer.photos[j];
    popupPhotos.appendChild(clonedPhoto);
  }
  return popupElement;
};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (element) => {
  const randomLat = element.location.lat;
  const randomLng = element.location.lng;

  const pinMarker = L.marker(
    {
      lat: randomLat,
      lng: randomLng,
    },
    {
      draggable: false,
      icon: pinIcon,
    },
  );

  pinMarker
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(element));
};

offers.forEach((element) => {
  createMarker(element);
});

//markerGroup.clearLayers();
