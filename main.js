$(function() {
  var position1 = 0;
  var position2 = 0;
  var goHorse = null;
  var level = 0;


  startGame(level);

  //start button //run
  function startGame(levelNum) {
    $('#start').on('click', function() {
      var subtractNum = 600-(levelNum*100);
      console.log(subtractNum);
      goHorse = setInterval(running, subtractNum);
      $('#run').on('click', function() {
        position2 += 5;
        console.log(position2);
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
  }

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


  //winner announcement
  function theWinner(animalpic, imageType) {
    //display playAgain button
    $('#playAgain').css("display", "block");
    $('#nextLevel').css("display", "block");
    $('.buttonContainer').css("display", "none");
    //empty racetrack
    $('.top').empty();
    $('.bottom').empty();
    $('#start').off('click');
    $('#run').off('click');
    //display winner pictures/text
    $('.racetrack').append(`<div class = "winnerDiv"><img class = "winner" src = images/${animalpic}.${imageType}></div>`).css("border", "white").append('<p class = "winText"> You got the apple first! </p>');
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
      $('.buttonContainer').css("display", "block");
      $('#playAgain').css("display", "none");
      $('#nextLevel').css("display", "none");
      startGame(level);

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
      console.log(position2);
    });
  }


    $('#nextLevel').on('click', function() {
      //empty winner divs
      console.log('hi');
      $('.winnerDiv').empty();
      $('.winText').empty();
      $('.top').empty();
      $('.bottom').empty();
      //display the racetrack and buttons again
      $('.racetrack').children().css("display", "block");
      $('.racetrack').css("border", "black solid 1px");
      $('.buttonContainer').css("display", "block");
      $('#playAgain').css("display", "none");
      $('#nextLevel').css("display", "none");
      level++;

      startGame(level);

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
      console.log(position2);
    })



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
