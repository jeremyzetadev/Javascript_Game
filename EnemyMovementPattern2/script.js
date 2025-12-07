const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 800;

document.addEventListener('DOMContentLoaded', function(){
    console.log("Started");
    class Game {
        constructor(ctx, width, height){
            this.ctx=ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemySpawnInterval = 1000;
            this.enemyTimer = 0;
            this.#addNewEnemy();
        }

        update(deltaTime){
            this.enemies = this.enemies.filter(object=>object!=objectMarkedForDeletion);
            if(this.enemyTimer>this.enemySpawnInterval){
                this.#addNewEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(object=>object.update());
        }

        draw(){
            this.enemies.forEach(object=>object.draw(this.ctx));
        }

        // private method by # before method name
        #addNewEnemy(){
            this.enemies.push(new Enemy(this));
            // this.enemies.push(new Worm(this));
        }
    }

    class Enemy{
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.width = 100;
            this.height = 100;

            this.markForDeletion = false;
        }

        update(){
            this.x--;
            // remove enemies
            if(this.x < 0-this.width) this.markForDeletion=true;
        }

        draw(thix.ctx){
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Worm extends Enemy{
        constructor(game){
            super(game)
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.width = 100;
            this.height = 100;
            this.image = worm;
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


