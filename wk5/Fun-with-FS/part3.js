var fs = require('fs');
var filePath = './files';
var obj = {};
var count = 0;

function getSize(path, object) {
    count += 1;
    fs.readdir(path, function(err, files) {
        count -= 1;
        files.forEach(function (file){
            var nextPath = path + '/' + file;
            count += 1;
            if(!fs.stats.isDirectory()) {
                object[file] = fs.stats.size;
            } else if (fs.stats.isDirectory()) {
                object[file] = {};
                getSize(nextPath, object[file]);
            }
            if (count == 0) {
                console.log('Done!');
                var finished = (JSON.stringify(obj, null, 4));
                fs.writeFile('Part3Object.json', finished, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("finished!");
                    }
                });
            }
        });
    });
}

getSize(filePath);
