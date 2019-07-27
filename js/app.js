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
    compareCards();
}


function openCard(eTarget) {
    if (openCards.length < 2 && !openCards.includes(eTarget)) {
        if (eTarget.tagName == 'LI') {
            eTarget.classList.add("open");
            eTarget.classList.add("show");
            openCards.push(eTarget)
        }
    }
}

function compareCards() {
    if (openCards.length > 1) {
        let first = openCards[0].firstElementChild.classList[1];
        let second = openCards[1].firstElementChild.classList[1];
        cardsMatch(first, second);
        noCardsMatch();
        inMoveCounter();
    }

}

function cardsMatch(first, second) {
    if (first == second) {
        openCards[0].classList.add("match");
        openCards[1].classList.add("match");
    }

}

function noCardsMatch() {
    setTimeout(function () {
        for (open of openCards) {
            open.classList.remove('open', 'show')
        }
        openCards = [];
    }, 1000);

}

function inMoveCounter() {
    counter += 1;
    moveCounter.innerText = counter;
}

function resetValues() {
    openCards = [];
    counter = 0;
    moveCounter.innerText = counter;
    for (item of items) {
        item.classList.remove('open', 'show', 'match');
    }
}


function game() {
    const resetButton = document.getElementsByClassName('restart')[0];
    container.addEventListener('click', respondToClick);
    resetButton.addEventListener('click', resetValues);
}


let openCards = [];
let counter = 0;
const container = document.getElementsByClassName("deck")[0];
const moveCounter = document.getElementsByClassName('moves')[0];
let items = container.children;

resetValues();
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
 *      Function 6
 */
