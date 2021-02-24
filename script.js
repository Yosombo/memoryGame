const gameContainer = document.getElementById('game');
const starterDiv = document.getElementById('starter');
const starterBtn = document.getElementById('starterBtn');
let a = null;
let b = null;
let cardsFlipped = 0;
let noClicking = false;

starterBtn.addEventListener('click', () => {
  starterDiv.style.display = 'none';
});

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'pink',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'pink',
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
    newDiv.style.background = 'rgb(99, 121, 163)';

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  if (noClicking) return console.log('Clicked during noClicking');
  if (e.target.classList.contains('flipped'))
    return console.log('Clicked on same card');
  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];
  if (!a || !b) {
    currentCard.classList.add('flipped');
    a = a || currentCard;
    b = currentCard === a ? null : currentCard;
  }
  if (a && b) {
    noClicking = true;
    const color1 = a.className;
    const color2 = b.className;
    if (color1 === color2) {
      cardsFlipped += 2;
      a.removeEventListener('click', handleCardClick);
      b.removeEventListener('click', handleCardClick);
      a = null;
      b = null;
      noClicking = false;
    } else {
      setTimeout(function () {
        a.style.backgroundColor = 'rgb(99, 121, 163)';
        b.style.backgroundColor = 'rgb(99, 121, 163)';
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        a = null;
        b = null;
        noClicking = false;
      }, 1000);
    }
  }
  if (cardsFlipped === COLORS.length) alert('Congratulations!');
}

createDivsForColors(shuffledColors);
