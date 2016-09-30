const fs = require('fs');
const Handlebars = require('handlebars');

var mypath = __dirname;
var template = Handlebars.compile(fs.readFileSync(mypath + "/templates/projects.handlebars", 'utf-8'));
var links = [];

function Link(name, href) {
    this.name = name;
    this.href = href;
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
                var newLink = new Link(thisfolder, thishref);
                links.push(newLink);
            }
        }
    });
}


listAll(mypath);

var JSONObject = {links};
var html = template(JSONObject);

console.log(links);

module.exports = {
    html
};
