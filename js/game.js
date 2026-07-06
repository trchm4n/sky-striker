class Game {

    constructor() {

        // 画面
        this.titleScreen = document.getElementById("titleScreen");
        this.gameContainer = document.getElementById("gameContainer");
        this.gameOver = document.getElementById("gameOver");

        // ボタン
        this.startButton = document.getElementById("startButton");
        this.retryButton = document.getElementById("retryButton");
        this.titleButton = document.getElementById("titleButton");

        // Canvas
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.lastTime = 0;

        this.startButton.addEventListener("click", () => this.start());
        this.retryButton.addEventListener("click", () => this.start());
        this.titleButton.addEventListener("click", () => this.backToTitle());

        window.addEventListener("resize", () => this.resizeCanvas());

        this.resizeCanvas();
    }

    resizeCanvas() {

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

    }

    start() {

        this.titleScreen.classList.add("hidden");
        this.gameOver.classList.add("hidden");
        this.gameContainer.classList.remove("hidden");

        this.lastTime = performance.now();

        requestAnimationFrame((time) => this.loop(time));

    }

    loop(time) {

        const delta = (time - this.lastTime) / 1000;

        this.lastTime = time;

        this.update(delta);

        this.render();

        requestAnimationFrame((t) => this.loop(t));

    }

    update(delta) {

        // 次回からゲーム更新を書く

    }

    render() {

        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    }

    backToTitle() {

        this.gameContainer.classList.add("hidden");

        this.gameOver.classList.add("hidden");

        this.titleScreen.classList.remove("hidden");

    }

}

window.onload = () => {

    new Game();

};
