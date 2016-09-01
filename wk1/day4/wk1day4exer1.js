function each(chili, carne) {
    if (typeof chili != "object") {
            console.log("Oooh, noooo! " + chili + " is not even an object!")
            return("ERROR");
        } else if (typeof carne != "function") {
            console.log("Oooh, noooo! " + carne + " is not even an function!")
            return("ERROR");
    } else {
        for (var prop in chili) {
            carne(chili[prop],prop)
        }
    }
};

each({
  a: 1,
  b: 2
}, function(val, name) {
  console.log('The value of ' + name + ' is ' + val);
});

each(['a', 'b'], function(val, idx) {
  console.log('The value of item ' + idx + ' is ' + val);
});

each("vegan", function(val, name) {
  console.log('The value of ' + name + ' is ' + val);
});
