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
    if (click.length < 2) {
        if (event.target.tagName == 'LI') {
            event.target.classList.add("open");
            event.target.classList.add("show");
            // click.push(event.target);
            if (!click.includes(event.target)) {
                click.push(event.target)
            }
            compare();
        }
    }
}

function compare() {
    if (click.length > 1) {
        let first = click[0].firstElementChild.classList[1];
        let second = click[1].firstElementChild.classList[1];
        if (first == second) {
            click[0].classList.add("match");
            click[1].classList.add("match");
        }
        setTimeout(function () {
            click[0].classList.remove('open');
            click[0].classList.remove('show');
            click[1].classList.remove('open');
            click[1].classList.remove('show');
            click = [];
        }, 1000);
    }

}

let click = [];
const container = document.getElementsByClassName("deck")[0];
let items = container.children;
for (item of items) {
    item.classList.remove('open', 'show', 'match');
}


container.addEventListener('click', respondToClick);








/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
