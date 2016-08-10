var main = function() {

	var lat;
	var lgn;
	var result;
	var tempF;
	var tempC;
	var tempK;
	var weatherId;
	
	findLoc();

	function findLoc(position) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(successLoc);
		} else {
			alert("Error: Could not locate you.");
		}

		function successLoc(position) {
			lat = position.coords.latitude;
			lgn = position.coords.longitude;
			console.log(lat, lgn);
			functionLatLng(lat, lgn);
		}

		function functionLatLng(lat, lgn) {
			$.ajax({
				url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lgn + '&APPID=b75ff2773c27633b2fd3d886231bde75',
				type: "GET",
				dataType: "jsonp",
				success: function(data) {
					result = data;
					retrieveData(result);
					console.log(result);
				},
				error: function(first, second, third) {
					console.log(first, second, third);
					alert("Failed to Find Location.");
				}
			});
		return result;
		}
	}

	function retrieveData(result) {
		tempK = result.main.temp;
		$('#city').html(result.name);
		$("#latlgntext").html("(latitude: " + lat + ",<br>longitude: " + lgn + ")");
		$('#temp').html(toF(tempK));
		weatherId = result.weather[0].id;
		console.log(weatherId);
		$('picture').html(imageGenerate(weatherId));
		tempC = toC(tempK);
		tempF = toF(tempK);
	}

	function imageGenerate(weatherId) {
		if (weatherId >= 200 && weatherId < 300) {
			$("#weatherText").html("Thunderstorms");
			$("#picture").html("<img src='" + "img/rainThunder.png" + "' class='img-responsive'>");
		} else if (weatherId >= 300 && weatherId < 600) {
			$("#weatherText").html("Expect rain");
			$("#picture").html("<img src='" + "img/rain.png" + "' class='img-responsive'>");
		} else if (weatherId >= 600 && weatherId < 700) {
			$("#weatherText").html("Snow likely");
			$("#picture").html("<img src='" + "img/snow.png" + "' class='img-responsive'>");
		} else if (weatherId >= 700 && weatherId < 800) {
			$("#weatherText").html("Mist/Fog");
			$("#picture").html("<img src='" + "img/fog.png" + "'class = 'img-responsive'>");
		} else if (weatherId == 800) {
			$("#weatherText").html("Clear skies");
			$("#picture").html("<img src='" + "img/sun.png" + "'class = 'img-responsive'>");
		} else if (weatherId > 800 && weatherId < 900) {
			$("#weatherText").html("Cloudy");
			$("#picture").html("<img src='" + "img/cloud.png" + "'class = 'img-responsive'>");
		} else if (weatherId >= 900 && weatherId < 910 || weatherId >= 960) {
			$("#weatherText").html("Extreme weather conditions");
			$("#picture").html("<img src='" + "img/extreme.png" + "'class = 'img-responsive'>");
		} else {
			$("#weatherText").html("Windy");
			$("#picture").html("<img src='" + "img/wind.png" + "'class = 'img-responsive'>");
		}
	}

	function toF(tempK) {
		tempF = Math.round((tempK * 9 / 5) - 459.67) + "\xB0 F";
		return tempF;
	}

	function toC(tempK) {
		tempC = Math.round(tempK - 273.15) + "\xB0 C";
		return tempC;
	}

	function convertFunction(tempK) {
		var tempToConvert = $("#temp").text();
		if (tempToConvert.slice(-1) === 'F') {
			$('#temp').html(tempC);
		} else {
			$('#temp').html(tempF);
		}
	}

	$('#convertBtn').on('click', convertFunction);
};

$(document).ready(main);
