//This code calculates the average score for 2 teams, announces the winner, based on the higher score and minimum of 100 average points.
const avgDolphins = Math.floor((96+108+89)/3);
const avgKoalas = Math.floor((89+108+96)/3);
console.log(`Avgerage score for Dolphins: ${avgDolphins}\nAverage score for Koalas: ${avgKoalas}`);

const avgBoolean1 = Boolean(avgDolphins >= 100);
const avgBoolean2 = Boolean(avgKoalas >= 100);

if(avgBoolean1 || avgBoolean2) {
        if (avgDolphins > avgKoalas) {
        console.log(`Dolphins with ${avgDolphins} score are the winners of the competition!`);
        } else if (avgDolphins < avgKoalas) {
        console.log (`Koalas with ${avgKoalas} score are the winners of the competition!`);
            } else if (avgDolphins === avgKoalas) {
             console.log (`With the scores of ${avgDolphins} for Dolphins and ${avgKoalas} for Koalas, we have a draw!`);
                }
} else if((!avgBoolean1 || !avgBoolean2) && (avgDolphins === avgKoalas)) {
    console.log('We have a draw, but neither Dolphins or Koalas scored the minimum of 100 average points.');
} else {
    console.log('Neither Dolphins or Koalas scored the minimum of 100 average points.');
}