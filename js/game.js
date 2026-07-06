import InputManager from "./core/inputManager.js";
import Player from "./entities/player.js";
import Bullet from "./entities/bullet.js";

class Game {

    constructor() {

        this.titleScreen = document.getElementById("titleScreen");
        this.gameContainer = document.getElementById("gameContainer");
        this.gameOver = document.getElementById("gameOver");

        this.startButton = document.getElementById("startButton");
        this.retryButton = document.getElementById("retryButton");
        this.titleButton = document.getElementById("titleButton");

        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.resizeCanvas();

        this.input = new InputManager(this.canvas);
        this.player = new Player(this.canvas, this.input);

        // 弾
        this.bullets = [];

        // オートショット
        this.shootTimer = 0;
        this.shootInterval = 0.25;

        this.elapsedTime = 0;
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
        this.elapsedTime = 0;

        requestAnimationFrame((t) => this.loop(t));
    }

    loop(time) {

        if (!this.running) return;

        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.elapsedTime += delta;

        this.update(delta);
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(delta) {

        this.player.update(delta);

        // =========================
        // スマホ追従（遅延＋オフセット）
        // =========================
        if (this.input.touchActive) {

            const offsetY = 80; // 👈 指より上に出す

            const targetX = this.input.touchX - this.player.width / 2;
            const targetY = this.input.touchY - this.player.height / 2 - offsetY;

            // 追従遅延（ヌルっと動く）
            this.player.x += (targetX - this.player.x) * 0.18;
            this.player.y += (targetY - this.player.y) * 0.18;

            // 画面制限
            this.player.x = Math.max(0, Math.min(this.player.x, this.canvas.width - this.player.width));
            this.player.y = Math.max(0, Math.min(this.player.y, this.canvas.height - this.player.height));
        }

        // =========================
        // オートショット
        // =========================

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

        // =========================
        // 弾更新
        // =========================

        this.bullets.forEach(b => b.update(delta));
        this.bullets = this.bullets.filter(b => b.alive);
    }

    render() {

        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.draw(this.ctx);

        this.bullets.forEach(b => b.draw(this.ctx));
    }

    backToTitle() {

        this.running = false;

        this.gameContainer.classList.add("hidden");
        this.gameOver.classList.add("hidden");
        this.titleScreen.classList.remove("hidden");
    }
}

new Game();
