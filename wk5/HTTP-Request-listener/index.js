const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {

    var headers = request.headers;
    var method = request.method;
    var url = request.url;
    var user = headers["user-agent"].substring(0, 30).concat("...");
    var body = [];

    var requestData = new Date() + '\t' + method + '\t' + url + '\t' + user + '\n';

    var headersInConsole = JSON.stringify(headers);

    request.on('error', function(err) {
        console.error(err);
    }).on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        console.log(
            "The header is: " +  headersInConsole + '\n' +
            "The method is: " +  method + '\n' +
            "The URL is: " + url
        );

        body = Buffer.concat(body).toString();
        response.on('error', function(err) {
            console.error(err);
        });

        if (method == "GET") {
            if (url == '/requests.txt') {
                var readable = fs.createReadStream(__dirname + '/requests.txt', 'utf8');
                readable.on('data', function(chunk) {
                    response.writeHead(200, {'Content-Type': 'text/plain'});
                    response.end(chunk);
                });
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                var responseBody =
                    "<!doctype html>" +
                    "<html>" +
                    "<title>Hello World!</title>" +
                    "<img src='https://httpstatusdogs.com/img/200.jpg'" +
                    "</html>";
                response.end(responseBody);
            }
        } else if (method == "HEAD"){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end();
        } else if (method == "POST") {
            response.writeHead(302, {'Location': '/'});
            response.end();
        } else {
            response.statusCode = 403;
            response.end();
        }

        fs.appendFile('requests.txt', requestData, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Saved to the log!");
            }
        });
    });
}).listen(8080);
