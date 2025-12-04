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

class Enemy {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.width = 100;
        this.height = 100;
        this.speed = Math.random() * 4 -2;
    }

    update(){
        this.x += this.speed;
        this.y += this.speed;
    }
    
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
    requestAnimationFrame(animate);
}
animate();
