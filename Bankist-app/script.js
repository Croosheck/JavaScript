'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 0.012,
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 0.015,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.007,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 0.01,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnRefresh = document.querySelector('.button--refresh');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////////////////////////

let sum;
// Present state of sorting
let state = 0;

// Creating a login for each user (1st way)
// accounts.forEach(function (obj) {
// const own = obj.owner
// const arr = own.split(" ")
// let login = ""
// arr.forEach(function (el) {
// login += el.charAt(0).toLowerCase();
// })
// // console.log(login);
// })

// Creating a login for each user (2nd way)
const users = new Map();
for (const el of accounts) {
  let login = '';
  let own = el.owner.split(' ');
  own.forEach(function (el1) {
    login += el1.charAt(0).toLowerCase();
  });
  users.set(login, el);
  // console.log(login, el);
}
console.log(users);

// Displays all labels
let incomes = 0;
let outcomes = 0;
let interest = 0;
let SumInterest = 0;
const displayMovements = function (movements, sort = false) {
  // Empty entire container, before adding new elements
  containerMovements.innerHTML = '';
  // Setting the main date
  const today = new Date();
  const showDate = new Intl.DateTimeFormat(navigator.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
    weekday: 'long',
  }).format(today);
  // Adding new elements to the container
  movements.forEach(function (mov, i) {
    const type = mov < 0 ? 'withdrawal' : 'deposit';
    // Setting dates on the container
    let time =
      String(today.getDate()).padStart(2, '0') +
      '/' +
      String(today.getMonth()).padStart(2, '0') +
      '/' +
      String(today.getFullYear()).padStart(2, '0') +
      ' ' +
      String(today.getHours()).padStart(2, '0') +
      ':' +
      String(today.getMinutes()).padStart(2, '0') +
      ':' +
      String(today.getSeconds()).padStart(2, '0');

    const html = `
  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type.toUpperCase()}</div>
          <div class="movements__date">${time}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  // Filters, adds and displays incomes and outcomes
  const calcDisplaySummary = function (movements) {
    incomes = movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    outcomes = movements
      .filter(mov => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    interest = movements
      .filter(mov => mov > 0)
      .map(mov => mov * users.get(activeUser).interestRate)
      .reduce((acc, int) => acc + int, 0);
    return incomes, outcomes, interest;
  };
  calcDisplaySummary(users.get(activeUser).movements);

  labelBalance.textContent = sum.toFixed(2) + '€';
  labelSumIn.textContent = incomes.toFixed(2) + '€';
  labelSumOut.textContent = Math.abs(outcomes).toFixed(2) + '€';
  labelSumInterest.textContent = interest.toFixed(2) + '€';
  labelDate.textContent = showDate;
};

//Setting the timer function
let timer;
const setTimer = function () {
  //Setting the timer
  let minutes = 5;
  let seconds = 0;
  labelTimer.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;
  timer = setInterval(() => {
    if (seconds !== 0) {
      String(seconds).padStart(2, '0');
      labelTimer.textContent = `${minutes}:${String(--seconds).padStart(
        2,
        '0'
      )}`;
    } else if (seconds === 0) {
      seconds = 59;
      labelTimer.textContent = `${--minutes}:${String(seconds).padStart(
        2,
        '0'
      )}`;
    }
    if (seconds === 0 && minutes === 0) {
      clearInterval(timer);
      containerApp.style.opacity = '0';
      labelWelcome.textContent = `You have been logged out!`;
    }
    btnRefresh.addEventListener('click', function () {
      clearInterval(timer);
      setTimer();
    });
  }, 1000);
};

// Logging into the account
let activeUser = '';
btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();

  if (
    users.has(inputLoginUsername.value) &&
    inputLoginPin.value == users.get(inputLoginUsername.value).pin
  ) {
    activeUser = inputLoginUsername.value;
    containerApp.style.opacity = '100';
    //Total sum of all array elements
    sum = users.get(activeUser).movements.reduce(function (total, a) {
      return total + a;
    }, 0);
    displayMovements(users.get(activeUser).movements);
    labelWelcome.textContent = `Hello, ${
      users.get(inputLoginUsername.value).owner.split(' ')[0]
    }!`;
    inputLoginPin.value = inputLoginUsername.value = '';

    //Clearing the focus on the field
    inputLoginPin.blur();
    inputLoginUsername.blur();

    //Refreshing the timer, in case another user logs in
    if (timer) clearInterval(timer);
    setTimer();
  }
});

// Current day
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;

// Transferring money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(account1.movements)
  let acc = inputTransferTo.value;
  if (
    users.has(acc) &&
    acc !== activeUser &&
    sum >= Number(inputTransferAmount.value)
  ) {
    sum -= Number(inputTransferAmount.value);
    labelBalance.textContent = sum + '€';
    // Sender
    users
      .get(activeUser)
      .movements.push(-Math.abs(Number(inputTransferAmount.value)));
    // Receiver
    users.get(acc).movements.push(Number(inputTransferAmount.value));
    state = 0;
    displayMovements(users.get(activeUser).movements);
  }
});

// Loan requesting
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputLoanAmount.value > 0) {
    users.get(activeUser).movements.push(Number(inputLoanAmount.value));
    sum += Number(inputLoanAmount.value);
    state = 0;
    displayMovements(users.get(activeUser).movements);
  }
});

// Closing the account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    users.has(inputCloseUsername.value) &&
    inputClosePin.value == users.get(inputCloseUsername.value).pin &&
    inputCloseUsername.value === activeUser
  ) {
    users.delete(inputCloseUsername.value);
    containerApp.style.opacity = '0';
    inputClosePin.value = '';
    inputCloseUsername.value = '';
    state = 0;
  }
});

// Sorting
let movs;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  if (state === 0) {
    movs = users
      .get(activeUser)
      .movements.slice()
      .sort((a, b) => a - b);
    displayMovements(movs);
    state = 1;
  } else if (state === 1) {
    users.get(activeUser).movements;
    displayMovements(users.get(activeUser).movements);
    state = 0;
  }
});
