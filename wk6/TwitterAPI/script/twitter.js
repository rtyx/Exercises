const https = require('https');
const chalk = require('chalk');
const wiii = chalk.bold.green;
const error = chalk.bold.red;


var Tweet = function(user, text, link, date) {
    this.user = user;
    this.text = text;
    this.link = link;
    this.date = date;
};

var cleanTweets = function(dirtyTweets, user, array) {
    dirtyTweets.forEach(function(dirtyTweet) {
        if (dirtyTweet.text.search("https") != -1 && dirtyTweet.text.search("RT")) {
            var n = dirtyTweet.text.search("https");
            var text = dirtyTweet.text.slice(0,n);
            var link = dirtyTweet.text.slice(n);
            var date = dirtyTweet.created_at;
            var tweet = new Tweet(user,text,link,date);
            array.push(tweet);
        }
    });
};

module.exports = {

    getToken: function(anyuser) {
        console.log(chalk.blue("Getting token..."));
        return new Promise (function (resolve, reject) {
            var token;
            var options = {
                host: 'api.twitter.com',
                path: '/oauth2/token',
                method: 'POST',
                headers: {
                    'Authorization': anyuser.password,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            };
            var req = https.request(options, (res) => {
                console.log(chalk.yellow(`STATUS: ${res.statusCode}`));
                res.on('data', (chunk) => {
                    var pretoken = JSON.parse(chunk);
                    token = pretoken.access_token;
                });
                res.on('end', () => {
                    console.log(wiii("The token is: ") + token);
                    resolve(token);
                });
            });
            req.on('error', (e) => {
                console.log(error(`problem with POST request: ${e.message}`));
                reject(e);
            });
            req.write('grant_type=client_credentials');
            req.end();
        });
    },

    getAllTweets: function(anytoken, users) {
        function getTweets (anytoken, user) {
            return new Promise (function (resolve, reject) {
                console.log(chalk.blue("Getting tweets from " + user + "..."));
                var tweets = [];
                var options = {
                    host: 'api.twitter.com',
                    path: "/1.1/statuses/user_timeline.json?screen_name=" + user + "&count=20",
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + anytoken,
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    }
                };
                var req = https.request(options, (res) => {
                    console.log(chalk.yellow(`STATUS: ${res.statusCode}`));
                    var body = '';
                    res.on('data', (chunk) => {
                        body += chunk;
                    });
                    res.on('end', () => {
                        var result = JSON.parse(body);
                        cleanTweets(result, user, tweets);
                        console.log(wiii("These are the tweets from " + user + ": ") + tweets);
                        resolve(tweets);
                    });
                });
                req.on('error', (e) => {
                    console.log(error(`problem with GET request: ${e.message}`));
                    reject(e);
                });
                req.end();
            });
        }
        return new Promise (function (resolve) {
            var promises = [];
            users.forEach(function(user) {
                promises.push(getTweets(anytoken, user));
            });
            Promise.all(promises).then(function(val) {
                var allTweets = [].concat.apply([],val);
                resolve(allTweets);
            });
        });
    },

    orderTweets: function(anytweets) {
        return new Promise(function (resolve) {
            anytweets.sort(function(a, b) {
                a = new Date(a.date);
                b = new Date(b.date);
                return a>b ? -1 : a<b ? 1 : 0;
            });
            console.log(wiii("These are the ordered tweets: ") + anytweets);
            resolve(anytweets);
        });
    }
};
