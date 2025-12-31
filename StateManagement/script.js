import Player from './player.js'
import InputHandler from './input.js'
import {drawStatusText} from './utils.js'

window.addEventListener('load', function(){
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
    const canvas = document.getElementById('canvas1');
    const canvasbackground = document.getElementById('canvas2');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasbackground.width = window.innerWidth;
    canvasbackground.height = window.innerHeight;

    backgrounddraw(canvasbackground);

    const player = new Player(canvas.width, canvas.height);
    player.draw(ctx);
    const input = new InputHandler();

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.clearRect(player.x, player.y, player.width, player.height); 
        console.log(input.lastkey);
        player.update(input.lastkey);
        player.draw(ctx);
        drawStatusText(ctx, input, player);
        requestAnimationFrame(animate);
    }
    animate();
})


function backgrounddraw(canvasbackground){
    // ctxbgd backgroundcolor
    const ctxbgd = canvasbackground.getContext('2d');
    for (let i = 0; i < canvasbackground.width; i++) {
        for (let j = 0; j < canvasbackground.height; j++) {
            ctxbgd.fillStyle = `rgb(
        ${Math.floor(255 - 2 * i)}
        ${Math.floor(255 - 2 * j)}
        0)`;
            ctxbgd.fillRect(j * 25, i * 25, 25, 25);
        }
    }
    // ctx backgroundcolor
}
