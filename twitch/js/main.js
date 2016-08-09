var main = function() {

    var coders = ["n3rdfusion", "eswc", "freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "evanthebouncy", "beohoff", "peeve", "ESL_SC2", "comster404"];
    var count, url, result, status, name, activity, urlFollow, userInput;

    for (var i = 0; i < coders.length; i++) {
        count = i;
        getData(count);
    }

    function getData(count) {
        //get data from twitch.tv 
        url = "https://api.twitch.tv/kraken/streams/" + coders[count] + "?callback=?";
        $.getJSON(url, function(data) {
            result = data;  
            name = ".coder" + count;
            status = ".status" + count;
            activity = ".activity" + count;
            urlFollow = "https://www.twitch.tv/" + coders[count];
            //get name, status, and activity
            if (result.stream === null) {
                $("#sortable").append('<div class="sectionDiv offlinePerson"><div class="coder' + count + '"><a target="_blank" href="' + urlFollow + '"><h3>' + coders[count] + '</h3></a></div><div class="row" style="background: #565668"><div class="col-xs-4 status' + count + '"><h4>Offline</h4></div><div class="col-xs-8 activity' + count + '"></div></div></div>');
            } else if (result.status === 422) {
                 $("#sortable").append('<div class="sectionDiv deactive" style="background-color: #fff; color: #000"><div class="coder' + count + '"><h3>' + coders[count] + '</h3></div><div class="row" style="background-color: #fff"><div class="col-xs-4 status' + count + '"><h4>Deactivated</h4></div></div></div>');
            } else {
                $("#sortable").prepend('<div class="sectionDiv onlinePerson"><div class="coder' + count + '"><a target="_blank" href="' + urlFollow + '"><h3>' + coders[count] + '</h3></a></div><div class="row"><div class="col-xs-4 status' + count + '"><h4>Online</h4></div><div class="col-xs-8 activity' + count + '"><h4>' + result.stream.game + '</h4></div></div></div>');
            };
        });
    }                  

    $(".nav-pills li").on("click", function() {
        $(".nav-pills li").removeClass("active");
        $(this).toggleClass("active");
        if ($(this).text() === "Online") {
            $(".sectionDiv").hide(500);
            $(".onlinePerson").fadeIn(500);
        } else if ($(this).text() === "Offline") {
            $(".sectionDiv").hide(500);
            $(".offlinePerson").fadeIn(500);
        } else {
            $(".sectionDiv").fadeIn(500);
        }
    });

    $(".btn").on("click", function() {
        $(".nav li").removeClass("active");
        $("#all").addClass("active");
        $(".sectionDiv").fadeIn(200);
        userInput = $("#newStreamer").val();
        if (userInput !== "") {
            coders[coders.length] = userInput;
            $("#newStreamer").val("");
            url = "https://api.twitch.tv/kraken/streams/" + userInput + "?callback=?";
            $.getJSON(url, function(data) {
                result = data;
                urlFollow = "https://www.twitch.tv/" + userInput;
                //get name, status, and activity
                if (result.stream === null) {
                    $("#alert").hide();
                    $("#sortable").append('<div class="sectionDiv offlinePerson"><div class="coder' + (coders.length) + '"><a target="_blank" href="' + urlFollow + '"><h3>' + userInput + '</h3></a></div><div class="row" style="background-color: #565668"><div class="col-xs-4 status' + (coders.length) + '"><h4>Offline</h4></div><div class="col-xs-8 activity' + (coders.length) + '"><h4></h4></div></div></div>');
                    $(".well").animate({
                        scrollTop: 20000
                    }, 500);
                } else if (result.status === 422 || result.status === 404) {
                    $("#alert").show("show");
                } else {
                    $("#alert").hide();
                    $("#sortable").prepend('<div class="sectionDiv onlinePerson"><div class="coder' + (coders.length) + '"><a target="_blank" href="' + urlFollow + '"><h3>' + userInput + '</h3></a></div><div class="row"><div class="col-xs-4 status' + (coders.length) + '"><h4>Online</h4></div><div class="col-xs-8 activity' + (coders.length) + '"><h4>' + result.stream.game + '</h4></div></div></div>');
                    $(".well").animate({
                        scrollTop:0
                    }, 500);
                }
            });
        };
    });

    $(function() {
        $("#sortable").sortable();
        $("#sortable").disableSelection();
    });
};

$(document).ready(main);
