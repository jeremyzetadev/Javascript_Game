const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;
let canvasPosition = canvas.getBoundingClientRect();
ctx.lineWidth = 10;

const div_counter = document.getElementById("counter");

const colorMap = new Map([
  [0, "GhostWhite"],
  [1, "GainsBoro"],
  [2, "Grey"],
  [3, "Gray"],
  [4, "DeepBlue"],
  [5, "DodgerBlue"],
  [6, "DarkSeaGreen"],
  [7, "DarkKhaki"],
  [8, "DarkOrange"],
  [9, "DarkSalmon"],
  [10, "Cornsilk"],
]);

const colorMapObj = {
  0: 'indianred',
  1: 'lightcoral',
  2: 'salmon',
  3: 'darksalmon',
  4: 'lightsalmon',
  5: 'crimson',
  6: 'red',
  7: 'firebrick',
  8: 'darkred',
  9: 'pink',
  10: 'lightpink',
  11: 'hotpink',
  12: 'deeppink',
  13: 'palevioletred',
  14: 'coral',
  15: 'tomato',
  16: 'orangered',
  17: 'darkorange',
  18: 'orange',
  19: 'gold',
  20: 'yellow',
  21: 'lightyellow',
  22: 'lemonchiffon',
  23: 'papayawhip',
  24: 'greenyellow',
  25: 'chartreuse',
  26: 'limegreen',
  27: 'lime',
  28: 'forestgreen',
  29: 'green',
  30: 'darkgreen',
  31: 'mediumseagreen',
  32: 'springgreen',
  33: 'mediumspringgreen',
  34: 'aqua',
  35: 'cyan',
  36: 'lightcyan',
  37: 'paleturquoise',
  38: 'aquamarine',
  39: 'turquoise',
  40: 'mediumturquoise',
  41: 'darkturquoise',
  42: 'cadetblue',
  43: 'steelblue',
  44: 'powderblue',
  45: 'lightblue',
  46: 'skyblue',
  47: 'deepskyblue',
  48: 'dodgerblue',
  49: 'royalblue',
  50: 'blueviolet',
  51: 'darkviolet',
  52: 'darkmagenta',
  53: 'magenta',
  54: 'fuchsia',
  55: 'snow',
  56: 'gainsboro',
  57: 'lightgray',
  58: 'darkgray',
  59: 'saddlebrown'
};

let t=0;
let t_cumulative=0;

const milliseconds = Date.now();
let curr_ms = Date.now();

function animate(){
    // ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.fillStyle = colorMap.get(t_cumulative%60);         //BY USING new MAP


    ctx.fillStyle = colorMapObj[t_cumulative%60];             //BY USING map obj
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    console.log(colorMap.get(t_cumulative%60));
    // ctx.fillRect(curr_ms%255, (curr_ms%255)/255, 25, 25);
    t++;
    t_cumulative++;
    curr_ms = Date.now() - milliseconds;

        // console.log("milliseconds passed: " + (curr_ms/1000) + " frames per milliseconds: " + t);
        div_counter.innerHTML = "milliseconds passed: " + (curr_ms/1000) + "frames per milliseconds: " + t;
        t=0;

    // 60 fps calls every 1/60 of a second
    requestAnimationFrame(animate);
}
animate();
