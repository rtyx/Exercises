function askForNumber() {
    var number = prompt("Introduce any number between 1 and 10");
    if (number > 10 || number < 1 || isNaN(number)) {
        var error = new Error("Hey yo, that's not a valid number");
        throw error;
    } else {
        return number;
    }
}

function translateNumberToGerman() {
    try {
        var number = askForNumber();
        var germanNumbers = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn"];
        var germanNumber = germanNumbers[number];
        console.log(germanNumber);
        return germanNumber;
    } catch (error) {
        alert(error);
        translateNumberToGerman();
    }
}
