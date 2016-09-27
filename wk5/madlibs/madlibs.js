var readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var answers = [];

rl.question("Gimme the name of a famous person:\n", (person)=>{
    answers.push(person);
    rl.question("Now gimme a nerdy topic:\n", (nerdy)=>{
        answers.push(nerdy);
        rl.question("Now some food you could have:\n", (food)=>{
            answers.push(food);
            rl.question("And... why not. An orifice of your body:\n", (orifice)=>{
                answers.push(orifice);
                rl.close();
            });
        });
    });
});


rl.on('close', function() {
    console.log("I was more uncomfortable than " + answers[0] + " at a " + answers[1] + " convention having " + answers[2] + " coming out of my " + answers[3] + ".");
    process.exit(0);
});
