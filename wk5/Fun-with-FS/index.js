var fs = require('fs');

var mypath = __dirname + '/files';

function listAll(path) {
    fs.readdir(path, function(err, data) {
        if (err) {
            console.log(err);
            process.exit;
        }
        console.log(path + "/ contains " + data);
        for (var i = 0; i < data.length; i++) {
            function hello(i) {
                fs.stat(path + "/" + data[i], function(err, stats) {
                    if (err) {
                        console.log(err);
                        process.exit;
                    }
                    if (stats.isDirectory()) {
                        var newPath = path + "/" + data[i];
                        listAll(newPath);
                    }
                });
            }
            hello(i);
        }

///ALTERNATIVE WITH FOR EACH////

        // data.forEach(function(file) {
        //     fs.stat(path + "/" + file, function(err, data) {
        //         if (err) {
        //             console.log(err);
        //         }
        //         if (data.isDirectory()) {
        //             var newPath = path + "/" + file;
        //             listAll(newPath);
        //         }
        //     });
        // });
    });
}

listAll(mypath);
