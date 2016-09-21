/* eslint-env node, jquery */

jQuery(document).ready(function($) {

    var templates = document.querySelectorAll('script[type="text/handlebars"]');

    Handlebars.templates = Handlebars.templates || {};

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    $.getJSON('http://10.53.4.106:8080/authors.json', function(json) {
        console.log("success");
        console.log(json);
        $('#resultsbox').html(Handlebars.templates.results(
            json
        ));
    });
});
