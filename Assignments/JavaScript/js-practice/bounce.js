console.log('bounce')
var root = document.getElementById("root");
root.style.width = "600px";
root.style.height = "600px";
root.style.margin = "20px auto";
root.style.border = "1px solid #000";
root.style.position = "relative";

var circle = document.createElement('div');
var speed = 5;
var y = 0;

circle.style.width = "50px";
circle.style.height = "50px";
circle.style.borderRadius = "50%";
circle.style.background = "#429";
circle.style.margin = "0 auto";
circle.style.position = 'absolute';
circle.style.left = '45%';

root.appendChild(circle);

function move() {
    y += speed;
    circle.style.top = y + 'px';
    if(y< 0 || y >550){
        speed = speed * -1;
    }
    requestAnimationFrame(move);
}
move();
