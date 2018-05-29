var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

autoSetCanvasSize(canvas);

listenToUser(canvas);






//橡皮擦是否开启
var eraserEnable = false;
// eraser.onclick = function () {
//     eraserEnable = !eraserEnable;//如果开启，点击即关闭，反之亦然
// };
eraser.onclick = function () {
    eraserEnable = true;
    actions.className = 'actions x';
};

brush.onclick = function () {
    eraserEnable = false;
    actions.className = 'actions';
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

function autoSetCanvasSize() {
    setCanvasView();
    function setCanvasView() {//获取页面
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
    window.onresize = function () {
        setCanvasView();
    };
}

function listenToUser(canvas){

    var using = false;
    var lastPoint = {x:undefined,y:undefined};

if(document.body.ontouchstart !== undefined){
    //触屏
    canvas.ontouchstart = function (a) {

        var x = a.touches[0].clientX;
        var y = a.touches[0].clientY;
        console.log(x,y);
        using = true;
        // drawCircle(x,y,1)
        if(eraserEnable){
            context.clearRect(x-5,y-5,10,10)//橡皮擦
        }else {
            var x = a.clientX;
            var y = a.clientY;
            lastPoint = {'x':x,'y':y};
        }
    };
    canvas.ontouchmove = function (a) {
        console.log(22)
        var x = a.touches[0].clientX;
        var y = a.touches[0].clientY;
        if(!using){ return }
        if(eraserEnable){
            context.clearRect(x-5,y-5,10,10)
        }else {
            var newPoint = {'x':x,'y':y};
            // drawCircle(x,y,1);
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
            lastPoint = newPoint;
        }

    };
    canvas.ontouchend = function (a) {
        console.log(33)
        using = false;
    }

}else {
    //非触屏
    canvas.onmousedown = function (a) {
        var x = a.clientX;
        var y = a.clientY;
        using = true;
        // drawCircle(x,y,1)
        if(eraserEnable){
            context.clearRect(x-5,y-5,10,10)//橡皮擦
        }else {
            var x = a.clientX;
            var y = a.clientY;
            lastPoint = {'x':x,'y':y};
        }
    };

    canvas.onmousemove = function (a) {
        var x = a.clientX;
        var y = a.clientY;
        if(!using){ return }
        if(eraserEnable){
            context.clearRect(x-5,y-5,10,10)
        }else {
            var newPoint = {'x':x,'y':y};
            // drawCircle(x,y,1);
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
            lastPoint = newPoint;
        }
    };

    canvas.onmouseup = function (a) {
        using = false;
    };
}


    // canvas.onmousedown = function (a) {
    //     var x = a.clientX;
    //     var y = a.clientY;
    //     using = true;
    //     // drawCircle(x,y,1)
    //     if(eraserEnable){
    //         context.clearRect(x-5,y-5,10,10)//橡皮擦
    //     }else {
    //         var x = a.clientX;
    //         var y = a.clientY;
    //         lastPoint = {'x':x,'y':y};
    //     }
    // };
    //
    // canvas.onmousemove = function (a) {
    //     var x = a.clientX;
    //     var y = a.clientY;
    //      if(!using){ return }
    //      if(eraserEnable){
    //             context.clearRect(x-5,y-5,10,10)
    //     }else {
    //             var newPoint = {'x':x,'y':y};
    //             // drawCircle(x,y,1);
    //             drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
    //             lastPoint = newPoint;
    //     }
    // };
    //
    // canvas.onmouseup = function (a) {
    //     using = false;
    // };
}