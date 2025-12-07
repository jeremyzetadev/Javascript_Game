const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 800;

const EenemyTypes = {
    worm: 'worm',
    ghost: 'ghost',
    spider: 'spider'
}

document.addEventListener('DOMContentLoaded', function(){
    console.log("Started");
    class Game {
        constructor(ctx, width, height){
            this.ctx=ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemySpawnInterval = 250;
            this.enemyTimer = 0;
            this.enemyTypes = [EenemyTypes.worm, EenemyTypes.ghost, EenemyTypes.spider];
            this.#addNewEnemy();
        }

        update(deltaTime){
            this.enemies = this.enemies.filter(object=> !object.markForDeletion);
            if(this.enemyTimer>this.enemySpawnInterval){
                this.#addNewEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(object=>object.update(deltaTime));
        }

        draw(){
            this.enemies.forEach(object=>object.draw(this.ctx));
        }

        // private method by # before method name
        #addNewEnemy(){
            // this.enemies.push(new Enemy(this));
            const randomEnemy = this.enemyTypes[Math.floor(Math.random()*this.enemyTypes.length)];
            if(randomEnemy == EenemyTypes.worm) this.enemies.push(new Worm(this));
            else if(randomEnemy == EenemyTypes.ghost) this.enemies.push(new Ghost(this));
            else if(randomEnemy == EenemyTypes.spider) this.enemies.push(new Spider(this));

            // sortenemies byfront and back (becomes a bit slow but looks good on canvas)
            // this.enemies.sort(function(a,b){
            //     return a.y-b.y;
            // });
        }
    }

    class Enemy{
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.width = 100;
            this.height = 100;
            this.frameX;
            this.maxFrame = 5;
            this.frameInterval = 100;
            this.frameTimer = 0;

            this.markForDeletion = false;
        }

        update(deltaTime){
            this.x -= this.vx * deltaTime;
            // remove enemies
            if(this.x < 0-this.width) this.markForDeletion=true;
            // animationframes
            if(this.frameTimer>this.frameInterval){
                if(this.frameX < this.maxFrame) this.frameX++ 
                else this.frameX = 0;
                this.frameTimer = 0;
            }else{
                this.frameTimer += deltaTime;
            }
        }

        draw(ctx){
            // ctx.fillRect(this.x, this.y, this.width, this.height);
            // ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
            // animationframes
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    class Worm extends Enemy{
        constructor(game){
            super(game)
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth/2;
            this.height = this.spriteHeight/2;
            this.x = this.game.width;
            this.y = this.game.height-this.height //Math.random() * this.game.height;
            this.image = worm; //direct access id of html in dom (no need to use document.getElementById or document.getClassSelector)
            this.vx = Math.random() * 0.1 + 0.1;
        }
    }

    class Ghost extends Enemy{
        constructor(game){
            super(game)
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.width = this.spriteWidth/2;
            this.height = this.spriteHeight/2;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height * 0.6;
            this.image = ghost; //direct access id of html in dom (no need to use document.getElementById or document.getClassSelector)
            this.vx = Math.random() * 0.2 + 0.1;
            this.angle = 0;
            this.curve = Math.random() * 3;
        }

        update(deltaTime){
            super.update(deltaTime);
            this.y +=  Math.sin(this.angle) * this.curve;
            this.angle += 0.05;
        }

        draw(ctx){
            ctx.save();
            ctx.globalAlpha = 0.4;
            ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
            super.draw(ctx);
            ctx.restore();
        }
    }

    class Spider extends Enemy{
        constructor(game){
            super(game)
            this.spriteWidth = 310;
            this.spriteHeight = 175;
            this.width = this.spriteWidth/2;
            this.height = this.spriteHeight/2;
            this.x = Math.random() * this.game.width;
            this.y = 0-this.height //Math.random() * this.game.height;
            this.image = spider; //direct access id of html in dom (no need to use document.getElementById or document.getClassSelector)
            this.vx = 0;
            this.vy = Math.random() * 0.1 + 2;
            this.maxLengthY = Math.random() * game.height;
        }

        update(deltaTime){
            super.update(deltaTime);
            if (this.y < 0-this.height*2) this.markForDeletion = true;
            this.y +=  this.vy;
            if (this.y > this.maxLengthY) this.vy *=-1;
        }

        draw(ctx){
            ctx.beginPath();
            ctx.moveTo(this.x + this.width/2, 0);
            ctx.lineTo(this.x + this.width/2, this.y + 10);
            ctx.stroke();
            super.draw(ctx);
        }
    }

    const game = new Game(ctx, canvas.width, canvas.height);
    let lastTime = 1;
    function animate(timeStamp){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();

        requestAnimationFrame(animate);
    }
    animate(0);
});


