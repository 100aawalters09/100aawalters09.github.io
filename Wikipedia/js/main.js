var main = function() {
    
    var searchTerm = "";
    var searchStr = "";
    var searchableStr = "";
    var result = "";
    var linkFollow = "";
    var x = 0;
    
    stageSet();
    
    function stageSet() {
        $('#instructClick #searchIcon, #instructClick h3').fadeTo(1000, 1);
        $('#searchIcon').on('click', function() {
            $('#instructClick h3, #searchIcon').css("width", 300).slideToggle(500);
            $('.container').delay(500).slideDown(300);
            $('#randomArticle').delay(800).fadeIn(500);
            searchNow();
        });
    }
    
    function searchNow() {
         $('#search').bind('enterKey', function(e) {
            searchTerm = $(this).val();
            var searchableTerm = searchTerm.split(" ");
            for(var i = 0; i < searchableTerm.length; i++) {
                searchStr += searchableTerm[i] + "%20";
            };
            searchableStr = searchStr.substring(0, searchStr.lastIndexOf("%"));
            getData(searchableStr);
        });

        $('#search').keyup(function(e) {
            if(e.keyCode == 13) {
                $(this).trigger("enterKey")
            }
        });   
    }
    
    function getData(searchableStr) {
         $.ajax({
            url: "https://en.wikipedia.org/w/api.php/w/api.php?action=query&format=json&list=search&limit=10&utf8=1&srsearch=" + searchableStr,
            jsonp: "callback",
            dataType: 'jsonp',
            type: 'GET',
            xhrFields: { withCredentials: true },
            headers: { 'Api-User-Agent': 'Example/1.0' },
            success: function(data){
                result = data;
                dataManipulation(result);
                console.log(result);
            },
             error: function(first, second, third){
                 console.log(first, second, third);
                 alert("Unable to search at this time.");
             }
        });
        return result;
    }
        
    function dataManipulation(result) {
        $('.search-box').slideUp(500);
        $('.resultDisplay, .iconResearch, #nextBtn').fadeIn(1000);
        if (result.query.search[x]) {
            $('#nextBtn').removeClass('disabled', true);
            x = 0;
            $('.wikiTitle').html(result.query.search[x].title);
            linkFollow = $('.wikiTitle').html().split(" ").join("_");
            $('.wikiSnippet').html(result.query.search[x].snippet + "...");
            $('#pgLink').attr('href', 'https://en.wikipedia.org/wiki/' + linkFollow);
            $('#nextBtn').on('click', function() {
                nextResult();
            });
        } else {
            $('.wikiTitle').html("No results found. Try again.");
            $('.wikiSnippet').html("");
            $('#nextBtn').addClass('disabled', true);
        }
        $('.iconResearch').on('click', function(){
            $('.resultDisplay, .iconResearch, #nextBtn').slideUp(500);
            searchTerm = "";
            searchStr = "";
            searchableStr = "";
            result = "";
            linkFollow = "";
            x = 0;
            $('.search-box, .container, #randomArticle').delay(600).fadeIn(500);
            searchNow();
        });
    }
    
    function nextResult() {
        if (x < 9) {
            x += 1;
            $('.wikiTitle').html(result.query.search[x].title);
            linkFollow = $('.wikiTitle').html().split(" ").join("_");
            $('.wikiSnippet').html(result.query.search[x].snippet + "...");
            $('#pgLink').attr('href', 'https://en.wikipedia.org/wiki/' + linkFollow);
        } else {
            x = 0;
            $('.wikiTitle').html(result.query.search[x].title);
            linkFollow = $('.wikiTitle').html().split(" ").join("_");
            $('.wikiSnippet').html(result.query.search[x].snippet + "...");
            $('#pgLink').attr('href', 'https://en.wikipedia.org/wiki/' + linkFollow);
        }
    }
};

$(document).ready(main);
