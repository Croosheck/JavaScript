"use strict";

// function calcAge(birthYear) {
//     return 2021 - birthYear;
// }
// const years = [1990, 1992, 1995];
// const ages = [calcAge(years[0]), calcAge(years[2]), calcAge(years[years.length - 1])];
// console.log(years, ages);
// years.push(1994);
// const ages1 = [calcAge(years[0]), calcAge(years[2]), calcAge(years[years.length - 1])];
// console.log(years, ages1);

// const jonas = {
// 	firstName: "Jonas",
// 	friends: ["Michael", "Peter", "Steven"],
// 	job: "teacher",
// 	birthYear: 1991,
// 	driversLicence: false,
// 	calcAge: function () {
// 		this.age = 2021 - this.birthYear;
// 		return this.age;
// 	},
// };
// console.log(
// 	`${jonas.firstName} is ${jonas.calcAge()}-old ${jonas.job} and he has ${
// 		jonas.driversLicence ? "a" : "no"
// 	} driver's licence`
// );

// //Displays all object's elements backwards
// const jonas = [
// 	"Jonas",
// 	"Schmedtmann",
// 	2037 - 1991,
// 	"teacher",
// 	["Michael", "Peter", "Steven"],
// 	true,
// ];
// for (let i = jonas.length - 1; i >= 0; i--) {
// 	console.log(jonas[i]);
// }

// Finds the sum of all the multiples of 3 or 5 below any number
// function solution(number) {
//   let sum = 0;
//   for (let i = 0; i < number; i++) {
//     if (i % 3 === 0 || i % 5 === 0) {
//       sum = sum + i;
//     }
//   }
//   return sum;
// }
// console.log(solution(10));

// Returns a new array with the strings filtered out
// const list1 = [1, 2, 'a', 'b'];
// const list2 = [1, 15, 'aasf', '1', '123', 123];
// function filter_list(l) {
//   const newArr = [];
//   for (let i = 0; i <= l.length - 1; i++) {
//     if (typeof l[i] === 'number') {
//       newArr.push(l[i]);
//     }
//   }
//   return newArr;
// }
// console.log(filter_list(list1));
// console.log(filter_list(list2));

// Checks if the letter is included in the given word
// const element = "impossible";
// const check = "t";
// let counter = 0;
// if (element.includes(check)) {
// 	for (let i = 0; i <= element.length - 1; i++) {
// 		if (element.charAt(i) === check) {
// 			counter += 1;
// 		}
// 	}
// 	console.log(
// 		`The "${check}" letter occurs ${counter} time(s) in word "${element}"`
// 	);
// } else {
// 	console.log(`The "${element}" word doesn't contain the "${check}" letter`);
// }

// Making a list of temperatures in the following days, taken from an array
// const data1 = [17, 21, 23];
// const data2 = [12, 5, -5, 0, 4];
// let forecast = "";
// const printForecast = function (arr) {
// 	for (let i = 0; i < arr.length; i++) {
// 		forecast = forecast + `${arr[i]} C in ${i + 1} days...\n`;
// 	}
// 	return forecast;
// };
// console.log(printForecast(data1));
// forecast = "";
// console.log(printForecast(data2));

// Checking if the pin has 4 digits (and only digits)
// function isNumeric(val) {
// 	return /^-?\d+$/.test(val);
// }
// const validatePIN = function (pin) {
// 	let validation;
// 	if (pin.length === 4 && isNumeric(pin) === true) {
// 		validation = Boolean(true);
// 	} else {
// 		validation = Boolean(false);
// 	}
// 	return validation;
// };
// const validation = "1234";
// console.log(validatePIN(validation));

// Restaurant object
// const restaurant = {
// 	starterMenu: [
// 		"Focaccia",
// 		"Pizza a'la Szwagier",
// 		"Garlic Bread",
// 		"Caprese Salad",
// 	],
// 	mainMenu: ["Siuchacz", "Bimberek", "Bozkov"],
// 	orderDelivery({ starterIndex, mainIndex, time, address }) {
// 		return `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`;
// 	},
// 	openingHours: {
// 		mon: {
// 			open: 12,
// 			close: 20,
// 		},
// 		thu: {
// 			open: 12,
// 			close: 20,
// 		},
// 		sat: {
// 			open: 15,
// 			close: 23,
// 		},
// 	},
// };

//Calling the function with object argument
// restaurant.orderDelivery({
// 	time: "10:30pm",
// 	address: "U Szwagra",
// 	starterIndex: 1,
// 	mainIndex: 2,
// });

// Add function with any number of arguments (using Rest and Spread parameters)
// const add = function (...numbers) {
// 	let a = 0;
// 	for (let i = 0; i < numbers.length; i++) {
// 		a += numbers[i];
// 	}
// 	console.log(a);
// };
// add(1, 2, 3, 4, 5, 6, 7, 8, 9);
// const arr = [1, 2, 3, 4];
// add(...arr);

//The example of for-of loop using
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const [i, el] of menu.entries()) {
// 	console.log(`${i + 1}: ${el}`);
// }

// Which days and what time the restaurant is open
// const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
// for (const day of days) {
// 	const open = restaurant.openingHours[day]?.open ?? "Closed";
// 	console.log(`On ${day}, we open at ${open}`);
// }
// console.log(
// 	restaurant.orderDelivery?.({
// 		mainIndex: 1,
// 		starterIndex: 0,
// 		time: "10:00",
// 		address: "Dupowa",
// 	}) ?? "Does not exist"
// );

// Replace the input with "#", except the 4 last characters
// SOLUTION 1
// let anon = "";
// const maskify = function (cc) {
// 	if (cc.length > 3) {
// 		for (let y = 0; y < cc.length - 4; y++) {
// 			anon += "#";
// 		}

// 		for (let i = cc.length - 4; i <= cc.length; i++) {
// 			anon += cc.charAt(i);
// 		}
// 		console.log(anon);
// 	} else if (cc.length < 3) {
// 		console.log(cc);
// 	}
// };
// const getit = prompt("Type the element You want to mask:");
// maskify(getit);

// // SOLUTION 2
// function maskify(cc) {
// 	return cc.slice(0, -4).replace(/./g, "#") + cc.slice(-4);
// }
// // console.log(maskify("1234567890123 56"));

// Using Maps in multiple possible answers
// const question = new Map([
// 	["question", "What is the best programming language in the world?"],
// 	[1, "Java"],
// 	[2, "C"],
// 	[3, "JavaScript"],
// 	["correct", 3],
// 	[true, "Correct!"],
// 	[false, "Try again!"],
// ]);
// console.log(question.get("question"));
// for (const [key, value] of question) {
// 	if (typeof key === "number") {
// 		console.log(`Answer ${key}: ${value}`);
// 	}
// }
// // const answer = Number(prompt("Type the number of Your answer:"));
// console.log(question.get(answer === question.get("correct")));

// Checking if the seat given is the middle one
// const airline = "TAP Air Portugal";
// const plane = "A320";
// const checkMiddleSeat = function (seat) {
// 	if (seat.slice(-1) === "B" || seat.slice(-1) === "E") {
// 		console.log(`${seat} is the middle seat!`);
// 	} else {
// 		console.log(`${seat} is not the middle seat!`);
// 	}
// };

// Fixing passenger's name misspelling
// const passenger = "jOnAs";
// const fixName = function (toFix) {
// 	let fixed = toFix.slice(0, 1).toUpperCase();
// 	fixed += toFix.slice(1).toLowerCase();
// 	return fixed;
// };
// console.log(fixName(passenger));

// Checking the baggage
// const checkBaggage = function (items) {
// 	const lowerItems = items.toLowerCase();
// 	if (lowerItems.includes("knife") || lowerItems.includes("gun")) {
// 		console.log("You're not allowed to get on the plane!");
// 	} else {
// 		console.log("Have a nice trip!");
// 	}
// };
// checkBaggage("Knife, laptop, food");
// checkBaggage("water, wallet, phone");
// checkBaggage("gun, lighter, Water");

// Full name to capitalize letters
// const capitalizeName = function (name) {
// 	const arr = [];
// 	const lowerName = name.toLowerCase();
// 	const names = lowerName.split(" ");
// 	for (const n of names) {
// 		arr.push(n[0].toUpperCase() + n.slice(1));
// 	}
// 	console.log(arr.join(" "));
// };
// capitalizeName("jessica aNn smItH dAvis");
// capitalizeName("jonas schmedtmann");

//Section 9, challenge #4
// document.body.append(document.createElement("textarea"));
// document.body.append(document.createElement("button"));
// THIS TEST DATA (pasted to textarea)
// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure
// const camelCase = function () {
// 	const text = document.querySelector("textarea").value;
// 	const rows = text.split("\n");
// 	for (const [i, row] of rows.entries()) {
// 		const [first, second] = row.toLowerCase().trim().split("_");
// 		const output = `${first}${second.replace(
// 			second[0],
// 			second[0].toUpperCase()
// 		)}`;
// 		console.log(output.padEnd(20, " ") + "✅".repeat(i + 1));
// 	}
// };
// document.querySelector("button").addEventListener("click", camelCase);

// Converting the given string into more orderly way
// const flights =
// 	"_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";
// const getCode = (str) => str.slice(0, 3).toUpperCase();
// const fixBox = function (toFix) {
// 	const fix1 = toFix.replace(/_/g, " ").split("+");
// 	for (const trip of fix1) {
// 		const [state, from, to, time] = trip.trim().split(";");
// 		let output = `${state} from ${getCode(from)} to ${getCode(
// 			to
// 		)} (${time.replace(":", "h")})`;
// 		output.startsWith("Delayed") ? (output = `💡 ${output}`) : output;
// 		output = output.padStart(45);
// 		console.log(output);
// 	}
// };
// fixBox(flights);

/*
// Section 11, Coding Challenge #1 and #2
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
const checkDogs = function (dogs1, dogs2) {
  const corDogsJulia = dogs1.slice(1, -2);
  const dogsJuliaKate = corDogsJulia.concat(dogs2);
  console.log(`Correct Julia's dogs: ${corDogsJulia}`);
  console.log(`All dogs together: ${dogsJuliaKate}`);
  dogsJuliaKate.forEach( function (el, i) {
    el >= 3 ? console.log(`Dog number ${i + 1}, with age of ${el} is an adult`) : console.log(`Dog number ${i + 1}, with age of ${el} is still a puppy 🐶`);
  });
};
// checkDogs(dogsJulia, dogsKate);

const dogs = [5, 2, 4, 1, 15, 8, 3];
const calcAverageHumanAge = ages => 
  ages.map(value => value <= 2 ? value*2 : 16 + value*4)
  .filter(mov => mov >= 18)
  .reduce((acc, mov, i, arr) => acc + mov/arr.length, 0);

console.log(calcAverageHumanAge(dogs))
*/

/*
// Excersising with array's methods
const y = Array.from({length: 100}, (_, i) => Math.floor(Math.random() * 100 + 1));
console.log(y);

const depositsSum = accounts.flatMap(mov => mov.movements.filter(mov => mov > 0)).reduce((acc, mov) => acc + mov, 0)
console.log(depositsSum);

// const atLeast1000Deposits = accounts.flatMap(mov => mov.movements.filter(mov => mov >= 1000)).length
const atLeast1000Deposits = accounts.flatMap(mov => mov.movements).reduce((acc, cur) => cur >= 1000 ? acc + 1 : acc, 0)
console.log(atLeast1000Deposits);

const obj = {
  deposits: [],
  withdrawals: []
}
accounts.flatMap((mov => mov.movements)).filter(mov => mov > 0).reduce((acc, mov) => obj.deposits.push(mov))
accounts.flatMap((mov => mov.movements)).filter(mov => mov < 0).reduce((acc, mov) => obj.withdrawals.push(mov))
console.log(obj);

const reduceSum = accounts.reduce((acc, mov) => {
  return acc + mov.movements.reduce((acc, mov) => mov > 0 ? acc + mov : acc);
}, 0);
console.log(reduceSum);

const convertTitleCase = function(title) {
  const exceptions = ['a', 'an', 'with', 'the', 'but', 'or', 'in', 'on'];
  const titleCase =  title.toLowerCase().split(" ").map((el, i) => exceptions.includes(el) && i !== 0 ? el : el.replace(el[0], el[0].toUpperCase()));
  return titleCase .join(" ");
};
console.log(convertTitleCase('this is a NICe title'));
console.log(convertTitleCase('on AND ON IS THE RIGHT TITLE'));
console.log(convertTitleCase('IN OR OUT SOMETHING IS WRONG WITH IT'));
*/

/*
// Section 11, Coding Challenge #4
//1.
dogs.forEach(el => el.recommendedFood = (el.weight ** 0.75 * 28).toFixed(2));
console.log(dogs);
//2.
dogs.forEach(el => el.owners.includes('Sarah') ? console.log(el.curFood >= 0.9* el.recommendedFood && el.curFood <= 1.1* el.recommendedFood ? "Dobrze je" : "Źle je") : null);
//3.
let ownersEatTooMuch = [];
let ownersEatTooLittle = [];
let exactEatingDogs = [];
dogs.forEach(el => {
  if (el.curFood >= el.recommendedFood * 1.1){
    return ownersEatTooMuch.push(el.owners);
  } else if (el.curFood <= el.recommendedFood * 0.9){
    return ownersEatTooLittle.push(el.owners);
    //4,5,6.
  } else {
    return exactEatingDogs.push(el.owners);
  }
})
console.log(ownersEatTooMuch.flat(2).join(" and ") + "'s dogs eat too much!");
console.log(ownersEatTooLittle.flat(2).join(" and ") + "'s dogs eat too little!");
console.log(exactEatingDogs.flat(2).join(" and ") + "'s dogs eat the exact food portion!");
*/

