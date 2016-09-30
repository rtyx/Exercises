/* eslint-env node, jquery */

$(document).ready(function() {

    var templates = document.querySelectorAll('script[type="text/handlebars"]');

    Handlebars.templates = Handlebars.templates || {};

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    $('#submitbutton').on('click', function(event) {
        var nextTwenty;
        var searchMe = $('#searchtext').val();
        var amongThe = $('select').val();
        event.preventDefault();
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            type: 'GET',
            dataType: 'json',
            data: {
                q: searchMe,
                type: amongThe,
                limit: 3
            },
            success: function (data) {
                $('#results').empty();
                console.log(data);
                $('#results').html(Handlebars.templates.hbar(
                    data
                ));
                // if (amongThe == 'artist') {
                //     var items = data.artists.items;
                //     var total = data.artists.total;
                // } else {
                //     items = data.albums.items;
                //     total = data.albums.total;
                // }
                // if (total == 0) {
                //     $('#displaying').html('We did not find any results for "' + searchMe + '"');
                // } else {
                //     $('#displaying').html('Displaying results for "' + searchMe + '"');
                //     console.log(items);
                //     for (var i = 0; i < items.length; i++) {
                //         if (items[i].images[0] != undefined) {
                //             var image = '<img src=' + items[i].images[0].url + ' />';
                //         } else {
                //             image = '<img src="vynil.jpeg" />';
                //         }
                //         $('#results').html(Handlebars.templates.hbar(
                //             items
                //         ));
                //         // $('#results').append('<div class="result"> <a href=' + link + image + ' </a>' + name + '</div>');
                //     }
                //     nextTwenty = data.artists.next;
                //     function showMore() {
                //         event.preventDefault();
                //         $.ajax({
                //             url: nextTwenty,
                //             type: 'GET',
                //             data: {
                //                 limit: 3
                //             },
                //             success: function (data) {
                //                 if (amongThe == 'artist') {
                //                     var items = data.artists.items;
                //                 } else {
                //                     items = data.albums.items;
                //                 }
                //                 for (var i = 0; i < items.length; i++) {
                //                     if (items[i].images[0] != undefined) {
                //                         var image = '<img src=' + items[i].images[0].url + ' />';
                //                     } else {
                //                         image = '<img src="vynil.jpeg" />';
                //                     }
                //                     $('#results').html(Handlebars.templates.hbar(
                //                         items
                //                     ));
                //                     // $('#results').append('<div class="result"> <a href=' + link + image + ' </a>' + name + '</div>');
                //                 }
                //                 nextTwenty = data.artists.next;
                //             }
                //         })
                //         .done(function() {
                //             console.log("success 2");
                //         })
                //         .fail(function() {
                //             console.log("error");
                //         })
                //         .always(function() {
                //             console.log("complete");
                //         });
                //     }
                //     setInterval(function() {
                //         if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                //             showMore();
                //         }
                //     }, 250);
                //     $('#moreresults').css('display', 'block').unbind();
                //     $('#moreresults').on('click', showMore());
                // }
            }
        })
        .done(function() {
            console.log("success 1");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
    });
});
