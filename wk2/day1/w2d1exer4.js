var kitten = document.getElementsByClassName("kit");
var dots = document.getElementsByClassName("dot");
var katout = 0;
var katin = 1;

setTimeout(function carousel() {
    kitten[katout].classList.remove("in");
    dots[katout].classList.remove("activedot");
    kitten[katout].classList.add("out");
    kitten[katin].classList.add("in");
    dots[katin].classList.add("activedot");
    kitten[katout].addEventListener("transitionend", function removeOut(e) {
        this.removeEventListener("transitionend", removeOut);
        console.log(e);
        this.classList.remove("out");
        setTimeout(carousel, 5000);
    });
    katout = katin;
    katin = katout + 1 >= kitten.length ? 0 : katout + 1;
}, 5000);
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
