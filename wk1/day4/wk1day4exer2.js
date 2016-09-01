function mutantTwinOf(array) {
    if (Array.isArray(array) == true) {
        var newArray = array.slice().reverse();
        console.log(newArray);
    } else {
        console.log("Yo man that's not even an array")
    }
};

var hansel = ['I', 'speak', 'just', 'fine'];

mutantTwinOf(hansel)

console.log(hansel)
