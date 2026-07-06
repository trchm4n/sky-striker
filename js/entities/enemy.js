export default class Enemy {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.width = 40;
        this.height = 40;

        this.speed = 120 + Math.random() * 120;

        this.alive = true;

    }

    update(delta) {

        this.y += this.speed * delta;

        // 画面外で削除
        if (this.y > window.innerHeight + 50) {
            this.alive = false;
        }

    }

    draw(ctx) {

        ctx.fillStyle = "#ff4d4d";

        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}
