var box = document.getElementById("box");

box.addEventListener("mousedown", function() {
  box.style.backgroundColor = ('#'+ Math.floor(Math.random()*16777215).toString(16))
});

box.addEventListener("mouseup", function() {
  box.style.backgroundColor = ('#'+ Math.floor(Math.random()*16777215).toString(16))
});
