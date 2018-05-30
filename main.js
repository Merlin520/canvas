var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 2;
autoSetCanvasSize(canvas);

listenToUser(canvas);






//橡皮擦是否开启
var eraserEnable = false;
// eraser.onclick = function () {
//     eraserEnable = !eraserEnable;//如果开启，点击即关闭，反之亦然
// };
// eraser.onclick = function () {
//     eraserEnable = true;
//     actions.className = 'actions x';
// };
//
// brush.onclick = function () {
//     eraserEnable = false;
//     actions.className = 'actions';
// };

pen.onclick = function () {
    eraserEnable = false;
    pen.classList.add('active');
    eraser.classList.remove('active')
};
eraser.onclick = function () {
    eraserEnable = true;
    eraser.classList.add('active');
    pen.classList.remove('active')
};


black.onclick = function () {
    context.fillStyle = 'black';
    context.strokeStyle = 'black';
    black.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active')
};

red.onclick = function () {
    context.fillStyle = 'red';
    context.strokeStyle = 'red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active')
};

green.onclick = function () {
    context.fillStyle = 'green';
    context.strokeStyle = 'green';
    red.classList.remove('active');
    green.classList.add('active');
    blue.classList.remove('active');
    black.classList.remove('active')
};

blue.onclick = function () {
    context.fillStyle = 'blue';
    context.strokeStyle = 'blue';
    red.classList.remove('active');
    blue.classList.add('active');
    green.classList.remove('active');
    black.classList.remove('active')
};

clear.onclick = function () {
    context.clearRect(0,0,canvas.width,canvas.height);
};

thin.onclick = function () {
    lineWidth = 2
};

mid.onclick = function () {
    lineWidth = 4
};

thick.onclick = function () {
    lineWidth = 6
};

//画圆函数
function drawCircle(x,y,radius) {
    context.beginPath();
    // context.fillStyle = 'red';
    context.arc(x, y, radius,0,Math.PI*2);
    context.fill();
}


//画线函数
function drawLine(x1,y1,x2,y2) {
    context.beginPath();
    // context.strokeStyle = 'red';
    context.moveTo(x1,y1);
    context.lineWidth = lineWidth;
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