var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var painting = false;
var lastPoint = {x:undefined,y:undefined};

canvas.onmousedown = function (a) {
    painting = true;
    var x = a.clientX;
    var y = a.clientY;
    lastPoint = {'x':x,'y':y};
    drawCircle(x,y,1)
};

canvas.onmousemove = function (a) {
    if(painting){
        var x = a.clientX;
        var y = a.clientY;
        var newPoint = {'x':x,'y':y};
        drawCircle(x,y,1);
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint = newPoint;
    }
};

canvas.onmouseup = function (a) {
    painting = false;
};

















//画圆函数
function drawCircle(x,y,radius) {
    context.beginPath();
    context.fillStyle = 'red';
    context.arc(x, y, radius,0,Math.PI*2);
    context.fill();
}


//画线函数
function drawLine(x1,y1,x2,y2) {
    context.beginPath();
    context.strokeStyle = 'red';
    context.moveTo(x1,y1);
    context.lineWidth = 5;
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}
