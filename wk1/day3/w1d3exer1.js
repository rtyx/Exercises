
function sum() {
    var total = 0
    for (i = 0 ; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total
};


console.log(sum(1,2,3,4));
console.log(sum(5,10,15,20,50));
console.log(sum(99,1,100,800));
