$(document).ready(function() {

var quotesAsArr = [
  ["Life is about making an impact, not making an income.", "Kevin Kruse"],
  ["Strive not to be a success, but rather to be of value.", "Albert Einstein"],
  ["You miss 100% of the shots you do not take.", "Wayne Gretzky"],
  ["Life is 10% what happens to me and 90% of how I react to it.", "Charles Swindoll"],
  ["The mind is everything. What you think you become.", "Buddha"],
  ["An unexamined life is not worth living.", "Socrates"],
  ["If you do not like something, change it. If you cannot change it, change your attitude.", "Maya Angelou"],
  ["Whether you think you can or you think you cannot, you are right.", "Henry Ford"],
  ["There is only one way to avoid criticism: do nothing, say nothing, and be nothing.", "Aristotle"],
  ["Start where you are. Use what you have. Do what you can.", "Arthur Ashe"],
  ["Fall seven times and stand up eight.", "Japanese Proverb"],
  ["Too many of us are not living our dreams because we are living our fears.", "Les Brown"],
  ["We are what we repeatedly do. Excellence, therefore, is not an act but a habit.", "Aristotle"],
  ["Great spirits have always encountered violent opposition from mediocre minds.", "Albert Einstein"],
  ["I know for sure that what we dwell on is who we become.", "Oprah Winfrey"],
  ["If you keep saying things are going to be bad, you have a chance of being a prophet.", "Isaac B. Singer"],
  ["Losers visualize the penalties of failure. Winners visualize the rewards of success.", "Unknown"],
  ["Experience is what you get when you do not get what you want.", "Dan Stanford"]
];

var quotesAsObject = [];
var randomQuote = "";
var authorQuote = "";

$(document).ready(changeQuoteFunction);
$(document).ready(changeBodyColor);

for (var i = 0; i < quotesAsArr.length; i++) {
  quotesAsObject.push({
    quote: quotesAsArr[i][0],
    author: quotesAsArr[i][1]
  });
}

function changeQuoteFunction() {
	if (quotesAsObject.length == 0) {
		for (var i = 0; i < quotesAsArr.length; i++) {
			quotesAsObject.push({
			quote: quotesAsArr[i][0],
			author: quotesAsArr[i][1]
			});
		};
	}
	var quoteLength = quotesAsObject.length - 1;
	var quoteSelector = Math.floor(Math.random() * quoteLength);
	randomQuote = quotesAsObject[quoteSelector].quote;
	authorQuote = quotesAsObject[quoteSelector].author;
	$("#quoteText").html(randomQuote);
	$("#authorText").html("-" + authorQuote);
	quotesAsObject.splice(quoteSelector, 1);
};

function changeBodyColor(color) {
  var letters = '0123456789'.split("");
  var color = "#";
  for (var c = 0; c < 3; c++) {
    var randomizer = Math.round(Math.random() * 9);
    color += letters[randomizer];
  }
  document.getElementById("bodyPart").style.backgroundColor = color;
}

function tweetFunction() {
  document.getElementById("tweetShare").href = "https://twitter.com/intent/tweet?hashtags=freecodecamp&text=" + encodeURIComponent('"' + randomQuote + '" -' + authorQuote);
}

$("#quoteBtn").on("click", changeQuoteFunction);
$("#quoteBtn").on("click", changeBodyColor);
$("#tweetShare").on("click", tweetFunction);

});
