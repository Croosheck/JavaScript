// This code converts human age to dog age.

let name = 'Krystian'.toLowerCase();
//Setting my age
let myAge = 26;
//First 2 years of a dog's life
let earlyYears = 2;
earlyYears *= 10.5;
//assign changed value to new variable
let laterYears = myAge - 2;
//multiplication of human years to dog's
laterYears *= 4;
console.log(`My 2 early years is: ${earlyYears}`);
console.log(`My later years are: ${laterYears}`);
const myAgeInDogYears = earlyYears + laterYears;
console.log(`My name is ${name}. I am ${myAge} old in human years, which is ${myAgeInDogYears} years old in dog years.`);