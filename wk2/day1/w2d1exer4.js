carousel();

function carousel() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    var slideIndex = 0;

    for (i = 0; i < slides.length; i++) {
        if (slides[i].id == "current") {
            slides[i].id = "previous";
        } else if (slides[i].id == "next") {
            slides[i].id = "current";
        } else if (slides[i].id == "nextnext") {
            slides[i].id = "next";
        } else if (slides[i].id == "previous") {
            slides[i].id = "nextnext";
        }
    }

    slideIndex++;

    if (slideIndex > slides.length) {slideIndex = 1;}

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(carousel, 5000);
}
