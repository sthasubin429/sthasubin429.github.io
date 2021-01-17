//Getting All DOM Elements
var containers= document.getElementsByClassName('carousel-container')[0];
var wrapper = document.getElementsByClassName('carousel-img-wrapper')[0];
var images = document.querySelectorAll('.carousel-img-wrapper img');

//constants
const IMG_WIDTH = 600;
const IMG_HEIGHT = 400;
const DEFAULT_SPEED = 20;

//variables
var currentIndex = 0;
var speed = DEFAULT_SPEED;
var position = 0
var direction;
var moving = false;

var dots = [];

//setting up container and wrapper sizes
containers.style.height = IMG_HEIGHT +'px';
containers.style.width = IMG_WIDTH + 'px';
wrapper.style.width = images.length * IMG_WIDTH + 'px';

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

containers.appendChild(leftArrow);


rightArrow.style.width = "25px";
rightArrow.style.height = "25px";
rightArrow.src  = './images/icon-previous.png';
rightArrow.style.margin = "0 auto";
rightArrow.style.position = 'absolute';
rightArrow.style.left = '20px';
rightArrow.style.top = '40%';

containers.appendChild(rightArrow);

//adding eventListeners to arrow buttons
leftArrow.addEventListener('click', nextImage);
rightArrow.addEventListener('click', prevImage);

//rendering dots
for (var i =0; i<images.length; i++){
    dots[i] = document.createElement('div');
    dots[i].style.position = 'absolute';
    dots[i].style.background = '#777';
    dots[i].style.width = '12px';
    dots[i].style.height = '12px';
    dots[i].style.borderRadius = '50%';
    dots[i].style.left = 280 + (i * 20) + 'px';
    dots[i].style.bottom = '8px';
    dots[i].addEventListener('click', changeFromDot);
    changeDotColor();
    containers.appendChild(dots[i]);
}

//Changing Image from dot
function changeFromDot(e){
    for (var j =0; j < dots.length; j++){
        if (dots[j] === e.target){

            if((currentIndex-j)===0){
                return
            }
            else if(Math.sign(currentIndex-j) === 1 ){
                speed = DEFAULT_SPEED*(currentIndex-j);
                currentIndex = j;
                direction = 'right';
                moveImage(); 
            }
            else if(Math.sign(currentIndex-j) === -1){
                speed = DEFAULT_SPEED*(j-currentIndex);
                currentIndex = j;
                direction = 'left';
                moveImage(); 
            }

        }
    }

}
//changin image colour
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

//Going to next image
function nextImage(){
    if(!moving){
        moving = true;
        currentIndex ++;
        if (currentIndex === images.length){
            currentIndex = 0;
            direction = 'right';
            speed = DEFAULT_SPEED*2.5;
            moveImage(); 
        }
        else{
            direction = 'left';
            moveImage();
        }
    }


}

//going to previous image
function prevImage(){
    if(!moving){
        moving = true;
        if (currentIndex === 0){
            currentIndex = images.length-1;
            direction = 'left';
            speed = DEFAULT_SPEED*2.5;
            moveImage();
        }
        else{
            currentIndex --;
            direction = 'right';
            moveImage();  
        }
    }

}

//changing image
function moveImage() {
    if(direction === 'left'){
        position -= speed;
    }
    else if(direction === 'right'){
        position += speed;
    }
    if(Math.abs(position - (-currentIndex * IMG_WIDTH)) < speed){
        speed = DEFAULT_SPEED;
        position = (-currentIndex * IMG_WIDTH);
        wrapper.style.left = position + 'px';
        changeDotColor();
        moving = false;

        return;
        
    }
    else{
        wrapper.style.left = position + 'px';
    }
    requestAnimationFrame(moveImage);

}