const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const listofprojects = require('./listofprojects.js');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(serveStatic('projects'));

app.get('/', function (req, res) {
    var data = {
        links: listofprojects.links
    };
    res.render('home', data);
});

app.get('/:projectName/description', function(req, res) {
    // var description = require(__dirname)
    var description = require(__dirname + '/projects' + req.url + 'description.json');
    var data = {
        links: listofprojects.links,
        title: description.title,
        description: description.description,
        screenshot: req.url + 'screenshot.png',
        href: '/' + req.params.projectName + '/'
    };
    res.render('ppage', data);
});


app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
    // console.log(req.status);
    // if (req.status == 404) {
    //     var data = {
    //         links: listofprojects.links,
    //         title: '404',
    //         description: "That project doesn't exist... YET.",
    //         screenshot: 'others/404.jpg',
    //         href: '/'
    //     };
    //     res.render('ppage', data);
    // } else {
    //     next();
    // }
});


app.listen(8080, function () {
    console.log('Listening on port 8080!');
});
