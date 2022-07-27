import {getData} from './api.js';
import {map, markerGroup, createCustomPopup, pinIcon, MAP_ADS_COUNT} from './map.js';

const filterform = document.querySelector('.map__filters');
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
const typeFunction = (lastArray, value) => {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter(function(val) {
    return val.offer.type == value;
    });
  }
  return step;
}

const roomFunction = (lastArray, value) => {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter(function(val) {
    return val.offer.rooms == value;
    });
  }
  return step;
}

const guestFunction = (lastArray, value) => {
  let step = lastArray.slice();
  if (value !== 'any') {
    step = lastArray.filter(function(val) {
    return val.offer.guests == value;
    });
  }
  return step;
}

const priceFunction = (lastArray, value) => {
  let step = lastArray.slice();
  if (value === 'low') {
    step = lastArray.filter(function(val) {
      return val.offer.price < '10000';
    });
  }
  if (value === 'middle') {
    step = lastArray.filter(function(val) {
      return '10000' <= val.offer.price < '50000';
    });
  }
  if (value === 'high') {
    step = lastArray.filter(function(val) {
      return val.offer.price >= '50000';
    });
  }
  return step;
}

const featuresFunction = (lastArray, featValue, featName) => {
  let step;
  if (!featValue) {
    step = lastArray.slice();
  } else {
    const nonUndefined = lastArray.filter(function(val) {
    return val.offer.features !== undefined;
    });
    step = nonUndefined.filter(function(val) {
      return (val.offer.features[0] === featName || val.offer.features[1] === featName || val.offer.features[2] === featName || val.offer.features[3] === featName || val.offer.features[4] === featName || val.offer.features[5] === featName);
    });
  }
  return step;
}

// Фильтр
const mainFilter = (ads) => {

  filterform.addEventListener('change', (evt) => {
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
    let finalReturn;

    if (evt.target.id === 'housing-type') {
      finalReturn = featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(guestFunction(roomFunction(priceFunction(typeFunction(ads, typeValue), priceValue), roomValue), guestValue), wifiValue, 'wifi'), dishwasherValue, 'dishwasher'), parkingValue, 'parking'), washerValue, 'washer'), elevatorValue, 'elevator'), conditionerValue, 'conditioner');
    }
    if (evt.target.id === 'housing-price') {
      finalReturn = featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(guestFunction(roomFunction(typeFunction(priceFunction(ads, priceValue), typeValue), roomValue), guestValue), wifiValue, 'wifi'), dishwasherValue, 'dishwasher'), parkingValue, 'parking'), washerValue, 'washer'), elevatorValue, 'elevator'), conditionerValue, 'conditioner');
    }
    if (evt.target.id === 'housing-rooms') {
      finalReturn = featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(guestFunction(priceFunction(typeFunction(roomFunction(ads, roomValue), typeValue), priceValue), guestValue), wifiValue, 'wifi'), dishwasherValue, 'dishwasher'), parkingValue, 'parking'), washerValue, 'washer'), elevatorValue, 'elevator'), conditionerValue, 'conditioner');
    }
    if (evt.target.id === 'housing-guests') {
      finalReturn = featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(roomFunction(priceFunction(typeFunction(guestFunction(ads, guestValue), typeValue), priceValue), roomValue), wifiValue, 'wifi'), dishwasherValue, 'dishwasher'), parkingValue, 'parking'), washerValue, 'washer'), elevatorValue, 'elevator'), conditionerValue, 'conditioner');
    }
    if (evt.target.id === 'filter-wifi') {
      finalReturn = featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(guestFunction(roomFunction(priceFunction(typeFunction(featuresFunction(ads, wifiValue, 'wifi'), typeValue), priceValue), roomValue), guestValue), dishwasherValue, 'dishwasher'), parkingValue, 'parking'), washerValue, 'washer'), elevatorValue, 'elevator'), conditionerValue, 'conditioner');
    }
    if (evt.target.id === 'filter-dishwasher') {
      finalReturn = featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(guestFunction(roomFunction(priceFunction(typeFunction(featuresFunction(ads, dishwasherValue, 'dishwasher'), typeValue), priceValue), roomValue), guestValue), wifiValue, 'wifi'), parkingValue, 'parking'), washerValue, 'washer'), elevatorValue, 'elevator'), conditionerValue, 'conditioner');
    }
    if (evt.target.id === 'filter-parking') {
      finalReturn = featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(guestFunction(roomFunction(priceFunction(typeFunction(featuresFunction(ads, parkingValue, 'parking'), typeValue), priceValue), roomValue), guestValue), wifiValue, 'wifi'), dishwasherValue, 'dishwasher'), washerValue, 'washer'), elevatorValue, 'elevator'), conditionerValue, 'conditioner');
    }
    if (evt.target.id === 'filter-washer') {
      finalReturn = featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(guestFunction(roomFunction(priceFunction(typeFunction(featuresFunction(ads, washerValue, 'parking'), typeValue), priceValue), roomValue), guestValue), wifiValue, 'wifi'), dishwasherValue, 'dishwasher'), parkingValue, 'parking'), elevatorValue, 'elevator'), conditionerValue, 'conditioner');
    }
    if (evt.target.id === 'filter-elevator') {
      finalReturn = featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(guestFunction(roomFunction(priceFunction(typeFunction(featuresFunction(ads, elevatorValue, 'elevator'), typeValue), priceValue), roomValue), guestValue), wifiValue, 'wifi'), dishwasherValue, 'dishwasher'), parkingValue, 'parking'), washerValue, 'washer'), conditionerValue, 'conditioner');
    }
    if (evt.target.id === 'filter-conditioner') {
      finalReturn = featuresFunction(featuresFunction(featuresFunction(featuresFunction(featuresFunction(guestFunction(roomFunction(priceFunction(typeFunction(featuresFunction(ads, conditionerValue, 'conditioner'), typeValue), priceValue), roomValue), guestValue), wifiValue, 'wifi'), dishwasherValue, 'dishwasher'), parkingValue, 'parking'), washerValue, 'washer'), elevatorValue, 'elevator');
    }

    finalReturn = finalReturn.slice(0, MAP_ADS_COUNT);
    console.log(evt.target.id);
    console.log(finalReturn);
  });

};

getData(mainFilter);
