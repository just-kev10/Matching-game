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
    finalScore[4] = counter;
    winGame();
}

function winGame() {
    if (matchCards.length == 16) {
        clearInterval(intervalId);
        setTimeout(modal, 1000);

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
    const fStar = lStars[2].firstElementChild;
    const sStar = lStars[1].firstElementChild;
    const tStar = lStars[0].firstElementChild;
    let nstar = 0;

    switch (true) {
        case (counter > 32):
            tStar.style.display = 'none';
            nstar = 0;
            break;
        case (counter > 29):
            tStar.style.overflow = 'hidden';
            tStar.style.width = '33%';
            nstar = 0.33;
            break;
        case (counter > 26):
            tStar.style.overflow = 'hidden';
            tStar.style.width = '67%';
            nstar = 0.67;
            break;
        case (counter > 24):
            sStar.style.display = 'none';
            nstar = 1;
            break;
        case (counter > 21):
            sStar.style.overflow = 'hidden';
            sStar.style.width = '33%';
            nstar = 1.33;
            break;
        case (counter > 18):
            sStar.style.overflow = 'hidden';
            sStar.style.width = '67%';
            nstar = 1.67;
            break;
        case (counter > 16):
            fStar.style.display = 'none';
            nstar = 2;
            break;
        case (counter > 13):
            fStar.style.overflow = 'hidden';
            fStar.style.width = '33%';
            nstar = 2.33;
            break;
        case (counter > 10):
            fStar.style.overflow = 'hidden';
            fStar.style.width = '67%';
            nstar = 2.67;
            break;
        default:
            nstar = 3;
            fStar.style = '';
            sStar.style = '';
            tStar.style = '';
    }
    finalScore[3] = nstar;
}


function resetValues() {
    // time interval por timing refresh
    intervalId = setInterval(timing, 1000);
    /*After the start of the game or when the user press the re-start button
    it reset all variables.*/
    shuffleCardClasses = shuffle(cardClasses.concat(cardClasses));
    shuffleCards(shuffleCardClasses);
    openCards = [];
    matchCards = [];
    counter = 0;
    stars(starsList);
    time = [];
    finalScore = [];
    moveCounter.innerText = counter;
    for (star of starsList) {
        star.style.display = '';
    }
    for (item of items) {
        item.classList.remove('open', 'show', 'match');
    }
}

function modal() {
    // Get the modal
    const modal = document.getElementById("myModal");

    // Get the button that opens the modal
    const btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];
    // inside tex in the modal
    const movesS = document.getElementsByClassName("modaldetails")[0].children[0].children[0];
    const starsS = document.getElementsByClassName("modaldetails")[0].children[1].children[0];
    const timeS = document.getElementsByClassName("modaldetails")[0].children[2].children[0]

    // When the user clicks the button, open the modal
    //works when buttons is shown 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    movesS.innerText = `${finalScore[4]}`;
    starsS.innerText = `${finalScore[3]}`;
    if (finalScore[0] == 0 && finalScore[1] == 0) {
        timeS.innerText = `${finalScore[2]} secs`;
    } else if (finalScore[0] == 0) {
        timeS.innerText = `${finalScore[1]} mins ${finalScore[2]} secs`;
    } else {
        timeS.innerText = `${finalScore[1]} hrs ${finalScore[1]} mins ${finalScore[2]} secs`;
    }
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }
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
    finalScore[0] = hours;
    finalScore[1] = minutes;
    finalScore[2] = seconds;

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
    resetValues();
    container.addEventListener('click', respondToClick);
    resetButton.addEventListener('click', resetValues);
}
// game variables:

let openCards = [];
let matchCards = [];
let counter = 0;
let intervalId = 0;
let finalScore = [];
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
