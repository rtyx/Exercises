function chicken(number) {
    if (number <= 0 || isNaN(number)) {
        console.log("ERROR")
        return "ERROR";
    } else if (number >= 1000000) {
        console.log(number)
        return number;
    } else {
        return chicken(number * 10)
    };
};

chicken(-1)
chicken(0)
chicken(3)
chicken(1000001)
