const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width =  600;
const CANVAS_HEIGHT = canvas.height = 600;

// ctx.fillStyle="blue";
// ctx.fillRect(10, 10, 100, 50);
canvas.style.border = '2px solid black';
// horizontal center
canvas.style.display = 'block';
canvas.style.margin = 'auto';
// vertical center
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.bottom = 0;
canvas.style.left = 0;
canvas.style.right = 0;

const playerImage = new Image();
playerImage.src = 'mainchar_sprite.png';
const spriteWidth = 256;
const spriteHeight = 256;

let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggeredFrames = 5;

const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 6,
    },
    {
        name: 'attack',
        frames: 4,
    },
];
animationStates.forEach((state, index)=>{
    let frames = {
        loc: [],
    }
    for(let j=0; j<state.frames; j++){
        let positionX = j*spriteWidth;
        let positionY = index*spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
})

let playerState = 'idle';
const dropDown = document.getElementById('animations');
dropDown.addEventListener('change', function(e){
    playerState = e.target.value;
})

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // if(gameFrame % staggeredFrames ==0){
    //     if(frameX<5) frameX++;
    //     else frameX =0;
    // }
    let position = Math.floor(gameFrame/staggeredFrames) % spriteAnimations[playerState].loc.length; // let position = Math.floor(gameFrame/staggeredFrames) % 6;
    let frameX = position * spriteWidth;
    let frameY = spriteAnimations[playerState].loc[position].y;

    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy ,dw, dh)
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameFrame++;
    requestAnimationFrame(animate);
}
animate();

console.log(ctx);
