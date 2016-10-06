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
                    var newPath = path + "/" + file;
                    check(newPath).then(function() {
                        resolve();
                    });
                } else {
                    console.log(path + "/" + file + " is a file");
                    resolve(stats);
                }
            }
        });
    });
}

var check = function(path) {
    var promises = [];
    return new Promise(function(resolve) {
        readdir(path).then(function(files) {
            for (var i = 0; i < files.length; i++) {
                promises.push(isDir(path, files[i]));
            }
            Promise.all(promises).then(function() {
                resolve("Done! Just as I promised");
            }).catch(function(err) {
                console.log(err);
            });
        });
    });
};

check(myPath).then(function (val) {
    console.log(val);
});
