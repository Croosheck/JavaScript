'use strict';
const btn = document.querySelector('.btn-country');
const btnSubmit = document.querySelector('.btn-submit');
const countriesContainer = document.querySelector('.countries');

let html = '';
const inputLatitude = document.querySelector('.input-lat');
const inputLongitude = document.querySelector('.input-lng');

// Gets the current latitude and longitude into variables
const curLat = navigator.geolocation.getCurrentPosition(
  position => position.coords.latitude,
  err => console.error(`${err}: failed to get the current location`)
);
const curLng = navigator.geolocation.getCurrentPosition(
  position => position.coords.longitude,
  err => console.error(`${err}: failed to get the current location`)
);

// Renders the HTML elements
const renderCountry = function (data, className = '') {
  html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

// Current location function
const createFlag = function () {
  countriesContainer.style.transition = '1s';
  countriesContainer.innerHTML = '';
  whereAmI(curLat, curLng);
};

// Coords location function
const createFlagCoords = function () {
  countriesContainer.innerHTML = '';
  if (!inputLatitude.value || !inputLongitude.value) return;
  whereAmI(inputLatitude.value, inputLongitude.value);
  countriesContainer.style.transition = '1s';
};

btnSubmit.addEventListener('click', createFlagCoords);
btn.addEventListener('click', createFlag);

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// Converting the geo coordinates to the country's name (reverse geocode)
const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(response => {
      // See if the fetch's response is ok (=== 200 / true)
      if (!response.ok)
        throw new Error(`Problem with geocoding${response.status}`);
      // console.log(response);
      return response.json();
    })
    .then(data => {
      if (!data.countryName) throw new Error(`No country has been found!`);
      // Get the location data from converted geocode (country and city)
      const country = data.countryName.toLowerCase();
      console.log(
        `You are in ${data.city === '' ? 'unknown_city' : data.city}, in ${
          data.countryName === '' ? 'country' : data.countryName
        }`
      );
      // Use the rendering function
      getCountryData(country);
    })
    // Render possible errors
    .catch(err => {
      console.error(`${err.message} 🧨`);
      countriesContainer.insertAdjacentText(
        'beforeend',
        `Something went wrong. Error: ${err.message}`
      );
      countriesContainer.style.opacity = 1;
    });
};

// Get the desired country's data
const getCountryData = async function (country, x = 'name') {
  // Fetching the URL and then return response.json() Promise
  const data = await getJSON(
    `https://restcountries.com/v2/${x}/${country}`,
    'Country not found'
  );

  try {
    ///// Country 1
    renderCountry(data[0]);

    ///// Country 2
    // See if any neighbour exist and only then execute
    if (data[0].borders) {
      const neighbour = data[0].borders[0];

      // Get the neighbour's data
      const data2 = await getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
      // Render the neighbour
      renderCountry(data2, 'neighbour ');
    }
  } catch (err) {
    renderError(`Something went wrong ${err.message}`);
  }
  countriesContainer.style.opacity = 1;
};

// -33.933 18.474 - Country with a neighbour
// 52.508 13.381 - Country with a neighbour
// -33.865143 151.209900 - No neighbours
