module.exports = {

    getToken: function(anyuser, callback) {
        console.log(anyuser);
        var token;
        const https = require('https');
        var postData = 'grant_type=client_credentials';
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
    },

    getTweets: function(anytoken, anyuser, anycallback) {
        console.log(anytoken);
        console.log(anyuser);
        const https = require('https');
        var tweets = [];
        var Tweet = function(user, text, link, date) {
            this.user = user;
            this.text = text;
            this.link = link;
            this.date = date;
        };
        var options = {
            host: 'api.twitter.com',
            path: "/1.1/statuses/user_timeline.json?screen_name=" + anyuser + "&count=20",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + anytoken,
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
                        var tweet = new Tweet(anyuser,text,link,date);
                        tweets.push(tweet);
                    }
                }
                anycallback();
                return tweets;
            });
        });
        req.on('error', (e) => {
            console.log(`problem with GET request: ${e.message}`);
            return;
        });
        req.end();
    },

    checkFlag: function(anyflag, anycallback) {
        if (anyflag == 0) {
            anycallback();
        } else {
            console.log("Not yet!");
        }
    },

    orderTweets: function(anytweets, anycallback) {
        anytweets.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a>b ? -1 : a<b ? 1 : 0;
        });
        console.log(tweets);
        anycallback();
        return tweets;
    }
};
