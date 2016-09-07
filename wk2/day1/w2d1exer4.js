var slides = document.getElementsByClassName("kit");
console.log(slides)
var dots = document.getElementsByClassName("dot");
console.log(dots)
var counter = 0;
var i = 0
var j = 1

console.log(slides.length);

function carousel() {
    setTimeout(function () {
        if (i >= slides.length - 1) {
            i = 0
          } else {
            i++
          }
        if (j >= slides.length - 1) {
            j = 0
          } else {
            j++
          }
        console.log("i=" + i + ", j=" + j)
        slides[i].classList.remove("in");
        slides[i].classList.add("out");
        slides[j].classList.remove("out");
        console.log(slides);
        carousel();
  }, 2000);
}

carousel();
