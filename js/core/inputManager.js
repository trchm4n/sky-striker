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

        // =====================
        // キーボード
        // =====================
        window.addEventListener("keydown", (e) => {

            switch (e.key) {

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

        window.addEventListener("keyup", (e) => {

            switch (e.key) {

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

        // =====================
        // スマホ入力（安定版）
        // =====================

        canvas.addEventListener("touchstart", (e) => {

            e.preventDefault();

            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];

            this.touchActive = true;
            this.touchX = touch.clientX - rect.left;
            this.touchY = touch.clientY - rect.top;

        }, { passive: false });

        canvas.addEventListener("touchmove", (e) => {

            e.preventDefault();

            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];

            this.touchX = touch.clientX - rect.left;
            this.touchY = touch.clientY - rect.top;

        }, { passive: false });

        canvas.addEventListener("touchend", () => {

            this.touchActive = false;
        });
    }
}
