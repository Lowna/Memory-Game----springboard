const gameContainer = document.getElementById('game');

const COLORS = [
	'red',
	'blue',
	'yellow',
	'green',
	'orange',
	'purple',
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'yellow'
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);
		// //set a data attribute
		// newDiv.setAttribute('data-id', color);
		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}
const h1 = document.querySelector('h1');
//game reset
const btnReset = document.querySelector('#reset');
btnReset.addEventListener('click', function() {
	location.reload();
});

let counter = 0;
let first = 0;
let second = 0;
let eventOne = 0;
let eventTwo = 0;
let score = 0;
function handleCardClick(event) {
	let e = event.target;
	if (counter === 0) {
		flipToFront(e);
		eventOne = e;
		first = e.className;
		counter++;
		return;
	} else if (counter === 1) {
		flipToFront(e);
		eventTwo = e;
		second = e.className;
		counter++;
		if (second === first && eventOne !== eventTwo) {
			second = 0;
			first = 0;
			counter = 0;
			eventOne.removeEventListener('click', handleCardClick);
			eventTwo.removeEventListener('click', handleCardClick);
			eventOne = 0;
			eventTwo = 0;
			score++;
			// indicates you won and reset the game
			if (score === 6) {
				h1.innerHTML = 'You Won, Reset Game!!!!!!!!!!!!!!!!!!!';
			}
		} else {
			setTimeout(function() {
				second = 0;
				first = 0;
				counter = 0;
				flipToBack(eventOne);
				flipToBack(eventTwo);
				eventOne = 0;
				eventTwo = 0;
			}, 1000);
		}
	} else if (counter > 1) {
		flipToBack(eventOne);
		flipToBack(eventTwo);
		eventOne = 0;
		eventTwo = 0;
		second = 0;
		first = 0;
		counter = 0;
		return;
	}
}

function flipToBack(e) {
	e.style.backgroundColor = 'white';
}
function flipToFront(e) {
	e.style.backgroundColor = e.className;
}

// when the DOM loads
createDivsForColors(shuffledColors);
