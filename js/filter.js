import {getData} from './api.js';
import {map, markerGroupLayer, createCustomPopup, pinIcon, MAP_ADS_COUNT} from './map.js';
import {debounce} from './utils.js';

const PRICE_MIDDLE = 10000;
const PRICE_HIGH = 50000;
const filterFormElement = document.querySelector('.map__filters');
const typeElement = document.querySelector('#housing-type');
const priceElement = document.querySelector('#housing-price');
const roomElement = document.querySelector('#housing-rooms');
const guestElement = document.querySelector('#housing-guests');
const checkedFeaturesElement = () => {
  const checkboxesElements = document.querySelectorAll('.map__checkbox');
  const checkboxesElementsChecked = [];
  for (let index = 0; index < checkboxesElements.length; index++) {
    if (checkboxesElements[index].checked) {
      checkboxesElementsChecked.push(checkboxesElements[index].value);
    }
  }
  return checkboxesElementsChecked;
};
let filterGroupLayer;

// Функции фильтрации
const filterType = (lastArray, value) => {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter((val) => val.offer.type === value);
  }
  return step;
};

const filterGuest = (lastArray, value) => {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter((val)=>val.offer.guests === Number(value));
  }
  return step;
};

const filterRoom = (lastArray, value) => {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter((val)=>val.offer.rooms === Number(value));
  }
  return step;
};

const filterPrice = (lastArray, value) => {
  let step = lastArray.slice();
  if (value === 'low') {
    step = lastArray.filter((val) => val.offer.price < PRICE_MIDDLE);
  }
  if (value === 'middle') {
    step = lastArray.filter((val) => PRICE_MIDDLE <= val.offer.price && val.offer.price < PRICE_HIGH);
  }
  if (value === 'high') {
    step = lastArray.filter((val) => val.offer.price >= PRICE_HIGH);
  }
  return step;
};

const filterFeatures = (lastArray, featuresList) => lastArray.filter((val) => {
  const current = val.offer.features;
  let find = true;
  featuresList.forEach((feature) => {
    if((current === undefined || current.indexOf(feature) === -1)) {
      find = false;
    }
  });
  return find;
});
const drawMarker = (ads) => {
  const typeValue = typeElement[typeElement.selectedIndex].value;
  const priceValue = priceElement[priceElement.selectedIndex].value;
  const roomValue = roomElement[roomElement.selectedIndex].value;
  const guestValue = guestElement[guestElement.selectedIndex].value;
  let finalReturn;

  const filterSmall = () => {
    finalReturn = ads;
    finalReturn = filterType(finalReturn, typeValue);
    finalReturn = filterRoom(finalReturn, roomValue);
    finalReturn = filterPrice(finalReturn, priceValue);
    finalReturn = filterGuest(finalReturn, guestValue);
    finalReturn = filterFeatures(finalReturn, checkedFeaturesElement());
  };
  filterSmall();
  finalReturn = finalReturn.slice(0, MAP_ADS_COUNT);

  // удаляю старые слои
  if (markerGroupLayer) {
    markerGroupLayer.clearLayers();
  }

  if (filterGroupLayer) {
    filterGroupLayer.clearLayers();
  }

  // вывожу на карту
  filterGroupLayer = L.layerGroup()
    .addTo(map);

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
      .addTo(filterGroupLayer)
      .bindPopup(createCustomPopup(element));
  };

  finalReturn.forEach((element) => {
    createMarker(element);
  });

  // сброс балунов фильтрации при Reset
  filterFormElement.addEventListener('reset', () => {
    if (filterGroupLayer) {
      filterGroupLayer.clearLayers();
    }
  });

}
// Фильтр
const filterAll = (ads) => {
  //первоночально отрисовываю
  drawMarker(ads);
  filterFormElement.addEventListener('change', debounce(() => drawMarker(ads)));

};

const showError = () => {};

getData(filterAll, showError);

export {filterFormElement};
