/*
 * Create a list that holds all of your cards
 */


const MAXOPENCARDS = 2;
var starsLeft = 5;
var clickLock = false;
const moves = document.querySelector(".moves");
var movesDone = 0;
moves.textContent = movesDone + ' Moves';
var numberOfMatches = 0;
let timer;
var openCards = [];
var shuffledCards;


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


//generate stars
function createStars(){
	$('.stars').empty();
    for (var i=0; i<5; i++){
        $(".stars").append(`<li><i class="fa fa-star"></i></li>`);
    }
}

function removeStars(){
	starsLeft --;
	movesDone ++;
	moves.textContent = movesDone + ' Moves';
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
	starsLeft = 5;
	movesDone = 0;
	numberOfMatches = 0;
	moves.textContent = movesDone + ' Moves';
    createStars();
    createCard();
    $('.game-over').hide();
    $('.you-win').hide();
    clearInterval(timer);
    $(".minutes").html("");
    $(".seconds").html("");
    startTimer();
});

$(".btn-try-again").click(function(){
	starsLeft = 5;
	movesDone = 0;
	numberOfMatches = 0;
	moves.textContent = movesDone + ' Moves';
    createStars();
    createCard();
    $('.game-over').hide();
    clearInterval(timer);
    $('.you-win').hide();
});



//blocks more than two cards from opening at a time
$(document).on("click",".card", function () {
	//if clicklock is true, skip this entire function
	if(!clickLock){
		
	    clickedCard = $(this);
	    openClickedCard(clickedCard);

	    if(openCards.length === MAXOPENCARDS){
	    	toggleClickLock();
	        setTimeout(resetUnmatchedCards, 1500);
	    }
	}
});


function toggleClickLock(){
	clickLock = !clickLock;
}

function animateCardOpening(card){
	card.css('transform', 'rotateY(-360deg)');
	setTimeout(function(){card.addClass("open");}, 100);
}

function animateCardClosing(card){
	card.css('transform', 'rotateY(0deg)');
	setTimeout(function(){card.removeClass("open");}, 100);
}


function openClickedCard(clickedCard){
    if (!clickedCard.hasClass("open") && openCards.length < MAXOPENCARDS){

    	animateCardOpening(clickedCard);

        // add answer to answerlist
        var cardIndex = clickedCard.attr("id");
        var card = shuffledCards[cardIndex];

        openCards.push({answer: card.answer, id: cardIndex});

    if (openCards.length === MAXOPENCARDS){
		card1 = openCards[0];
		card2 = openCards[1];

    	if (card1.answer === card2.answer){
    		numberOfMatches ++;
    		movesDone ++;
			document.getElementById(card1.id).classList.add("match");
			document.getElementById(card2.id).classList.add("match");
			checkIfWon();
    	}else{
    		removeStars();
    	}
    }
    }     
}


function resetUnmatchedCards(){

    $(".card").each(function(){

        if (!$(this).hasClass("match") && $(this).hasClass("open") ){
        	console.log("closing!");
            animateCardClosing($(this));
        }
    });

    openCards = [];
    moves.textContent = movesDone + ' Moves';
    toggleClickLock();
    checkIfGameIsOver();

}


function checkIfGameIsOver(){
	if (starsLeft === 0){
		setTimeout(function(){
         	$('.game-over').css("display", "flex");
          	$('.game-over').addClass('animated fadeIn');
    		}, 350);
	}
}


function checkIfWon(){
	if(numberOfMatches === 1){
		setTimeout(function(){
			const sec = document.querySelector('.seconds');
			const min = document.querySelector('.minutes');
         	$('.you-win').css("display", "flex");
          	$('.you-win').addClass('animated fadeIn');
          	$('.winner-comment').text('Time: ' + min.textContent + sec.textContent + ' | ' + 'Stars left: ' + starsLeft);
          	}, 350);
	}
	clearInterval(timer);
}

function startTimer() {
  let clicks = 0;
  $(".card").on("click", function() {
    clicks += 1;
    if (clicks === 1) {
      var sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      timer = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10) + ':'));
      }, 1000);
    }
  })
 }

