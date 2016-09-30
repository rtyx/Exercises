/* eslint-env node, jquery */

$(document).ready(function() {
    $(window).on('show', function(event) {
        var searchMe = $('#searchtext').val();
        event.preventDefault();
        $.ajax({
            url: 'http://www.omdbapi.com/',
            type: 'GET',
            dataType: 'json',
            data: {
                t: searchMe,
                limit: 3
            },
            success: function (data) {
                console.log(data);
                if (data["Response"] == "True") {
                    $('#results').empty();
                    $('#displaying').html('Displaying results for "' + searchMe + '"');
                    var title = data["Title"];
                    if (data["Poster"] != "N/A") {
                        var posterlink = data["Poster"];
                        var poster = '<img src=' + posterlink + ' />';
                    } else {
                        poster = '<img src="movie.gif" />';
                    }
                    var actors = data["Actors"];
                    var year = data["Year"];
                    var director = data["Director"];
                    var awards = data["Awards"];
                    var plot = data["Plot"];
                    $('#results').append('<div class="result">' +
                    poster + '<br>' +
                    '<div class="info">' +
                    '<div class="title">' + title + '</div>' +
                    '<span style="color: #781E36">Year: </span>' + year + '<br>' +
                    '<span style="color: #781E36">Director: </span>' + director + '<br>' +
                    '<span style="color: #781E36">Actors: </span>' + actors + '<br>' +
                    '<span style="color: #781E36">Awards: </span>' + awards + '<br>' + '<br>' +
                    '<span style="color: #781E36">Plot: </span>' + '<br>' +
                    plot + '<br>' +
                    '</div>' +
                    '</div>');
                } else {
                    $('#results').empty();
                    $('#displaying').html('No results for "' + searchMe + '"');
                }
            }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });
    $('#submitbutton').on('click', function() {
        $(this).trigger('show');
    });
    $(window).keyup(function(e){
        if(e.keyCode == 13) {
            $(this).trigger('show');
        }
    });
});
