calcAverage = (v1, v2, v3) => (v1+v2+v3)/3;

const avgDolphins = Math.floor(calcAverage(244, 23, 71));
const avgKoalas = Math.floor(calcAverage(50, 54, 49));

console.log(`Avg. for Dolphins = ${avgDolphins}\nAvg. for Koalas = ${avgKoalas}`);

const checkWinner = function (avgDol, avgKoal) {
    if (avgDol >= (2*avgKoal)) {
        return console.log(`The winner are Dolphins with score of ${avgDol}, what is ${(avgDol/avgKoal).toFixed(1)} times greater 
        than Koalas!`);
    } else if (avgKoal >= (2*avgDol)) {
        return console.log(`The winner are Koalas with score of ${avgKoal}, what is ${(avgKoal/avgDol).toFixed(1)} times greater 
        than Dolphins!`);
    } else {
        return console.log("No winner.");
    }
}
checkWinner(avgDolphins, avgKoalas);