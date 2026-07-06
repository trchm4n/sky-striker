import InputManager from "./core/inputManager.js";
import Player from "./entities/player.js";

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

        // ⏱️ ゲーム時間管理
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

        // ⏱️ 全体時間更新
        this.elapsedTime += delta;

        this.update(delta);
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(delta) {

        // =====================
        // プレイヤー更新
        // =====================
        this.player.update(delta);

        // =====================
        // 将来用：ここに全部集約
        // =====================
        this.updateGameLogic(delta);

    }

    updateGameLogic(delta) {

        // 🔥 今は空（ここが超重要）
        // 弾・敵・エフェクト・ステージ管理は全部ここに入る

        // 例：
        // this.bullets.update(delta);
        // this.enemies.update(delta);
        // this.spawner.update(delta);

    }

    render() {

        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.player.draw(this.ctx);

    }

    backToTitle() {

        this.running = false;

        this.gameContainer.classList.add("hidden");
        this.gameOver.classList.add("hidden");
        this.titleScreen.classList.remove("hidden");

    }

}

new Game();
