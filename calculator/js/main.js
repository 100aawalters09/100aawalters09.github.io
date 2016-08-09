var main = function() {
  var total = 0; 
  var current = ""; 
  var next = ""; 
  var operation = ""; 
  var clicked = ""; 
  var numInput = {"zero" : 0, "one" : 1, "two" : 2, "three" : 3, "four" : 4, "five" : 5, "six" : 6, "seven" : 7, "eight": 8, "nine" : 9 };
  var operations = {"divide" : "/", "multiply" : "*", "add" : "+", "subtract" : "-"};
  
  $(".num").on("click", function() {
    clicked = $(this).attr('id'); // which number clicked
    if (operation === "") {
      current = current.toString() + numInput[clicked];
      $("#inputCalc").text(current);
    } else if (current !== "" && operation !== "") {
      next += numInput[clicked]; // btn clicked value goes to next var
      $("#inputCalc").text(current + operation + next); 
    }
  });
  $(".op").on("click", function() {
    if (current !== "" && operation === "") {
      clicked = $(this).attr('id'); // which operation clicked
      operation = operations[clicked];
      $("#inputCalc").text(current + operation);
    }
  }); 
  $("#equals").on("click", function() {
    if (current !== "" && operation !== "" && next !== "") {
      current = +current; // change strings to ##
      next = +next;
      if (operation === "/") { // do operation on 2 ##
        current = current / next;
      } else if (operation === "*") {
        current = current * next;
      } else if (operation === "+") {
        current = current + next;
      } else if (operation === "-") {
        current = current - next;
      }
      if (current % 1 !== 0) {
        current = current.toFixed(2);
      }
      if (current === "NaN" || current === "Infinity") {
        current = 0;
      }
      $("#inputCalc").text(current); // output answer
      operation = ""; // clear values
      next = "";
      clicked = "";
    }
  });
  $("#percent").on("click", function() {
    if (current !== "" && operation === "" && next === "") {
      current = +current / 100;
      current = current.toFixed(3);
      $("#inputCalc").text(current);
    }
  });
  $("#backspace").on("click", function() {
    current = current.toString();
    if (current !== "" && operation === "" && next === "") {
      current = current.substr(0, current.length - 1);
      $("#inputCalc").text(current);
    } else if (current !== "" && operation !== "" && next === "") {
      operation = "";
      $("#inputCalc").text(current);
    } else if (current !== "" && operation !== "" && next !== "") {
      next = next.substr(0, next.length - 1);
      $("#inputCalc").text(current + operation + next);
    }
  });
  $("#clear").on("click", function() {
    current = "";
    operation = "";
    next = "";
    $("#inputCalc").text("");
  });
  $("#pi").on("click", function() {
    if (current === "") {
      current += "3.14"; 
      $("#inputCalc").text(current);
    } else if (current !== "" && operation !== "" && next === "") {
      next += "3.14"; 
      $("#inputCalc").text(current + operation + next);
    }
  });
  $("#decimalPt").on("click", function() {
    if (current === "" && operation === "" && next === "") {
      current = "0."; 
      $("#inputCalc").text(current);
    } else if (current !== "" && operation === "" && next === "" && !/[.]/.test(current)) {
      current += "."; 
      $("#inputCalc").text(current);
    } else if (current !== "" && operation !== "" && next === "") {
      next = "0."; 
      $("#inputCalc").text(current + operation + next);
    } else if (current !== "" && operation !== "" && next !== "" && !/[.]/.test(next)) {
      next += "."; 
      $("#inputCalc").text(current + operation + next);
    }
  });
}

$(document).ready(main);
