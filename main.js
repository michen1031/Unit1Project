$(function() {
  var position1 = 0;
  var position2 = 0;
  var stophorse = null;

  var running = function () {
      position1 += 10;
      $('#horse').css({'transform': `translate(${position1}rem)`});
      if(collision($('#horse'), $('#apple1'))) {
        clearInterval(stophorse);
        //winning thing
        //alert("horse wins");
        clearInterval(Interval);
        horseWin();
    }
  }


  //start button
  $('#start').on('click', function() {
    stophorse = setInterval(running,500);
    $('#run').on('click', function() {
      position2 += 5;
      $('#cat').css({'transform': `translate(${position2}rem) scaleX(-1)`});
      if(collision($('#cat'), $('#apple2'))) {
        //alert('cat wins');
        clearInterval(Interval);
        clearInterval(stophorse);
        catWin();
      }
    });
  });

  $('#pause').on('click', function() {
    clearInterval(Interval);
    clearInterval(stophorse);
  })

/*
FUNCTIONS FUNCTIONS FUNCTIONS
*/

//make the horse run
  function horseRun () {
    var running = setInterval(function() {
      position1 += 10;
      $('#horse').css({'transform': `translate(${position1}rem)`});
      if(collision($('#horse'), $('#apple1'))) {
        clearInterval(running);
        //alert("asfajf");
        clearInterval(Interval);
        horseWin();
    }}, 500);
    return running;
  };

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


//put this text in html and make it display none
  function horseWin() {
    $('.racetrack').empty();
    $('.racetrack').append('<img class = "winner" src = "images/horseapple.jpeg">').css('border', 'white').append('<p class = "winText"> The horse got the apple first </p>');
  }

  function catWin() {
    $('.racetrack').empty();
    $('.racetrack').append('<img class = "winner" src = "images/catapple.jpg">').css('border', 'white').append('<p class = "winText"> You got the apple first! </p>');
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
