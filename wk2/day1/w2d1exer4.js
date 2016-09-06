function carousel() {
    setTimeout(function () {
        var i;
        if (i > slides.length) {
            i = 0 
          } else {
            i++
          }
        var slides = document.getElementsByClassName("kit");
        var dots = document.getElementsByClassName("dot");
        slides[i].classList.remove("in");
        slides[i].classList.add("out");
        slides[i+1].classList.remove("out");
        slides[i+1].classList.add("prepare");
        carousel();
  }, 2000);
}

carousel();
