var containers= document.getElementsByClassName('carousel-container');
// var wrappers = document.getElementsByClassName('carousel-img-wrapper');
var imgWidth = 600;
var imgHeight = 400;
var images = document.getElementsByTagName('img');

console.log(images.length);

for( var i = 0; i< containers.length; i++){
    containers[i].style.height = "400px";

}
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
var wrapper = document.getElementsByClassName('carousel-img-wrapper')[0];

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

var currentIndex = 0;
var speed = 10;
var position = 0
var direction;

var move;
function nextImage(){
    currentIndex ++;
    if (currentIndex === images.length){
        currentIndex = 0;
        direction = 'right';
        speed = 30;
        moveImage(); 
        move = setInterval(moveImage,1000/60);   

    }
    else{
        // console.log(currentIndex, (-currentIndex * imgWidth));
        //wrapper.style.left = (-currentIndex * imgWidth)+ 'px';
        direction = 'left';
        moveImage();
        move = setInterval(moveImage,1000/60);
    
    }

}
function prevImage(){
    if (currentIndex === 0){
        currentIndex = images.length-1;
        direction = 'left';
        speed = 30;
        // moveImage();
        move = setInterval(moveImage,1000/60);
    }
    else{
        currentIndex --;
        // console.log(currentIndex, (-currentIndex * imgWidth));
        // wrapper.style.left = (-currentIndex * imgWidth)+ 'px';
        direction = 'right';
        // moveImage();  
        move = setInterval(moveImage,1000/60);  
    }
}

function moveImage() {

    if(direction === 'left'){
        position -= speed;
    }
    else if(direction === 'right'){
        position += speed;
    }
    if(position === (-currentIndex * imgWidth)-speed){
        speed = 10;
        position = (-currentIndex * imgWidth);
        // return;
        clearInterval(move)
    }
    else{
        wrapper.style.left = position + 'px';
    }
    // requestAnimationFrame(moveImage)
}
