var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//Start
$(document).keypress(function() {
    if (started == false) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});


//User
$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //Check user input
    checkAnswer(userClickedPattern.length - 1);
});

//Functions
function nextSequence() {
    userClickedPattern = [];
    level = level + 1;
    $("h1").text("Level " + level);
    var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);
    console.log(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            //User needs the next level
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    started = false;
    level = 0;
    var gamePattern = [];
}
