$(document).ready(function() {
	var time = +($(".time").html());
	$(".output h2").html(time + ":00");
	var running = false;
	var seconds = 0;
	var minutes = time;
	var x;
	var timestampStart;
	var timestampDiff = null;

	$("#increase").on("click", function() {
		$(".output").css("background-color", "rgb(181, 225, 244)");
		$("#startPause").html("Start");
		if (!running) {
			time += 5;
			$(".time").html(time);
			if (time < 10) {
				$(".output h2").html("0" + time + ":00");
			} else {
				$(".output h2").html(time + ":00");
			}
			minutes = time;
		}
	});

	$("#decrease").on("click", function() {
		$(".output").css("background-color", "rgb(181, 225, 244)");
		$("#startPause").html("Start");
		if (time > 0 && !running) {
			time -= 5;
			$(".time").html(time);
			if (time < 10) {
				$(".output h2").html("0" + time + ":00");
			} else {
				$(".output h2").html(time + ":00");
			}
			minutes = time;
		}
	});

	function decrement() {
		if (minutes === 0 && seconds === 0) {
			endFunction();
		} else if (seconds == 0 && minutes > 0) {
			minutes = minutes - 1;
			seconds = 59;
			twoDecimal();
		} else {
			seconds--;
			twoDecimal();
		}
	}

	function twoDecimal() {
		if (minutes < 10 && minutes.length != 2) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		$(".output h2").html(minutes + ":" + seconds);
		startDecrement();
	}

	function startDecrement() {
		if (running) {
			x = setTimeout(decrement, timestampDiff || 1000);
			timestampDiff = null;
			timestampStart = Date.now();
		}
	}

	$("#startPause").on("click", function() {
		$(".output").css("background-color", "rgb(181, 225, 244)");
		if (!running) {
			running = true;
			if (minutes == 0 || time == 0) {
				endFunction();
			}
			$("#startPause").html("Pause");
			if (!timestampDiff) {
				decrement();
			} else {
				startDecrement();
			}
		} else {
			clearTimeout(x);
			timestampDiff = 1000 - (Date.now() - timestampStart);
			running = false;
			$("#startPause").html("Resume");
		}
	});

	$("#reset").on("click", function() {
		running = false;
		seconds = 0;
		time = 25;
		minutes = time;
		clearTimeout(x);
		$("#startPause").html("Start");
		$(".time").html(time);
		$(".output h2").html(time + ":00");
		$('#sound_element').html("");
		$(".output").css("background-color", "rgb(181, 225, 244)");
	});

	function endFunction() {
		clearTimeout(x);
		running = false;
		$(".output h2").html("Time's up!");
		$(".output").css("background-color", "red");
	}
});
