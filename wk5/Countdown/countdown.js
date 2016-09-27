var EventEmitter = require("events").EventEmitter;

function Countdown(n) {
    var that = this;
    setTimeout(function count() {
        that.emit('secondElapsed', n);
        n--;
        if (n >= 0) {
            setTimeout(count, 1000);
        }
    }, 1000);
}

Countdown.prototype = new EventEmitter;

module.exports.Countdown = Countdown;
