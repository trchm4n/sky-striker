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

    }

    start() {

        this.titleScreen.classList.add("hidden");

        this.gameOver.classList.add("hidden");

        this.gameContainer.classList.remove("hidden");

        console.log("GAME START");

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
