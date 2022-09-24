//This code assigns time and number for a run, based on registration time and runner's age.

let raceNumber = Math.floor(Math.random() * 1000);
let registeredEarly = true;
let runnersAge = 18;

if (registeredEarly && (runnersAge >= 18) ) {
  raceNumber = raceNumber + 1000;
} else {
  raceNumber;
}
if (registeredEarly && (runnersAge >= 18)){
  console.log(`Your race is at 9:30 am and your number is ${raceNumber}`)
} else if (runnersAge >= 18) {
  console.log(`Your race is at 11:00 am and your number is ${raceNumber}`);
} else {
  console.log(`Your race is at 12:30 pm and your number is ${raceNumber}`);
}