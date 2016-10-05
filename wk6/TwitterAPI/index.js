const https = require('https');
const user = require("./user.json");
const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const exphbs  = require('express-handlebars');
var token;
var tweets = [];
var flag = 0;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(serveStatic('public'));

function Tweet(user, text, link, date) {
    this.user = user;
    this.text = text;
    this.link = link;
    this.date = date;
}

function getToken(userid, callback) {
    var postData = 'grant_type=client_credentials';
    var options = {
        host: 'api.twitter.com',
        path: '/oauth2/token',
        method: 'POST',
        headers: {
            'Authorization': userid.password,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    };
    var req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            var pretoken = JSON.parse(chunk);
            token = pretoken.access_token;
        });
        res.on('end', () => {
            callback(token);
        });
    });

    req.on('error', (e) => {
        console.log(`problem with POST request: ${e.message}`);
        return;
    });
    req.write(postData);
    req.end();
}

function getTweets(token, user, callback) {
    flag += 1;
    console.log(flag);
    var options = {
        host: 'api.twitter.com',
        path: "/1.1/statuses/user_timeline.json?screen_name=" + user + "&count=20",
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    };
    var req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        res.setEncoding('utf8');
        var body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });
        res.on('end', () => {
            var result = JSON.parse(body);
            for (var i = 0; i < 10; i++) {
                if (result[i].text.search("https") != -1 && result[i].text.search("RT")) {
                    var n = result[i].text.search("https");
                    var text = result[i].text.slice(0,n);
                    var link = result[i].text.slice(n);
                    var date = result[i].created_at;
                    var tweet = new Tweet(user,text,link,date);
                    tweets.push(tweet);
                }
            }
            flag -= 1;
            console.log(flag);
            callback(flag);
        });
    });
    req.on('error', (e) => {
        console.log(`problem with GET request: ${e.message}`);
        return;
    });
    req.end();
}

var user1 = "elmundotoday";
var user2 = "el_pais";
var user3 = "elespanolcom";

app.get('/', function (req,res) {
    getToken(user, function(token) {
        getTweets(token, user1, function(flag) {
            if (flag == 0) {
                tweets.sort(function(a, b) {
                    a = new Date(a.date);
                    b = new Date(b.date);
                    return a>b ? -1 : a<b ? 1 : 0;
                });
                console.log(tweets);
                res.render('home', tweets);
            }
        });
        getTweets(token, user2, function(flag) {
            if (flag == 0) {
                tweets.sort(function(a, b) {
                    a = new Date(a.date);
                    b = new Date(b.date);
                    return a>b ? -1 : a<b ? 1 : 0;
                });
                console.log(tweets);
                res.render('home', tweets);
            }
        });
        getTweets(token, user3, function(flag) {
            if (flag == 0) {
                tweets.sort(function(a, b) {
                    a = new Date(a.date);
                    b = new Date(b.date);
                    return a>b ? -1 : a<b ? 1 : 0;
                });
                console.log(tweets);
                res.render('home', tweets);
            }
        });
    });
});

app.listen(8080, function () {
    console.log('Listening on port 8080!');
});
