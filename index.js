var gamePattern = [];
var userClickedPattern = [];

var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var score = 0;
$(".btn").addClass("disabled");
// here the user must click any button to start
$(".start-button").click(function() {
  if (!started) {
    $("#level-title").text("Level 0");
    score = 0;
    nextSequence();
    started = true;
    $(".start-button").css("display","none");
    $("#score").text("");
  }
});

// here the program choose random color and save it
function nextSequence() {
  $(".btn").removeClass("disabled");
  userClickedPattern = [];
  level++;
  score = level - 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
//user
// here saving what the user clicked
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})
// sound function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// animation function
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
// comparison with two pattern
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
  if (userClickedPattern.length == gamePattern.length){
    setTimeout(function() {
      nextSequence();
    }, 1000)
  }
}else {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200)
  $("#level-title").text("Press Restart");
  $("#score").html("Your score is: " + score);
  $(".start-button").css("display","inline-block");
  $(".start-button").text("Restart");
  $(".btn").addClass("disabled");
  startOver();
}
}
// Restart the game
function startOver(){
  started = false;
  gamePattern = [];
  level = 0;
}
