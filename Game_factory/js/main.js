/* 
	TITLE: Factory farming, our food, and effects.

	OBJECTIVE: Correctly answer questions relating to factory farming and meat consumption.
	*/

var newGame = function() {
	
	var nameInput;
	var animalInput;
	var animal;
	var score;
	var outOf;
	
	var character = function(name, animal, score) {
		this.name = name;
		this.animal = animal;
		this.score = score;
	};
	
	var user = new character(nameInput, animalInput, score);
	
	begin();
	function begin() {
		$('body').css('background-image', "url('img/envio.png')");
		$('#inform').fadeIn(1000); //informative factory farming info
		$('#informBtn').on('click', function() {
			$('#inform').hide();
			$('#quote').fadeIn(1000); //quote pg
			$('body').css('background-image', "url('img/Quote.png')");
		});
		$('#quoteBtn').on('click', function() {
			$('#quote').hide();
			$('#userInput').fadeIn(1000); //Get name and animal to save
			$('body').css('background-image', "url('img/BackgroundChicken.png')");
		});
		$('.dropdown li a').on('click', function() {
			$('#animalChooseBtn').html($(this).text());
			animalInput = $(this).text();
			animal = animalInput;
			$('#userBtn').on('click', function() {
				nameInput = $('#name').val();
				if(nameInput === "") {
					$('#nameError').show("show");
				} else {
					startQuestions();
				}
				return false;
			});
		});
	}
	
	function startQuestions() {
		score = 0;
		if (animalInput === "Chickens") {
			$('body').css('background-image', 'url("img/BackgroundChicken2.png")');
			outOf = 7;
			chickenQuestions1();
		} else if (animalInput === "Cows") {
			$('body').css('background-image', 'url("img/BackgroundCow.png")');
			outOf = 6;
			cowQuestions1();
		} else {
			$('body').css('background-image', 'url("img/BackgroundPig.png")');
			outOf = 5;
			pigQuestion();
		};
	}
	
	function chickenQuestions1() {
		$('#userInput').hide();
		$('#questions, #q1, #score').fadeIn(1000);
		$('#q1 .dropdown li a').on('click', function() {
			$('#submitQ1').html($(this).text()).attr('disabled', true);		
			if ($(this).hasClass('correct')) {
				$('#q1 .questionReplyRight').show("show");
				$('#currentScore').html(score = 1);
			} else {
				$('#q1 .questionReplyWrong').show("show");
				$('#q1 .correcting').html("The answer was: " + $('#q1 .correct').text());	
			}
			$('#nextQBtn1').fadeIn(1000).on('click', function() {
				$('.questionReplyRight, .questionReplyWrong, #q1').hide();
				$('#q2').fadeIn(1000);
				chickenQuestions2();
			});
		});
	}
	
	function chickenQuestions2() {
		$('#q2 .dropdown li a').on('click', function() {
			$('#submitQ2').html($(this).text()).attr('disabled', true);		
			if ($(this).hasClass('correct')) {
				$('#q2 .questionReplyRight').show("show");
				$('#currentScore').html(score += 1);
			} else {
				$('#q2 .questionReplyWrong').show("show");	
				$('#q2 .correcting').html("The answer was: " + $('#q2 .correct').text());	
			}
			$('#nextQBtn2').fadeIn(1000).on('click', function() {
				$('.questionReplyRight, .questionReplyWrong, #q2').hide();
				$('#q3').fadeIn(1000);
				chickenQuestions3();
			});
		});
	}
	
	function chickenQuestions3() {
		$('#q3 .dropdown li a').on('click', function() {
			$('#submitQ3').html($(this).text()).attr('disabled', true);			
			if ($(this).hasClass('correct')) {
				$('#q3 .questionReplyRight').show("show");
				score += 1;
				$('#currentScore').html(score);
			} else {
				$('#q3 .questionReplyWrong').show("show");	
				$('#q3 .correcting').html("The answer was: " + $('#q3 .correct').text());	
			}
			$('#nextQBtn3').fadeIn(1000).on('click', function() {
			$('.questionReplyRight, .questionReplyWrong, #q3').hide();
			generalQuestions();
			});
		});	
	}

	function cowQuestions1() {
		$('#userInput').hide();
		$('#questions, #q4, #score').fadeIn(1000);
		$('#q4 .dropdown li a').on('click', function() {
			$('#submitQ4').html($(this).text()).attr('disabled', true);
			$('#q4 .dropdown-menu').toggle();		
			if ($(this).hasClass('correct')) {
				$('#q4 .questionReplyRight').show("show");
				$('#currentScore').html(score = 1);
			} else {
				$('#q4 .questionReplyWrong').show("show");
				$('#q4 .correcting').html("The answer was: " + $('#q4 .correct').text());	
			}
			$('#nextQBtn4').fadeIn(1000).on('click', function() {
				$('.questionReplyRight, .questionReplyWrong, #q4').hide();
				$('#q5').fadeIn(1000);
				cowQuestions2();
			});
		});
	}
	
	function cowQuestions2() {
		$('#q5 .dropdown li a').on('click', function() {
			$('#submitQ5').html($(this).text()).attr('disabled', true);
			$('#q5 .dropdown-menu').toggle();		
			if ($(this).hasClass('correct')) {
				$('#q5 .questionReplyRight').show("show");
				$('#currentScore').html(score += 1);
			} else {
				$('#q5 .questionReplyWrong').show("show");
				$('#q5 .correcting').html("The answer was: " + $('#q5 .correct').text());	
			}
			$('#nextQBtn5').fadeIn(1000).on('click', function() {
				$('.questionReplyRight, .questionReplyWrong, #q5').hide();
				generalQuestions();
			});
		});
	}
	
	function pigQuestion() {
		$('#userInput').hide();
		$('#questions, #q6, #score').fadeIn(1000);
		$('#q6 .dropdown li a').on('click', function() {
			$('#submitQ6').html($(this).text()).attr('disabled', true);
			$('#q6 .dropdown-menu').toggle();		
			if ($(this).hasClass('correct')) {
				$('#q6 .questionReplyRight').show("show");
				$('#currentScore').html(score = 1);
			} else {
				$('#q6 .questionReplyWrong').show("show");
				$('#q6 .correcting').html("The answer was: " + $('#q6 .correct').text());
			}
			$('#nextQBtn6').fadeIn(1000).on('click', function() {
				$('.questionReplyRight, .questionReplyWrong, #q6').hide();
				generalQuestions();
			});
		});
	}
	
	function generalQuestions() {
		$('#q7').fadeIn(1000);
		$('#q7 .dropdown li a').on('click', function() {
			$('#submitQ7').html($(this).text()).attr('disabled', true);		
			if ($(this).hasClass('correct')) {
				$('#q7 .questionReplyRight').show("show");
				$('#currentScore').html(score += 1);
			} else {
				$('#q7 .questionReplyWrong').show("show");
				$('#q7 .correcting').html("The answer was: " + $('#q7 .correct').text());	
			}
			$('#nextQBtn7').fadeIn(1000).on('click', function() {
				$('.questionReplyRight, .questionReplyWrong, #q7').hide();
				$('#q8').fadeIn(1000);
			});
		});
		$('#q8 .dropdown li a').on('click', function() {
			$('#submitQ8').html($(this).text()).attr('disabled', true);		
			if ($(this).hasClass('correct')) {
				$('#q8 .questionReplyRight').show("show");
				$('#currentScore').html(score += 1);
			} else {
				$('#q8 .questionReplyWrong').show("show");
				$('#q8 .correcting').html("The answer was: " + $('#q8 .correct').text());	
			}
			$('#nextQBtn8').fadeIn(1000).on('click', function() {
				$('.questionReplyRight, .questionReplyWrong, #q8').hide();
				$('#q9').fadeIn(1000);
			});
		});
		$('#q9 .dropdown li a').on('click', function() {
			$('#submitQ9').html($(this).text()).attr('disabled', true);		
			if ($(this).hasClass('correct')) {
				$('#q9 .questionReplyRight').show("show");
				$('#currentScore').html(score += 1);
			} else {
				$('#q9 .questionReplyWrong').show("show");
				$('#q9 .correcting').html("The answer was: " + $('#q9 .correct').text());	
			}
			$('#nextQBtn9').fadeIn(1000).on('click', function() {
				$('.questionReplyRight, .questionReplyWrong, #q9').hide();
				$('#q10').fadeIn(1000);
			});
		});
		$('#q10 .dropdown li a').on('click', function() {
			$('#submitQ10').html($(this).text()).attr('disabled', true);		
			if ($(this).hasClass('correct')) {
				$('#q10 .questionReplyRight').show("show");
				$('#currentScore').html(score += 1);
			} else {
				$('#q10 .questionReplyWrong').show("show");
				$('#q10 .correcting').html("The answer was: " + $('#q10 .correct').text());	
			}
			$('#nextQBtn10').fadeIn(1000).on('click', function() {
				$('#questions, #score').hide();
				$('#status').fadeIn(1000);
				$('#finish').html("Congratulations, " + nameInput + "!");
				$('#endScore').html("You scored " + score + "/" + outOf + " points");
			});
		});
	}
			
};	

$(document).ready(newGame);
