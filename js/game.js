import Player from "./entities/player.js";

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
        this.running = false;

        this.resizeCanvas();

        this.player = new Player(this.canvas);

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

        if (!this.running) {

            this.running = true;

            this.lastTime = performance.now();

            requestAnimationFrame(
                (time) => this.loop(time)
            );

        }

    }

    loop(time) {

        const delta =
            (time - this.lastTime) / 1000;

        this.lastTime = time;

        this.update(delta);

        this.render();

        requestAnimationFrame(
            (t) => this.loop(t)
        );

    }

    update(delta) {

        this.player.update(delta);

    }

    // render() {

    //     this.ctx.fillStyle = "#000";

    //     this.ctx.fillRect(
    //         0,
    //         0,
    //         this.canvas.width,
    //         this.canvas.height
    //     );

    //     this.player.draw(this.ctx);

    // }
render() {

    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(100,100,100,100);

}

    backToTitle() {

        this.running = false;

        this.gameContainer.classList.add("hidden");

        this.gameOver.classList.add("hidden");

        this.titleScreen.classList.remove("hidden");

    }

}

// window.onload = () => {

//     new Game();

// };
new Game();
