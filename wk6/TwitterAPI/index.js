const express = require('express');
const app = express();
const chalk = require('chalk');
const serveStatic = require('serve-static');
const exphbs  = require('express-handlebars');
const twitter = require('./script/twitter.js');
const user = require("./script/user.json");
const wiii = chalk.bold.green;
const error = chalk.bold.red;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(serveStatic('public'));

var users = ["elmundotoday", "el_pais", "elespanolcom", "elmundoes"];

app.get('/', function (req,res) {
    twitter.getToken(user).then(function(token) {
        twitter.getAllTweets(token, users).then(function(allTweets) {
            twitter.orderTweets(allTweets).then(function(TweetsInOrder) {
                console.log(wiii("DONE!"));
                res.render('home', TweetsInOrder);
            }).catch(function(reason) {
                console.log(error(reason));
            });
        });
    });
});

app.listen(8080, function () {
    console.log(chalk.blue('Listening on port 8080!'));
});
