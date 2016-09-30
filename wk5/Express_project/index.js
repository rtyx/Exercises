const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');
const index = require('./templateindex.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.get('/cookies', function (req, res) {
    res.sendFile('cookies.html', { root: __dirname });
});

app.post('/cookies', function (req, res) {
    if (req.body.choice == 'Yeah') {
        res.cookie('soul', 'lost', { expires: new Date(Date.now() + 60000), httpOnly: true });
        res.redirect('/');
    } else {
        res.sendFile('nocookies.html', { root: __dirname });
    }
});

app.get('*', function(req, res, next) {
    if (req.cookies.soul == 'lost') {
        console.log("Cookies: ", req.cookies);
        next();
    } else {
        console.log("Cookies: ", req.cookies);
        res.redirect(301, '/cookies');
    }
});

app.get('/', function(req, res) {
    res.send(index.html);
});

app.use(serveStatic('projects'));



app.listen(8080, function () {
    console.log('Listening on port 8080!');
});
