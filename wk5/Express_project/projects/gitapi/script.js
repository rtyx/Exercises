/* eslint-env node, jquery */

$(document).ready(function() {

    var templates = document.querySelectorAll('script[type="text/handlebars"]');

    Handlebars.templates = Handlebars.templates || {};

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    $(window).on('show', function(event) {
        var username = $('#searchtext').val();
        event.preventDefault();
        $.ajax({
            url: 'https://api.github.com/users/' + username + '/repos',
            type: 'GET',
            headers: {
                Authorization: 'Basic ' + btoa('rtyx:tOAtHEtB5qbr')
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('#bio').html(Handlebars.templates.hbar(
                    data
                ));
                $('.repo').on('click', function(event) {
                    console.log(event.target.innerHTML);
                    var reponame = event.target.innerHTML;
                    $.ajax({
                        url: 'https://api.github.com/repos/' + username + '/' + reponame + '/commits',
                        type: 'GET',
                        dataType: 'json',
                        headers: {
                            Authorization: 'Basic ' + btoa('rtyx:tOAtHEtB5qbr')
                        },
                        success: function (commits) {
                            console.log(commits);
                            var tencommits = [];
                            for (var i = 0; i < 10; i++) {
                                if (commits[i]) {
                                    tencommits.push(commits[i]);
                                }
                            }
                            console.log(tencommits);
                            $(event.target).append(Handlebars.templates.hbarcommits(
                                tencommits
                            ));
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
