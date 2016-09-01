function getLessThanZero(salad) {
    if (Array.isArray(salad) == true) {
        var onlyTomatoes = salad.filter(function(tomato) {
            return tomato < 0 })
        console.log(onlyTomatoes);
    } else {
        console.log("Is that even an array?")
    }
};


var cesar = [0, 10, -1, 30, -5, 4, -10, 23, -15];
var caprese = [1, 2, -1, -90, 10];
var lechuga = [1, 2];

getLessThanZero(cesar);
getLessThanZero(caprese);
getLessThanZero(lechuga);
getLessThanZero("miau")
