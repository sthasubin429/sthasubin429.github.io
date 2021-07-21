var createCarousel = function(containerClass, speed, holdTime){
    var containers= document.getElementsByClassName(containerClass);
    // console.log(containers[0].style.width)
    
    var speed = speed || 20;
    var holdTime = holdTime || 2000;
    // console.log(containerClass, width,height,speed,holdTime);
    // console.log(containers);
    for(var i =0;i<containers.length;i++){
        // console.log(containers[i]);
        var wrapper = document.querySelector(`.${containerClass} .carousel-img-wrapper`);
        // console.log(wrapper);
        var images = document.querySelectorAll(`.${containerClass} .carousel-img-wrapper img`);
        // console.log(images);
        var car = new Carousel(containers[i], wrapper,images,  speed, holdTime);
        car.init();
    }
    // console.log(containerList);

}

class Carousel{
    constructor (container, wrapper, images, speed, holdTime){
        this.container = container;
        this.wrapper = wrapper;
        this.images = images
        this.speed = speed;
        this.holdTime = holdTime;
        
        //function Binding
        this.init = this.init.bind(this);
        this.changeFromDot = this.changeFromDot.bind(this);
        this.changeDotColor = this.changeDotColor.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.prevImage = this.prevImage.bind(this);
        this.moveImage = this.moveImage.bind(this);
        this.renderArrows = this.renderArrows.bind(this);
        this.renderDots = this.renderDots.bind(this);
        this.autoRun = this.autoRun.bind(this);

        //Other Necessary Variables
        this.imgWidth;
        this.imgHeight;
        this.leftArrow ;
        this.rightArrow ;
        this.dots = [];

        this.currentIndex = 0;
        this.DEFAULT_SPEED = this.speed;
        this.position = 0
        this.direction;
        this.moving = false;
        this.autoRunId;
    }
    init(){
        // console.log(this.container.style);
        const containerStyle = getComputedStyle(this.container);
        this.imgWidth = parseInt(containerStyle.width);
        this.imgHeight = parseInt(containerStyle.height);
        
        //setting up container and wrapper sizes
        this.wrapper.style.width = this.images.length * this.imgWidth + 'px';

        this.renderArrows();
        this.renderDots();

        this.autoRunID = setInterval(this.autoRun, this.holdTime);


        
    }
    //autoChange
    autoRun(){
        if(!this.moving){
            this.moving = true;
            this.currentIndex ++;
            if (this.currentIndex === this.images.length){
                this.currentIndex = 0;
                this.direction = 'right';
                this.speed = this.DEFAULT_SPEED*2.5;
                this.moveImage(); 
            }
            else{
                this.direction = 'left';
                this.moveImage();
            }
        }
    }

    //Changing Image from dot
    changeFromDot(e){
        if(!this.moving){
            this.moving = true;
            clearInterval(this.autoRunID);
            for (var j =0; j < this.dots.length; j++){
                if (this.dots[j] === e.target){
    
                    if((this.currentIndex-j)===0){
                        return
                    }
                    else if(Math.sign(this.currentIndex-j) === 1 ){
                        this.speed = this.DEFAULT_SPEED*(this.currentIndex-j);
                        this.currentIndex = j;
                        this.direction = 'right';
                        this.moveImage(); 
                    }
                    else if(Math.sign(this.currentIndex-j) === -1){
                        this.speed = this.DEFAULT_SPEED*(j-this.currentIndex);
                        this.currentIndex = j;
                        this.direction = 'left';
                        this.moveImage(); 
                    }
    
                }
            }
        }
    }
    //changin image colour
    changeDotColor(){
        for (var j =0; j < this.dots.length; j++){
            if (j === this.currentIndex){
                this.dots[j].style.background = '#fff';
            }
            else{
                this.dots[j].style.background = '#777';
            }
        }
    }

    //Going to next image
    nextImage(){
        if(!this.moving){
            this.moving = true;
            clearInterval(this.autoRunID);
            this.currentIndex ++;
            if (this.currentIndex === this.images.length){
                this.currentIndex = 0;
                this.direction = 'right';
                this.speed = this.DEFAULT_SPEED*2.5;
                this.moveImage(); 
            }
            else{
                this.direction = 'left';
                this.moveImage();
            }
        }
    }

    //going to previous image
    prevImage(){
        if(!this.moving){
            this.moving = true;
            clearInterval(this.autoRunID);
            if (this.currentIndex === 0){
                this.currentIndex = this.images.length-1;
                this.direction = 'left';
                this.speed = this.DEFAULT_SPEED*2.5;
                this.moveImage();
            }
            else{
                this.currentIndex --;
                this.direction = 'right';
                this.moveImage();  
            }
        }

    }

    //changing image
    moveImage() {
        clearInterval(this.autoRunID);
        if(this.direction === 'left'){
            this.position -= this.speed;
        }
        else if(this.direction === 'right'){
            this.position += this.speed;
        }
        if(Math.abs(this.position - (-this.currentIndex * this.imgWidth)) < this.speed){
            this.speed = this.DEFAULT_SPEED;
            this.position = (-this.currentIndex * this.imgWidth);
            this.wrapper.style.left = this.position + 'px';
            this.changeDotColor();
            this.moving = false;
            this.autoRunID = setInterval(this.autoRun, this.holdTime);
            return;
        }
        else{
            this.wrapper.style.left = this.position + 'px';
            // console.log(this.position);
        }
        requestAnimationFrame(this.moveImage);
    }

    //rendering arrows
    renderArrows(){
        this.leftArrow = document.createElement('img');
        this.rightArrow = document.createElement('img');

        this.leftArrow.style.width = "25px";
        this.leftArrow.style.height = "25px";
        this.leftArrow.src  = './images/icon-next.png';
        this.leftArrow.style.margin = "0 auto";
        this.leftArrow.style.position = 'absolute';
        this.leftArrow.style.left = this.imgWidth-30 + 'px';
        this.leftArrow.style.top = '45%';

        this.container.appendChild(this.leftArrow);


        this.rightArrow.style.width = "25px";
        this.rightArrow.style.height = "25px";
        this.rightArrow.src  = './images/icon-previous.png';
        this.rightArrow.style.margin = "0 auto";
        this.rightArrow.style.position = 'absolute';
        this.rightArrow.style.left = '20px';
        this.rightArrow.style.top = '45%';

        this.container.appendChild(this.rightArrow);

        //adding eventListeners to arrow buttons
        this.leftArrow.addEventListener('click', this.nextImage);
        this.rightArrow.addEventListener('click', this.prevImage);
    }

    renderDots(){
        //rendering dots
        for (var i =0; i<this.images.length; i++){
            this.dots[i] = document.createElement('div');
            this.dots[i].style.position = 'absolute';
            this.dots[i].style.background = '#777';
            this.dots[i].style.width = '12px';
            this.dots[i].style.height = '12px';
            this.dots[i].style.borderRadius = '50%';
            this.dots[i].style.left = (this.imgWidth/2-20) + (i * 20) + 'px';
            this.dots[i].style.bottom = '8px';
            this.dots[i].addEventListener('click', this.changeFromDot);
            this.changeDotColor();
            this.container.appendChild(this.dots[i]);

        }
    }

}

