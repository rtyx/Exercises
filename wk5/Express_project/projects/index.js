const http = require('http');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const index = require('./projects.js');

http.createServer(function(request, response) {

    var method = request.method;
    var url = request.url;
    var filePath = request.url;

    var lastCharURL = url.substr(url.length - 1);

    if (url != "/" && lastCharURL == '/') {
        url = url + '/index.html';
    }

    filePath = __dirname + filePath;
    var extname = path.extname(filePath);
    var contentType;

    switch (extname) {
    case '.html':
        contentType = 'text/html';
        break;
    case '.js':
        contentType = 'application/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.jpg':
        contentType = 'image/jpeg';
        break;
    case '.svg':
        contentType = 'image/svg+xml';
        break;
    default:
        contentType = 'text/html';
        break;
    }

    var body = [];

    request.on('error', function(err) {
        console.log(err);
    }).on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {

        console.log(
            "The method is: " +  method + '\n' +
            "The URL is: " + url
        );

        body = Buffer.concat(body).toString();
        response.on('error', function(err) {
            console.error(err);
        });

        try {
            fs.statSync(filePath);
            if (method == "GET") {
                if (url != "/") {
                    var readable = fs.createReadStream(__dirname + url);
                    response.writeHead(200, {'Content-Type': contentType});
                    readable.pipe(response);
                    readable.on('error', function(err) {
                        console.log(err);
                    });
                } else {
                    response.writeHead(200, {'Content-Type': contentType});
                    var responseBody = index.html;
                    response.end(responseBody);
                }
            } else {
                response.writeHead(403, {'Content-Type': contentType});
                responseBody =
                    "<!doctype html>" +
                    "<html>" +
                    "<title>403</title>" +
                    "<img src='https://httpstatusdogs.com/img/403.jpg'" +
                    "</html>";
                response.end(responseBody);
                response.end();
            }
        }
        catch (e) {
            console.log("File does not exist.");
            response.writeHead(404, {'Content-Type': contentType});
            responseBody =
                "<!doctype html>" +
                "<html>" +
                "<title>404</title>" +
                "<img src='https://httpstatusdogs.com/img/404.jpg'" +
                "</html>";
            response.end(responseBody);
            response.end();
        }


    });
}).listen(8080, console.log(chalk.bold("listening on port 8080!")));
