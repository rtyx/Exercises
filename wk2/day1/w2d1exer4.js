var kitten = document.getElementsByClassName("kit"); //This is the array of cats
var dots = document.getElementsByClassName("dot"); //This is the array of dots
dots = [].slice.call(dots); // Well, it's not an actual array until we do this
var anydot = document.getElementById("dots"); //This is the div that contains the dots
var katout = 0; //Determines which cat of the array is getting out of the screen
var katin = 1; //Determines which cat of the array is coming in scene
var keepThemKittiesComin; // Will set a timeout to keep the cats transitioning
var caughtInTheMiddle = false; //Variable to know if a transition is going on or not
var carousel;
var moveThemKitties; //this is the function that will start the carousel
var resumeThemKitties; //this will resume it

setTimeout(moveThemKitties = function carousel() { //Carousel is called after 3 seconds, and it recurses itself
    kitten[katout].classList.remove("in"); //We remove the class "in" to the cat in scene
    dots[katout].classList.remove("activedot"); //We remove class "activedot" to the currently active dot
    kitten[katout].classList.add("out"); //We give the class "out" to the cat that in scene, so that it goes out
    kitten[katin].classList.add("in"); //We give the class "in" to the cat waiting, so that it comes in
    caughtInTheMiddle = true; //From now on, a transition is happening, so we set it to true.
    dots[katin].classList.add("activedot"); //We give the class "activedot" to cat that's coming in scene
    kitten[katout].addEventListener("transitionend", function removeOut() { //We listen to the cat going out
        this.removeEventListener("transitionend", removeOut);
        this.classList.remove("out"); //and when that cat is done transitioning out, we remove its class "out"
        caughtInTheMiddle = false; // the moment the transition is over, this variable becomes false again
    }); //This will make that cat go to it's neutral state, which is waiting to enter in scene
    anydot.addEventListener("click", function() { //We listen to the dots, so that
        clearTimeout(keepThemKittiesComin); //whenever any dot is clicked, we will stop the carousel
        clearTimeout(moveThemKitties); // (I went paranoid and stopped everything I thouhgt was stoppable)
        clearTimeout(carousel);
    });
    katout = katin; //The cat that has to get out is the was that was in scene
    katin = katout + 1 >= kitten.length ? 0 : katout + 1; //The cat that must come in is the next to the one that's going out, except if that's the fourth (then it's the first)
    keepThemKittiesComin = setTimeout(carousel, 3000); // We recall the carousel function inside the function
}, 3000);

for (var dot of dots) { //now here we loop through the dots -which we turned into an actual array-
    dot.addEventListener("click", function() { //we listen for a click in each dot
        if (!caughtInTheMiddle) { //if there's no transition going on
            dot = this.id; //we take the id of the number (0,1,2,3)
            for (var j=0; j < dots.length; j++) { //we clean the current state of things, to make sure nothing messes up the classes
                dots[j].classList.remove("activedot");
                if (kitten[j].classList.contains("in")) {
                    kitten[j].classList.remove("in");
                    kitten[j].classList.add("out");
                    caughtInTheMiddle = true;
                }
            }
            kitten[dot].addEventListener("transitionend", function cleanThemKitties() { //we listen to the cat moving at the moment
                this.removeEventListener("transitionend", cleanThemKitties);
                caughtInTheMiddle = false; //we determine the end of the transition
                for (var j=0; j < dots.length; j++) { //we remove the class "out" from all cats
                    kitten[j].classList.remove("out");
                }
            });
            dots[dot].classList.add("activedot"); //we activate the dot (giving it its class)
            kitten[dot].classList.add("in"); //we bring in the cat
            katout = parseInt(dot); //we define our new katout variable
            katin = katout + 1 >= kitten.length ? 0 : katout + 1; //and the new katin variable
            console.log("Cat " + dot + ", I choose you!");
            setTimeout(resumeThemKitties = function() { //so that the loop goes on from the currently selected cat
                moveThemKitties();
            }, 3000);
        } else { //but if a transition is going on, nothing happens
            console.log("Too fast! Damn you human"); //these cats don't like rushing
            return;
        }
    });
}
