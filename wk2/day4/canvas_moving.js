function initCanvas() {

    var ctx = document.getElementById("canvas").getContext("2d"); //player context
    var player = document.getElementById("canvas"); //player
    var ctxc = document.getElementById("canvascontainer").getContext("2d"); //scenario
    //player properties
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    //player drawing
    ctx.beginPath();
    ctx.arc(20, 20, 10, 0, 2 * Math.PI, false);
    ctx.moveTo(20,30);
    ctx.lineTo(20,60);
    ctx.moveTo(20,30);
    ctx.lineTo(10,40);
    ctx.lineTo(20,50);
    ctx.moveTo(20,30);
    ctx.lineTo(30,40);
    ctx.lineTo(40,30);
    ctx.moveTo(20,60);
    ctx.lineTo(10,90);
    ctx.moveTo(20,60);
    ctx.lineTo(30,90);
    ctx.stroke();
    //player initial position
    var x = 30, y = 30;
    ctxc.drawImage(player,x,y);
    //key functions
    document.addEventListener("keypress", function(event) {
        var key_press = String.fromCharCode(event.keyCode);
        if (key_press == "w") {
            y-=5;
        }
        if (key_press == "d") {
            x+=5;
        }
        if (key_press == "s") {
            y+=5;
        }
        if (key_press == "a") {
            x-=5;
        }
        //clean scenario
        ctxc.clearRect(0,0,1000,500);
        //redraw with new position
        ctxc.drawImage(player,x,y);
    });
}


window.onload = initCanvas();
