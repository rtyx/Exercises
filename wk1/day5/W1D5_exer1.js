function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    this.getArea = function () {
        var area = (this.width * this.height)
        console.log (area)
        return area
    }
};

function Square(side) {
    this.side = side;
    Rectangle.call(this, side, side)
};

var square = new Square(4);
square.getArea(); //16

var rect = new Rectangle(4, 5);
rect.getArea(); //20

var federico = new Square(6);
federico.getArea();

var saturnina = new Rectangle(15, 5);
saturnina.getArea();
