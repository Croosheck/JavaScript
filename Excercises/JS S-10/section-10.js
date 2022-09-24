'use strict';

// const createBooking = function (
//   flightNum = 'LH123',
//   numPassengers = 15,
//   price = 200
// ) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
// };
// createBooking('LH123', undefined, 150);

/*
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 352394325,
};
const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;
  if (passenger.passport === 352394325) {
    console.log('Checked in');
  } else {
    console.log('Wrong passport!');
  }
};
checkIn(flight, jonas);
console.log(flight);
console.log(jonas);
*/

/*
// "Lower-order" functions (low abstraction)
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function (high abstraction)
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};
// CALLBACK FUNCTIONS
transformer('JavaScript is the best!', oneWord) + console.log('');
transformer('JavaScript is the best!', upperFirstWord);
*/

/*
// Displays the square roots of each number, starting from 1, when clicking
let value = 0;
const counter = function (num) {
  value = num ** 2;
};
const avg = function (num) {
  counter(num);
  console.log(`The result of ${num} ^ 2 = ` + value);
};
const workIt = function (num, fn) {
  fn(num);
};
let bottom = 1;
workIt(bottom, avg);

const adder = function () {
  bottom++;
  workIt(bottom, avg);
};
document.body.addEventListener('click', adder);
*/

/*
// .call and .bind methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(1337, 'Ryan Cohen') + '\n';
lufthansa.book(741, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
bookEW(25, 'john');
*/

/*
// Function returning function
const addTax = function (rate) {
  return function (value) {
    return rate * value + value;
  };
};
const newTax = addTax(0.23);
console.log(newTax(100));
*/

/*
//Section 10, Coding Challenge #1
const poll = {
  question: 'What is Your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    return Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
  },
  displayResults() {
    console.log('---- POLL RESULTS ----');
    for (const [i, el] of this.options.entries()) {
      let [a, b] = el.split(' ');
      console.log(`${b}: ${this.answers[i]} vote(s)`);
    }
    console.log('\n');
  },
};

document.querySelector('.poll').addEventListener('click', function () {
  const optionNumber = poll.registerNewAnswer();
  if (
    optionNumber <= 3 &&
    optionNumber >= 0 &&
    typeof optionNumber === 'number'
  ) {
    poll.answers[optionNumber]++;
  } else {
    alert('Type ONLY the number between 0 and 3 ! 🛑');
  }
  poll.displayResults();
});
*/

/*
// Section 10, Coding Challenge #2
let f;
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  f = function () {
    header.style.color = 'blue';
  };
  return document.body.addEventListener('click', f);
})();
*/
