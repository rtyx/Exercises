var express = require('express');
var app = express();

// var isLoggedIn = function(req) {
//     return false;
// };
//
// var requireLoggedInUser = function(req, res, next) {
//     if (!isLoggedIn(req)) { //don't forget to call () the function
//         res.sendStatus(403);
//     } else {
//         next();
//     }
// };

// app.get('/hello/:variab', requireLoggedInUser, function(req, res, next) {
//     console.log(req.params.variab);
//     next();
// });
//
// app.use(function(req, res, next) {
//     res.sendStatus(400);
// });

app.use(function(req, res, next) {
    console.log(req.url);
    next();
});

app.use(express.static(__dirname + '/public'));

// app.use(function(req, res, next) {
//     console.log("first");
//     next();
// });
//
// app.use(function(req, res, next) {
//     console.log("second");
//     next();
// });

//RES.COOKIE

app.use(function(err, req, res, next) {
    console.log(err);
    res.sendStatus(500);
});

app.get('/hello/:variab', function(req, res, next) {
    console.log(req.params.variab);
    next();
});

app.get('/hello/world', function(req, res, next) {
    res.send('<!doctype html><html><title>yes!!!</title><p>hola biiiitches :D</html>');
});

app.listen(8080, function() {
    console.log("I'm listening.")
});
