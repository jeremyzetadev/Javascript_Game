const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;

let explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
let explosionFrameMax = 5;

class Explosion {
    constructor(x, y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = x-this.width/2;
        this.y = y-this.height/2;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.timer = 0;
        this.sound = new Audio();
        this.sound.src = 'boom.ogg';
    }
    update(){
        if(this.frame==0) this.sound.play();
        this.timer++;
        if(this.timer%10===0){
            this.frame++;
        }
    }
    draw(){
        // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        ctx.drawImage(this.image, this.spriteWidth*this.frame, this.frame * 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

//reassigning objects in array with another object - NG
// function explosionExpireByTime(){
//     const explosionsRemainingAnim = [];
//     for(i=0; i<explosions.length; i++){
//         if(explosions[i].timer <= 100){
//             explosionsRemainingAnim.push(explosions[i]);
//         }
//     }
//     if (explosions.length ==1 && explosions[0].timer>=100){ 
//         explosions = [];
//     }
//     else if (explosionsRemainingAnim.length!==0){
//         explosions = [];
//         explosions = explosionsRemainingAnim;
//     }
// }

//reassigning objects in array with another object - NG
// function explosionExpireByOutOfFrame(){
//     const explosionsRemainingAnim = [];
//     for(i=0; i<explosions.length; i++){
//         if(explosions[i].frame >= explosionFrameMax)
//             explosionsRemainingAnim.push(explosions[i]);
//     }
//     if (explosions.length ==1 && explosions[0].frame>=explosionFrameMax){ 
//         explosions = [];
//     }
//     else if (explosionsRemainingAnim.length!==0){
//         explosions = [];
//         explosions = explosionsRemainingAnim;
//     }
// }

//removing object in array 
function explosionExpireByTime(){
    const indexToRemoveReverse = [];
    for(i=explosions.length-1; i>0; i--){
        if(explosions[i].timer <= 100){
            indexToRemoveReverse.push(i);
        }
    }
    if (explosions.length ==1 && explosions[0].timer>=100){ 
        explosions = [];
    }
    else if (indexToRemoveReverse.length!==0){
        for(i=explosions.length-1; i>0; i--){
            explosions.splice(indexToRemoveReverse[i], 1);
        }
    }
}

//removing object in array 
function explosionExpireByOutOfFrame(){
    const indexToRemoveReverse = [];
    for(i=explosions.length-1; i>0; i--){
        if(explosions[i].frame >= explosionFrameMax){
            indexToRemoveReverse.push(i);
        }
    }
    if (explosions.length ==1 && explosions[0].frame>=explosionFrameMax){ 
        explosions = [];
    }
    else if (indexToRemoveReverse.length!==0){
        for(i=explosions.length-1; i>0; i--){
            explosions.splice(indexToRemoveReverse[i], 1);
        }
    }
}


// %%%%rectangle draw at click%%%%%
// window.addEventListener('click', function(e){
//     console.log(e);
//     ctx.fillStyle = 'white';
//     // ctx.fillRect(e.x, e.y, 50, 50);
//     let positionX = e.x-canvasPosition.left;
//     let positionY = e.y-canvasPosition.top;
//     let width = 50;
//     let height = 50;
//     // ctx.fillRect(e.x-canvasPosition.left-25, e.y-canvasPosition.top-25, 50, 50);
//     ctx.fillRect(positionX-width/2, positionY-height/2, width, height);
// });

// %%%%image draw at click%%%%%
window.addEventListener('click', function(e){
    let positionX = e.x-canvasPosition.left;
    let positionY = e.y-canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
    console.log(explosions);
});

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for(let i=0; i<explosions.length;i++){
        explosions[i].update();
        explosions[i].draw();
    }
    // explosionExpireByTime();
    explosionExpireByOutOfFrame();
    requestAnimationFrame(animate);
}
animate();
