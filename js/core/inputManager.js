export default class InputManager {

    constructor() {

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

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

    }

}
