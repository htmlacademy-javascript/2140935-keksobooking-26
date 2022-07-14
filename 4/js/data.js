import {getRandomPositiveInteger, getRandomPositiveFloat, compare, booleanRandomArray} from './utils';

// вводные
const value = 10; // к-во объектов размещения
const ads = [];
const maxPrice = 1000;
const maxRooms = 5;
const maxGuests = 20;
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkInOut = ['12:00', '13:00', '14:00'];
const features = ['features', 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const description = ['Очень хорошее место', 'Хороший утренний кофе', 'Вид на закат', 'Вид на рассвет', 'Можно с кошкой', 'Можно с собакой', 'Можно с крокодилом', 'Дом с привидениями', 'Дом с жуками', 'Холодно и гадко']; // проверка по уникальности: к-во описаний >= к-ва объявлений
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

//! основная функция: генерация массива случайных объектов
const generateAds = function() {

  // генерируем массив случайных уникальных ключей для description
  const randomKeys = [];
  let tempKey;
  for (let j = 0; j < value; j++) {
    tempKey = getRandomPositiveInteger(0, description.length - 1);
    if (compare(tempKey, randomKeys)) {
      randomKeys[j] = tempKey;
    } else {
      j--;
    }
  }

  // основной цикл
  for (let i = 0; i < value; i++) {

    // генерируем массив для features
    const randomBooleanFeatures = booleanRandomArray(features.length);
    let featuresItem = [];
    for (let j = 0; j < features.length; j++) {
      if (randomBooleanFeatures[j]) {
        featuresItem = featuresItem.concat(features[j]);
      }
    }

    // генерируем массив для photos
    const randomBooleanPhotos = booleanRandomArray(photos.length);
    let photosItem = [];
    for (let j = 0; j < photos.length; j++) {
      if (randomBooleanPhotos[j]) {
        photosItem = photosItem.concat(photos[j]);
      }
    }

    // генерация кода объекта
    let xx;
    if (i + 1 < 10) {
      xx = `0${i + 1}`;
    } else {
      xx = `${i + 1}`;
    }

    // генерируем координаты
    const lat = getRandomPositiveFloat (35.65000, 35.70000, 5);
    const lng = getRandomPositiveFloat (139.70000, 139.80000, 5);

    // генерация массива объектов
    ads[i] = {
      author: {
        avatar: `img/avatars/user${xx}.png`,
      },
      offer: {
        title: `Апартаменты номер ${xx}`,
        address: `${lat}, ${lng}`,
        price: getRandomPositiveInteger(1, maxPrice),
        type: types[getRandomPositiveInteger(0, types.length - 1)],
        rooms: getRandomPositiveInteger(1, maxRooms),
        guests: getRandomPositiveInteger(1, maxGuests),
        checkin: checkInOut[getRandomPositiveInteger(0, checkInOut.length - 1)],
        checkout: checkInOut[getRandomPositiveInteger(0, checkInOut.length - 1)],
        features: featuresItem,
        description: description[randomKeys[i]],
        photos: photosItem,
      },
      location: {
        lat: lat,
        lng: lng
      }
    };

  }
  return ads;
};

export {generateAds};
