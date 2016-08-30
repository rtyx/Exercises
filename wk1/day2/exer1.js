function logType(data) {
    if (typeof(data) === 'number') {
        console.log("it's a number!")
    } else {
        console.log("it's not a number!");
        if (typeof(data) == 'undefined') {
            console.log("it's undefined!")
        } else if (data == null) {
            console.log("it's null!")
        } else if (typeof(data) == 'string') {
            console.log("it's a string!")
        } else if (typeof(data) == 'boolean') {
            console.log("it's a boolean!")
        } else if (typeof(data) == 'function') {
            console.log("it's a function!")
        } else if (typeof(data) == 'object') {
            console.log("it's an object!")
            if (data.constructor === Array) {
                console.log("But it's a special object... it's an array!")
            }
        } else {
            console.log('Say whaaaaat???')
        }
    }
};
