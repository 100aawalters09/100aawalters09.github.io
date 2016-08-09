var main = function() {
	var user = ""; // either x or o depending on user choice. Determined in startGame()
	var computer = "";
	var turn = false; // Default false. True = user. False = Computer
	var a1, a2, a3, b1, b2, b3, c1, c2, c3; // correlate to board spots. a = row1, b = row2, c = row3
	var compWon = false; // changes to true if computer has a win in checkWinner() function
	var userWon = false; // changes to true if user has a win in checkWinner() function
	var gameOver = false; // stops any moves from happening after either compWin or userWin are true
	var count = 0; // used to calculate tie. If all squares filled, count = 9;

	var startGame = function() {
	  $(".dropdown-menu a").on("click", function() {
		if ($(this).hasClass("x")) { // user chooses player
		  user = "x";
		  computer = "o";
		  turn = true; // if x user goes first
		} else {
		  user = "o";
		  computer = "x";
		  turn = false;
		  calibrateSquares(); // update any info in correlating squares. ie a1 to ".a1"
		  computerMove(); // computer goes first since x
		  checkWinner(); // checks if any winners thus far
		}
		$(".btn-group").hide();
		$("table").fadeIn(100);
		$(".choices").fadeIn(100).html("<h3>You are " + user + ".</br> The computer is " + computer + ".</h3>");
	  });
	};

	var userMove = $("table td").on("click", function() { // when square on table clicked, html is user text, count increases, check for win, then turn is false since the user just went, ensure correct variable values
	  var clicked = $(this);
	  if (user && turn && !gameOver && clicked.html() == "") {
		clicked.html(user);
		count++;
		checkWinner();
		turn = false;
		calibrateSquares();
		if (!gameOver) { // computer continues to choose spot until game is over
		  computerMove();
		}
		checkWinner();
	  } else {
		calibrateSquares();
		if (!gameOver) {
		  computerMove();
		}
		checkWinner();
	  }
	});

	var calibrateSquares = function() {
	  a1 = $(".a1").html();
	  a2 = $(".a2").html();
	  a3 = $(".a3").html();
	  b1 = $(".b1").html();
	  b2 = $(".b2").html();
	  b3 = $(".b3").html();
	  c1 = $(".c1").html();
	  c2 = $(".c2").html();
	  c3 = $(".c3").html();
	};

	var computerMove = function() { // determining where to move, blocks user if 2 in row/col/diag. and plays if 2 of self is in a row/col/diag.
	  if (!turn) {
		count++;
		if (a1 === "" && ((a2 === computer && a3 === computer) || (b2 === computer && c3 === computer) || (b1 === computer && c1 === computer))) {
		  $(".a1").html(computer);
		  turn = true;
		} else if (a1 === "" && ((a2 === user && a3 === user) || (b2 === user && c3 === user) || (b1 === user && c1 === user))) {
		  $(".a1").html(computer);
		  turn = true;
		} else {
		  if (a2 === "" && ((a1 === computer && a3 === computer) || (b2 === computer && c2 === computer))) {
			$(".a2").html(computer);
			turn = true;
		  } else if (a2 === "" && ((a1 === user && a3 === user) || (b2 === user && c2 === user))) {
			$(".a2").html(computer);
			turn = true;
		  } else {
			if (a3 === "" && ((a1 === computer && a2 === computer) || (b2 === computer && c1 === computer) || (b3 === computer && c3 === computer))) {
			  $(".a3").html(computer);
			  turn = true;
			} else if (a3 === "" && ((a1 === user && a2 === user) || (b2 === user && c1 === user) || (b3 === user && c3 === user))) {
			  $(".a3").html(computer);
			  turn = true;
			} else {
			  if (b1 === "" && ((b2 === computer && b3 === computer) || (a1 === computer && c1 === computer))) {
				$(".b1").html(computer);
				turn = true;
			  } else if (b1 === "" && ((b2 === user && b3 === user) || (a1 === user && c1 === user))) {
				$(".b1").html(computer);
				turn = true;
			  } else {
				if (b2 === "" && ((b1 === computer && b3 === computer) || (a2 === computer && c2 === computer) || (a1 === computer && c3 === computer) || (a3 == computer && c1 == computer))) {
				  $(".b2").html(computer);
				  turn = true;
				} else if (b2 === "" && ((b1 === user && b3 === user) || (a2 === user && c2 === user) || (a1 === user && c3 === user) || (a3 == user && c1 == user))) {
				  $(".b2").html(computer);
				  turn = true;
				} else {
				  if (b3 === "" && ((b2 === computer && b1 === computer) || (a3 === computer && c3 === computer))) {
					$(".b3").html(computer);
					turn = true;
				  } else if (b3 === "" && ((b2 === user && b1 === user) || (a3 === user && c3 === user))) {
					$(".b3").html(computer);
					turn = true;
				  } else {
					if (c1 == "" && ((c2 === computer && c3 === computer) || (a1 === computer && b1 === computer) || (a3 === computer && b2 === computer))) {
					  $(".c1").html(computer);
					  turn = true;
					} else if (c1 == "" && ((c2 === user && c3 === user) || (a1 === user && b1 === user) || (a3 === user && b2 === user))) {
					  $(".c1").html(computer);
					  turn = true;
					} else {
					  if (c2 == "" && ((c1 === computer && c3 === computer) || (a2 === computer && b2 === computer))) {
						$(".c2").html(computer);
						turn = true;
					  } else {
						if (c3 === "" && ((c1 === computer && c2 === computer) || (a3 === computer && b3 === computer) || (a1 === computer && b2 === computer))) {
						  $(".c3").html(computer);
						  turn = true;
						} else if (c3 === "" && ((c1 === user && c2 === user) || (a3 === user && b3 === user) || (a1 === user && b2 === user))) {
						  $(".c3").html(computer);
						  turn = true;
						} else {
						  if (b1 === "") {
							$(".b1").html(computer);
							turn = true;
						  } else {
							if (c2 === "") {
							  $(".c2").html(computer);
							  turn = true;
							} else {
							  if (a3 === "") {
								$(".a3").html(computer);
								turn = true;
							  } else {
								if (c3 === "") {
								  $(".c3").html(computer);
								  turn = true;
								} else {
								  if (a1 === "") {
									$(".a1").html(computer);
									turn = true;
								  } else {
									if (b2 === "") {
									  $(".b2").html(computer);
									  turn = true;
									} else {
									  if (b3 === "") {
										$(".b3").html(computer);
										turn = true;
									  } else {
										if (a2 === "") {
										  $(".a2").html(computer);
										  turn = true;
										} else {
										  if (c1 === "") {
											$(".c1").html(computer);
											turn = true;
										  }
										}
									  }
									}
								  }
								}
							  }
							}
						  }
						}
					  }
					}
				  }
				}
			  }
			}
		  }
		}
	  }
	};

	var checkWinner = function() { // do square contents match. Determine if computer or user won
	  calibrateSquares();
	  if (a1 == a2 && a2 == a3 && a3 == computer) {
		compWon = true;
	  } else {
		if (b1 == b2 && b2 == b3 && b3 == computer) {
		  compWon = true;
		} else {
		  if (c1 == c2 && c2 == c3 && c3 == computer) {
			compWon = true;
		  } else {
			if (a1 == b2 && b2 == c3 && c3 == computer) {
			  compWon = true;
			} else {
			  if (a3 == b2 && b2 == c1 && c1 == computer) {
				compWon = true;
			  } else {
				if (a1 == b1 && b1 == c1 && c1 == computer) {
				  compWon = true;
				} else {
				  if (a2 == b2 && b2 == c2 && c2 == computer) {
					compWon = true;
				  }
				}
			  }
			}
		  }
		}
	  }

	  if (a1 == a2 && a2 == a3 && a3 == user) {
		userWon = true;
	  } else {
		if (b1 == b2 && b2 == b3 && b3 == user) {
		  userWon = true;
		} else {
		  if (c1 == c2 && c2 == c3 && c3 == user) {
			userWon = true;
		  } else {
			if (a1 == b2 && b2 == c3 && c3 == user) {
			  userWon = true;
			} else {
			  if (a3 == b2 && b2 == c1 && c1 == user) {
				userWon = true;
			  } else {
				if (a1 == b1 && b1 == c1 && c1 == user) {
				  userWon = true;
				} else {
				  if (a2 == b2 && b2 == c2 && c2 == user) {
					userWon = true;
				  }
				}
			  }
			}
		  }
		}
	  }
	  
	  if (compWon) {
		gameOver = true;
		winningComp();
	  } else if (userWon) {
		gameOver = true;
		winningUser();
	  } else if (count === 9) {
		gameOver = true;
		tieOutput();
	  }
	};

	var winningComp = function() {
	  $("table").delay(1000).fadeOut(1000);
	  $(".winning").html("<h3>Computer won! </br> Hit reset to try again.</h3>");
	};

	var winningUser = function() {
	  $("table").delay(1000).fadeOut(1000);
	  $(".winning").html("<h3>You won! </br> Hit reset to try again.</h3>");
	};

	var tieOutput = function() {
	  $("table").delay(1000).fadeOut(1000);
	  $(".winning").html("<h3>Tie! </br> Hit reset to try again.</h3>");
	};

	var resetBoard = $(".reset").on("click", function() {
	  computer = ""; 
	  user = "";
	  turn = false;
	  compWon = false;
	  userWon = false;
	  gameOver = false;
	  count = 0;
	  a1 = "";
	  a2 = ""; 
	  a3 = "";
	  b1 = "";
	  b2 = ""; 
	  b3 = ""; 
	  c1 = ""; 
	  c2 = "";
	  c3 = "";
	  $(".btn-group").fadeIn(100);
	  $(".choices").hide();
	  $("table").hide();
	  $("td").html("");
	});
	
	startGame();
};

$(document).ready(main);
