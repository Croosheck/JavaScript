const bills = [125, 555, 44];

const tipCalc = function (bill) {
    return (bill >= 50) && (bill <= 300) ? bill * 0.15 : bill * 0.2;
}

const tips = [tipCalc(bills[0]), tipCalc(bills[1]), tipCalc(bills[2])];
console.log(`The tips are consecutively: [${tips[0]}], [${tips[1]}], [${tips[2]}]`);
console.log(tips);

const total = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];
console.log(`The total amounts with tips, for the following bills, are: [${total[0]}], [${total[1]}], [${total[2]}]`);
console.log(total);

