var containers= document.getElementsByClassName('carousel-container');
// var wrappers = document.getElementsByClassName('carousel-img-wrapper');
var imgWidth = 600;
var imgHeight = 400;
var images = document.querySelectorAll('.carousel-img-wrapper img');


var currentIndex = 0;
var speed = 10;
var position = 0
var direction;
var move;

var dots = [];

console.log(images);

for( var i = 0; i< containers.length; i++){
    containers[i].style.height = "400px";

}
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
var wrapper = document.getElementsByClassName('carousel-img-wrapper')[0];

//rendering arrows
var leftArrow = document.createElement('img');
var rightArrow = document.createElement('img');

leftArrow.style.width = "25px";
leftArrow.style.height = "25px";
leftArrow.src  = './images/icon-next.png';
leftArrow.style.margin = "0 auto";
leftArrow.style.position = 'absolute';
leftArrow.style.left = '560px';
leftArrow.style.top = '40%';

containers[0].appendChild(leftArrow);

rightArrow.style.width = "25px";
rightArrow.style.height = "25px";
rightArrow.src  = './images/icon-previous.png';
rightArrow.style.margin = "0 auto";
rightArrow.style.position = 'absolute';
rightArrow.style.left = '20px';
rightArrow.style.top = '40%';

containers[0].appendChild(rightArrow);

leftArrow.addEventListener('click', nextImage);
rightArrow.addEventListener('click', prevImage);

//rendering nav buttons
for (var i =0; i<images.length; i++){   
    dots[i] = document.createElement('div');
    dots[i].style.position = 'absolute';
    dots[i].style.background = '#777';
    dots[i].style.width = '12px';
    dots[i].style.height = '12px';
    dots[i].style.borderRadius = '50%';
    dots[i].style.left = 250 + (i * 20) + 'px';
    dots[i].style.bottom = '8px';
    dots[i].addEventListener('click', changeFromDot);
    changeDotColor();
    containers[0].appendChild(dots[i]);
}
function changeFromDot(e){
    for (var j =0; j < dots.length; j++){
        if (dots[j] === e.target){

            if((currentIndex-j)===0){
                return
            }
            else if(Math.sign(currentIndex-j) === 1 ){
                speed = 10*(currentIndex-j);
                currentIndex = j;
                direction = 'right';
                move = setInterval(moveImage,1000/60);  
            }
            else if(Math.sign(currentIndex-j) === -1){
                speed = 10*(j-currentIndex);
                currentIndex = j;
                direction = 'left';
                move = setInterval(moveImage,1000/60);       
            }

        }
    }

}
function changeDotColor(){
    for (var j =0; j < dots.length; j++){
        if (j === currentIndex){
            dots[j].style.background = '#fff';
        }
        else{
            dots[j].style.background = '#777';
        }
    }
}

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
        // moveImage();
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
        wrapper.style.left = position + 'px';
        changeDotColor();
        // return;
        clearInterval(move)
        
    }
    else{
        wrapper.style.left = position + 'px';
        console.log(currentIndex, (-currentIndex * imgWidth));
    }
    // requestAnimationFrame(moveImage)
}
