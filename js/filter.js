import {getData} from './api.js';
import {map, markerGroup, createCustomPopup, MAP_ADS_COUNT} from './map.js';

const typeSelector = document.querySelector('#housing-type');
const priceSelector = document.querySelector('#housing-price');
const roomSelector = document.querySelector('#housing-rooms');
const guestSelector = document.querySelector('#housing-guests');
const wifiCheckbox = document.querySelector('#filter-wifi');
const dishwasherCheckbox = document.querySelector('#filter-dishwasher');
const parkingCheckbox = document.querySelector('#filter-parking');
const washerCheckbox = document.querySelector('#filter-washer');
const elevatorCheckbox = document.querySelector('#filter-elevator');
const conditionerCheckbox = document.querySelector('#filter-conditioner');

// Функции фильтрации
const typeFunction = function (lastArray, value) {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter(function(val) {
    return val.offer.type == value;
    });
  }
  return step;
}

const roomFunction = function (lastArray, value) {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter(function(val) {
    return val.offer.rooms == value;
    });
  }
  return step;
}

const guestFunction = function (lastArray, value) {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter(function(val) {
    return val.offer.guests == value;
    });
  }
  return step;
}

const priceFunction = function (lastArray, value) {
  let step = lastArray.slice();
  if (value == 'low') {
    step = lastArray.filter(function(val) {
      return val.offer.price < '10000';
    });
  }
  if (value == 'middle') {
    step = lastArray.filter(function(val) {
      return '10000' <= val.offer.price < '50000';
    });
  }
  if (value == 'high') {
    step = lastArray.filter(function(val) {
      return val.offer.price >= '50000';
    });
  }
  return step;
}

const featuresFunction = function (lastArray, featValue, featName) {
  let step;
  if (!featValue) {
    step = lastArray.slice();
  } else {
    const nonUndefined = lastArray.filter(function(val) {
    return val.offer.features !== undefined;
    });
    step = nonUndefined.filter(function(val) {
      return (val.offer.features[0] == featName || val.offer.features[1] == featName || val.offer.features[2] == featName || val.offer.features[3] == featName || val.offer.features[4] == featName || val.offer.features[5] == featName);
    });
  }
  return step;
}

// Фильтры
const adsList = (ads) => {

  typeSelector.addEventListener('change', () => {
    const typeValue = typeSelector[typeSelector.selectedIndex].value;
    const priceValue = priceSelector[priceSelector.selectedIndex].value;
    const roomValue = roomSelector[roomSelector.selectedIndex].value;
    const guestValue = guestSelector[guestSelector.selectedIndex].value;
    const wifiValue = wifiCheckbox.checked;
    const dishwasherValue = dishwasherCheckbox.checked;
    const parkingValue = parkingCheckbox.checked;
    const washerValue = washerCheckbox.checked;
    const elevatorValue = elevatorCheckbox.checked;
    const conditionerValue = conditionerCheckbox.checked;
    // фильтрация по типу жилья
    const typeStep = priceFunction(ads, typeValue);
    const priceStep = priceFunction(typeStep, priceValue);
    const roomStep = roomFunction(priceStep, roomValue);
    const guestStep = guestFunction(roomStep, guestValue);
    const wifiStep = featuresFunction(guestStep, wifiValue, 'wifi');
    const dishwasherStep = featuresFunction(wifiStep, dishwasherValue, 'dishwasher');
    const parkingStep = featuresFunction(dishwasherStep, parkingValue, 'parking');
    const washerStep = featuresFunction(parkingStep, washerValue, 'washer');
    const elevatorStep = featuresFunction(washerStep, elevatorValue, 'elevator');
    const conditionerStep = featuresFunction(elevatorStep, conditionerValue, 'conditioner');
    const filterReturn = conditionerStep.slice(0, MAP_ADS_COUNT);
    console.log(filterReturn);
    markerGroup.clearLayers();
    // пытаюсь вывести на карту, не выводится

    const filterGroup = L.layerGroup().addTo(map);

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

    const offers = (filterReturn) => {
      filterReturn.forEach((element) => {
        createMarker(element);
    });
    };

  });

  priceSelector.addEventListener('change', () => {
    const typeValue = typeSelector[typeSelector.selectedIndex].value;
    const priceValue = priceSelector[priceSelector.selectedIndex].value;
    const roomValue = roomSelector[roomSelector.selectedIndex].value;
    const guestValue = guestSelector[guestSelector.selectedIndex].value;
    const wifiValue = wifiCheckbox.checked;
    const dishwasherValue = dishwasherCheckbox.checked;
    const parkingValue = parkingCheckbox.checked;
    const washerValue = washerCheckbox.checked;
    const elevatorValue = elevatorCheckbox.checked;
    const conditionerValue = conditionerCheckbox.checked;
    // фильтрация по цене
    const priceStep = priceFunction(ads, priceValue);
    const typeStep = typeFunction(priceStep, typeValue);
    const roomStep = roomFunction(typeStep, roomValue);
    const guestStep = guestFunction(roomStep, guestValue);
    const wifiStep = featuresFunction(guestStep, wifiValue, 'wifi');
    const dishwasherStep = featuresFunction(wifiStep, dishwasherValue, 'dishwasher');
    const parkingStep = featuresFunction(dishwasherStep, parkingValue, 'parking');
    const washerStep = featuresFunction(parkingStep, washerValue, 'washer');
    const elevatorStep = featuresFunction(washerStep, elevatorValue, 'elevator');
    const conditionerStep = featuresFunction(elevatorStep, conditionerValue, 'conditioner');
    const filterReturn = conditionerStep.slice(0, MAP_ADS_COUNT);
    console.log(filterReturn);
  });

  roomSelector.addEventListener('change', () => {
    const typeValue = typeSelector[typeSelector.selectedIndex].value;
    const priceValue = priceSelector[priceSelector.selectedIndex].value;
    const roomValue = roomSelector[roomSelector.selectedIndex].value;
    const guestValue = guestSelector[guestSelector.selectedIndex].value;
    const wifiValue = wifiCheckbox.checked;
    const dishwasherValue = dishwasherCheckbox.checked;
    const parkingValue = parkingCheckbox.checked;
    const washerValue = washerCheckbox.checked;
    const elevatorValue = elevatorCheckbox.checked;
    const conditionerValue = conditionerCheckbox.checked;
    // фильтрация по к-ву комнат
    const roomStep = roomFunction(ads, roomValue);
    const typeStep = typeFunction(roomStep, typeValue);
    const priceStep = priceFunction(typeStep, priceValue);
    const guestStep = guestFunction(priceStep, guestValue);
    const wifiStep = featuresFunction(guestStep, wifiValue, 'wifi');
    const dishwasherStep = featuresFunction(wifiStep, dishwasherValue, 'dishwasher');
    const parkingStep = featuresFunction(dishwasherStep, parkingValue, 'parking');
    const washerStep = featuresFunction(parkingStep, washerValue, 'washer');
    const elevatorStep = featuresFunction(washerStep, elevatorValue, 'elevator');
    const conditionerStep = featuresFunction(elevatorStep, conditionerValue, 'conditioner');
    const filterReturn = conditionerStep.slice(0, MAP_ADS_COUNT);
    console.log(filterReturn);
  });

  guestSelector.addEventListener('change', () => {
    const typeValue = typeSelector[typeSelector.selectedIndex].value;
    const priceValue = priceSelector[priceSelector.selectedIndex].value;
    const roomValue = roomSelector[roomSelector.selectedIndex].value;
    const guestValue = guestSelector[guestSelector.selectedIndex].value;
    const wifiValue = wifiCheckbox.checked;
    const dishwasherValue = dishwasherCheckbox.checked;
    const parkingValue = parkingCheckbox.checked;
    const washerValue = washerCheckbox.checked;
    const elevatorValue = elevatorCheckbox.checked;
    const conditionerValue = conditionerCheckbox.checked;
    // фильтр по к-ву гостей
    const guestStep = guestFunction(ads, guestValue);
    const typeStep = typeFunction(guestStep, typeValue);
    const priceStep = priceFunction(typeStep, priceValue);
    const roomStep = roomFunction(priceStep, roomValue);
    const wifiStep = featuresFunction(roomStep, wifiValue, 'wifi');
    const dishwasherStep = featuresFunction(wifiStep, dishwasherValue, 'dishwasher');
    const parkingStep = featuresFunction(dishwasherStep, parkingValue, 'parking');
    const washerStep = featuresFunction(parkingStep, washerValue, 'washer');
    const elevatorStep = featuresFunction(washerStep, elevatorValue, 'elevator');
    const conditionerStep = featuresFunction(elevatorStep, conditionerValue, 'conditioner');
    const filterReturn = conditionerStep.slice(0, MAP_ADS_COUNT);
    console.log(filterReturn);
  });

  wifiCheckbox.addEventListener('change', () => {
    const typeValue = typeSelector[typeSelector.selectedIndex].value;
    const priceValue = priceSelector[priceSelector.selectedIndex].value;
    const roomValue = roomSelector[roomSelector.selectedIndex].value;
    const guestValue = guestSelector[guestSelector.selectedIndex].value;
    const wifiValue = wifiCheckbox.checked;
    const dishwasherValue = dishwasherCheckbox.checked;
    const parkingValue = parkingCheckbox.checked;
    const washerValue = washerCheckbox.checked;
    const elevatorValue = elevatorCheckbox.checked;
    const conditionerValue = conditionerCheckbox.checked;
    // фильтрация вайфай
    const wifiStep = featuresFunction(ads, wifiValue, 'wifi');
    const typeStep = typeFunction(wifiStep, typeValue);
    const priceStep = priceFunction(typeStep, priceValue);
    const roomStep = roomFunction(priceStep, roomValue);
    const guestStep = guestFunction(roomStep, guestValue);
    const dishwasherStep = featuresFunction(guestStep, dishwasherValue, 'dishwasher');
    const parkingStep = featuresFunction(dishwasherStep, parkingValue, 'parking');
    const washerStep = featuresFunction(parkingStep, washerValue, 'washer');
    const elevatorStep = featuresFunction(washerStep, elevatorValue, 'elevator');
    const conditionerStep = featuresFunction(elevatorStep, conditionerValue, 'conditioner');
    const filterReturn = conditionerStep.slice(0, MAP_ADS_COUNT);
    console.log(filterReturn);
  });

  dishwasherCheckbox.addEventListener('change', () => {
    const typeValue = typeSelector[typeSelector.selectedIndex].value;
    const priceValue = priceSelector[priceSelector.selectedIndex].value;
    const roomValue = roomSelector[roomSelector.selectedIndex].value;
    const guestValue = guestSelector[guestSelector.selectedIndex].value;
    const wifiValue = wifiCheckbox.checked;
    const dishwasherValue = dishwasherCheckbox.checked;
    const parkingValue = parkingCheckbox.checked;
    const washerValue = washerCheckbox.checked;
    const elevatorValue = elevatorCheckbox.checked;
    const conditionerValue = conditionerCheckbox.checked;
    // фильтрация dishwasher
    const dishwasherStep = featuresFunction(ads, dishwasherValue, 'dishwasher');
    const typeStep = typeFunction(dishwasherStep, typeValue);
    const priceStep = priceFunction(typeStep, priceValue);
    const roomStep = roomFunction(priceStep, roomValue);
    const guestStep = guestFunction(roomStep, guestValue);
    const wifiStep = featuresFunction(guestStep, wifiValue, 'wifi');
    const parkingStep = featuresFunction(wifiStep, parkingValue, 'parking');
    const washerStep = featuresFunction(parkingStep, washerValue, 'washer');
    const elevatorStep = featuresFunction(washerStep, elevatorValue, 'elevator');
    const conditionerStep = featuresFunction(elevatorStep, conditionerValue, 'conditioner');
    const filterReturn = conditionerStep.slice(0, MAP_ADS_COUNT);
    console.log(filterReturn);
  });

  parkingCheckbox.addEventListener('change', () => {
    const typeValue = typeSelector[typeSelector.selectedIndex].value;
    const priceValue = priceSelector[priceSelector.selectedIndex].value;
    const roomValue = roomSelector[roomSelector.selectedIndex].value;
    const guestValue = guestSelector[guestSelector.selectedIndex].value;
    const wifiValue = wifiCheckbox.checked;
    const dishwasherValue = dishwasherCheckbox.checked;
    const parkingValue = parkingCheckbox.checked;
    const washerValue = washerCheckbox.checked;
    const elevatorValue = elevatorCheckbox.checked;
    const conditionerValue = conditionerCheckbox.checked;
    // фильтрация parking
    const parkingStep = featuresFunction(ads, parkingValue, 'parking');
    const typeStep = typeFunction(parkingStep, typeValue);
    const priceStep = priceFunction(typeStep, priceValue);
    const roomStep = roomFunction(priceStep, roomValue);
    const guestStep = guestFunction(roomStep, guestValue);
    const wifiStep = featuresFunction(guestStep, wifiValue, 'wifi');
    const dishwasherStep = featuresFunction(wifiStep, dishwasherValue, 'dishwasher');
    const washerStep = featuresFunction(dishwasherStep, washerValue, 'washer');
    const elevatorStep = featuresFunction(washerStep, elevatorValue, 'elevator');
    const conditionerStep = featuresFunction(elevatorStep, conditionerValue, 'conditioner');
    const filterReturn = conditionerStep.slice(0, MAP_ADS_COUNT);
    console.log(filterReturn);
  });

  washerCheckbox.addEventListener('change', () => {
    const typeValue = typeSelector[typeSelector.selectedIndex].value;
    const priceValue = priceSelector[priceSelector.selectedIndex].value;
    const roomValue = roomSelector[roomSelector.selectedIndex].value;
    const guestValue = guestSelector[guestSelector.selectedIndex].value;
    const wifiValue = wifiCheckbox.checked;
    const dishwasherValue = dishwasherCheckbox.checked;
    const parkingValue = parkingCheckbox.checked;
    const washerValue = washerCheckbox.checked;
    const elevatorValue = elevatorCheckbox.checked;
    const conditionerValue = conditionerCheckbox.checked;
    // фильтрация washer
    const washerStep = featuresFunction(ads, washerValue, 'parking');
    const typeStep = typeFunction(washerStep, typeValue);
    const priceStep = priceFunction(typeStep, priceValue);
    const roomStep = roomFunction(priceStep, roomValue);
    const guestStep = guestFunction(roomStep, guestValue);
    const wifiStep = featuresFunction(guestStep, wifiValue, 'wifi');
    const dishwasherStep = featuresFunction(wifiStep, dishwasherValue, 'dishwasher');
    const parkingStep = featuresFunction(dishwasherStep, parkingValue, 'parking');
    const elevatorStep = featuresFunction(parkingStep, elevatorValue, 'elevator');
    const conditionerStep = featuresFunction(elevatorStep, conditionerValue, 'conditioner');
    const filterReturn = conditionerStep.slice(0, MAP_ADS_COUNT);
    console.log(filterReturn);
  });

  elevatorCheckbox.addEventListener('change', () => {
    const typeValue = typeSelector[typeSelector.selectedIndex].value;
    const priceValue = priceSelector[priceSelector.selectedIndex].value;
    const roomValue = roomSelector[roomSelector.selectedIndex].value;
    const guestValue = guestSelector[guestSelector.selectedIndex].value;
    const wifiValue = wifiCheckbox.checked;
    const dishwasherValue = dishwasherCheckbox.checked;
    const parkingValue = parkingCheckbox.checked;
    const washerValue = washerCheckbox.checked;
    const elevatorValue = elevatorCheckbox.checked;
    const conditionerValue = conditionerCheckbox.checked;
    // фильтрация elevator
    const elevatorStep = featuresFunction(ads, elevatorValue, 'elevator');
    const typeStep = typeFunction(elevatorStep, typeValue);
    const priceStep = priceFunction(typeStep, priceValue);
    const roomStep = roomFunction(priceStep, roomValue);
    const guestStep = guestFunction(roomStep, guestValue);
    const wifiStep = featuresFunction(guestStep, wifiValue, 'wifi');
    const dishwasherStep = featuresFunction(wifiStep, dishwasherValue, 'dishwasher');
    const parkingStep = featuresFunction(dishwasherStep, parkingValue, 'parking');
    const washerStep = featuresFunction(parkingStep, washerValue, 'washer');
    const conditionerStep = featuresFunction(washerStep, conditionerValue, 'conditioner');
    const filterReturn = conditionerStep.slice(0, MAP_ADS_COUNT);
    console.log(filterReturn);
  });

  conditionerCheckbox.addEventListener('change', () => {
    const typeValue = typeSelector[typeSelector.selectedIndex].value;
    const priceValue = priceSelector[priceSelector.selectedIndex].value;
    const roomValue = roomSelector[roomSelector.selectedIndex].value;
    const guestValue = guestSelector[guestSelector.selectedIndex].value;
    const wifiValue = wifiCheckbox.checked;
    const dishwasherValue = dishwasherCheckbox.checked;
    const parkingValue = parkingCheckbox.checked;
    const washerValue = washerCheckbox.checked;
    const elevatorValue = elevatorCheckbox.checked;
    const conditionerValue = conditionerCheckbox.checked;
    // фильтрация conditioneer
    const conditionerStep = featuresFunction(ads, conditionerValue, 'conditioner');
    const typeStep = typeFunction(conditionerStep, typeValue);
    const priceStep = priceFunction(typeStep, priceValue);
    const roomStep = roomFunction(priceStep, roomValue);
    const guestStep = guestFunction(roomStep, guestValue);
    const wifiStep = featuresFunction(guestStep, wifiValue, 'wifi');
    const dishwasherStep = featuresFunction(wifiStep, dishwasherValue, 'dishwasher');
    const parkingStep = featuresFunction(dishwasherStep, parkingValue, 'parking');
    const washerStep = featuresFunction(parkingStep, washerValue, 'washer');
    const elevatorStep = featuresFunction(washerStep, elevatorValue, 'elevator');
    const filterReturn = elevatorStep.slice(0, MAP_ADS_COUNT);
    console.log(filterReturn);
  });
};

getData(adsList);
