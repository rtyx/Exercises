function invertCase(string) {
    if (typeof string == "string") {
        for (var i = 0; i < string.length; i++) {
            if (string[i] == string[i].toUpperCase()) {
                string = string.replace(string[i], string[i].toLowerCase())
            } else {
                string = string.replace(string[i], string[i].toUpperCase())
            }
        }
        console.log(string)
        return string
    } else {
        console.log("Ooops, that's not even a string")
        return("ERROR")
    }
}

invertCase("Guau");
invertCase("Antonio Banderas");
invertCase("JaJaJaJaJa");
invertCase({});

// ALTERNATIVE WITH REDUCE//

function altInvertCase(string) {
    if (typeof string == "string") {
        string = string.split("").reduce(function(previous, current) {
            return previous + (current.toLowerCase() == current ? current.toUpperCase() : current.toLowerCase());
        }, "") // the initial character is an empty string character
        console.log(string)
    } else {
        console.log("Ooops, that's not even a string")
    }
}

altInvertCase("Miau");
altInvertCase("Leonardo DiCaprio");
altInvertCase("NoNoNoNoN");
altInvertCase({});
