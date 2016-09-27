const url = require('url');
const querystring = require('querystring');

function Describe(address) {
    var chicken = url.parse(address);
    var rice = querystring.parse(chicken.query);
    console.log("The protocol is http: " + chicken.protocol );
    console.log("The host is: " + chicken.host );
    console.log("The hostname is: " + chicken.hostname );
    console.log("The port is: " + chicken.port );
    console.log("The path is: " + chicken.path );
    console.log("The pathname is: " + chicken.pathname );
    console.log("The query is: " + chicken.query );
    for (var property in rice) {
        if (rice.hasOwnProperty(property)) {
            console.log("The value of the " + property + " parameter is: " + rice[property] );
        }
    }
}

Describe("http://127.0.0.1:8080/test?a=100&b=200");
