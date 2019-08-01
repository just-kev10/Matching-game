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
    /* After a click is perform the takes the event.target to open the card.*/
    openCard(event.target);
}


function openCard(eTarget) {
    /* The cards are compare if the cards is not in a array matchCards*/
    if (openCards.length < 2 && !openCards.includes(eTarget) && !matchCards.includes(eTarget)) {
        if (eTarget.tagName == 'LI') {
            eTarget.classList.add("open");
            eTarget.classList.add("show");
            openCards.push(eTarget);
            // time is register after the first card is shown.
            if (time.length == 1) {
                time[1] = new Date().getTime();
            }
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
    /*cardsMatch adds the class match to the cards.*/
    if (first.firstElementChild.classList[1] == second.firstElementChild.classList[1]) {
        matchCards.push(first, second);
        first.classList.add("match");
        second.classList.add("match");
    }
    noCardsMatch();
}

function noCardsMatch() {
    /*noCardsMatch function remove the classes that makes them to be shown*/
    setTimeout(function () {
        for (open of openCards) {
            open.classList.remove('open', 'show')
        }
        openCards = [];
    }, 1000);
    inMoveCounter();
    stars(starsList);
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
    /* ShuffleCards functions takes an array that has 16 ramdomly cards
    and then it iterates to each card to change the html.*/
    let index = 0;
    for (item of items) {
        item.children[0].className = `fa fa-${shuffle[index]}`;
        index += 1;
    }
}

function stars(lStars) {
    /* stars function takes the move counter and depending
    on the moves the stars will disappear*/
    const fStar = lStars[2].firstElementChild.style;
    const sStar = lStars[1].firstElementChild.style;
    const tStar = lStars[0].firstElementChild.style;

    switch (true) {
        case (counter > 32):
            tStar.display = 'none';
            break;
        case (counter > 29):
            tStar.overflow = 'hidden';
            tStar.width = '33%';
            break;
        case (counter > 26):
            tStar.overflow = 'hidden';
            tStar.width = '67%';
            break;
        case (counter > 24):
            sStar.display = 'none';
            break;
        case (counter > 21):
            sStar.overflow = 'hidden';
            sStar.width = '33%';
            break;
        case (counter > 18):
            sStar.overflow = 'hidden';
            sStar.width = '67%';
            break;
        case (counter > 16):
            fStar.display = 'none';
            break;
        case (counter > 13):
            fStar.overflow = 'hidden';
            fStar.width = '33%';
            break;
        case (counter > 10):
            fStar.overflow = 'hidden';
            fStar.width = '67%';
            break;

    }
}


function resetValues() {
    /*After the start of the game or when the user press the re-start button
    it reset all variables.*/
    shuffleCardClasses = shuffle(cardClasses.concat(cardClasses));
    shuffleCards(shuffleCardClasses);
    openCards = [];
    matchCards = [];
    counter = 0;
    time = [];
    moveCounter.innerText = counter;
    for (star of starsList) {
        star.style.display = '';
    }
    for (item of items) {
        item.classList.remove('open', 'show', 'match');
    }

}
function timing() {
    // time variables and time remainders;
    let total = 0;
    let seconds = 0;
    let minutes = 0;
    let mr = 0;
    let hours = 0;
    let hr = 0
    let hrd = document.getElementsByClassName('time_hr')[0];
    let md = document.getElementsByClassName('time_min')[0];
    let sd = document.getElementsByClassName('time_sec')[0];

    time[0] = new Date().getTime();
    if (time.length > 1) {
        // ms to hr with getTime
        time[2] = (time[0] - time[1]);
        total = time[2] / (1000 * 60 * 60);
        /* the integer of each time value is displayed and the 
           and the remainder is used to calculate the next time variable.*/
        hours = Math.floor(total);
        hr = total - hours;
        minutes = Math.floor(hr * 60);
        mr = (hr * 60) - Math.floor(hr * 60);
        seconds = Math.floor(mr * 60);
    }
    hrd.innerText = `${hours}`;
    md.innerText = `${minutes}`;
    sd.innerText = `${seconds}`;

    if (hours == 0) {
        hrd.parentElement.style.display = 'none';
    } else {
        hrd.parentElement.style.display = '';
    }
    if (minutes == 0) {
        md.parentElement.style.display = 'none';
    } else {
        md.parentElement.style.display = '';
    }
    // console.log(hours, minutes, seconds);

}

function game() {
    // time interval por timing refresh
    setInterval(timing, 1000);
    resetValues();
    container.addEventListener('click', respondToClick);
    resetButton.addEventListener('click', resetValues);
}
// game variables:

let openCards = [];
let matchCards = [];
let counter = 0;
let time = [];
const container = document.getElementsByClassName("deck")[0];
const moveCounter = document.getElementsByClassName('moves')[0];
const resetButton = document.getElementsByClassName('restart')[0];
const starsList = document.getElementsByClassName("stars")[0].children;
let items = container.children;
let cardClasses = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
let shuffleCardClasses = [];

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
