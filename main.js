$(function() {
  var position1 = 0;
  var position2 = 0;
  var goHorse = null;
  var level = -1;

  var horse_postion = getInitPositionOfAnimal('horse')
  var cat_postion = getInitPositionOfAnimal('cat')

  function getInitPositionOfAnimal(animal) {
    return $('#' + animal).position();
  }

  var easyButton = $('#easy').on('click', function() {
    level = 0;
    $('#easy').css("background", "yellow");
    $('#med').css("background", "white");
    $('#hard').css("background", "white");
    return level;
  });

  var medButton = $('#med').on('click', function() {
    level = 1;
    $('#med').css("background", "yellow");
    $('#easy').css("background", "white");
    $('#hard').css("background", "white");
    return level;
  });

  var hardButton = $('#hard').on('click', function() {
    level = 2;
    $('#hard').css("background", "yellow");
    $('#easy').css("background", "white");
    $('#med').css("background", "white");
    return level;
  });

  function resetAnimalPositions(animals) {
    animals.map((animal) => {
      let set_translate = (isCat(animal))
        ? `translate(0rem) scaleX(-1)`
        : `translate(0rem)`
      $('#' + animal).css({'transform': set_translate});
    })
  }

  function isCat(animal) {
    return (animal === 'cat') ? true : false
  }

  startGame();

  //start button //run
  function startGame(levelNum) {
    resetAnimalPositions(['cat', 'horse']);
    $('#start').on('click', function() {
      if(level == -1) {
        alert("Please select a difficulty!");
        return;
      }

      goHorse = setInterval(running, 400);
      $('#run').on('click', function() {
        console.log(getInitPositionOfAnimal('cat'))
        if(level == 0) {
          position2 += 8;
        }
        else if(level == 1) {
          position2 += 5;
        }
        else if(level == 2) {
          position2 += 3;
        }
        console.log(position2);
        $('#cat').css({'transform': `translate(${position2}rem) scaleX(-1)`});

        if(collision($('#cat'), $('#apple2'))) {
          clearInterval(Interval);
          clearInterval(goHorse);
          var imageName = "catapple";
          var imageType = "jpg";
          var raceWinner = "You"
          theWinner(imageName, imageType, raceWinner);
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
      var raceWinner = "You lose! The horse";
      theWinner(imageName, imageType, raceWinner);
    }
  }

  //colliding
  function collision(img1, img2) {
    if (img1 && img2) {
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
    } else {
      console.log(img1, img2, 'why you no work');
    }
  }


  //winner announcement
  function theWinner(animalpic, imageType, winner) {
    //display playAgain button
    $('#playAgain').css("display", "block");
    $('.buttonContainer').css("display", "none");
    //empty racetrack
    $('.top').hide();
    $('.bottom').hide();
    $('#start').off('click');
    $('#run').off('click');

    //display winner pictures/text
    $('.racetrack').append(`<div class = "winnerDiv"><img class = "winner" src = images/${animalpic}.${imageType}></div>`).css("border", "white").append(`<p class = "winText"> ${winner} got the apple first! </p>`);
  }

  $('#playAgain').on('click', function() {
    //empty winner divs
    $('.winnerDiv').empty();
    $('.winText').empty();
    //display the racetrack and buttons again
    $('.racetrack').children().css("display", "block");
    $('.racetrack').css("border", "black solid 1px");
    $('.buttonContainer').css("display", "block");
    $('#playAgain').css("display", "none");
    $('#easy').css("background", "white");
    $('#med').css("background", "white");
    $('#hard').css("background", "white");
    startGame();

      //reposition horse/cat
    $('.top').show()
    $('.bottom').show()

    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
    //position back at 0
    position1 = 0;
    position2 = 0;
    level = -1;
    });


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
