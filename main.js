$(function() {
  var position1 = 0;
  var position2 = 0;
  var goHorse = null;

  //start button //run
  $('#start').on('click', function() {
    goHorse = setInterval(running,500);
    $('#run').on('click', function() {
      position2 += 5;
      $('#cat').css({'transform': `translate(${position2}rem) scaleX(-1)`});
      if(collision($('#cat'), $('#apple2'))) {
        clearInterval(Interval);
        clearInterval(goHorse);
        var imageName = "catapple";
        var imageType = "jpg";
        theWinner(imageName, imageType);
      }
    });
  });

  //pause button
  $('#pause').on('click', function() {
    clearInterval(Interval);
    clearInterval(goHorse);
  });

/*
FUNCTIONS FUNCTIONS FUNCTIONS
*/

//horse running
  var running = function () {
    position1 += 10;
    $('#horse').css({'transform': `translate(${position1}rem)`});
    if(collision($('#horse'), $('#apple1'))) {
      clearInterval(goHorse);
      clearInterval(Interval);
      var imageName = "horseapple";
      var imageType = "jpeg";
      theWinner(imageName, imageType);
    }
  }

  //colliding
  function collision(img1, img2) {
    var x1 = img1.offset().left;
    var y1 = img1.offset().top;
    var h1 = img1.outerHeight(true);
    var w1 = img1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = img2.offset().left;
    var y2 = img2.offset().top;
    var h2 = img2.outerHeight(true);
    var w2 = img2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
      return false;
    }
    return true;
  }


  var clearButtons = function() {
    $('.button').css("display", "none");
  }


  //winner announcement
  function theWinner(animalpic, imageType) {
    $('#playAgain').css("display", "block");
    $('.top').empty();
    $('.bottom').empty();
    console.log(`${animalpic}.${imageType}`);
    $('.racetrack').append(`<div class = "winnerDiv"><img class = "winner" src = images/${animalpic}.${imageType}></div>`).css("border", "white").append('<p class = "winText"> You got the apple first! </p>');
    clearButtons();
    clickPlayAgain();
  }

  var clickPlayAgain = function() {
    $('#playAgain').on('click', function() {
      //empty winner divs
      $('.winnerDiv').empty();
      $('.winText').empty();
      $('.top').empty();
      $('.bottom').empty();
      //display the racetrack and buttons again
      $('.racetrack').children().css("display", "block");
      $('.racetrack').css("border", "black solid 1px");
      $('.button').css("display", "block");
      $('#playAgain').css("display", "none");
      //reposition horse/cat
      $('.top').append('<img id = "horse" src = "images/horse.gif"><img id = "apple1" src = "images/apple.png">')
      $('.bottom').append('<img id = "cat" src = "images/cat.gif"><img id = "apple2" src = "images/apple.png">')
      //restart timer
      clearInterval(Interval);
      tens = "00";
      seconds = "00";
      appendTens.innerHTML = tens;
      appendSeconds.innerHTML = seconds;
      //position back at 0
      position1 = 0;
      position2 = 0;
    });
  }


/*
TIMER TIMER TIMER TIMER
  */
  var seconds = 00;
  var tens = 00;
  var appendTens = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  var buttonStart = document.getElementById('start');
  var Interval;

  buttonStart.onclick = function() {
     clearInterval(Interval);
     Interval = setInterval(startTimer, 10);
  }

  function startTimer () {
    tens++;
    if(tens < 9){appendTens.innerHTML = "0" + tens;}
    if (tens > 9){appendTens.innerHTML = tens;}
    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9){appendSeconds.innerHTML = seconds;}
  }


});
