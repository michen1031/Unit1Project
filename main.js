$(function() {
  var position1 = 0;
  var position2 = 0;
  var goHorse = null;
  var level = -1;
  var character = 0;
  var players = ["none", "cat", "ostrich", "pikachu"];

  //RUN THE GAME
  startGame();

  //USER PICKS A PLAYER
  $('#catdog').on('click', function() {
    character = 1;
    $('#ostrichBut').css("background", "white");
    $('#catdog').css("background", "yellow");
    $('#pikaBut').css("background", "white");
    displayAnimal(players[character]);
  });

  $('#ostrichBut').on('click', function() {
    character = 2;
    $('#catdog').css("background", "white");
    $('#ostrichBut').css("background", "yellow");
    $('#pikaBut').css("background", "white");
    displayAnimal(players[character]);
  });

  $('#pikaBut').on('click', function() {
    character = 3;
    $('#ostrichBut').css("background", "white");
    $('#catdog').css("background", "white");
    $('#pikaBut').css("background", "yellow");
    displayAnimal(players[character]);
  });

  function displayAnimal(animal) {
    $('.bottom').empty();
    $('.bottom').append(`<img id = ${players[character]} src = images/${animal}.gif><img id = "apple2" src = "images/apple.png">`)
    console.log(players[character]);
  }


  // GET FIND INITIAL POSITION OF ANIMALS AND RESET THEM WHEN REPLAYING THE GAME
  var horse_postion = getInitPositionOfAnimal('horse');
  var player_postion = getInitPositionOfAnimal(players[character]);

  function getInitPositionOfAnimal(animal) {
    return $('#' + animal).position();
  }

  // function isPlayer(animal) {
  //   return (animal === players[character]) ? true : false
  // }

  function isCat(animal) {
    return (animal === "cat") ? true : false
  }

  function resetAnimalPositions(animals) {
    animals.map((animal) => {
      let set_translate = (isCat(animal))
        ? `translate(0rem) scaleX(-1)`
        : `translate(0rem)`
      $('#' + animal).css({'transform': set_translate});
    })
  }


  //EASY MEDIUM HARD BUTTONS
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


  //start button //run
  function startGame(levelNum) {
    resetAnimalPositions([players[character], 'horse']);
    $('#start').on('click', function() {
      if(level == -1) {
        alert("Please select a difficulty!");
        return;
      }
      if(character == 0) {
        alert("Please select a player!");
        return;
      }
      goHorse = setInterval(running, 400);
      $('#run').on('click', function() {
        if(level == 0) {
          position2 += 8;
        }
        else if(level == 1) {
          position2 += 6;
        }
        else if(level == 2) {
          position2 += 4;
        }
        console.log("player is", players[character]);
        console.log("position2 is", position2);
        if(players[character] == "cat") {
          $(`#${players[character]}`).css({'transform': `translate(${position2}rem) scaleX(-1)`});
        }
        else if(players[character] != "cat") {
          $(`#${players[character]}`).css({'transform': `translate(${position2}rem)`});
        }

        if(collision($(`#${players[character]}`), $('#apple2'))) {
          clearInterval(Interval);
          clearInterval(goHorse);
          var imageName = `${players[character]}apple`;
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


  //ANNOUNCE THE WINNER
  function theWinner(animalpic, imageType, winner) {
    //display playAgain button
    $('#playAgain').css("display", "block");
    $('.buttonContainer').css("display", "none");
    //HIDE THE RACETRACK
    $('.top').hide();
    $('.bottom').hide();
    $('#start').off('click');
    $('#run').off('click');

    //DISPLAY WINNER TEXT/IMAGES
    $('.racetrack').append(`<div class = "winnerDiv"><img class = "winner" src = images/${animalpic}.${imageType}></div>`).css("border", "white").append(`<p class = "winText"> ${winner} got the apple first! </p>`);
  }

  //PLAY THE GAME AGAIN
  $('#playAgain').on('click', function() {
    //EMPTY WINNER DIVS
    $('.winnerDiv').empty();
    $('.winText').empty();
    //DISPLAY RACETRACK/BUTTONS
    $('.racetrack').children().css("display", "block");
    $('.racetrack').css("border", "black solid 1px");
    $('.buttonContainer').css("display", "block");
    $('#playAgain').css("display", "none");
    $('#easy').css("background", "white");
    $('#med').css("background", "white");
    $('#hard').css("background", "white");
    startGame();
    $('.top').show()
    $('.bottom').show()
    //START THE TIMER OVER
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
    //REPOSITION CHARACTERS
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
    if(character != 0 && level != -1) {
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
    }
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

});
