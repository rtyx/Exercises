/* eslint-env node, jquery */

const http = require('http');
const chalk = require('chalk');
const querystring = require('querystring');

http.createServer(function(request, response) {

    var method = request.method;
    var body = [];

    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {

        body = Buffer.concat(body).toString();
        response.on('error', function(err) {
            console.error(err);
        });

        if (method == "GET") {
            response.writeHead(200, {'Content-Type': 'text/html'});
            var responseBody = '<!doctype html> <html> <title>Colors</title> <form method="POST"> <input type="text" name="text"> <select name="color"> <option value="red">red</option> <option value="blue">blue</option> <option value="green">green</option> <option value="yellow">yellow</option> <option value="gray">gray</option> <option value="magenta">magenta</option> <option value="cyan">cyan</option> </select> <button type="submit">Go</button> </form> </html> ';
            response.end(responseBody);
        } else if (method == "POST") {
            response.writeHead(200, {'Content-Type': 'text/html'});
            var postBody = querystring.parse(body);
            var text = postBody.text;
            var color = postBody.color;
            console.log(chalk[color](text));
            responseBody = '<!doctype html> <html> <title>' + text + '</title> <a href="/" style="color:' + color + '">' + text + '</a> </html>';
            response.end(responseBody);
        } else {
            response.statusCode = 403;
            response.end();
        }
    });
}).listen(8080, console.log(chalk.bold("listening on port 8080!")));
