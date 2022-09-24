//This code is converting Kelvin degrees to Celsius, Fahrenheit and Newton degrees value.

//Kelvin's value
const kelvin = 0
//Celsius value
const celsius = kelvin - 273;
console.log(`The temperature is ${celsius} degrees Celsius.`)
//Fahrenheit's rounded value
const fahrenheit = Math.floor(celsius * (9/5) + 32);
console.log(`The temperature is ${fahrenheit} degrees Fahrenheit.`);
//Celsius' converting
const Newton = Math.floor(celsius * (33/100));
console.log(`The temperature is ${Newton} in Newtons.`);