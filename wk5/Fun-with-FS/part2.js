var fs = require('fs');

var myPath = __dirname + '/files';

var myObject = {};

function showTree(path, myObject) {
    var data = fs.readdirSync(path);
    data.forEach(function(file) {
        var newPath = path + "/" + file;
        if (fs.lstatSync(newPath).isDirectory()) {
            var newObject = {};
            myObject[file] = newObject;
            showTree(newPath, newObject);
        } else {
            myObject[file] = fs.lstatSync(newPath).size;
        }
    });
}

showTree(myPath, myObject);

var JSONObject = JSON.stringify(myObject, null, 4);

console.log(JSONObject);

fs.writeFile('myObject.json', JSONObject, function(err) {
    if (err) {
        console.log(err);
    }
    console.log("it's saved!");
});
