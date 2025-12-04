const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;
let canvasPosition = canvas.getBoundingClientRect();
ctx.lineWidth = 10;

// class Enemy{
//     constructor(xpos, ypos){
//         this.xpos = xpos;
//         this.ypos = ypos;
//         this.frame = 0;
//         this.time = 0;
//     }
//
//     draw(){
//         this.time++;
//         ctx.fillStyle = 'black';
//         // ctx.fillRect(this.xpos, this.ypos, 25, 25);
//         
//         const randomNum = Math.random() * (1.0-0.95) + 0.95;
//
//         const yDivisor = 100*(Math.floor(Math.random()*11));
//         const yangleInRad = (Math.PI * this.time)/100;
//         const yCoeff = 100*randomNum;
//         const ysineVal = Math.sin(yangleInRad) * yCoeff;
//
//         const xangleInRad = (Math.PI + this.time)/10;
//         const xCoeff = 25*randomNum/2;
//         const xcosVal = Math.cos(xangleInRad) * xCoeff;
//
//         ctx.fillRect(this.xpos+xcosVal, this.ypos+ysineVal, 25, 25);
//     }
// }
//
// let e1 = new Enemy(200, 200);
// let e2 = new Enemy(150, 150);
// let e3 = new Enemy(175, 175);
// let e4 = new Enemy(225, 225);
//
// function animate(){
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     e1.draw();
//     e2.draw();
//     e3.draw();
//     e4.draw();
//     requestAnimationFrame(animate);
// }
// animate();

const numberOfEnemies = 25;
const enemyArray = [];
let gameFrame = 0;

class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = 'enemy1.png';
        this.speed = Math.random() * 4 -2;
        this.spriteWidth = 256;
        this.spriteHeight = 256; 
        this.width = 100;
        this.height = 100;
        // this.width = this.spriteWidth / 2.5;  // for spriteanimation
        // this.height = this.spriteHeight / 2.5; // for spriteanimation
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
    }

    update(){
        this.x += Math.random()*5 - 2.5;
        this.y += Math.random()*5 - 2.5;

        // animate sprites
        // if(gameFrame%2==0) // to make it slower by 2 // for spriteanimation
        //     this.frame > 4 ? this.frame =0 : this.frame++;  // for spriteanimation
    }
    
    draw(){
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        // ctx.drawImage(enemyImage, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); //for spriteanimation
    }
}

for(let i=0; i<numberOfEnemies; i++)
    enemyArray.push(new Enemy());

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemyArray.forEach(enemy=>{
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
