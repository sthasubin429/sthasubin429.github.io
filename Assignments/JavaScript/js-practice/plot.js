var points = [];

function getPoints(number){

    for (var j = 0; j < number; j++) {

        var x = Math.floor((Math.random() * 550) + 1);
        var y = Math.floor((Math.random() * 550) + 1);

        var obj = {
                    "x":x,
                    "y":y
                }
        points.push(obj);
    }
}

function plot(){
    var root = document.getElementById("container");

    root.style.position = "relative";
    root.style.width = "600px";
    root.style.height = "600px";
    root.style.margin = "20px auto";
    root.style.border = "1px solid #000";

    var pointArray = [];

    for (var i in points) {

        var point = document.createElement('div');

        point.style.width = "16px";
        point.style.height = "16px";
        point.style.borderRadius = "50%";
        point.style.background = "#49c";
        point.style.fontSize = '40px';
        point.style.position = 'absolute';
        point.style.top = points[i]['x']+"px";
        point.style.left = points[i]['y']+"px";

        point.setAttribute('class', 'point');
        
        point.addEventListener('click', function (event) {   
            root.removeChild(event.target);
        });
        
        root.appendChild(point);
    
        pointArray.push(point);
    }
}


getPoints(20);
plot();
