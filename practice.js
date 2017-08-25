$(function() {
  var position1 = 0;
  var position2 = 0;
  var goHorse = null;
  var level = -1;
  var character = 0;
  var easyBestSecs = null;
  var easyBestMils = null;
  var medBestSecs = null;
  var medBestMils = null;
  var hardBestSecs = null;
  var hardBestMils = null;
  var easyBestScore = null;
  var medBestScore = null;
  var hardBestScore = null;
  var players = ["none", "cat", "ostrich", "pikachu", "homer", "bears", "yoshi"];

  //RUN THE GAME
  startGame();

  //USER PICKS A PLAYER
    $('#catBut').on('click', function() {
      character = 1;
      var audio = $("#catSound")[0];
      audio.play();
      $('#ostrichBut').css("background", "#9acd32");
      $('#catBut').css("background", "#FD5B5B");
      $('#pikaBut').css("background", "#9acd32");
      $('#homerBut').css("background", "#9acd32");
      $('#bearsBut').css("background", "#9acd32");
      $('#yoshiBut').css("background", "#9acd32");
      displayAnimal(players[character]);
    });

    $('#ostrichBut').on('click', function() {
      character = 2;
      var audio = $("#ostrichSound")[0];
      audio.play();
      $('#catBut').css("background", "#9acd32");
      $('#ostrichBut').css("background", "#FD5B5B");
      $('#pikaBut').css("background", "#9acd32");
      $('#homerBut').css("background", "#9acd32");
      $('#bearsBut').css("background", "#9acd32");
      $('#yoshiBut').css("background", "#9acd32");
      displayAnimal(players[character]);
    });

    $('#pikaBut').on('click', function() {
      character = 3;
      var audio = $("#pikaSound")[0];
      audio.play();
      $('#ostrichBut').css("background", "#9acd32");
      $('#catBut').css("background", "#9acd32");
      $('#pikaBut').css("background", "#FD5B5B");
      $('#homerBut').css("background", "#9acd32");
      $('#bearsBut').css("background", "#9acd32");
      $('#yoshiBut').css("background", "#9acd32");
      displayAnimal(players[character]);
    });

    $('#homerBut').on('click', function() {
      character = 4;
      var audio = $("#homerSound")[0];
      audio.play();
      $('#ostrichBut').css("background", "#9acd32");
      $('#catBut').css("background", "#9acd32");
      $('#pikaBut').css("background", "#9acd32");
      $('#homerBut').css("background", "#FD5B5B");
      $('#bearsBut').css("background", "#9acd32");
      $('#yoshiBut').css("background", "#9acd32");
      displayAnimal(players[character]);
    });

    $('#bearsBut').on('click', function() {
      character = 5;
      var audio = $("#bearsSound")[0];
      audio.play();
      $('#ostrichBut').css("background", "#9acd32");
      $('#catBut').css("background", "#9acd32");
      $('#pikaBut').css("background", "#9acd32");
      $('#homerBut').css("background", "#9acd32");
      $('#bearsBut').css("background", "#FD5B5B");
      $('#yoshiBut').css("background", "#9acd32");
      displayAnimal(players[character]);
    });

    $('#yoshiBut').on('click', function() {
      character = 6;
      var audio = $("#yoshiSound")[0];
      audio.play();
      $('#ostrichBut').css("background", "#9acd32");
      $('#catBut').css("background", "#9acd32");
      $('#pikaBut').css("background", "#9acd32");
      $('#homerBut').css("background", "#9acd32");
      $('#bearsBut').css("background", "#9acd32");
      $('#yoshiBut').css("background", "#FD5B5B");
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
    //since the cat gif needs to be flipped horizontally
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
      $('#easy').css("background", "#FD5B5B");
      $('#med').css("background", "#9acd32");
      $('#hard').css("background", "#9acd32");
      return level;
    });

    var medButton = $('#med').on('click', function() {
      level = 1;
      $('#med').css("background", "#FD5B5B");
      $('#easy').css("background", "#9acd32");
      $('#hard').css("background", "#9acd32");
      return level;
    });

    var hardButton = $('#hard').on('click', function() {
      level = 2;
      $('#hard').css("background", "#FD5B5B");
      $('#easy').css("background", "#9acd32");
      $('#med').css("background", "#9acd32");
      return level;
    });

  //START GAME
    function startGame() {
      resetAnimalPositions([players[character], 'horse']);

      $('#start').on('click', function() {
        if(level == -1) {
          alert("Please select a difficulty!");
          return;
        }
        if (character == 0) {
          alert("Please select a player!");
          return;
        }

        //COUNTDOWN
        $('#count_num').css("display", "inline-block");
        var timers = setInterval(function(){
          $("#count_num").html(function(i,html){
            if(parseInt(html)>1){
              return parseInt(html)-1;
            }
            //  if(parseInt(html) > -1) {
            //    return "Go!";
            //  }
            else {
              clearTimeout(timers);
              goHorse = setInterval(running, 400);
              $('#count_num').css("display", "none");
            }
          });
        },1000);

        //Run button becomes bigger after hitting start
        $('#run').css("background", "#FD5B5B").css("font-size", "2em").css("padding", ".7em");

        //User cannot click Run until countdown is done
        setTimeout(function(){
          $('#run').on('click', function() {
            if(level == 0) {
              position2 += 7;
            }
            else if(level == 1) {
              position2 += 5;
            }
            else if(level == 2) {
              position2 += 3;
            }
            if(players[character] == "cat") {
              $(`#${players[character]}`).css({'transform': `translate(${position2}rem) scaleX(-1)`});
            }
            else if(players[character] != "cat") {
              $(`#${players[character]}`).css({'transform': `translate(${position2}rem)`});
            }

            var best_score = [
              {'secs': null, 'mils': null, 'score': null, 'level': 'easy'},
              {'secs': null, 'mils': null, 'score': null, 'level': 'med'},
              {'secs': null, 'mils': null, 'score': null, 'level': 'hard'}
            ];

            function isNull(val) {
             return (val.secs === null && val.mils === null)
            }

            function isEasy(val, level) {
              return (isNull(val) && val.level === 'easy' && level == 0)
            }
            function isMed(val, level) {
              return (isNull(val) && val.level === 'med' && level == 1)
            }
            function isHard(val, level) {
              return (isNull(val) && val.level === 'hard' && level == 2)
            }

            function assignTime(val) {
              val.secs = seconds;
              val.mils = tens;
              val.score = seconds + ':' + tens;
            }

            function isTimeBetter(old_time, new_time) {
              //calc
            }

            if(collision($(`#${players[character]}`), $('#apple2'))) {
              best_score.map((val, i) => {
                if (isEasy(val, level)) assignTime(val)
                if (isMed(val, level)) assignTime(val)
                if (isHard(val, level)) assignTime(val)
              })
            }

            console.log(best_score[0], 'best');

            if(collision($(`#${players[character]}`), $('#apple2'))) {
              // if(easyBestSecs == null && easyBestMils == null) {
              //   easyBestSecs = seconds;
              //   easyBestMils = tens;
              //   easyBestScore = `${easyBestSecs}:${easyBestMils}`;
              // }
              // else if(medBestSecs == null && medBestMils == null) {
              //   medBestSecs = seconds;
              //   medBestMils = tens;
              //   medBestScore = `${medBestSecs}:${medBestMils}`;
              // }
              // else if(hardBestSecs == null && hardBestMils == null) {
              //   hardBestSecs = seconds;
              //   hardBestMils = tens;
              //   hardBestScore = `${hardBestSecs}:${hardBestMils}`;
              // }
              // if(tens < easyBestMils) {
              //   if(seconds <= easyBestSecs) {
              //     easyBestSecs = seconds;
              //     easyBestMils = tens;
              //     easyBestScore = `${bestSecs}:${bestMils}`;
              //   }
              // }
              // else if(tens < medBestMils) {
              //   if(seconds <= medBestSecs) {
              //     medBestSecs = seconds;
              //     medBestMils = tens;
              //     medBestScore = `${bestSecs}:${bestMils}`;
              //   }
              // }
              // else if(tens < hardBestMils) {
              //   if(seconds <= hardBestSecs) {
              //     hardBestSecs = seconds;
              //     hardBestMils = tens;
              //     hardBestScore = `${bestSecs}:${bestMils}`;
              //   }
              // }

              if(level == 0) {
                //$('.easyBestTime').remove();
                $('.easyBestTime').text(`Easy Best Time: ${easyBestScore}`);
              }
              else if(level == 1) {
                $('.medBestTime').text(`Medium Best Time: ${medBestScore}`);
              }
              else if(level == 2) {
                $('.hardBestTime').text(`Hard Best Time: ${hardBestScore}`);
              }

            //  console.log(bestScore);
              clearInterval(Interval);
              clearInterval(goHorse);
              var audio = $("#winning")[0];
              audio.play();
              var imageName = `${players[character]}apple`;
              var imageType = "jpg";
              var raceWinner = "You";

              theWinner(imageName, imageType, raceWinner);
            }
          });
        }, 3350);
      });
    }

  //PAUSE BUTTON
    $('#pause').on('click', function() {
      clearInterval(Interval);
      clearInterval(goHorse);
    });

  //HORSE RUNNING
    var running = function () {
      position1 += 8;
      $('#horse').css({'transform': `translate(${position1}rem)`});
      if(collision($('#horse'), $('#apple1'))) {
        clearInterval(goHorse);
        clearInterval(Interval);
        var audio = $("#losing")[0];
        audio.play();
        var imageName = "horseapple";
        var imageType = "jpeg";
        var raceWinner = "You lose! The horse";

        theWinner(imageName, imageType, raceWinner);
      }
    }

  //ANNOUNCE THE WINNER
    function theWinner(animalpic, imageType, winner) {
      //DISPLAY PLAY AGAIN BUTTON
        $('#playAgain').css("display", "block");
        $('.buttonContainer').css("display", "none");

      //HIDE THE RACETRACK
        $('.top').hide();
        $('.bottom').hide();
        $('#start').off('click');
        $('#run').off('click');

      //DISPLAY WINNER TEXT/IMAGES
        $('.racetrack').append(`<div class = "winnerDiv"><img class = "winner" src = images/${animalpic}.${imageType}></div>`).css("border", "#9acd32").append(`<p class = "winText"> ${winner} got the apple first! </p>`);
      }

  //PLAY THE GAME AGAIN
    $('#playAgain').on('click', function() {
      //EMPTY WINNER DIVS
      $('.winnerDiv').remove();
      $('.winText').remove();

      //DISPLAY RACETRACK/BUTTONS
      $('.racetrack').children().css("display", "block");
      $('.racetrack').css("border", "black solid 1px");
      $('.buttonContainer').css("display", "block");
      $('#playAgain').css("display", "none");
      $('#easy').css("background", "#9acd32");
      $('#med').css("background", "#9acd32");
      $('#hard').css("background", "#9acd32");
      startGame();
      $('.top').show();
      $('.bottom').show();
      $('#run').css("background","#9acd32").css("font-size", "1em").css("padding", ".3em");

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
      $("#count_num").html(3);
      });


  //TIMER
    var seconds = 00;
    var tens = 00;
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('start');
    var Interval;

    buttonStart.onclick = function() {
      setTimeout(function() {
        if(character != 0 && level != -1) {
          clearInterval(Interval);
          Interval = setInterval(startTimer, 10);
        }
      }, 4350);
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
      }
      else {
        console.log(img1, img2, 'why you no work');
      }
    }
});

//
// var best = [
//   {easy_secs: null, easy_mils: null}
//   {med_secs: null, med_mils: null}
//   {hard_secs: null, hard_mils: null}
// ];
//
// function isEasy(best[0]) {
//  return (easyBestSecs == null && easyBestMils == null)
// }
//
// function isMed(best[1]) {
//   return (medBestSecs == null && medBestMils == null)
// }
//
// function isHard(best[2]) {
//  return (hardBestSecs == null && hardBestMils == null)
// }
//
// function assignValues() {
//
// }
//
// if(collision($(`#${players[character]}`), $('#apple2'))) {
//   best.map((val, i) => {
//     console.log(val, i, 'loop it');
//   })
//
//   if(easyBestSecs == null && easyBestMils == null) {
//     easyBestSecs = seconds;
//     easyBestMils = tens;
//     easyBestScore = `${easyBestSecs}:${easyBestMils}`;
//   }
//   else if(medBestSecs == null && medBestMils == null) {
//     medBestSecs = seconds;
//     medBestMils = tens;
//     medBestScore = `${medBestSecs}:${medBestMils}`;
//   }
//   else if(hardBestSecs == null && hardBestMils == null) {
//     hardBestSecs = seconds;
//     hardBestMils = tens;
//     hardBestScore = `${hardBestSecs}:${hardBestMils}`;
//   }
//   if(tens < easyBestMils) {
//     if(seconds <= easyBestSecs) {
//       easyBestSecs = seconds;
//       easyBestMils = tens;
//       easyBestScore = `${easyBestSecs}:${easyBestMils}`;
//     }
//   }
//   else if(tens < medBestMils) {
//     if(seconds <= medBestSecs) {
//       medBestSecs = seconds;
//       medBestMils = tens;
//       medBestScore = `${medBestSecs}:${medBestMils}`;
//     }
//   }
//   else if(tens < hardBestMils) {
//     if(seconds <= hardBestSecs) {
//       hardBestSecs = seconds;
//       hardBestMils = tens;
//       hardBestScore = `${hardBestSecs}:${hardBestMils}`;
//     }
//   }
//
// var bestScores = function(level) {
//   if(`${level}BestSecs` == null && `${level}BestMils` == null) {
//     `${level}BestSecs` = seconds;
//     `${level}BestMils` = tens;
//     `${level}BestScore` = `${level}BestSecs:${level}BestMils}`;
//   }
// }
