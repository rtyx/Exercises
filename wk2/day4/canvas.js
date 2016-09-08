
function initCanvas() {
    var context = document.getElementById('canvas').getContext('2d');
    context.canvas.addEventListener('dblclick',function(moustache) {
      var mouseX = event.clientX - context.canvas.offsetLeft;
      var mouseY = event.clientY - context.canvas.offsetTop;
      context.fillStyle = "black";
      var moustachehight = 20;
      var moustachewidth = 40;
      context.fillRect(mouseX-moustachewidth/2, mouseY-moustachehight/2, moustachewidth, moustachehight)
    });

    context.canvas.addEventListener('click',function(smile) {
      var mouseX = event.clientX - context.canvas.offsetLeft;
      var mouseY = event.clientY - context.canvas.offsetTop;
      context.fillStyle = "black";
      context.beginPath();
      context.arc(mouseX, mouseY, 50, 0, Math.PI, false);
      context.stroke();
    });

    context.strokeStyle = 'black';
    context.lineWidth = 8;

    context.lineCap = "round";
    context.lineJoin = "round"
    context.beginPath();
    context.arc(150,150,10, 0, 2*Math.PI, false);
    context.stroke();
    context.beginPath();
    context.arc(250,150,10, 0, 2*Math.PI, false);
    context.stroke();
    context.beginPath();
    context.arc(200, 200, 100, 0, 2 * Math.PI, false);
    context.moveTo(200,300);
    context.lineTo(200,600);
    context.moveTo(200,300);
    context.lineTo(100,400);
    context.lineTo(200,500);
    context.moveTo(200,300);
    context.lineTo(300,400);
    context.lineTo(400,300);
    context.moveTo(200,600);
    context.lineTo(100,900);
    context.moveTo(200,600);
    context.lineTo(300,900);
    context.stroke();
}




window.onload = initCanvas;
