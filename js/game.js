import InputManager from "./core/inputManager.js";
import Player from "./entities/player.js";
import Bullet from "./entities/bullet.js";
import Enemy from "./entities/enemy.js";
import EnemyBullet from "./entities/enemyBullet.js";
import AudioManager from "./core/audio.js";
import Explosion from "./effects/explosion.js";
import ScoreManager from "./core/scoreManager.js";


class Game {


    constructor() {


        this.titleScreen =
            document.getElementById("titleScreen");

        this.gameContainer =
            document.getElementById("gameContainer");

        this.gameOver =
            document.getElementById("gameOver");


        this.startButton =
            document.getElementById("startButton");

        this.retryButton =
            document.getElementById("retryButton");

        this.titleButton =
            document.getElementById("titleButton");


        this.scoreElement =
            document.getElementById("score");

        this.lifeElement =
            document.getElementById("life");


        this.highScoreElement =
            document.getElementById("highScore");



        this.canvas =
            document.getElementById("gameCanvas");


        this.ctx =
            this.canvas.getContext("2d");



        this.resizeCanvas();



        this.input =
            new InputManager(
                this.canvas
            );


        this.player =
            new Player(
                this.canvas,
                this.input
            );


        this.audio =
            new AudioManager();


        this.scoreManager =
            new ScoreManager();



        this.bullets = [];

        this.enemies = [];

        this.enemyBullets = [];

        this.explosions = [];



        this.shootTimer = 0;

        this.enemyTimer = 0;

        this.enemyShootTimer = 0;



        this.shootInterval = 0.25;

        this.enemyInterval = 1.2;

        this.enemyShootInterval = 1.0;



        this.score = 0;

        this.life = 3;

        this.alive = true;



        this.invincible = false;

        this.invincibleTimer = 0;



        this.lastTime = 0;

        this.running = false;



        this.startButton.onclick =
            () => this.start();


        this.retryButton.onclick =
            () => this.start();


        this.titleButton.onclick =
            () => this.backToTitle();



        window.addEventListener(
            "resize",
            () => this.onResize()
        );



        this.updateHighScore();

    }



    updateHighScore() {


        if (!this.highScoreElement) {
            return;
        }


        this.highScoreElement.textContent =
            "BEST SCORE : " +
            this.scoreManager.getHighScore();

    }



    start() {


        this.titleScreen.classList.add(
            "hidden"
        );


        this.gameOver.classList.add(
            "hidden"
        );


        this.gameContainer.classList.remove(
            "hidden"
        );



        this.running = true;

        this.alive = true;



        this.score = 0;

        this.life = 3;



        this.bullets = [];

        this.enemies = [];

        this.enemyBullets = [];

        this.explosions = [];



        this.invincible = false;

        this.invincibleTimer = 0;



        this.audio.playBGM();



        this.lastTime =
            performance.now();



        requestAnimationFrame(
            (t) => this.loop(t)
        );

    }




    loop(time) {


        if (!this.running) {

            return;

        }



        const delta =
            (time - this.lastTime)
            / 1000;



        this.lastTime = time;



        this.update(delta);


        this.render(time);



        requestAnimationFrame(
            (t) => this.loop(t)
        );

    }





    update(delta) {


        if (!this.alive) {

            return;

        }



        this.player.update(delta);



        if (this.invincible) {


            this.invincibleTimer -= delta;


            if (
                this.invincibleTimer <= 0
            ) {

                this.invincible = false;

            }

        }




        this.shootTimer += delta;



        if (
            this.shootTimer >=
            this.shootInterval
        ) {


            this.shootTimer = 0;


            this.bullets.push(
                new Bullet(
                    this.player.x +
                    this.player.width / 2,
                    this.player.y
                )
            );


            this.audio.shoot();

        }




        this.enemyTimer += delta;



        if (
            this.enemyTimer >=
            this.enemyInterval
        ) {


            this.enemyTimer = 0;


            const x =
                Math.random()
                *
                (
                    this.canvas.width - 40
                );


            this.enemies.push(
                new Enemy(
                    x,
                    -40
                )
            );

        }



        this.enemyShootTimer += delta;



        if (
            this.enemyShootTimer >=
            this.enemyShootInterval
        ) {


            this.enemyShootTimer = 0;


            this.enemies.forEach(
                enemy => {

                    this.enemyBullets.push(
                        new EnemyBullet(
                            enemy.x +
                            enemy.width / 2,

                            enemy.y +
                            enemy.height
                        )
                    );

                }
            );

        }
        // =====================
        // オブジェクト更新
        // =====================

        this.bullets.forEach(
            b => b.update(delta)
        );


        this.enemies.forEach(
            e => e.update(delta)
        );


        this.enemyBullets.forEach(
            b => b.update(delta)
        );


        this.explosions.forEach(
            e => e.update(delta)
        );



        this.bullets =
            this.bullets.filter(
                b => b.alive
            );


        this.enemies =
            this.enemies.filter(
                e => e.alive
            );


        this.enemyBullets =
            this.enemyBullets.filter(
                b => b.alive
            );


        this.explosions =
            this.explosions.filter(
                e => e.alive
            );



        // =====================
        // 弾 → 敵
        // =====================

        for (
            let i = this.enemies.length - 1;
            i >= 0;
            i--
        ) {


            const enemy =
                this.enemies[i];


            for (
                let j = this.bullets.length - 1;
                j >= 0;
                j--
            ) {


                const bullet =
                    this.bullets[j];


                if (
                    this.isHit(
                        enemy,
                        bullet
                    )
                ) {


                    enemy.alive = false;

                    bullet.alive = false;



                    this.score += 100;



                    this.explosions.push(
                        new Explosion(
                            enemy.x +
                            enemy.width / 2,

                            enemy.y +
                            enemy.height / 2
                        )
                    );


                    this.audio.explosion();


                    break;

                }

            }

        }




        // =====================
        // プレイヤーダメージ
        // =====================

        const hitEnemy =
            this.enemies.some(
                e =>
                this.isHit(
                    this.player,
                    e
                )
            );


        const hitBullet =
            this.enemyBullets.some(
                b =>
                this.isHit(
                    this.player,
                    b
                )
            );



        if (
            !this.invincible &&
            (hitEnemy || hitBullet)
        ) {


            this.life--;


            this.audio.hit();


            this.invincible = true;


            this.invincibleTimer = 3;



            if (
                this.life <= 0
            ) {

                this.gameOverTrigger();

            }

        }



        this.scoreElement.textContent =
            this.score;


        this.lifeElement.textContent =
            this.life;

    }





    render(time) {


        this.ctx.fillStyle =
            "#000";


        this.ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );



        // 無敵点滅

        if (
            !this.invincible ||
            Math.floor(time / 100) % 2 === 0
        ) {

            this.player.draw(
                this.ctx
            );

        }



        this.bullets.forEach(
            b => b.draw(this.ctx)
        );


        this.enemies.forEach(
            e => e.draw(this.ctx)
        );


        this.enemyBullets.forEach(
            b => b.draw(this.ctx)
        );


        this.explosions.forEach(
            e => e.draw(this.ctx)
        );

    }





    // =====================
    // GAME OVER
    // =====================

    gameOverTrigger() {


        this.running = false;

        this.alive = false;



        this.audio.stopBGM();



        const newRecord =
            this.scoreManager.saveScore(
                this.score
            );



        this.gameContainer.classList.add(
            "hidden"
        );


        this.gameOver.classList.remove(
            "hidden"
        );



        document
            .getElementById(
                "finalScore"
            )
            .textContent =
            this.score;



        this.updateHighScore();



        if (newRecord) {


            const element =
                document.getElementById(
                    "newRecord"
                );


            if (element) {

                element.textContent =
                    "NEW RECORD!!";

            }

        }

    }





    // =====================
    // Collision
    // =====================

    isHit(a, b) {


        return !(
            a.x >
            b.x + b.width ||

            a.x + a.width <
            b.x ||

            a.y >
            b.y + b.height ||

            a.y + a.height <
            b.y
        );

    }





    // =====================
    // Resize
    // =====================

    resizeCanvas() {


        this.canvas.width =
            window.innerWidth;


        this.canvas.height =
            window.innerHeight;

    }



    onResize() {


        this.resizeCanvas();


        this.player.resetPosition();

    }





    // =====================
    // TITLE
    // =====================

    backToTitle() {


        this.running = false;


        this.audio.stopBGM();



        this.gameContainer.classList.add(
            "hidden"
        );


        this.gameOver.classList.add(
            "hidden"
        );


        this.titleScreen.classList.remove(
            "hidden"
        );


        this.updateHighScore();

    }

}



window.onload = () => {

    new Game();

};
