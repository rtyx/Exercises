var outerbox = document.getElementById("outerbox");
var innerbox = document.getElementById("innerbox");


outerbox.addEventListener("mousedown", function() {
  outerbox.style.backgroundColor = ('#'+ Math.floor(Math.random()*16777215).toString(16))
});

innerbox.addEventListener("mousedown", function(e) {
  innerbox.style.backgroundColor = ('#'+ Math.floor(Math.random()*16777215).toString(16))
  e.stopPropagation();
});
