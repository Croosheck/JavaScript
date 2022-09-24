'use strict';
const markers = [];
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnReset = document.querySelector('.btn');
const dltButtons = document.querySelector('.workouts');
const editButtons = document.querySelector('.workouts');

const dur = document.querySelector('.inp-dur');
const dis = document.querySelector('.inp-dis');
const cadel = document.querySelector('.inp-cadel');

class Workout {
  clicks = 0;
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

///////////////////////////////////////////////////////////////
//////////////// APPLICATION ARCHITECTURE ////////////////////
class App {
  #map;
  #mapEvent;
  #workouts = [];
  #date;

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Event handler for 'enter' submitting / .this keyword in event handlers points to the DOM element ('form' in this case)
    form.addEventListener('submit', this._newWorkout.bind(this));

    // Switching input fields (Cadence/Elev Gain)
    inputType.addEventListener('change', this._toggleElevationField.bind(this));

    // Setting the map view on marker
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    // List cleaning
    btnReset.addEventListener('click', this._clearList.bind(this));

    // Button delete workout
    dltButtons.addEventListener('click', this._deleteWorkout.bind(this));

    // Button edit workout
    editButtons.addEventListener('click', this._editWorkout.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      // .bind'ing, because this keyword doesn't exist in regular function calls (getCurrentPosition calls a _loadMap method like a normal function)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get Your position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    // const {lat, lng} = mapE.latlng;
    form.classList.remove('hidden');
    inputDistance.focus();
    this.#mapEvent = mapE;
    // L.marker([lat, lng]).addTo(this.#map)
  }

  _hideForm() {
    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField(e) {
    e.preventDefault();
    inputCadence.closest('div').classList.toggle('form__row--hidden');
    inputElevation.closest('div').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence))
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // Set the time for the marker
    this._getTime();

    let marker2 = new L.marker(workout.coords);
    markers.push(marker2);
    this.#map.addLayer(marker2);

    // Display marker and popup stick to it on map
    marker2
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
          closeOnEscapeKey: true,
          opacity: 1,
          // Setting the popup content
        })
      )
      .setPopupContent(
        `${workout.type.replace(
          workout.type[0],
          workout.type[0].toUpperCase()
        )} on ${this.#date}`
      )
      .openPopup();
  }

  // Rendering a workout on list
  _renderWorkout(workout) {
    // Set the time for the render
    this._getTime();

    let speedRunning;
    let speedUnit;
    if (workout.distance / workout.duration < 1) {
      speedRunning = Math.floor((workout.distance / workout.duration) * 1000);
      speedUnit = 'm/min';
    }
    if (workout.distance / workout.duration >= 1) {
      speedRunning = Math.floor(workout.distance / (workout.duration / 60));
      speedUnit = 'km/h';
    }
    const html = `
            <li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
                <h2 class="workout__title">${workout.type.replace(
                  workout.type[0],
                  workout.type[0].toUpperCase()
                )} on ${this.#date}</div></h2>
                <div class="workout__details">
                    <span class="workout__icon">${
                      workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
                    }</span>
                    <input class="edit__input__value input__hidden inp-dis"><span class="workout__value">${
                      workout.distance
                    }</span></input>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <input class="edit__input__value input__hidden inp-dur"><span class="workout__value">${
                      workout.duration
                    }</span></input>
                    <span class="workout__unit">min</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${
                      workout.type === 'running'
                        ? speedRunning
                        : Math.floor(workout.distance / (workout.duration / 60))
                    }</span>
                    <span class="workout__unit">${
                      workout.type === 'running' ? speedUnit : 'km/h'
                    }</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">${
                      workout.type === 'running' ? '🦶🏼' : '⛰'
                    }</span>
                    <input class="edit__input__value input__hidden inp-cadel"><span class="workout__value">${
                      workout.type === 'running'
                        ? workout.cadence
                        : workout.elevationGain
                    }</span></input>
                    <span class="workout__unit">${
                      workout.type === 'running' ? 'spm' : 'm'
                    }</span>
                </div>
                <button class="remove__btn" data-id="${workout.id}">✘</button>
                <button class="edit__btn data-id="${workout.id}">✐</button>
            </li>
        `;
    // console.log((this.#workouts).find(el => el === workout.id));
    // console.log(workout.id);
    // console.log(containerWorkouts.getElementsByClassName(`workout--${workout.type}`));
    // console.log(document.getElementById(`${workout.id}`))
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl || e.target.className === 'remove__btn') return;
    let workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);

    this.#map.setView(workout.coords, 16, {
      animate: true,
    });
    // workoutEl.setAttribute('id', `${workoutEl.dataset.id}`);
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  _clearList() {
    localStorage.removeItem('workouts');
    location.reload();
  }

  _deleteFromStorage(a) {
    this.#workouts.splice(a, 1);
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  // Create the present time stamp
  _getTime() {
    this.#date = new Intl.DateTimeFormat(navigator.language, {
      day: 'numeric',
      weekday: 'long',
      month: 'long',
    }).format(new Date());
  }

  _deleteWorkout(e) {
    if (!e.target.closest('.remove__btn')) return;

    const workoutEl = e.target.closest('.workout');

    //Deletes workout from list
    workoutEl.remove();

    // Looks for workout from an array which id === clicked workout's id, to get its coords
    let workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);

    // Finds a marker (in array with markers) which coords === workout's coords on list
    let markerToDlt = markers.find(
      obj =>
        [obj._latlng.lat, obj._latlng.lng].join(',') ===
        workout.coords.join(',')
    );

    // Deletes marker from the map
    this.#map.removeLayer(markerToDlt);

    // Gets an array's index and then deletes an element from brower's storage
    let index = this.#workouts.indexOf(workout);

    this._deleteFromStorage(index);
  }

  _editWorkout(e) {
    if (!e.target.closest('.edit__btn')) return;

    const workoutEl = e.target.closest('.workout');
    const value = workoutEl.querySelectorAll('.workout__value');
    const input = workoutEl.querySelectorAll('.edit__input__value');
    [...value].map(el => el.classList.toggle('workout__value__hidden'));
    [...input].map(el => el.classList.toggle('input__hidden'));
    const disMap = [...document.querySelectorAll('.inp-dis')];
    const durMap = [...document.querySelectorAll('.inp-dur')];
    const cadelMap = [...document.querySelectorAll('.inp-cadel')];

    const renderEdit = function (workoutsArr, type, elMap) {
      if (elMap.some(el => el.value))
        return (workoutsArr.find(
          el => el.id === e.target.closest('.workout').dataset.id
        )[type] = Number(elMap.find(el => el.value).value));
    };

    const toggleInput = function (e) {
      if (e.code === 'Enter') {
        [...input].map(el => el.classList.toggle('input__hidden'));
        [...value].map(el => el.classList.toggle('workout__value__hidden'));

        // Prevents from having more than 1 handler attached
        [...input].map(el => el.removeEventListener('keydown', toggleInput));

        // Edits and renders input from fields
        renderEdit(this.#workouts, 'distance', disMap);
        renderEdit(this.#workouts, 'duration', durMap);
        renderEdit(this.#workouts, 'cadence', cadelMap);
        renderEdit(this.#workouts, 'elevationGain', cadelMap);

        // Saves the data inside browser's storage
        this._setLocalStorage();

        // Deletes old workout from list (before editing)
        workoutEl.remove();

        // Renders new, edited workout
        this._renderWorkout(
          this.#workouts.find(
            el => el.id === e.target.closest('.workout').dataset.id
          )
        );

        // Current object being edited
        // console.log(this.#workouts.find(el => el.id === e.target.closest('.workout').dataset.id));
      }
    };

    // Adds an event handler on every input edit field
    [...input].map(el =>
      el.addEventListener('keydown', toggleInput.bind(this))
    );
  }
}

const app = new App();

// document.querySelector('body').addEventListener('click', function (e) {
// console.log(e.target)
// console.log(markers.find(obj => obj._latlng.lat));
// console.log([markers[0]._latlng.lat, markers[0]._latlng.lng]);
// console.log(markers[0]._latlng.lat);
// console.log(markers[0]._latlng.lng);
// });
