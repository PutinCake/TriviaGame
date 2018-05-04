
//======================Questions=======================================
var triviaQuestions = [
    {
    question: "Azeroth is not the native home of this Horde race who arrived on the Eastern Kingdoms continent through the Dark Portal from Draenor.",
    answerList: ["Orc", "Human", "Goblins", "Draenei"],
    answer: 0
},{
    question: "In the beginning, the Alliance had the Paladin class while Shaman were limited to two races on the Horde faction. During which expansion did this change?",
    answerList: ["Wrath of the Lich King", "Mists of Pandaren", "Burning Crusade", "cataclysm"],
    answer: 2
},{
    question: "When the Burning Crusade expansion released, Blood Elves were introduced as a playable race in the Horde faction. Blood Elves became the only race that could not choose which class?",
    answerList: ["Shaman", "Warlock", "Warrior", "Death Knight"],
    answer: 2
},{
    question: "The Burning Legion, responsible for the corruption of the Orcs and the creation of the Lich King, is most often associated with which type of energy?",
    answerList: ["Shadow", "Holy", "Arcane", "Fel"],
    answer: 3
},{
    question: "What is the most basic Night Elf Unit?",
    answerList: ["Huntress", "Wisp", "Peasan", "Archer"],
    answer: 1
}
];
//========================create variables============================
var questionNum;
var correctAnswer;
var incorrectAnswer;
var unanswered; 
var seconds;
var time;
var playerSelect;
var gifList = ['question1', 'question2', 'question3', 'question4', 'question5'];
var messages = {
	correct: "Too easy.",
	incorrect: "Idiot...You'll never leave this place!",
	endTime: "Your wicked souls shall feed my power!",
	finished: "Ashes to ashes..."
}

//=========================set start btn & restart btn===================
$("#startBtn").on("click", function(){
	$(this).hide();
	newGame();
});

$("#restart").on("click", function(){
 	$(this).hide();
 	newGame();
 });

 //========================New Game setting=============================
function newGame(){
	questionNum = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	$("#finishMessage").empty();
	$("#correctAnswers").empty();
	$("#incorrectAnswers").empty();
	$("#unanswered").empty();
	newQuestion();
}

//==================New Game function==============================
function newQuestion(){
	
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();
	answered = true;
//==================setting up questions==========================
	$(".question").html("<h2>" + triviaQuestions[questionNum].question + "</h2>");
	//==========================answer options===================================
	for(var i = 0; i < 4; i++){
		var choices = $("<div>");
		choices.text(triviaQuestions[questionNum].answerList[i]);
		choices.addClass("thisChoice");
		choices.attr({"data-index": i });
		$(".answerList").append(choices);
	}

	countdown();

	$(".thisChoice").on("click",function(){
		playerSelect = $(this).data("index");
		clearInterval(time);
		answerPage();
	});
}
//========================countdown section==============================
function countdown(){
	seconds = 20;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	answered = true;
	time = setInterval(startCountdown, 1000);
}
//==========================start countdown==================================
function startCountdown(){
	seconds--;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$(".thisChoice").empty(); 
	$(".question").empty();
//========set up standard======================================================
	var correctAnswerText = triviaQuestions[questionNum].answerList[triviaQuestions[questionNum].answer];
	var correctAnswerIndex = triviaQuestions[questionNum].answer;
	var gifs = $("<img>");
	gifs.attr("src", "assets/images/" + gifList[questionNum] + ".gif");
	$("#gif").html(gifs);

	if(questionNum == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 4000);
	} else{
		questionNum++;
		setTimeout(newQuestion, 4000);
	}	
	
//==========================Checking answers is correct or incorrect==================
	if((playerSelect == correctAnswerIndex) && (answered == true)){
		correctAnswer++;
		$("#message").html(messages.correct);
	} else if((playerSelect != correctAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$("#message").html(messages.incorrect);
		$("#correctedAnswer").html("The correct answer was: " + correctAnswerText);
	} else{
		unanswered++;
		$("#message").html(messages.endTime);
		$("#correctedAnswer").html("The correct answer was: " + correctAnswerText);
		answered = true;
	}
	
}

//========================show final page========================================
function scoreboard(){
	$("#finishMessage").html(messages.finished);
	$("#correctAnswers").html("Correct Answers: " + correctAnswer);
	$("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#restart").addClass("reset");
	$("#restart").show();
	$("#restart").html("Don't let me dowm!");
	//====================================clean data==============================
	$("#timeLeft").empty();
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gif").empty();
}

