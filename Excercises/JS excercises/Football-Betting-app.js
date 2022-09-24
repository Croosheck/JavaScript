const game = {
	team1: "Bayern Munich",
	team2: "Borrussia Dortmund",
	players: [
		[
			"Neuer",
			"Pavard",
			"Martinez",
			"Alaba",
			"Davies",
			"Kimmich",
			"Goretzka",
			"Coman",
			"Muller",
			"Gnarby",
			"Lewandowski",
		],
		[
			"Burki",
			"Schulz",
			"Hummels",
			"Akanji",
			"Hakimi",
			"Weigl",
			"Witsel",
			"Hazard",
			"Brandt",
			"Sancho",
			"Gotze",
		],
	],
	score: "4:0",
	scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
	date: "Nov 9th, 2037",
	odds: {
		team1: 1.33,
		x: 3.25,
		team2: 6.5,
	},
};
const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const players1Final = [...players1, "Thiago", "Coutinho", "Peristic"];
const allPlayers = [...players1Final, ...players2];
const { team1, x: draw, team2 } = game.odds;
const printGoals = function (...players) {
	console.log(`There was/were ${players.length} goal(s)`);
};
const goals = ["first", "second"];
const goals2 = ["first", "second", "third"];
// printGoals(...goals2);
// team1 > team2 && console.log("Team 1 is more likely to win");
// team1 < team2 && console.log("Team 2 is more likely to win");

// Goals in the game time order
for (const [i, el] of game.scored.entries()) {
	// console.log(`Goal ${i + 1}: ${el}`);
}
// console.log(game.scored.entries());

// Computing the average of odds
let sum = 0;
const odds = Object.values(game.odds);
for (const avg of odds) {
	sum += avg;
}
sum /= odds.length;
// console.log(sum);

// Odd of victory Bayern Munich: 1.33
for (const [team, odd] of Object.entries(game.odds)) {
	const teamStr = team === "x" ? "draw" : "victory " + game[team];
	// console.log(`Odd of ${teamStr} : ${odd}`);
}
// The number of goals reached with the name of the player
const scorers = {};
for (const player of game.scored) {
	scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
// console.log(scorers);

const gameEvents = new Map([
	[17, "⚽️ GOAL"],
	[36, "🔁 Substitution"],
	[47, "⚽️ GOAL"],
	[61, "🔁 Substitution"],
	[64, "🔶 Yellow card"],
	[69, "🔴 Red card"],
	[70, "🔁 Substitution"],
	[72, "🔁 Substitution"],
	[76, "⚽️ GOAL"],
	[80, "⚽️ GOAL"],
	[92, "🔶 Yellow card"],
]);
// An array with UNIQUE gameEvents values
const events = [...new Set(gameEvents.values())];
// console.log(events);

// Delete an item from the map
gameEvents.delete(64);

// Calculate the average event occurance
// const time = [...gameEvents.keys()].pop();
// console.log(`${time / gameEvents.size}`);

// Loop over the events, marking whether it's in the 1st or the 2nd half of the game
// SOLUTION 1
// for (const gameHalf of gameEvents) {
// 	if (gameHalf[0] <= 45) {
// 		console.log(`[FIRST HALF] ${gameHalf[0]}: ${gameHalf[1]}`);
// 	} else if (gameHalf[0] >= 45 && gameHalf[0] <= 90) {
// 		console.log(`[SECOND HALF] ${gameHalf[0]}: ${gameHalf[1]}`);
// 	} else {
// 		console.log(`[+ TIME ] ${gameHalf[0]}: ${gameHalf[1]}`);
// 	}
// }

// SOLUTION 2
for ([min, event] of gameEvents) {
	const half = min <= 45 ? "FIRST" : "SECOND";
	console.log(`${half} HALF ${min}: ${event}`);
}
