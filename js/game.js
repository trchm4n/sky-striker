import InputManager from "./core/inputManager.js";
import Player from "./entities/player.js";
import Bullet from "./entities/bullet.js";
import Enemy from "./entities/enemy.js";

class Game {

    constructor() {

        this.titleScreen = document.getElementById("titleScreen");
        this.gameContainer = document.getElementById("gameContainer");
        this.gameOver = document.getElementById("gameOver");

        this.startButton = document.getElementById("startButton");
        this.retryButton = document.getElementById("retryButton");
        this.titleButton = document.getElementById("titleButton");

        this.scoreElement = document.getElementById("score");

        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.resizeCanvas();

        this.input = new InputManager(this.canvas);
        this.player = new Player(this.canvas, this.input);

        this.bullets = [];
        this.enemies = [];

        this.shootTimer = 0;
        this.shootInterval = 0.25;

        this.enemyTimer = 0;
        this.enemyInterval = 1.2;

        this.score = 0;

        this.lastTime = 0;
        this.running = false;

        this.startButton.addEventListener("click", () => this.start());
        this.retryButton.addEventListener("click", () => this.start());
        this.titleButton.addEventListener("click", () => this.backToTitle());

        window.addEventListener("resize", () => this.onResize());
    }

    onResize() {

        this.resizeCanvas();
        this.player.resetPosition();
    }

    resizeCanvas() {

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {

        this.titleScreen.classList.add("hidden");
        this.gameOver.classList.add("hidden");
        this.gameContainer.classList.remove("hidden");

        if (this.running) return;

        this.running = true;
        this.lastTime = performance.now();

        requestAnimationFrame((t) => this.loop(t));
    }

    loop(time) {

        if (!this.running) return;

        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.update(delta);
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(delta) {

        this.player.update(delta);

        // =====================
        // 🔫 弾
        // =====================
        this.shootTimer += delta;

        if (this.shootTimer >= this.shootInterval) {

            this.shootTimer = 0;

            this.bullets.push(
                new Bullet(
                    this.player.x + this.player.width / 2,
                    this.player.y
                )
            );
        }

        // =====================
        // 👾 敵生成
        // =====================
        this.enemyTimer += delta;

        if (this.enemyTimer >= this.enemyInterval) {

            this.enemyTimer = 0;

            const x = Math.random() * (this.canvas.width - 40);

            this.enemies.push(
                new Enemy(x, -40)
            );
        }

        // =====================
        // 更新
        // =====================
        this.bullets.forEach(b => b.update(delta));
        this.enemies.forEach(e => e.update(delta));

        this.bullets = this.bullets.filter(b => b.alive);
        this.enemies = this.enemies.filter(e => e.alive);

        // =====================
        // 💥 当たり判定
        // =====================
        for (let i = this.enemies.length - 1; i >= 0; i--) {

            const enemy = this.enemies[i];

            for (let j = this.bullets.length - 1; j >= 0; j--) {

                const bullet = this.bullets[j];

                if (this.isHit(enemy, bullet)) {

                    enemy.alive = false;
                    bullet.alive = false;

                    this.score += 100;

                    break;
                }
            }
        }

        this.scoreElement.textContent = this.score;
    }

    render() {

        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.draw(this.ctx);

        this.bullets.forEach(b => b.draw(this.ctx));
        this.enemies.forEach(e => e.draw(this.ctx));
    }

    isHit(a, b) {

        return !(
            a.x > b.x + b.width ||
            a.x + a.width < b.x ||
            a.y > b.y + b.height ||
            a.y + a.height < b.y
        );
    }

    backToTitle() {

        this.running = false;

        this.gameContainer.classList.add("hidden");
        this.gameOver.classList.add("hidden");
        this.titleScreen.classList.remove("hidden");
    }
}

window.onload = () => {
    new Game();
};
