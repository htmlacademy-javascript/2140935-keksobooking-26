import {getData} from './data.js';

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

// Фильтр
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
    console.log(typeValue, priceValue, roomValue, guestValue, wifiValue, dishwasherValue, parkingValue, washerValue, elevatorValue, conditionerValue);

    const typeStep = ads.filter(function(val) {
      if (typeValue === 'any') {
        return ads;
      }
      return val.offer.type == typeValue;
    });

    let priceStep = typeStep.slice();
    if (priceValue == 'low') {
      priceStep = typeStep.filter(function(val) {
        return val.offer.price < '10000';
      });
    }
    if (priceValue == 'middle') {
      priceStep = typeStep.filter(function(val) {
        return '10000' <= val.offer.price < '50000';
      });
    }
    if (priceValue == 'high') {
      priceStep = typeStep.filter(function(val) {
        return val.offer.price >= '50000';
      });
    }

    let roomStep = priceStep.slice();
    if (roomValue !== 'any') {
      roomStep = priceStep.filter(function(val) {
        return val.offer.rooms == roomValue;
      });
    }

    let guestStep = roomStep.slice();
    if (guestValue !== 'any') {
      guestStep = roomStep.filter(function(val) {
        return val.offer.guests == guestValue;
      });
    }

    if (!wifiValue) {
      let wifiStep = guestStep.slice();
    } else {
      const nonUndefined = guestStep.filter(function(val) {
        return val.offer.features !== undefined;
      });
      let wifiStep = nonUndefined.filter(function(val) {
        return (val.offer.features[0] == 'wifi' || val.offer.features[1] == 'wifi' || val.offer.features[2] == 'wifi' || val.offer.features[3] == 'wifi' || val.offer.features[4] == 'wifi' || val.offer.features[5] == 'wifi');
      });
      console.log(wifiStep);
    }
    console.log(wifiStep);

  });

};


/*
    const wifiValue = wifiCheckbox.checked;
    const dishwasherValue = dishwasherCheckbox.checked;
    const parkingValue = parkingCheckbox.checked;
    const washerValue = washerCheckbox.checked;
    const elevatorValue = elevatorCheckbox.checked;
    const conditionerValue = conditionerCheckbox.checked;
*/

getData(adsList);
