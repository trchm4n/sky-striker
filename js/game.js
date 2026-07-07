import InputManager from "./core/inputManager.js";
import Player from "./entities/player.js";
import Bullet from "./entities/bullet.js";
import Enemy from "./entities/enemy.js";
import EnemyBullet from "./entities/enemyBullet.js";
import AudioManager from "./core/audio.js";
import Explosion from "./effects/explosion.js";
import ScoreManager from "./core/scoreManager.js";
import Item from "./entities/item.js";


class Game {


    constructor() {


        this.titleScreen =
            document.getElementById(
                "titleScreen"
            );


        this.gameContainer =
            document.getElementById(
                "gameContainer"
            );


        this.gameOver =
            document.getElementById(
                "gameOver"
            );



        this.startButton =
            document.getElementById(
                "startButton"
            );


        this.retryButton =
            document.getElementById(
                "retryButton"
            );


        this.titleButton =
            document.getElementById(
                "titleButton"
            );



        this.scoreElement =
            document.getElementById(
                "score"
            );


        this.lifeElement =
            document.getElementById(
                "life"
            );


        this.highScoreElement =
            document.getElementById(
                "highScoreValue"
            );



        this.canvas =
            document.getElementById(
                "gameCanvas"
            );


        this.ctx =
            this.canvas.getContext(
                "2d"
            );



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





        // =====================
        // Object
        // =====================

        this.bullets = [];

        this.enemies = [];

        this.enemyBullets = [];

        this.explosions = [];

        this.items = [];





        // =====================
        // Timer
        // =====================

        this.shootTimer = 0;

        this.enemyTimer = 0;

        this.enemyShootTimer = 0;




        this.shootInterval = 0.25;

        this.enemyInterval = 1.2;

        this.enemyShootInterval = 1.0;





        // =====================
        // Status
        // =====================

        this.score = 0;

        this.life = 3;

        this.alive = true;



        this.invincible = false;

        this.invincibleTimer = 0;



        this.lastTime = 0;

        this.running = false;





        this.startButton.addEventListener(
            "click",
            () => this.start()
        );


        this.retryButton.addEventListener(
            "click",
            () => this.start()
        );


        this.titleButton.addEventListener(
            "click",
            () => this.backToTitle()
        );



        window.addEventListener(
            "resize",
            () => this.onResize()
        );



        this.updateHighScore();

    }





    updateHighScore() {


        if (
            !this.highScoreElement
        ) {

            return;

        }


        this.highScoreElement.textContent =
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



        this.score = 0;

        this.life = 3;

        this.alive = true;



        this.bullets = [];

        this.enemies = [];

        this.enemyBullets = [];

        this.explosions = [];

        this.items = [];



        this.player.powerLevel = 1;

        this.player.powerTimer = 0;



        this.player.resetPosition();



        this.invincible = false;

        this.invincibleTimer = 0;



        this.audio.playBGM();



        this.lastTime =
            performance.now();



        this.running = true;



        requestAnimationFrame(
            (time) =>
                this.loop(time)
        );

    }





    loop(time) {


        if (
            !this.running
        ) {

            return;

        }



        const delta =
            (
                time -
                this.lastTime
            ) / 1000;



        this.lastTime = time;



        this.update(delta);


        this.render(time);



        requestAnimationFrame(
            (t) =>
                this.loop(t)
        );

    }





    getEnemyType() {


        const r =
            Math.random();



        if (
            r < 0.5
        ) {

            return "normal";

        }


        if (
            r < 0.75
        ) {

            return "side";

        }


        if (
            r < 0.9
        ) {

            return "zigzag";

        }


        return "rush";

    }





    getItemType() {


        const r =
            Math.random();



        if (
            r < 0.4
        ) {

            return "heal";

        }


        if (
            r < 0.75
        ) {

            return "power";

        }


        return "shield";

    }
    update(delta) {


        if (
            !this.alive
        ) {

            return;

        }



        this.player.update(delta);




        // =====================
        // 無敵時間
        // =====================

        if (
            this.invincible
        ) {


            this.invincibleTimer -= delta;


            if (
                this.invincibleTimer <= 0
            ) {

                this.invincible = false;

            }

        }





        // =====================
        // ショット
        // =====================

        this.shootTimer += delta;



        if (
            this.shootTimer >=
            this.shootInterval
        ) {


            this.shootTimer = 0;



            const positions =
                this.player.getShootPositions();



            positions.forEach(
                pos => {


                    this.bullets.push(
                        new Bullet(
                            pos.x,
                            pos.y
                        )
                    );


                }
            );


            this.audio.shoot();

        }





        // =====================
        // 敵生成
        // =====================

        this.enemyTimer += delta;



        if (
            this.enemyTimer >=
            this.enemyInterval
        ) {


            this.enemyTimer = 0;



            const x =
                Math.random() *
                (
                    this.canvas.width -
                    40
                );



            this.enemies.push(
                new Enemy(
                    x,
                    -40,
                    this.getEnemyType()
                )
            );

        }





        // =====================
        // 敵攻撃
        // =====================

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
        // 更新
        // =====================

        this.bullets.forEach(
            bullet =>
                bullet.update(delta)
        );


        this.enemies.forEach(
            enemy =>
                enemy.update(delta)
        );


        this.enemyBullets.forEach(
            bullet =>
                bullet.update(delta)
        );


        this.items.forEach(
            item =>
                item.update(delta)
        );


        this.explosions.forEach(
            explosion =>
                explosion.update(delta)
        );





        // =====================
        // 敵撃破判定
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



                    // =====================
                    // アイテムドロップ
                    // 10%
                    // =====================

                    if (
                        Math.random() < 0.1
                    ) {


                        this.items.push(
                            new Item(
                                enemy.x,
                                enemy.y,
                                this.getItemType()
                            )
                        );

                    }




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
        // アイテム取得
        // =====================

        for (
            const item of this.items
        ) {


            if (
                this.isHit(
                    this.player,
                    item
                )
            ) {


                item.alive = false;



                switch(
                    item.type
                ) {



                    case "heal":


                        if (
                            this.life < 3
                        ) {

                            this.life++;

                        }


                        break;




                    case "power":


                        this.player.powerUp();


                        break;




                    case "shield":


                        this.invincible = true;


                        this.invincibleTimer = 10;


                        break;

                }

            }

        }





        // =====================
        // プレイヤー被弾
        // =====================

        const hitEnemy =
            this.enemies.some(
                enemy =>
                    this.isHit(
                        this.player,
                        enemy
                    )
            );



        const hitBullet =
            this.enemyBullets.some(
                bullet =>
                    this.isHit(
                        this.player,
                        bullet
                    )
            );



        if (
            !this.invincible &&
            (
                hitEnemy ||
                hitBullet
            )
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





        // =====================
        // 削除
        // =====================

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


        this.items =
            this.items.filter(
                i => i.alive
            );


        this.explosions =
            this.explosions.filter(
                e => e.alive
            );





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



        if (
            !this.invincible ||
            Math.floor(time / 100) % 2 === 0
        ) {


            this.player.draw(
                this.ctx
            );

        }



        this.bullets.forEach(
            bullet =>
                bullet.draw(this.ctx)
        );


        this.enemies.forEach(
            enemy =>
                enemy.draw(this.ctx)
        );


        this.enemyBullets.forEach(
            bullet =>
                bullet.draw(this.ctx)
        );


        this.items.forEach(
            item =>
                item.draw(this.ctx)
        );


        this.explosions.forEach(
            explosion =>
                explosion.draw(this.ctx)
        );

    }





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





    gameOverTrigger() {


        this.running = false;

        this.alive = false;



        this.audio.stopBGM();



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

    }





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
