var fs = require('fs');

var myPath = __dirname + '/files';

function readdir(path) {
    return new Promise(function(resolve, reject) {
        fs.readdir(path, function(err, files) {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

function isDir(path, file) {
    return new Promise(function(resolve, reject) {
        fs.stat(path + "/" + file, function(err, stats) {
            if (err) {
                reject(err);
            } else {
                if (stats.isDirectory()) {
                    console.log(path + "/" + file + " is a directory");
                    resolve(stats);
                } else {
                    console.log(path + "/" + file + " is a file");
                    resolve(stats);
                }
            }
        });
    });
}

readdir(myPath).then(function(files) {
    var promises = [];
    for (var i = 0; i < files.length; i++) {
        promises[i] = isDir(myPath, files[i]);
    }
    Promise.all(promises).then(function() {
        console.log("Done! Just as I promised");
    }).catch(function(err) {
        console.log(err);
    });
});
