/*
 * Create a list that holds all of your cards
 */


const MAXOPENCARDS = 2;
var starsLeft = 3
const CARDLIST = 
	[ 
		{class:"road", character: "道", answer: "road"}, 
		{class: "moon", character:"月", answer: "moon"},
		{class: "snow", character: "雪", answer: "snow"},
		{class: "cloud", character:"雲", answer: "cloud"},
		{class: "home", character:"家", answer: "home"},
		{class: "alcohol", character:"酒", answer: "alcohol"},
		{class: "eye", character:"目", answer: "eye"},
		{class: "image", character:"絵", answer: "image"},
		{class: "fa-snowflake", type:"fa", answer: "snow"},
		{class: "fa-road", type:"fa", answer: "road"},
		{class: "fa-image", type:"fa", answer: "image"},
		{class: "fa-glass-martini", type:"fa", answer: "alcohol"},
		{class: "fa-cloud", type:"fa", answer: "cloud"},
		{class: "fa-eye", type:"fa", answer: "eye"},
		{class: "fa-moon", type:"fa", answer: "moon"},
		{class: "fa-home", type:"fa", answer: "home"}		
	];


var shuffledCards;

// var kanjiCardsList = ["road", "moon", "snow", "cloud", "home", "alcohol", "eye", "image"];
var iconCardsList = ["", "", "", "", "", "", "", ""];

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



function createStars(){
	$('.stars').empty();
    for (var i=0; i<3; i++){
        $(".stars").append(`<li><i class="fa fa-star"></i></li>`);
    }
}

function removeStars(){
	const star = document.querySelector('.fa-star');
	star.remove();
}

function createCard(){
	$('.deck').empty();
	shuffledCards = shuffle(CARDLIST);
	shuffledCards.forEach(function(card, i){
		if(card.type == "fa"){
			$('.deck').append("<li><i id=\"" + i + "\" class=\"card fa " + card.class + "\"></i></li>");
		}

		else{
			$('.deck').append("<li><i id=\"" + i + "\" class=\"card " + card.class + "\">" + card.character + "</i></li>");
		}
	});
}

$(".restart").click(function(){
    createStars();
    createCard();
});



var openCards = [];



//open card function
$(document).on("click",".card", function () {
    clickedCard = $(this);
    openClickedCard(clickedCard);
    
    if(openCards.length === MAXOPENCARDS){
        setTimeout(resetUmatchedCards, 700);

    }
});




function openClickedCard(clickedCard){
    if (!clickedCard.hasClass("open") && openCards.length < MAXOPENCARDS){

    	// open up card
        clickedCard.addClass("open");

        // add answer to answerlist
        var cardIndex = clickedCard.attr("id");
        var card = shuffledCards[cardIndex];

        openCards.push({answer: card.answer, id: cardIndex});

    if (openCards.length === MAXOPENCARDS){
		card1 = openCards[0];
		card2 = openCards[1];

    	if (card1.answer === card2.answer){
			document.getElementById(card1.id).classList.add("match");
			document.getElementById(card2.id).classList.add("match");
    	}
    }
    }     
}



function resetUmatchedCards(){
    $(".card").each(function(){
        if (!$(this).hasClass("match")){
            $(this).removeClass("open");
            
        }
    });

    openCards = [];
    starsLeft --;
    removeStars();
    gameOver();
}


function gameOver(){
	if (starsLeft === 0){
		window.alert('game over!!!');
	}
}

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
