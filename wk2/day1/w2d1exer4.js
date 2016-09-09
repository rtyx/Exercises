var kitten = document.getElementsByClassName("kit"); //This is the array of cats
var dots = document.getElementsByClassName("dot"); //This is the array of dots
var anydot = document.getElementById("dots"); //This is the div that contains the dots
var katout = 0; //Determines which cat of the array is getting out of the screen
var katin = 1; //Determines which cat of the array is coming in scene
var keepThemKittiesComin; // Will set a timeout to keep the cats transitioning
var caughtInTheMiddle = false; //Variable to know if a transition is going on or not

setTimeout(function carousel() { //Carousel is called after 3 seconds, and it recurses itself
    kitten[katout].classList.remove("in"); //We remove the class "in" to the cat in scene
    dots[katout].classList.remove("activedot"); //We remove class "activedot" to the currently active dot
    kitten[katout].classList.add("out"); //We give the class "out" to the cat that in scene, so that it goes out
    kitten[katin].classList.add("in"); //We give the class "in" to the cat waiting, so that it comes in
    caughtInTheMiddle = true; //From now on, a transition is happening, so we set it to true.
    console.log("Kitties moving");
    dots[katin].classList.add("activedot"); //We give the class "activedot" to cat that's coming in scene
    kitten[katout].addEventListener("transitionend", function removeOut() { //We listen to the cat going out
        this.removeEventListener("transitionend", removeOut);
        this.classList.remove("out"); //and when that cat is done transitioning out, we remove its class "out"
        caughtInTheMiddle = false; // the moment the transition is over, this variable becomes false again
        console.log("Kitties waiting");
    }); //This will make that cat go to it's neutral state, which is waiting to enter in scene
    anydot.addEventListener("click", function() { //We listen to the dots, so that
        clearTimeout(keepThemKittiesComin); //whenever any dot is clicked, we will stop the carousel
    });
    katout = katin; //The cat that has to get out is the was that was in scene
    katin = katout + 1 >= kitten.length ? 0 : katout + 1; //The cat that must come in is the next to the one that's going out, except if that's the fourth (then it's the first)
    keepThemKittiesComin = setTimeout(carousel, 3000); // We recall the carousel function inside the function
}, 3000);

for(var i=0; i< dots.length; i++) { //we loop through the dots, listen to them and run the function if clicked
    dots[i].addEventListener("click", switchThemKitties(i));
}

function switchThemKitties(i) { //I couldn't manage to keep the index if not like this. Tried "for each" but didn't make it work
    return function() {
        if (!caughtInTheMiddle) { //if there's no transition happening at the moment
            for (var j=0; j < dots.length; j++) { //we clean the state of things
                dots[j].classList.remove("activedot"); //remove all possible active casses in dots
                if (kitten[j].classList.contains("in")) { //and remove the "in" class of the current element
                    kitten[j].classList.remove("in");
                    kitten[j].classList.add("out"); //and add the class "out" to move it out of scene
                    caughtInTheMiddle = true; //which means that there's a transition there
                    console.log("Kitties moving");
                }
            }
            kitten[i].addEventListener("transitionend", function cleanThemKitties() { //we listen coming in scene
                this.removeEventListener("transitionend", cleanThemKitties); //and check when its transition is over
                caughtInTheMiddle = false; //to turn the transition variable false
                console.log("Kitties waiting");
                for (var j=0; j < dots.length; j++) { //we want to check the cats off-screen
                    kitten[j].classList.remove("out"); //and remove the "out" class, to prepare them
                }
            });
            console.log("Cat " + i + ", I choose you!"); //i should be the cat we're sending in scene
            dots[i].classList.add("activedot"); //we activate its dot
            kitten[i].classList.add("in"); //and we bring it in adding the class "in"
        } else { //but if the dots are clicked while a transition is going on
            console.log("Miauuuu, too fast, you human!"); //then nothing happens
            return; //these cats don't like interruptions
        }
    };
}
