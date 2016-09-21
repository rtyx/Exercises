(function() {

    var templates = document.querySelectorAll('script[type="text/handlebars"]');

    Handlebars.templates = Handlebars.templates || {};

    Handlebars.partials = Handlebars.templates;

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    document.body.innerHTML = Handlebars.templates.results(
        {
            albums: [
                {
                    name: 'Houses of the Holy',
                    year: 1974
                },
                {
                    name: 'Led Zeppelin 4',
                    year: 1972
                }
            ],
            name: 'Zeptember'
        }
    );

})();
