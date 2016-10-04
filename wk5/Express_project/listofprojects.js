const fs = require('fs');
const path = require('path');

var mypath = __dirname;
var links = [];

function Link(name, href, description) {
    this.name = name;
    this.href = href;
    this.description = description;
}

function listAll(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + "/" + file;
        if (fs.lstatSync(newPath).isDirectory()) {
            listAll(newPath);
        } else {
            if (file == 'index.html') {
                var thisfolder = path.substring(68);
                var thishref = newPath.substring(67);
                var thisdescription = path.substring(67) + '/description';
                var newLink = new Link(thisfolder, thishref, thisdescription);
                links.push(newLink);
            }
        }
    });
}

listAll(mypath);

console.log(links);

module.exports = {
    links
};
