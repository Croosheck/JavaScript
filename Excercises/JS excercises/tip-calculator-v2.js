const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (i = 0 ; i <= bills.length - 1 ; i++){
    const tipCalc = function () {
    return (bills[i] >= 50) && (bills[i] <= 300) ? bills[i] * 0.15 : bills[i] * 0.2;
    };
    tips.push(tipCalc());
    totals.push(tipCalc() + bills[i]);
}
console.log(`Each tip equals: ${tips}`);
console.log(`Total sum for each bill is: ${totals}`);

let sum = 0;
const calcAverage = function(arr){
    for(i = 0 ; i <= arr.length - 1 ; i++){
        sum += arr[i];
    }
    return sum / arr.length;
}
console.log("The average for all bills with tips is: " + calcAverage(totals));