var kitten = document.getElementsByClassName("kit");
var dots = document.getElementsByClassName("dot");
var anydot = document.getElementById("dots");
var katout = 0;
var katin = 1;
var keepThemKittiesComin;

setTimeout(function carousel() {
    kitten[katout].classList.remove("in");
    dots[katout].classList.remove("activedot");
    kitten[katout].classList.add("out");
    kitten[katin].classList.add("in");
    dots[katin].classList.add("activedot");
    kitten[katout].addEventListener("transitionend", function removeOut() {
        this.removeEventListener("transitionend", removeOut);
        this.classList.remove("out");
    });
    anydot.addEventListener("click", function() {
        clearTimeout(keepThemKittiesComin);
    });
    katout = katin;
    katin = katout + 1 >= kitten.length ? 0 : katout + 1;
    keepThemKittiesComin = setTimeout(carousel, 3000);
}, 3000);

for(var i=0; i< dots.length; i++) {
    dots[i].addEventListener("click", switchThemKitties(i));
}

function switchThemKitties(i) {
    return function() {
        for (var j=0; j < dots.length; j++) {
            dots[j].classList.remove("activedot");
            if (kitten[j].classList.contains("in")) {
                kitten[j].classList.remove("in");
                kitten[j].classList.add("out");
            }
        }
        console.log("Cat " + i + ", I choose you!");
        kitten[i].addEventListener("transitionend", function cleanThemKitties() {
            this.removeEventListener("transitionend", cleanThemKitties);
            for (var j=0; j < dots.length; j++) {
                kitten[j].classList.remove("out");
            }
        });
        dots[i].classList.add("activedot");
        kitten[i].classList.add("in");
    };
}




/*
function kitinAround() {
  switch (whichDot) {
    case document.getElementById('dot1').onclick : alert("dot 1 was clicked")};
    break;
    case document.getElementById('dot2').onclick : alert("dot 2 was clicked")};
    break;
    default:

  }
     = f
}
kitinAround();

*/
