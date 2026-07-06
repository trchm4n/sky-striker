export default class Bullet {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.width = 4;
        this.height = 10;

        this.speed = 600;

        this.alive = true;

    }

    update(delta) {

        this.y -= this.speed * delta;

        // 画面外に出たら削除
        if (this.y < -20) {
            this.alive = false;
        }

    }

    draw(ctx) {

        ctx.fillStyle = "#ffeb3b";

        ctx.fillRect(
            this.x - this.width / 2,
            this.y,
            this.width,
            this.height
        );

    }

}
