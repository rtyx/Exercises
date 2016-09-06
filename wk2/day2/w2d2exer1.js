document.addEventListener("mousemove", function(e) {
    var box = document.getElementById("box");
    box.style.left = e.pageX + "px";
    box.style.top = e.pageY + "px";
    console.log(e.pageX, e.pageY);
});
