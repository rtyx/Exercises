var kitten = document.getElementsByClassName("kit");
var dots = document.getElementsByClassName("dot");
var katout = 0
var katin = 1;

setTimeout(function moveout() {
    kitten[katout].classList.remove("in");
    kitten[katout].classList.add("out");
    kitten[katin].classList.add("in");
    kitten[katout].addEventListener("transitionend", function removeOut(e) {
      this.removeEventListener("transitionend", removeOut);
      console.log(e);
      this.classList.remove("out");
      setTimeout(moveout, 5000)
    });
    katout = katin;
    katin = katout + 1 >= kitten.length ? 0 : katout + 1;
}, 5000);


/*
setInterval(function prepare() {
    console.log(kitten[0].classList)
    console.log(kitten[1].classList)
    console.log(kitten[2].classList)
    console.log(kitten[3].classList)
}, 5000);
*/
