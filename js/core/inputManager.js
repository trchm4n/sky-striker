export default class InputManager {

    constructor(canvas) {

        this.canvas = canvas;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        this.touchActive = false;
        this.touchX = 0;
        this.touchY = 0;

        window.addEventListener("keydown", (event) => {

            switch (event.key) {

                case "ArrowLeft":
                case "a":
                case "A":
                    this.left = true;
                    break;

                case "ArrowRight":
                case "d":
                case "D":
                    this.right = true;
                    break;

                case "ArrowUp":
                case "w":
                case "W":
                    this.up = true;
                    break;

                case "ArrowDown":
                case "s":
                case "S":
                    this.down = true;
                    break;

            }

        });

        window.addEventListener("keyup", (event) => {

            switch (event.key) {

                case "ArrowLeft":
                case "a":
                case "A":
                    this.left = false;
                    break;

                case "ArrowRight":
                case "d":
                case "D":
                    this.right = false;
                    break;

                case "ArrowUp":
                case "w":
                case "W":
                    this.up = false;
                    break;

                case "ArrowDown":
                case "s":
                case "S":
                    this.down = false;
                    break;

            }

        });

        canvas.addEventListener("touchstart", (event) => {

            event.preventDefault();

            const touch = event.touches[0];

            this.touchActive = true;
            this.touchX = touch.clientX;
            this.touchY = touch.clientY;

        }, { passive: false });

        canvas.addEventListener("touchmove", (event) => {

            event.preventDefault();

            const touch = event.touches[0];

            this.touchX = touch.clientX;
            this.touchY = touch.clientY;

        }, { passive: false });

        canvas.addEventListener("touchend", () => {

            this.touchActive = false;

        });

    }

}
