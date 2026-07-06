export default class Player {

    static WIDTH = 40;
    static HEIGHT = 60;
    static COLOR = "#4FC3F7";

    constructor(canvas) {

        this.canvas = canvas;

        this.width = Player.WIDTH;
        this.height = Player.HEIGHT;

        this.resetPosition();

    }

    resetPosition() {

        this.x = (this.canvas.width - this.width) / 2;
        this.y = this.canvas.height - this.height - 40;

    }

    update(delta) {

        // 次回実装

    }

    draw(ctx) {

        ctx.fillStyle = Player.COLOR;

        ctx.beginPath();

        ctx.moveTo(
            this.x + this.width / 2,
            this.y
        );

        ctx.lineTo(
            this.x,
            this.y + this.height
        );

        ctx.lineTo(
            this.x + this.width,
            this.y + this.height
        );

        ctx.closePath();

        ctx.fill();

    }

}
