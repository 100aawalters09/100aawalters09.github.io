var main = function() {
  var level = 0,
      turn = false,
      strict = false,
      gameStarted = false,
      simonSequence = [],
      tileClickIndex = 0;
  var allTiles = {1 : ".green", 2: ".red", 3: ".yellow", 4: ".blue"}
  $(".error").hide();
  
  function updateLevelAndMakeSequence() {
    updateLevel();
    var tileIndex = Math.floor(Math.random() * 4) + 1
    simonSequence.push(tileIndex);
  }

  function lightUpTile(clickedTile) {      
    playSound(clickedTile);
   
    clickedTile = +clickedTile; // turn tile chosen into an integer    
    var clickedColor = allTiles[clickedTile];
    
    $(clickedColor).addClass("activeTile");
    setTimeout(function() {
      $(clickedColor).removeClass("activeTile");
    }, 300);
  }
  
  function playSound(clickedTile) {
    var audioElement = document.getElementById("sound" + clickedTile);
	audioElement.play();
  }

  function updateLevel() {
    if (level <= 20) { level++; }

    if (level < 10) {
      $(".roundsNow").val("0" + level);
    } else {
      $(".roundsNow").val(level);
    }
  }

  function checkForEndGame() {
    if (level > 20) { endGameAndRestart(); }
  }
  
  function simonGo() {
    var i = 0;
    var interval = setInterval(function() {
      lightUpTile(simonSequence[i]);
      i++;

      if (i >= simonSequence.length) {
        clearInterval(interval);
      }
    }, 600);
    turn = true;
  }

  $(".simon li").on("click", function() {
    if (turn) {
      var clickedTile = $(this).attr("data-tile");
      lightUpTile(clickedTile);
      compareInputToCorrect(clickedTile);
    }
  });
  
  function compareInputToCorrect (clickedTile) {
    tileClickIndex += 1;
    $(".error").hide();
    if (turn && clickedTile != simonSequence[tileClickIndex - 1]) {
      if (strict == false) {
        turn = false;
        tileClickIndex = 0;
        $(".errorNotStrict").show();
        setTimeout(simonGo, 1000);
      } else if (strict == true) {
        $(".errorStrict").show();
        turn = false;
        tileClickIndex = 0;
        level = 0;
        simonSequence = [];
        updateLevelAndMakeSequence();
        checkForEndGame();
        setTimeout(simonGo, 1500);
      }
    } else if (turn && level == 20 && tileClickIndex == simonSequence.length) {
      setTimeout(function() {
        turn = false;
        endGameAndRestart();
      }, 800);
    } else if (turn && tileClickIndex == simonSequence.length) {
      setTimeout(function() {
        turn = false;
        updateLevelAndMakeSequence();
        checkForEndGame();
        tileClickIndex = 0;
        simonGo();
      }, 800);
    }
  }
  
    function restartGame() {
    $(".winnerAlert").hide();
    $(".simon").show();

    gameStarted = false;
    strict = false;
    turn = false;
    level = 0;
    simonSequence = [];

    $(".roundsNow").val("");
    var tileClickIndex = 0;
    $(".error").hide();

    // Pull out to common function
    $(".strictMode").css({"font-weight": 400, "color": "#7E5923", "background-color": "#DEC08D"});
  };

  function endGameAndRestart() {
    $(".winnerAlert").show();
    setTimeout(function() {
      restartGame();
    }, 3000);
  }

  $(".start").on("click", function() {
    if (!gameStarted) {
      gameStarted = true;
      updateLevelAndMakeSequence();
      checkForEndGame();
      simonGo();
    }
  });

  $(".strictMode").on("click", function() {
    if (gameStarted) { return } // Early-return pattern

    if (strict == true) {
      strict = false;
      $(".strictMode").css({fontWeight: 400, color: "#7E5923", backgroundColor: "#DEC08D"});
    } else {
      strict = true;
      $(".strictMode").css({fontWeight: 600, color: "black", backgroundColor: "white"});
    }
  });

  $(".restart").on("click", function() { restartGame(); }); 
}

$(document).ready(main);
