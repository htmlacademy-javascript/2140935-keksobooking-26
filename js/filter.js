import {getData} from './api.js';
import {map, markerGroup, createCustomPopup, pinIcon, MAP_ADS_COUNT} from './map.js';
import {debounce} from  './utils.js';

const filterform = document.querySelector('.map__filters');
const typeSelector = document.querySelector('#housing-type');
const priceSelector = document.querySelector('#housing-price');
const roomSelector = document.querySelector('#housing-rooms');
const guestSelector = document.querySelector('#housing-guests');
const features = () => {
  const checkboxes = document.querySelectorAll('.map__checkbox');
  const checkboxesChecked = [];
  for (let index = 0; index < checkboxes.length; index++) {
    if (checkboxes[index].checked) {
      checkboxesChecked.push(checkboxes[index].value);
    }
  }
  return checkboxesChecked;
};
let filterGroup;

// Функции фильтрации
const typeFunction = (lastArray, value) => {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter((val) => val.offer.type === value);
  }
  return step;
};

const guestFunction = (lastArray, value) => {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter((val)=>val.offer.guests === Number(value));
  }
  return step;
};

const roomFunction = (lastArray, value) => {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter((val)=>val.offer.rooms === Number(value));
  }
  return step;
};

const priceFunction = (lastArray, value) => {
  let step = lastArray.slice();
  if (value === 'low') {
    step = lastArray.filter((val) => val.offer.price < '10000');
  }
  if (value === 'middle') {
    step = lastArray.filter((val) => '10000' <= val.offer.price && val.offer.price < '50000');
  }
  if (value === 'high') {
    step = lastArray.filter((val) => val.offer.price >= '50000');
  }
  return step;
};

const featuresFunction = (lastArray, featuresList) => {
  const step = lastArray.filter((val) => {
    const current = val.offer.features;
    let find = true;
    featuresList.forEach((feature) => {
      if((current===undefined || current.indexOf(feature)===-1)) {
        find = false;
      }
    });
    return find;
  });
  return step;
};

// Фильтр
const mainFilter = (ads) => {
  filterform.addEventListener('change', debounce(() => {
    const typeValue = typeSelector[typeSelector.selectedIndex].value;
    const priceValue = priceSelector[priceSelector.selectedIndex].value;
    const roomValue = roomSelector[roomSelector.selectedIndex].value;
    const guestValue = guestSelector[guestSelector.selectedIndex].value;
    let finalReturn;

    const filterSmall = () => {
      finalReturn = ads;
      finalReturn = typeFunction(finalReturn, typeValue);
      finalReturn = roomFunction(finalReturn, roomValue);
      finalReturn = priceFunction(finalReturn, priceValue);
      finalReturn = guestFunction(finalReturn, guestValue);
      finalReturn = featuresFunction(finalReturn, features());
    };
    filterSmall();
    finalReturn = finalReturn.slice(0, MAP_ADS_COUNT);

    // удаляю старые слои
    if (markerGroup) {
      markerGroup.clearLayers();
    }

    if (filterGroup) {
      filterGroup.clearLayers();
    }

    // вывожу на карту

    filterGroup = L.layerGroup().addTo(map);

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
        .addTo(filterGroup)
        .bindPopup(createCustomPopup(element));
    };

    finalReturn.forEach((element) => {
      createMarker(element);
    });

  }));

};
const showError = () => {};

getData(mainFilter, showError);
