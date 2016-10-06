const express = require('express');
const user = require("./script/user.json");
const app = express();
const serveStatic = require('serve-static');
const exphbs  = require('express-handlebars');
const twitter = require('./script/twitter.js');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(serveStatic('public'));

var user1 = "elmundotoday";
// var user2 = "el_pais";
// var user3 = "elespanolcom";

app.get('/', function (req,res) {
    twitter.getToken(user, function(token) {
        console.log(token);
        // twitter.getTweets(token, user1, function(tweets) {
        //     res.render('home', tweets);
        // });
    });
});
//         twitter.getTweets(token, user1, function() {
//                 twitter.orderTweets(tweets, function() {
//                     res.render('home', tweets);
//             });
//         });
//     });
// });

app.listen(8080, function () {
    console.log('Listening on port 8080!');
});
