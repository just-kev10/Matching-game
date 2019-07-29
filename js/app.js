/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function respondToClick(event) {
    openCard(event.target);
    stars(starsList);
}


function openCard(eTarget) {
    if (openCards.length < 2 && !openCards.includes(eTarget) && !matchCards.includes(eTarget)) {
        if (eTarget.tagName == 'LI') {
            eTarget.classList.add("open");
            eTarget.classList.add("show");
            openCards.push(eTarget);
        }
        compareCards();
    }
}

function compareCards() {
    if (openCards.length == 2) {
        cardsMatch(openCards[0], openCards[1]);
    }

}

function cardsMatch(first, second) {
    if (first.firstElementChild.classList[1] == second.firstElementChild.classList[1]) {
        matchCards.push(first, second);
        first.classList.add("match");
        second.classList.add("match");
    }
    noCardsMatch();
}

function noCardsMatch() {
    setTimeout(function () {
        for (open of openCards) {
            open.classList.remove('open', 'show')
        }
        openCards = [];
    }, 1000);
    inMoveCounter();
}

function inMoveCounter() {
    counter += 1;
    moveCounter.innerText = counter;
    winGame();
}

function winGame() {
    if (matchCards.length == 16) {
        setTimeout(function () {
            alert("You won the game.");
        }, 1000);

    }
}

function shuffleCards(shuffle) {
    let index = 0;
    for (item of items) {
        item.children[0].className = `fa fa-${shuffle[index]}`;
        index += 1;
    }
}

function stars(stars) {
    switch (true) {
        case (counter > 27):
            stars[0].style.display = 'none';
            break;
        case (counter > 18):
            stars[1].style.display = 'none';
            break;
        case (counter > 12):
            stars[2].style.display = 'none';
            break;
    }
}

function game() {
    resetValues();
    container.addEventListener('click', respondToClick);
    resetButton.addEventListener('click', resetValues);
}

function resetValues() {
    shuffleCardClasses = shuffle(cardClasses.concat(cardClasses));
    shuffleCards(shuffleCardClasses);
    openCards = [];
    matchCards = [];
    counter = 0;
    moveCounter.innerText = counter;
    for (star of starsList) {
        star.style.display = '';
    }
    for (item of items) {
        item.classList.remove('open', 'show', 'match');
    }

}

let openCards = [];
let matchCards = [];
let counter = 0;
const container = document.getElementsByClassName("deck")[0];
const moveCounter = document.getElementsByClassName('moves')[0];
const resetButton = document.getElementsByClassName('restart')[0];
const starsList = document.getElementsByClassName("stars")[0].children;
let items = container.children;
let cardClasses = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
let shuffleCardClasses = [];
// let shuffleCardClasses = shuffle(cardClasses.concat(cardClasses));

game();

/*
 * set up the event listener for a card. If a card is openCardsed:Function 0(game())
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *      Function 1(respondToClick())
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *      Function 2(openCard())
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *      Function 3(cardsMatch)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *      Function 4(noCardsMatch)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *      Function 5(moveCounter)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 *      Function 6(winGame)
 */
