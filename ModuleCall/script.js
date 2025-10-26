const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;
let canvasPosition = canvas.getBoundingClientRect();
ctx.lineWidth = 10;

class Segment{
    constructor(xpos, ypos, len, angle){
        this.xpos = xpos;
        this.ypos = ypos;
        // this.xpos = xpos - canvasPosition.left;
        // this.ypos = ypos - canvasPosition.bottom;
        this.len = len;
        this.angle = angle;
    }

    draw(){
        // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        // ctx.drawImage(this.image, this.spriteWidth*this.frame, this.frame * 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.xpos, this.ypos, 50, 100);
    }
}

class ThickLine{
    constructor(xpos, ypos, len, angle){
        this.xpos = xpos;
        this.ypos = ypos;
        this.len = len;
        this.angle = angle;
    }

    draw(targetx, targety){
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.xpos, this.ypos);
        // ctx.lineTo(this.xpos+targetx, this.ypos+targety);

        // for specific length only
        const dist_x = targetx-this.xpos;
        const dist_y = targety-this.ypos;
        const dist_r = Math.sqrt((dist_x*dist_x) + (dist_y*dist_y));
        const x_line = (dist_x/dist_r)*this.len;
        const y_line = (dist_y/dist_r)*this.len;
        ctx.lineTo(this.xpos+x_line, this.ypos+y_line);

        ctx.stroke();
    }
}

let s1 = new Segment(0,0,100,10);
let thickLine1 = new ThickLine(0,0,100,10);
let mousedownPosX = 0;
let mousedownPosY = 0;
let isMouseDown = false;

window.addEventListener('mousedown', function(e){
    isMouseDown = true;
});

window.addEventListener('mouseup', ()=>{
    isMouseDown = false;
})

window.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    mousedownPosX = e.x-canvasPosition.left;
    mousedownPosY = e.y-canvasPosition.top;
});

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    s1.draw();
    console.log(s1);
    console.log("segment1 origx:" + s1.xpos);
    console.log("segment1 origy:" + s1.ypos);
    thickLine1.draw(mousedownPosX, mousedownPosY);
    console.log("segment1 origx:" + s1.xpos);
    console.log("segment1 origy:" + s1.ypos);
    requestAnimationFrame(animate);
}
animate();
