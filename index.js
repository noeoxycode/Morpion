let currentTurn = 0;
let compteur = 0;
const images = ['images/croix.png', 'images/rond.png'];
let isTheGameOver = false;
let playerZeroScore = 0;
let playerOneScore = 0;
let conclusion = document.getElementById("conclusion");
let bilan = document.getElementById("bilan");


function globalValuesReset()
{
	currentTurn = 0;
	compteur = 0;
	isTheGameOver = false;
	playerZeroScore = 0;
	playerOneScore = 0;
}


function gameInitialisation ()
{
	globalValuesReset()
	conclusion = document.getElementById("conclusion");
	bilan = document.getElementById("bilan");
	document.getElementById("startingBlock").hidden = true;
	document.getElementById("game").hidden = false;
	window.playerZero = document.getElementById("player0").value;
	window.playerOne = document.getElementById("player1").value;
	let displayPlayerZero = document.getElementById("player0result");
	let displayPlayerOne = document.getElementById("player1result");
	displayPlayerZero.innerText = `${playerZero} a les croix, son score est : ${playerZeroScore}`;
	displayPlayerOne.innerText = `${playerOne} a les ronds, son score est : ${playerOneScore}`;
}


function turn(id)
{
	if (isTheGameOver)
		return;
	let value = Number(document.getElementById(id).dataset.toto);
	if (value !== 2)
		return;
	else {
		document.getElementById(id).dataset.toto = currentTurn;
		document.getElementById(id).hidden = false;
		document.getElementById(id).src = images[currentTurn];
		value = currentTurn;
	}
	compteur++;
	isTheGameOver = checkGameState(value);
	nextTurn();

}

function checkGameState(value)
{
	if (checkWinner(value)) {
		return true;
	} else if (checkEndGame()) {
		return true;
	} else
		return false;
}

function nextTurn()
{
	if (currentTurn === 0)
		currentTurn = 1;
	else
		currentTurn = 0;
}

function checkWinner(value)
{
	let tableau = new Array(9);
	for (let cpt = 0; cpt < 9; cpt++)
		tableau[cpt] = Number(document.getElementById(`block${cpt}`).dataset.toto);
	if (tableau[0] === tableau[1] && tableau[1] === tableau[2] && tableau[0] !== 2) {
		whoWins(value)
		return true;
	} else if (tableau[3] === tableau[4] && tableau[4] === tableau[5] && tableau[3] !== 2) {
		whoWins(value)
		return true;
	} else if (tableau[6] === tableau[7] && tableau[7] === tableau[8] && tableau[6] !== 2) {
		whoWins(value)
		return true;
	} else if (tableau[0] === tableau[3] && tableau[3] === tableau[6] && tableau[0] !== 2) {
		whoWins(value)
		return true;
	} else if (tableau[1] === tableau[4] && tableau[4] === tableau[7] && tableau[1] !== 2) {
		whoWins(value)
		return true;
	} else if (tableau[2] === tableau[5] && tableau[5] === tableau[8] && tableau[2] !== 2) {
		whoWins(value)
		return true;
	} else if (tableau[0] === tableau[4] && tableau[4] === tableau[8] && tableau[0] !== 2) {
		whoWins(value)
		return true;
	} else if (tableau[2] === tableau[4] && tableau[4] === tableau[6] && tableau[2] !== 2) {
		whoWins(value)
		return true;
	}
	else
		return false;
}

function whoWins(value)
{
	if (value === 0)
	{
		conclusion.hidden = false;
		bilan.innerText = `${playerZero} a gagne la manche !`;
		playerZeroScore++;
		let displayPlayerZero = document.getElementById("player0result");
		displayPlayerZero.innerText = `${playerZero} a les croix, son score est : ${playerZeroScore}`;
	}
	else if (value === 1)
	{
		conclusion.hidden = false;
		bilan.innerText = `${playerOne} a gagne la manche !`;
		playerOneScore++;
		let displayPlayerOne = document.getElementById("player1result");
		displayPlayerOne.innerText = `${playerOne} a les ronds, son score est : ${playerOneScore}`;
	}
	else
	{
		conclusion.hidden = false;
		bilan.innerText = `Match nul !`;
		let displayPlayerOne = document.getElementById("player1result");
		displayPlayerOne.innerText = `${playerOne} a les ronds, son score est : ${playerOneScore}`;
	}

}


function checkEndGame()
{
	if (compteur === 9) {
		whoWins(2)
		return true;
	} else {
		return false;
	}
}


function newGame()
{
	let displayPlayerZero = document.getElementById("player0result");
	let displayPlayerOne = document.getElementById("player1result");
	displayPlayerZero.innerText = `${playerZero} a les croix, son score est : ${playerZeroScore}`;
	displayPlayerOne.innerText = `${playerOne} a les ronds, son score est : ${playerOneScore}`;
	conclusion.hidden = true;
	currentTurn = 0;
	compteur = 0;
	resetTable();
	isTheGameOver = false
}


function resetTable ()
{
	for (let cpt = 0; cpt < 9; cpt++)
	{
		let element = document.getElementById(`block${cpt}`);
		element.dataset.toto = "2";
		element.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
	}
}


function resetGame ()
{
	resetTable();
	document.getElementById("startingBlock").hidden = false;
	document.getElementById("game").hidden = true;
	document.getElementById("conclusion").hidden = true;
}

